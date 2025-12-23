/**
 * CF Snippets - Module 模式
 * 固定 Emby 反代 + 内存统计（无数据库）
 * 修复：显示客户端 IP
 */

// ================= 配置 =================
const FIXED_EMBY_ORIGIN = 'https://emos.lol';

const MANUAL_REDIRECT_DOMAINS = [
  'quark.cn',
  '189.cn',
  'aliyundrive.com',
  'xunlei.com',
  '115.com',
  '115cdn.com',
  'uc.cn',
];

// ⚠ 内存统计（节点重启即清零）
let playingCount = 0;
let playbackInfoCount = 0;

// ================= Module Export =================
export default {
  async fetch(request) {
    const url = new URL(request.url);

    // ===== 获取客户端 IP（Snippets 正确方式）=====
    const clientIp =
      request.headers.get('CF-Connecting-IP') ||
      request.headers.get('X-Forwarded-For') ||
      'unknown';

    // ========= 探活 =========
    if (url.pathname === '/') {
      return text(`Emby Snippet OK
IP: ${clientIp}
Country: ${request.cf?.country || 'unknown'}
Edge: ${request.cf?.colo || 'unknown'}`);
    }

    // ========= /stats JSON =========
    if (url.pathname === '/stats') {
      return json({
        playing_count: playingCount,
        playback_info_count: playbackInfoCount,
        ip: clientIp,
        country: request.cf?.country || 'unknown',
        edge: request.cf?.colo || 'unknown',
        note: 'Snippets 内存统计，节点重启即清零',
      });
    }

    // ========= /stats/view HTML =========
    if (url.pathname === '/stats/view') {
      return html(`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>Emby Snippet 状态</title>
<style>
body {
  background:#0f1115;
  color:#e5e7eb;
  font-family:system-ui;
  padding:30px;
}
.card {
  background:#161a22;
  padding:20px;
  border-radius:10px;
  max-width:420px;
}
.value {
  font-size:32px;
  margin:8px 0 16px;
}
.note {
  color:#9ca3af;
  font-size:13px;
}
</style>
</head>
<body>
<h1>📊 Emby Snippet 统计</h1>
<div class="card">
  <div>▶ 播放次数</div>
  <div class="value">${playingCount}</div>
  <div>🔗 获取链接</div>
  <div class="value">${playbackInfoCount}</div>
  <div class="note">
    IP：${clientIp}<br>
    国家：${request.cf?.country || 'unknown'}<br>
    节点：${request.cf?.colo || 'unknown'}<br>
    ⚠ 内存级统计，节点重启即清零
  </div>
</div>
</body>
</html>
      `);
    }

    // ========= 构造上游 =========
    const upstream = new URL(FIXED_EMBY_ORIGIN);
    upstream.pathname = url.pathname;
    upstream.search = url.search;

    // ========= 统计触发 =========
    if (upstream.pathname.endsWith('/Sessions/Playing')) {
      playingCount++;
    } else if (upstream.pathname.includes('/PlaybackInfo')) {
      playbackInfoCount++;
    }

    // ========= WebSocket =========
    if (request.headers.get('Upgrade')?.toLowerCase() === 'websocket') {
      return fetch(upstream.toString(), request);
    }

    // ========= 请求头 =========
    const headers = new Headers(request.headers);
    headers.set('Host', upstream.host);

    const upstreamReq = new Request(upstream.toString(), {
      method: request.method,
      headers,
      body: request.body,
      redirect: 'manual',
    });

    const res = await fetch(upstreamReq);

    // ========= 302 手动处理 =========
    const location = res.headers.get('Location');
    if (location && res.status >= 300 && res.status < 400) {
      const redirectUrl = new URL(location, upstream);

      if (MANUAL_REDIRECT_DOMAINS.some(d => redirectUrl.hostname.endsWith(d))) {
        const h = new Headers(res.headers);
        h.set('Location', redirectUrl.toString());
        return new Response(res.body, { status: res.status, headers: h });
      }

      return fetch(redirectUrl.toString(), request);
    }

    return res;
  },
};

// ================= 工具函数 =================
function json(obj) {
  return new Response(JSON.stringify(obj, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
}

function html(str) {
  return new Response(str, {
    headers: { 'Content-Type': 'text/html; charset=UTF-8' },
  });
}

function text(str) {
  return new Response(str, {
    headers: { 'Content-Type': 'text/plain; charset=UTF-8' },
  });
}
