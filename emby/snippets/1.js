/**
 * CF Snippets - Module
 * Emby 固定反代 + 中国大陆限制 + 高级 UI 拦截页
 */

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

export default {
  async fetch(request) {
    const url = new URL(request.url);

    const clientIp =
      request.headers.get('CF-Connecting-IP') ||
      request.headers.get('X-Forwarded-For') ||
      'unknown';

    const country = request.cf?.country || 'unknown';
    const colo = request.cf?.colo || 'unknown';

    // ================== 地区拦截（核心） ==================
    if (country !== 'CN') {
      return new Response(
        `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>访问受限</title>
<style>
:root {
  --bg: #0b0f1a;
  --card: rgba(22, 26, 40, 0.75);
  --border: rgba(255,255,255,.08);
  --text: #e5e7eb;
  --muted: #9ca3af;
  --accent: #38bdf8;
  --danger: #f87171;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  height: 100vh;
  background:
    radial-gradient(800px 400px at 20% 10%, rgba(56,189,248,.15), transparent 60%),
    radial-gradient(600px 300px at 80% 90%, rgba(168,85,247,.12), transparent 60%),
    var(--bg);
  font-family: system-ui,-apple-system,BlinkMacSystemFont;
  color: var(--text);
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  width: 92%;
  max-width: 460px;
  background: var(--card);
  backdrop-filter: blur(14px);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 36px 34px;
  box-shadow: 0 25px 60px rgba(0,0,0,.45);
  animation: fade .6s ease;
}
@keyframes fade {
  from { opacity:0; transform: translateY(12px); }
  to { opacity:1; transform: translateY(0); }
}
h1 {
  margin: 0 0 14px;
  font-size: 26px;
  color: var(--danger);
}
.desc {
  font-size: 15px;
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 26px;
}
.info {
  background: rgba(255,255,255,.03);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 14px;
}
.info div {
  display: flex;
  justify-content: space-between;
  margin: 6px 0;
}
.label { color: var(--muted); }
.value { color: var(--accent); }
.footer {
  margin-top: 22px;
  font-size: 13px;
  color: #6b7280;
  text-align: center;
}
</style>
</head>
<body>
  <div class="card">
    <h1>访问受限</h1>
    <p class="desc">
       仅允许 <strong>中国大陆直连</strong> 访问。<br>
      请关闭代理、加速器或将域名 emos.200038.xyz 设置为直连后重试。
    </p>

    <div class="info">
      <div><span class="label">IP</span><span class="value">${clientIp}</span></div>
      <div><span class="label">地区</span><span class="value">${country}</span></div>
      <div><span class="label">节点</span><span class="value">${colo}</span></div>
    </div>

    <div class="footer">
      Emby Edge Access Control
    </div>
  </div>
</body>
</html>`,
        {
          status: 403,
          headers: { 'Content-Type': 'text/html; charset=UTF-8' },
        }
      );
    }

    // ================== 探活（仅 CN） ==================
    if (url.pathname === '/') {
      return new Response(
        `Emby Snippet OK
IP: ${clientIp}
Country: ${country}
Edge: ${colo}`,
        { headers: { 'Content-Type': 'text/plain; charset=UTF-8' } }
      );
    }

    // ================== 上游构造 ==================
    const upstream = new URL(FIXED_EMBY_ORIGIN);
    upstream.pathname = url.pathname;
    upstream.search = url.search;

    // ================== WebSocket ==================
    if (request.headers.get('Upgrade')?.toLowerCase() === 'websocket') {
      return fetch(upstream.toString(), request);
    }

    // ================== 反代 ==================
    const headers = new Headers(request.headers);
    headers.set('Host', upstream.host);

    const upstreamReq = new Request(upstream.toString(), {
      method: request.method,
      headers,
      body: request.body,
      redirect: 'manual',
    });

    const res = await fetch(upstreamReq);

    // ================== 手动 302 ==================
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
