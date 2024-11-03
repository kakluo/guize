### 主题安装 

**在博客根目录里安装最新版主题**

### 1.1 Git 安裝

``` BASH
git clone -b main https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu
```

### 2.2 安装 pug 和 stylus 渲染插件

``` BASH
npm install hexo-renderer-pug hexo-renderer-stylus --save
```
`无法安装可以使用cnpm进行安装`

``` BASH
npm install hexo-renderer-pug hexo-renderer-stylus --save --registry=http://registry.npmmirror.com
```

### 3.3 安装RSS插件

``` BASH
npm install hexo-generator-feed --save
```

**应用`_config.yml`**

``` YML
# https://github.com/hexojs/hexo-generator-feed
#Feed Atom
feed:
    type: atom
    path: atom.xml
    limit: 20
rss: /atom.xml
```

### 4.4 本地搜索插件

``` BASH
npm install hexo-generator-search --save
```
**修改 `主题配置文件`**:

``` YML
local_search:
  enable: true
  preload: false
  CDN:
```

### 5.5 文章加密插件

在根目录执行以下命令

``` BASH
npm install --save hexo-blog-encrypt
```
**应用`_config.yml`**

``` YML
# Security
encrypt: # hexo-blog-encrypt
  abstract: 有东西被加密了, 请输入密码查看.
  message: 您好, 这里需要密码.
  tags:
  - {name: tagName, password: 密码A}
  - {name: tagName, password: 密码B}
  theme: xray
  wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
  wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
```

### 6.6 字数统计插件

``` BASH
npm install hexo-wordcount --save
或者
yarn add hexo-wordcount
```
**配置 `主题配置文件`**:

``` YML
# wordcount (字数统计)
# see https://blog.anheyu.com/posts/c27d.html#字数统计
wordcount:
  enable: true
  post_wordcount: true
  min2read: true
  total_wordcount: true
```

### 7.7 生成永久链接

``` BASH
npm install hexo-abbrlink --save
```
**配置 `主题配置文件`**:

``` YML
# 永久链接配置
permalink: posts/:abbrlink/

abbrlink:
  alg: crc32       # 使用 crc32 算法生成简短的 ID
  rep: hex         # 使用十六进制表示生成的 ID
  allow: ['post', 'school', 'cpp', 'java', 'blog']  # 允许的路径关键词
  disallow: []     # 不允许的路径关键词（可以为空）

permalink_defaults:
  pretty_urls:
    trailing_index: true   # 是否保留末尾的 index
    trailing_html: true    # 是否保留末尾的 .html
```

### 错误Hexo项目中缺少该模块cheerio

``` BASH
npm install cheerio
```
----

## 主题更改记录

### 朋友圈更改记录

<details>
<summary><code><strong>朋友圈更改记录</strong></code></summary>

### 1. 替换fcircle.pug

**文件目录 `themes\anzhiyu\layout\includes\page\fcircle.pug`**

```
if theme.friends_lite.enable
  link(rel="stylesheet", href=theme.friends_lite.fclite_css_url)
  style.
    #random-article {
      display: none!important;
    }
    .card:hover,
    #random-article:hover {
      border: var(--style-border-hover)!important;
    }
    #modal-author-name-link,
    .modal-article .modal-article-title:hover,
    .card-title:hover{
      color: var(--anzhiyu-theme)!important;
    }
    .modal-article,
    #modal-articles-container {
      border-top-color: var(--anzhiyu-theme)!important;
      border-bottom-color: var(--anzhiyu-theme)!important;
    }
    #load-more-btn:hover {
      background: var(--anzhiyu-theme)!important;
    }
  .fcircle_page
    .author-content.author-content-item.fcirclePage.single(style=`background: url(${theme.friends_lite.top_background}) center / cover no-repeat !important;`)
      .card-content
        .author-content-item-tips 朋友圈
        span.author-content-item-title 最新文章订阅
        .content-bottom
          .tips= theme.friends_lite.top_tips
        .banner-button-group
          a.banner-button(onclick='pjax.loadUrl("/about")')
            i.anzhiyufont.anzhiyu-icon-arrow-circle-right(style='font-size: 22px; margin-right: 0.25rem')
            span.banner-button-text 关于本人
    .title-h2-a
      .title-h2-a-left
        h2(style='padding-top:0;margin:.6rem 0 .6rem') 🎣 钓鱼
        a.random-post-start(href='javascript:fetchRandomPost();')
          i.anzhiyufont.anzhiyu-icon-arrow-rotate-right
      .title-h2-a-right
        a.random-post-all(href='/link/') 全部友链
    #random-post
    .title-h2-a
      .title-h2-a-left
        h2 🐟 鱼塘
    #friend-circle-lite-root

  script.
    if (typeof UserConfig === 'undefined') {
      var UserConfig = {
        private_api_url: '#{theme.friends_lite.private_api_url}',
        page_turning_number: #{theme.friends_lite.page_turning_number},
        error_img: '#{theme.friends_lite.error_img}',
      }
    }
  script(src=theme.friends_lite.fclite_js_url)
  script(defer data-pjax src=url_for(theme.asset.random_friends_post_js))
```

### 2. 替换random_friends_post.js

**文件目录 `themes\anzhiyu\source\js\anzhiyu\random_friends_post.js`**

```
var fdata = { defaultFish: 100, hungryFish: 100 };
if (typeof fdataUser !== "undefined") {
  for (var key in fdataUser) {
    if (fdataUser[key]) fdata[key] = fdataUser[key];
  }
}

var randomPostTimes = 0;
var randomPostWorking = false;
var randomPostTips = [
  "钓到了绝世好文！",
  "在河边打了个喷嚏，吓跑了",
  "你和小伙伴抢夺着",
  "你击败了巨龙，在巢穴中发现了",
  "挖掘秦始皇坟时找到了",
  "在路边闲逛的时候随手买了一个",
  "从学校班主任那拿来了孩子上课偷偷看的",
  "你的同桌无情的从你的语文书中撕下了那篇你最喜欢的",
  "考古学家近日发现了",
  "外星人降临地球学习地球文化，落地时被你塞了",
  "从图书馆顶层的隐秘角落里发现了闪着金光的",
  "徒弟修炼走火入魔，为师立刻掏出了",
  "在大山中唱山歌，隔壁的阿妹跑来了，带着",
  "隔壁家的孩子数学考了满分，都是因为看了",
  "隔壁家的孩子英语考了满分，都是因为看了",
  "小米研发了全新一代MIX手机，据说灵感",
  "修炼渡劫成功，还好提前看了",
  "库克坐上了苹果CEO的宝座，因为他面试的时候看了",
  "阿里巴巴大喊芝麻开门，映入眼帘的就是",
  "师傅说练武要先炼心，然后让我好生研读",
  "科考队在南极大陆发现了被冰封的",
  "飞机窗户似乎被一张纸糊上了，仔细一看是",
  "历史上满写的仁义道德四个字，透过字缝里却全是",
  "十几年前的录音机似乎还能够使用，插上电发现正在播的是",
  "新版语文书拟增加一篇熟读并背诵的",
  "经调查，99%的受访者都没有背诵过",
  "今年的高考满分作文是",
  "唐僧揭开了佛祖压在五指山上的",
  "科学家发现能够解决衰老的秘密，就是每日研读",
  "英特尔发布了全新的至强处理器，其芯片的制造原理都是",
  "新的iPhone产能很足，新的进货渠道是",
  "今年亩产突破了八千万斤，多亏了",
  "陆隐一统天上宗，在无数祖境高手的目光下宣读了",
  "黑钻风跟白钻风说道，吃了唐僧肉能长生不老，他知道是因为看了",
  "上卫生间没带纸，直接提裤跑路也不愿意玷污手中",
  "种下一篇文章就会产生很多很多文章，我种下了",
  "三十年河东，三十年河西，莫欺我没有看过",
  "踏破铁血无觅处，得来全靠",
  "今日双色球中了两千万，预测全靠",
  "因为卷子上没写名字，老师罚抄",
  "为了抗议世间的不公，割破手指写下了",
  "在艺术大街上被贴满了相同的纸，走近一看是",
  "这区区迷阵岂能难得住我？其实能走出来多亏了",
  "今日被一篇文章顶上了微博热搜，它是",
  "你送给乞丐一个暴富秘籍，它是",
  "UZI一个走A拿下五杀，在事后采访时说他当时回想起了",
  "科学家解刨了第一个感染丧尸病毒的人，发现丧尸抗体存在于",
  "如果你有梦想的话，就要努力去看",
  "决定我们成为什么样人的，不是我们的能力，而是是否看过",
  "有信心不一定会成功，没信心就去看",
  "你真正是谁并不重要，重要的是你看没看过",
  "玄天境重要的是锻体，为师赠你此书，好好修炼去吧，这是",
  "上百祖境高手在天威湖大战三天三夜为了抢夺",
  "这化仙池水乃上古真仙对后人的考校，要求熟读并背诵",
  "庆氏三千年根基差点竟被你小子毁于一旦，能够被我拯救全是因为我看了",
  "我就是神奇宝贝大师！我这只皮卡丘可是",
  "我就是神奇宝贝大师！我这只小火龙可是",
  "我就是神奇宝贝大师！我这只可达鸭可是",
  "我就是神奇宝贝大师！我这只杰尼龟可是",
  "上古遗迹中写道，只要习得此书，便得成功。你定睛一看，原来是",
  "奶奶的，玩阴的是吧，我就是双料特工代号穿山甲，",
  "你的背景太假了，我的就逼真多了，学到这个技术全是因为看了",
  "我是云南的，云南怒江的，怒江芦水市，芦水市六库，六库傈僳族，傈僳族是",
  "我真的栓Q了，我真的会谢如果你看",
  "你已经习得退退退神功，接下来的心法已经被记录在",
  "人生无常大肠包小肠，小肠包住了",
  "你抽到了普通文章，它是",
  "你收到了稀有文章，它是",
  "你抽到了金色普通文章，它是",
  "你抽到了金色稀有文章，它是",
  "你抽到了传说文章！它是",
  "哇！金色传说！你抽到了金色传说文章，它是",
  "报告！侦察兵说在前往300米有一个男子在偷偷看一本书，上面赫然写着",
  "芷莲姑娘大摆擂台，谁若是能读完此书，便可娶了她。然后从背后掏出了",
  "请问你的梦想是什么？我的梦想是能读到",
  "读什么才能增智慧？当然是读",
  "纳兰嫣然掏出了退婚书，可是发现出门带错了，结果拿出了一本",
  "你要尽全力保护你的梦想。那些嘲笑你的人，他们必定会失败，他们想把你变成和他们一样的人。如果你有梦想的话，就要努力去读",
  "走人生的路就像爬山一样，看起来走了许多冤枉的路，崎岖的路，但终究需要读完",
  "游戏的规则就是这么的简单，你听懂了吗？管你听没听懂，快去看",
];

var randomPostClick = 0;

function fetchRandomPost() {
  if (!document.getElementById("random-post")) return;
  if (randomPostWorking) return;
  randomPostWorking = true;

  let randomRotate = randomPostTimes * 360;
  let randomPostTipsItem = randomPostTips[Math.floor(Math.random() * randomPostTips.length)];
  let randomPostLevel = getRandomPostLevel(randomPostTimes);

  document.getElementById("random-post").innerHTML = randomPostTimes >= 5 ?
    `钓鱼中... （Lv.` + randomPostTimes + ` 当前称号：` + randomPostLevel + `）` :
    `钓鱼中...`;

  let randomTime = randomPostTimes == 0 ? 0 : randomNum(1000, 3000);

  document.querySelector(".random-post-start").style.opacity = "0.2";
  document.querySelector(".random-post-start").style.transitionDuration = "0.3s";
  document.querySelector(".random-post-start").style.transform = "rotate(" + randomRotate + "deg)";

  if (randomPostClick * fdata.hungryFish + fdata.defaultFish < randomPostTimes && Math.round(Math.random()) == 0) {
    document.getElementById("random-post").innerHTML =
      "因为只钓鱼不吃鱼，过分饥饿导致本次钓鱼失败...(点击任意一篇钓鱼获得的文章即可恢复）";
    randomPostWorking = false;
  } else {
    fetch(UserConfig.private_api_url + 'all.json')
      .then(res => res.json())
      .then(json => {
        let randomArticle = json.article_data[Math.floor(Math.random() * json.article_data.length)];
        let { title, link, author } = randomArticle;
        window.setTimeout(() => {
          document.getElementById("random-post").innerHTML =
            randomPostTipsItem +
            `来自友链 <b>` +
            author +
            `</b> 的文章：<a class="random-friends-post" onclick="randomClickLink()" target="_blank" href="` +
            link +
            `" rel="external nofollow">` +
            title +
            `</a>`;
          randomPostTimes += 1;
          localStorage.setItem("randomPostTimes", randomPostTimes);
          document.querySelector(".random-post-start").style.opacity = "1";
        }, randomTime);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById("random-post").innerHTML = "获取文章失败，请稍后再试。";
      })
      .finally(() => {
        randomPostWorking = false;
      });
  }
}

function initRandomPost() {
  if (localStorage.randomPostTimes) {
    randomPostTimes = parseInt(localStorage.randomPostTimes);
    randomPostClick = parseInt(localStorage.randomPostClick);
    document.querySelector(".random-post-start").style.transitionDuration = "0.3s";
    document.querySelector(".random-post-start").style.transform = "rotate(" + 360 * randomPostTimes + "deg)";
  }
  fetchRandomPost();
}

function randomClickLink() {
  randomPostClick += 1;
  localStorage.setItem("randomPostClick", randomPostClick);
}

function randomNum(minNum, maxNum) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}

function getRandomPostLevel(times) {
  if (times > 10000) return "愿者上钩";
  if (times > 1000) return "俯览天下";
  if (times > 100) return "绝世渔夫";
  if (times > 75) return "钓鱼王者";
  if (times > 50) return "钓鱼宗师";
  if (times > 20) return "钓鱼专家";
  if (times > 5) return "钓鱼高手";
  return "钓鱼新手";
}

initRandomPost();
```

### 3. 适配友链钓鱼

文件目录 `themes\anzhiyu\layout\includes\page\flink.pug`

搜索 `#random-post `修改为下面所示

```
   #random-post
   script(defer data-pjax src=url_for(theme.asset.random_friends_post_js))
+  script.
+    if (typeof UserConfig === 'undefined') {
+      var UserConfig = {
+        private_api_url: '#{theme.friends_lite.private_api_url}',
+        page_turning_number: #{theme.friends_lite.page_turning_number},
+        error_img: '#{theme.friends_lite.error_img}'
+      }
+    }
```
搜索 `.banner-button-group` 修改为以下内容

```
        .banner-button-group
-         if (theme.friends_vue.apiurl) 
+         if (theme.friends_lite.private_api_url)
```

### 4. 在主题配置文件中添加

``` YML
# Lite朋友圈配置
friends_lite:
  enable: true
  fclite_css_url: https://friend.200038.xyz/main/fclite.css  # 轻量朋友圈的CSS
  fclite_js_url: https://friend.200038.xyz/main/fclite.js    # 轻量朋友圈的js
  private_api_url: https://friend.200038.xyz/               # 获取json的API URL
  page_turning_number: 20                              # 每页显示的文章数量
  error_img:   # 404图片 URL
  top_background:  # 顶部背景图片 URL
  top_tips: 使用 轻量友链朋友圈 订阅友链最新文章        # 顶部提示文本
```
</details>

### 更改友链随机访问

<details>
<summary><code><strong>更改友链随机访问</strong></code></summary>

``` PUG
#article-container
  if theme.linkPageTop && theme.linkPageTop.enable
    #flink-banners
      .banner-top-box
        .flink-banners-title
          .banners-title-small 友情链接
          .banners-title-big=theme.linkPageTop ? theme.linkPageTop.title : "与数百名博主无限进步"
        .banner-button-group
          if theme.linkPageTop.addFriendPlaceholder && theme.comments.use == 'Twikoo' && theme.twikoo.envId
            a.banner-button.secondary.no-text-decoration(onclick="friendChainRandomTransmission()")
              i.anzhiyufont.anzhiyu-icon-paper-plane1
              span.banner-button-text 随机访问
          if theme.linkPageTop.addFriendPlaceholder && theme.comments.use == 'Twikoo' && theme.twikoo.envId
            a.banner-button.no-text-decoration(onclick="anzhiyu.addFriendLink()")
              i.anzhiyufont.anzhiyu-icon-arrow-circle-right
              span.banner-button-text 申请友链
      #skills-tags-group-all
        .tags-group-wrapper
          - function getAvatarWithoutExclamationMark(url) {
          -   const index = url.indexOf('!');
          -   return index !== -1 ? url.substring(0, index) : url;
          - }
          each y in [1,2]
            each i, index in site.data.link.slice(0, 15)
              - const link_list = i.link_list.slice()
              - const hundredSuffix = i.hundredSuffix ? i.hundredSuffix : ""
              - const evenNum = link_list.filter((x, index) => index % 2 === 0);
              - const oddNum = link_list.filter((x, index) => index % 2 === 1);
              each item, index2 in link_list.slice(0, Math.min(evenNum.length, oddNum.length))
                - const index = index2 * 2
                if (index <= 15 && typeof evenNum[index] !== 'undefined' && typeof oddNum[index] !== 'undefined')
                  - let oddNumAvatar = getAvatarWithoutExclamationMark(oddNum[index].avatar);
                  - let evenNumAvatar = getAvatarWithoutExclamationMark(evenNum[index].avatar);
                  .tags-group-icon-pair
                    a.tags-group-icon.no-text-decoration(href=url_for(evenNum[index].link), title=evenNum[index].name)
                      img.no-lightbox(title=evenNum[index].name, src=url_for(evenNumAvatar + hundredSuffix) onerror=`this.onerror=null;this.src='` + url_for(theme.error_img.flink) + `'` alt=evenNum[index].name)
                    a.tags-group-icon.no-text-decoration(href=url_for(oddNum[index].link), title=oddNum[index].name)
                      img.no-lightbox(title=oddNum[index].name, src=url_for(oddNumAvatar + hundredSuffix) onerror=`this.onerror=null;this.src='` + url_for(theme.error_img.flink) + `'` alt=oddNum[index].name)
  .title-h2-a
    .title-h2-a-left
      h2(style='padding-top:0;margin:.6rem 0 .6rem') 🎣 钓鱼
      a.random-post-start.no-text-decoration(href='javascript:fetchRandomPost();')
        i.anzhiyufont.anzhiyu-icon-arrow-rotate-right
    .title-h2-a-right
      a.random-post-all.no-text-decoration(href='/link/') 全部友链
  #random-post
  script(defer data-pjax src=url_for(theme.asset.random_friends_post_js))
  
  .flink
    if site.data.link
      each i in site.data.link
        if i.class_name
          h2!= i.class_name + "(" + i.link_list.length + ")"
        if i.class_desc
          .flink-desc!=i.class_desc
        if i.flink_style === 'anzhiyu'
          div(class=i.lost_contact ? 'anzhiyu-flink-list cf-friends-lost-contact' : 'anzhiyu-flink-list')
            if i.link_list
              each item in i.link_list
                - let color = item.color || ""
                - let tag = item.tag || ""
                
                .flink-list-item
                  if color == "vip" && tag
                    span.site-card-tag.vip #[=tag]
                      i.light
                  else if color == "speed" && tag
                    span.site-card-tag.speed #[=tag]
                  else if tag
                    span.site-card-tag(style=`background-color: ${color}`) #[=tag]
                  else if item.recommend
                    span.site-card-tag 荐
                  if i.lost_contact
                    a.cf-friends-link(href=url_for(item.link) title=item.name target="_blank")
                      if theme.lazyload.enable
                        img.no-lightbox(data-lazy-src=url_for(item.avatar) onerror=`this.onerror=null;this.src='` + url_for(theme.error_img.flink) + `'` alt=item.name )
                      else
                        img.cf-friends-avatar.no-lightbox(src=url_for(item.avatar) onerror=`this.onerror=null;this.src='` + url_for(theme.error_img.flink) + `'` alt=item.name )
                      .flink-item-info
                        .flink-item-name.cf-friends-name-lost-contact= item.name
                  else
                    a.cf-friends-link(href=url_for(item.link) cf-href=url_for(item.link) title=item.name target="_blank")
                      if theme.lazyload.enable
                        img.cf-friends-avatar.no-lightbox(data-lazy-src=url_for(item.avatar), cf-src=url_for(item.avatar), onerror=`this.onerror=null;this.src='` + url_for(theme.error_img.flink) + `'` alt=item.name )
                      else
                        img.cf-friends-avatar.no-lightbox(src=url_for(item.avatar) cf-src=url_for(item.avatar) onerror=`this.onerror=null;this.src='` + url_for(theme.error_img.flink) + `'` alt=item.name )
                      .flink-item-info
                        .flink-item-name.cf-friends-name= item.name
                        .flink-item-desc(title=item.descr)= item.descr
        
        else if i.flink_style === 'telescopic'
          .telescopic-site-card-group
            each item in i.link_list
              - let color = item.color || ""
              - let tag = item.tag || ""
              - let siteshot = item.siteshot || `https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/${item.link}` || theme.default_img
              .site-card
                if color == "vip" && tag
                  span.site-card-tag.vip #[=tag]
                    i.light
                else if color == "speed" && tag
                  span.site-card-tag.speed #[=tag]
                else if tag
                  span.site-card-tag(style=`background-color: ${color}`) #[=tag]
                else if item.recommend
                  span.site-card-tag 荐
                a.img.no-text-decoration(target='_blank', title=`${item.name}`, href=`${item.link}`, rel='external nofollow')
                  img.flink-avatar(data-lazy-src=siteshot, onerror=`this.onerror=null;this.src='${theme.default_img}'`, alt=item.name, style="pointer-events: none;", src=`${siteshot}`)
                a.info.cf-friends-link.no-text-decoration(target='_blank', title=`${item.name}`, href=`${item.link}`, cf-href=url_for(item.link), rel='external nofollow')
                  .site-card-avatar
                    img.flink-avatar.cf-friends-avatar.no-fancybox(data-lazy-src=item.avatar, cf-src=url_for(item.avatar), onerror=`this.onerror=null;this.src='${theme.default_img}'`, alt=item.name, src=item.avatar)
                  .site-card-text
                    span.title.cf-friends-name #[=item.name]
                    span.desc(title=`${item.descr}`) #[=item.descr]
        else if i.flink_style === 'flexcard'
          .flexcard-flink-list
            each item in i.link_list
              a.flink-list-card.cf-friends-link(href=url_for(item.link) cf-href=url_for(item.link) target='_blank' data-title=item.descr)
                .wrapper.cover
                  - var siteshot = item.siteshot ? url_for(item.siteshot) : 'https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/' + item.link
                  if theme.lazyload.enable
                    img.cover.fadeIn(data-lazy-src=siteshot onerror=`this.onerror=null;this.src='` + url_for(theme.error_img.post_page) + `'` alt='cover' )
                  else
                    img.cover.fadeIn(src=siteshot onerror=`this.onerror=null;this.src='` + url_for(theme.error_img.post_page) + `'` alt='cover' )    
                .info
                  if theme.lazyload.enable
                    img.cf-friends-avatar.no-lightbox.flink-avatar(data-lazy-src=url_for(item.avatar) cf-src=url_for(item.avatar) onerror=`this.onerror=null;this.src='` + url_for(theme.error_img.flink) + `'` alt='cover' )
                  else
                    img.cf-friends-avatar.no-lightbox(src=url_for(item.avatar) cf-src=url_for(item.avatar) onerror=`this.onerror=null;this.src='` + url_for(theme.error_img.flink) + `'` alt='cover' )
                  span.flink-sitename.cf-friends-name= item.name
    != page.content
```
<details>

### 文章统计增加

<details>
<summary><code><strong>文章统计增加</strong></code></summary>

### 1. 新建 `statistics` 页面

``` BASH
hexo new page statistics
```
### 2. 配置 `statistics` 文件夹下的 `index`

``` MARKDOWN
---
title: 文章统计
date: 2020-03-01 08:00:00
comments: true
aside: false
type: statistics
top_background: # 图片链接
---
```

### 3. 以 `anzhiyu` 主题为例，在 `\themes\anzhiyu\scripts\helpers\` 目录下新建 `charts.js` 文件，然后添加以下内容：

``` JS
const cheerio = require('cheerio')
const moment = require('moment')

hexo.extend.filter.register('after_render:html', function (locals) {
  const $ = cheerio.load(locals)
  const post = $('#posts-chart')
  const tag = $('#tags-chart')
  const category = $('#categories-chart')
  const htmlEncode = false

  if (post.length > 0 || tag.length > 0 || category.length > 0) {
    if (post.length > 0 && $('#postsChart').length === 0) {
      if (post.attr('data-encode') === 'true') htmlEncode = true
      post.after(postsChart(post.attr('data-start')))
    }
    if (tag.length > 0 && $('#tagsChart').length === 0) {
      if (tag.attr('data-encode') === 'true') htmlEncode = true
      tag.after(tagsChart(tag.attr('data-length')))
    }
    if (category.length > 0 && $('#categoriesChart').length === 0) {
      if (category.attr('data-encode') === 'true') htmlEncode = true
      category.after(categoriesChart(category.attr('data-parent')))
    }

    if (htmlEncode) {
      return $.root().html().replace(/&amp;#/g, '&#')
    } else {
      return $.root().html()
    }
  } else {
    return locals
  }
}, 15)

function postsChart (startMonth) {
  const startDate = moment(startMonth || '2020-01')
  const endDate = moment()

  const monthMap = new Map()
  const dayTime = 3600 * 24 * 1000
  for (let time = startDate; time <= endDate; time += dayTime) {
    const month = moment(time).format('YYYY-MM')
    if (!monthMap.has(month)) {
      monthMap.set(month, 0)
    }
  }
  hexo.locals.get('posts').forEach(function (post) {
    const month = post.date.format('YYYY-MM')
    if (monthMap.has(month)) {
      monthMap.set(month, monthMap.get(month) + 1)
    }
  })
  const monthArr = JSON.stringify([...monthMap.keys()])
  const monthValueArr = JSON.stringify([...monthMap.values()])

  return `
  <script id="postsChart">
    var color = document.documentElement.getAttribute('data-theme') === 'light' ? '#4c4948' : 'rgba(255,255,255,0.7)'
    var postsChart = echarts.init(document.getElementById('posts-chart'), 'light');
    var postsOption = {
      title: {
        text: '文章发布统计图',
        x: 'center',
        textStyle: {
          color: color
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        name: '日期',
        type: 'category',
        boundaryGap: false,
        nameTextStyle: {
          color: color
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          color: color
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: color
          }
        },
        data: ${monthArr}
      },
      yAxis: {
        name: '文章篇数',
        type: 'value',
        nameTextStyle: {
          color: color
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          color: color
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: color
          }
        }
      },
      series: [{
        name: '文章篇数',
        type: 'line',
        smooth: true,
        lineStyle: {
            width: 0
        },
        showSymbol: false,
        itemStyle: {
          opacity: 1,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(128, 255, 165)'
          },
          {
            offset: 1,
            color: 'rgba(1, 191, 236)'
          }])
        },
        areaStyle: {
          opacity: 1,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(128, 255, 165)'
          }, {
            offset: 1,
            color: 'rgba(1, 191, 236)'
          }])
        },
        data: ${monthValueArr},
        markLine: {
          data: [{
            name: '平均值',
            type: 'average',
            label: {
              color: color
            }
          }]
        }
      }]
    };
    postsChart.setOption(postsOption);
    window.addEventListener('resize', () => { 
      postsChart.resize();
    });
    postsChart.on('click', 'series', (event) => {
      if (event.componentType === 'series') window.location.href = '/archives/' + event.name.replace('-', '/');
    });
  </script>`
}

function tagsChart (len) {
  const tagArr = []
  hexo.locals.get('tags').map(function (tag) {
    tagArr.push({ name: tag.name, value: tag.length, path: tag.path })
  })
  tagArr.sort((a, b) => { return b.value - a.value })

  const dataLength = Math.min(tagArr.length, len) || tagArr.length
  const tagNameArr = []
  for (let i = 0; i < dataLength; i++) {
    tagNameArr.push(tagArr[i].name)
  }
  const tagNameArrJson = JSON.stringify(tagNameArr)
  const tagArrJson = JSON.stringify(tagArr)

  return `
  <script id="tagsChart">
    var color = document.documentElement.getAttribute('data-theme') === 'light' ? '#4c4948' : 'rgba(255,255,255,0.7)'
    var tagsChart = echarts.init(document.getElementById('tags-chart'), 'light');
    var tagsOption = {
      title: {
        text: 'Top ${dataLength} 标签统计图',
        x: 'center',
        textStyle: {
          color: color
        }
      },
      tooltip: {},
      xAxis: {
        name: '标签',
        type: 'category',
        nameTextStyle: {
          color: color
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          color: color,
          interval: 0
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: color
          }
        },
        data: ${tagNameArrJson}
      },
      yAxis: {
        name: '文章篇数',
        type: 'value',
        splitLine: {
          show: false
        },
        nameTextStyle: {
          color: color
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          color: color
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: color
          }
        }
      },
      series: [{
        name: '文章篇数',
        type: 'bar',
        data: ${tagArrJson},
        itemStyle: {
          borderRadius: [5, 5, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(128, 255, 165)'
          },
          {
            offset: 1,
            color: 'rgba(1, 191, 236)'
          }])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(128, 255, 195)'
            },
            {
              offset: 1,
              color: 'rgba(1, 211, 255)'
            }])
          }
        },
        markLine: {
          data: [{
            name: '平均值',
            type: 'average',
            label: {
              color: color
            }
          }]
        }
      }]
    };
    tagsChart.setOption(tagsOption);
    window.addEventListener('resize', () => { 
      tagsChart.resize();
    });
    tagsChart.on('click', 'series', (event) => {
      if(event.data.path) window.location.href = '/' + event.data.path;
    });
  </script>`
}

function categoriesChart (dataParent) {
  const categoryArr = []
  let categoryParentFlag = false
  hexo.locals.get('categories').map(function (category) {
    if (category.parent) categoryParentFlag = true
    categoryArr.push({
      name: category.name,
      value: category.length,
      path: category.path,
      id: category._id,
      parentId: category.parent || '0'
    })
  })
  categoryParentFlag = categoryParentFlag && dataParent === 'true'
  categoryArr.sort((a, b) => { return b.value - a.value })
  function translateListToTree (data, parent) {
    let tree = []
    let temp
    data.forEach((item, index) => {
      if (data[index].parentId == parent) {
        let obj = data[index];
        temp = translateListToTree(data, data[index].id);
        if (temp.length > 0) {
          obj.children = temp
        }
        if (tree.indexOf())
          tree.push(obj)
      }
    })
    return tree
  }
  const categoryNameJson = JSON.stringify(categoryArr.map(function (category) { return category.name }))
  const categoryArrJson = JSON.stringify(categoryArr)
  const categoryArrParentJson = JSON.stringify(translateListToTree(categoryArr, '0'))

  return `
  <script id="categoriesChart">
    var color = document.documentElement.getAttribute('data-theme') === 'light' ? '#4c4948' : 'rgba(255,255,255,0.7)'
    var categoriesChart = echarts.init(document.getElementById('categories-chart'), 'light');
    var categoryParentFlag = ${categoryParentFlag}
    var categoriesOption = {
      title: {
        text: '文章分类统计图',
        x: 'center',
        textStyle: {
          color: color
        }
      },
      legend: {
        top: 'bottom',
        data: ${categoryNameJson},
        textStyle: {
          color: color
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: []
    };
    categoriesOption.series.push(
      categoryParentFlag ? 
      {
        nodeClick :false,
        name: '文章篇数',
        type: 'sunburst',
        radius: ['15%', '90%'],
        center: ['50%', '55%'],
        sort: 'desc',
        data: ${categoryArrParentJson},
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2,
          emphasis: {
            focus: 'ancestor',
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(255, 255, 255, 0.5)'
          }
        }
      }
      :
      {
        name: '文章篇数',
        type: 'pie',
        radius: [30, 80],
        roseType: 'area',
        label: {
          color: color,
          formatter: '{b} : {c} ({d}%)'
        },
        data: ${categoryArrJson},
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(255, 255, 255, 0.5)'
          }
        }
      }
    )
    categoriesChart.setOption(categoriesOption);
    window.addEventListener('resize', () => { 
      categoriesChart.resize();
    });
    categoriesChart.on('click', 'series', (event) => {
      if(event.data.path) window.location.href = '/' + event.data.path;
    });
  </script>`
}
 ```

### 4. 新建 `statistics.pug`

- `themes/anzhiyu/layout/includes/page.pug/statistics.pug`

``` PUG
#dongfang_charts
  - let charts_background = page.top_background
  .author-content.author-content-item.album.single(style=`${charts_background ? `background: url(${charts_background}) top / cover no-repeat;` : ""}`)
    .card-content
      .author-content-item-tips 文章统计
      span.author-content-item-title 这里是我的文章统计哦😯
      .content-bottom
        .tips 统计本博客文章数据
      .banner-button-group
            a.banner-button(onclick=`pjax.loadUrl("${url_for(album_detail_top_link ? album_detail_top_link : '/about')}")`, data-pjax-state)
              i.anzhiyufont.anzhiyu-icon-arrow-circle-right(style='font-size: 1.5rem')
              span.banner-button-text=album_detail_top_btn_text ? album_detail_top_btn_text : "关于我"
  #dongfang_charts
    #posts-chart(data-start="2022-06" style="border-radius: 8px; height: 300px; padding: 10px;margin: var(--album-spacing-xxl) 0 0;")
    #tags-chart(data-length="10" style="border-radius: 8px; height: 300px; padding: 10px;margin: var(--album-spacing-xxl) 0 0;")
    #categories-chart(data-parent="false" style="border-radius: 8px; height: 300px; padding: 10px;margin: var(--album-spacing-xxl) 0 0;")
  ```

### 5. 引入 `statistics.pug`

- `themes/anzhiyu/layout/page.pug/statistics.pug`

```
block content
  #page
    if top_img === false && !page.top_single
      h1.page-title= page.title
    case page.type
      when 'tags'
        include includes/page/tags.pug
      when 'link'
        include includes/page/flink.pug
      when 'categories'
        include includes/page/categories.pug
      when 'essay'
        include includes/page/essay.pug
      when 'room'
        include includes/page/room.pug
      when 'about'
        include includes/page/about.pug
      when 'album'
        include includes/page/album.pug
      when 'fcircle'
        include includes/page/fcircle.pug
      when 'album_detail'
        include includes/page/album_detail.pug
      when 'music'
        include includes/page/music.pug
+     when 'statistics.pug'
+       include includes/page/statistics.pug       
      default
        include includes/page/default-page.pug
```

### 6. 新建 `CSS` 样式

- `themes/anzhiyu/source/css/_page/statistics.styl`

``` STYL
body[data-type="statistics"]
  #page
    border: 0
    box-shadow: none !important
    padding: 0 !important
    background: 0 0 !important

  .page-title
    display: none
    
  #anzhiyu_charts
    margin: var(--album-spacing-xxl) 0 0

  .author-content.author-content-item,
  .banner-button-text
    color: var(--font-color) !important
  ``` 

### 7. 在主题的 `bottom` 处引入 JS

``` YML
     - <script src="https://lib.baomitu.com/echarts/4.9.0-rc.1/echarts.min.js"></script>
  ```

### 8. 这个时候如果你的配置没有错误 可以执行Hexo的三连命令来查看咯。

``` BASH
hexo clean; hexo g; hexo s
```
>预览如果遇到下图错误安装[Hexo 项目中缺少该模块cheerio](./#错误Hexo项目中缺少该模块cheerio)即可

![966378.webp](https://i1.wp.com/img.000.pe/i/2024/11/02/966378.webp)

</details>

### Hexo自适应切换渐进式加载首页图

<details>
<summary><code><strong>Hexo自适应切换渐进式加载首页图</strong></code></summary>

### Hexo自适应切换渐进式加载首页图：

### 1. 新建文件`themes/anzhiyu/source/js/imgloaded.js`新增以下内容，并按照注释调整照片路径

{% tabs 首页顶部渐进式加载 %}

<!-- tab 首页顶部渐进式加载 -->
``` JS
// 首页头图加载优化
/**
 * @description 实现medium的渐进加载背景的效果
 */
class ProgressiveLoad {
    constructor(smallSrc, largeSrc) {
      this.smallSrc = smallSrc;
      this.largeSrc = largeSrc;
      this.initTpl();
    }
  
    /**
     * @description 生成ui模板
     */
    initTpl() {
      this.container = document.createElement('div');
      this.smallStage = document.createElement('div');
      this.largeStage = document.createElement('div');
      this.smallImg = new Image();
      this.largeImg = new Image();
      this.container.className = 'pl-container';
      this.smallStage.className = 'pl-img pl-blur';
      this.largeStage.className = 'pl-img';
      this.container.appendChild(this.smallStage);
      this.container.appendChild(this.largeStage);
      this.smallImg.onload = this._onSmallLoaded.bind(this);
      this.largeImg.onload = this._onLargeLoaded.bind(this);
    }
  
    /**
     * @description 加载背景
     */
    progressiveLoad() {
      this.smallImg.src = this.smallSrc;
      this.largeImg.src = this.largeSrc;
    }
  
    /**
     * @description 大图加载完成
     */
    _onLargeLoaded() {
      this.largeStage.classList.add('pl-visible');
      this.largeStage.style.backgroundImage = `url('${this.largeSrc}')`;
    }
  
    /**
     * @description 小图加载完成
     */
    _onSmallLoaded() {
      this.smallStage.classList.add('pl-visible');
      this.smallStage.style.backgroundImage = `url('${this.smallSrc}')`;
    }
  }
  
  const executeLoad = (config, target) => {
    console.log('执行渐进背景替换');
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const loader = new ProgressiveLoad(
      isMobile ? config.mobileSmallSrc : config.smallSrc,
      isMobile ? config.mobileLargeSrc : config.largeSrc
    );
    // 和背景图颜色保持一致，防止高斯模糊后差异较大
    if (target.children[0]) {
      target.insertBefore(loader.container, target.children[0]);
    }
    loader.progressiveLoad();
  };
  
  const config = {
    smallSrc: '/img/xiaotu.jpg', // 小图链接 尽可能配置小于100k的图片
    largeSrc: '/img/tu.jpg', // 大图链接 最终显示的图片
    mobileSmallSrc: '/img/sjxt.jpg', // 手机端小图链接 尽可能配置小于100k的图片
    mobileLargeSrc: '/img/sjdt.jpg', // 手机端大图链接 最终显示的图片
    enableRoutes: ['/'],
    };

  function initProgressiveLoad(config) {
    const target = document.getElementById('page-header');
    if (target && target.classList.contains('full_page')) {
      executeLoad(config, target);
    }
  }
  
  function onPJAXComplete(config) {
    const target = document.getElementById('page-header');
    if (target && target.classList.contains('full_page')) {
      initProgressiveLoad(config);
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    initProgressiveLoad(config);
  });
  
  document.addEventListener("pjax:complete", function() {
    onPJAXComplete(config);
  });
``` 

<!-- endtab -->

<!-- tab 首页一图流渐进式加载 -->
``` JS
// 首页一图流加载优化
/**
 * @description 实现medium的渐进加载背景的效果
 */
(function() {
  class ProgressiveLoad {
    constructor(smallSrc, largeSrc) {
      this.smallSrc = smallSrc;
      this.largeSrc = largeSrc;
      this.initTpl();
      this.container.addEventListener('animationend', () => {
        this.smallStage.style.display = 'none'; 
      }, {once: true});
    }

    initTpl() {
      this.container = document.createElement('div');
      this.smallStage = document.createElement('div');
      this.largeStage = document.createElement('div');
      this.smallImg = new Image();
      this.largeImg = new Image();
      this.container.className = 'pl-container';
      this.smallStage.className = 'pl-img pl-blur';
      this.largeStage.className = 'pl-img';
      this.container.appendChild(this.smallStage);
      this.container.appendChild(this.largeStage);
      this.smallImg.onload = this._onSmallLoaded.bind(this);
      this.largeImg.onload = this._onLargeLoaded.bind(this);
    }

    progressiveLoad() {
      this.smallImg.src = this.smallSrc;
      this.largeImg.src = this.largeSrc;
    }

    _onLargeLoaded() {
      this.largeStage.classList.add('pl-visible');
      this.largeStage.style.backgroundImage = `url('${this.largeSrc}')`;
    }

    _onSmallLoaded() {
      this.smallStage.classList.add('pl-visible');
      this.smallStage.style.backgroundImage = `url('${this.smallSrc}')`;
    }
  }

  const executeLoad = (config, target) => {
    console.log('执行渐进背景替换');
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const loader = new ProgressiveLoad(
      isMobile ? config.mobileSmallSrc : config.smallSrc,
      isMobile ? config.mobileLargeSrc : config.largeSrc
    );
    if (target.children[0]) {
      target.insertBefore(loader.container, target.children[0]);
    }
    loader.progressiveLoad();
  };

  const ldconfig = {
    light: {
	  smallSrc: '/img/bg2_80kbver.jpg', //浅色模式 小图链接 尽可能配置小于100k的图片 
	  largeSrc: '/img/bg2.jpg', //浅色模式 大图链接 最终显示的图片
	  mobileSmallSrc: '/img/bg2_80kbver.jpg', //手机端浅色小图链接 尽可能配置小于100k的图片
	  mobileLargeSrc: '/img/bg2.jpg', //手机端浅色大图链接 最终显示的图片
	  enableRoutes: ['/'],
	  },
	dark: {
	  smallSrc: '/img/bg1_80kbver.jpg', //深色模式 小图链接 尽可能配置小于100k的图片 
	  largeSrc: '/img/bg1.jpg', //深色模式 大图链接 最终显示的图片
	  mobileSmallSrc: '/img/bg1_80kbver.jpg', //手机端深色模式小图链接 尽可能配置小于100k的图片
	  mobileLargeSrc: '/img/bg1.jpg', //手机端深色大图链接 最终显示的图片
	  enableRoutes: ['/'],
	  },
	};

    const getCurrentTheme = () => {
      return document.documentElement.getAttribute('data-theme'); 
    }

    const onThemeChange = () => {
      const currentTheme = getCurrentTheme();
      const config = ldconfig[currentTheme];
      initProgressiveLoad(config);
      document.addEventListener("DOMContentLoaded", function() {
        initProgressiveLoad(config);
      });
    
      document.addEventListener("pjax:complete", function() {
        onPJAXComplete(config);
      });
    }

    let initTheme = getCurrentTheme();
    let initConfig = ldconfig[initTheme];
    initProgressiveLoad(initConfig);

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === "data-theme" && location.pathname === '/') {
        onThemeChange();
      }
    });
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]  
  });

  function initProgressiveLoad(config) {
    const container = document.querySelector('.pl-container');
    if (container) {
      container.remove();
    }
    const target = document.getElementById('page-header');
    if (target && target.classList.contains('full_page')) {
      executeLoad(config, target);
    }
  }

  function onPJAXComplete(config) {
    const target = document.getElementById('page-header');
    if (target && target.classList.contains('full_page')) {
      initProgressiveLoad(config);
    }
  }

})();
```
<!-- endtab -->
{% endtabs %}

### 2. 新建文件 `themes/anzhiyu/source/css/imgloaded.css` 新增以下内容，并按照注释自行决定调整内容

{% tabs 首页顶部渐进式加载 %}

<!-- tab 首页顶部渐进式加载 -->
``` CSS
/* 首页头图加载 */  
.pl-container {  
  width: 100%;  
  height: 100%;  
  position: relative;  /* 一图流这里改fixed */  
  /* 一图流这里加z-index: -2; */ 
  overflow: hidden;  
  will-change: transform; /* 添加性能优化 */  
  /* blur-to-clear模糊动画2s */
  animation: blur-to-clear 2s cubic-bezier(.62,.21,.25,1) 0s 1 normal backwards running, scale 1.5s cubic-bezier(.62,.21,.25,1) 0s 1 both;  
}  
.pl-img {  
  width: 100%;  
  height: 100%;  
  position: absolute;  
  background-position: center;  
  background-size: cover;  
  background-repeat: no-repeat;  
  opacity: 0;  
  transition: opacity 1s;  
}  
  
@keyframes blur-to-clear {  
  0% {  
    filter: blur(50px);  
    opacity: 1;  
  }  
  100% {  
    filter: blur(0);  
    opacity: 1;  
  }  
}  
  
@keyframes scale {  
  0% {  
    transform: scale(1.5) translateZ(0);  
    opacity: 0;  
  }  
  to {  
    transform: scale(1) translateZ(0);  
    opacity: 1;  
  }  
}  
  
.pl-visible {  
  opacity: 1;  
}  
  
.pl-blur {  
  /* 小图锯齿多，增加高斯模糊 */  
  filter: blur(50px);  
}
``` 

<!-- endtab -->

<!-- tab 首页一图流渐进式加载 -->
``` CSS
/* 首页头图加载 */
.pl-container {
  width: 100%;
  height: 100%;
  z-index: -2;
  position: fixed;
  overflow: hidden;
  will-change: transform; /* 添加性能优化 */
  animation: blur-to-clear 2s cubic-bezier(.62,.21,.25,1) 0s 1 normal backwards running, scale 1.5s cubic-bezier(.62,.21,.25,1) 0s 1 both;
}
.pl-img {
  width: 100%;
  height: 100%;
  position: absolute;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 1s;
}

@keyframes blur-to-clear {
  0% {
    filter: blur(50px);
    opacity: 1;
  }
  100% {
    filter: blur(0);
    opacity: 1;
  }
}

@keyframes scale {
  0% {
    transform: scale(1.5) translateZ(0);
    opacity: 0;
  }
  to {
    transform: scale(1) translateZ(0);
    opacity: 1;
  }
}

.pl-visible {
  opacity: 1;
}

.pl-blur {
  /* 小图锯齿多，增加高斯模糊 */
  filter: blur(50px);
}
```
<!-- endtab -->
{% endtabs %}

### 3. 在 `_config.anzhiyu.yml` 主题配置文件下 `inject`配置项中 `head` 和 `bottom` 分别引入 `imgloaded.css`和 `imgloaded.js` 文件

``` YAML
inject:  
  head:  
    - <link rel="stylesheet" href="/css/imgloaded.css?1">  
  
  bottom:  
    - <script async data-pjax src="/js/imgloaded.js?1"></script> # 首页图片渐进式加载
```

### 4. 务必记得在主题配置文件中 `index_img` 开启顶部图的功能，也可以像我这样配置空链接。因为js文件已经接替了图片加载功能，此处不需要配置图片（当然你也可以配置上）

``` YAML
# The banner image of home page
index_img: "background: url('') top / cover no-repeat"
```

### 5. 修改以下示例的部分

{% tabs 首页顶部渐进式加载 %}

<!-- tab 首页顶部渐进式加载 -->
``` JS
const config = {  
  smallSrc: '/img/xiaotu.jpg', // 小图链接 尽可能配置小于100k的图片  
  largeSrc: '/img/tu.jpg', // 大图链接 最终显示的图片  
  mobileSmallSrc: '/img/sjxt.jpg', // 手机端小图链接 尽可能配置小于100k的图片  
  mobileLargeSrc: '/img/sjdt.jpg', // 手机端大图链接 最终显示的图片  
  enableRoutes: ['/'],  
  };
``` 

<!-- endtab -->

<!-- tab 首页一图流渐进式加载 -->
``` JS
const ldconfig = {
    light: {
	    smallSrc: '/img/bg2_80kbver.jpg', //浅色模式 小图链接 尽可能配置小于100k的图片 
	    largeSrc: '/img/bg2.jpg', //浅色模式 大图链接 最终显示的图片
	    mobileSmallSrc: '/img/bg2_80kbver.jpg', //手机端浅色小图链接 尽可能配置小于100k的图片
	    mobileLargeSrc: '/img/bg2.jpg', //手机端浅色大图链接 最终显示的图片
	    enableRoutes: ['/'],
	    },
    dark: {
	    smallSrc: '/img/bg1_80kbver.jpg', //深色模式 小图链接 尽可能配置小于100k的图片 
	    largeSrc: '/img/bg1.jpg', //深色模式 大图链接 最终显示的图片
	    mobileSmallSrc: '/img/bg1_80kbver.jpg', //手机端深色模式小图链接 尽可能配置小于100k的图片
	    mobileLargeSrc: '/img/bg1.jpg', //手机端深色大图链接 最终显示的图片
	    enableRoutes: ['/'],
	    },
	};
```
<!-- endtab -->
{% endtabs %}

### 6. 图片懒加载配置修改

``` YAML
lazyload:
  enable: true
  field: post # site/post
  placeholder:
  blur: true
  progressive: true
```

### 7. 这个时候，如果你的文件配置正确，可以执行Hexo的三连命令来查看效果了

``` BASH
hexo clean; hexo g; hexo s
```
</details>

### 快速添加友链教程

<details>
<summary><code><strong>快速添加友链</strong></code></summary>

1. 新建文件 `\source\js\kslink.js`，并写入如下代码：

``` JS
var leonus = {
    linkCom: e => {
        var t = document.querySelector(".el-textarea__inner");
        "bf" == e ? (t.value = "```yml\n", t.value += "- name: \n  link: \n  avatar: \n  descr: \n  siteshot: ", t.value += "\n```", t.setSelectionRange(15, 15)) : (t.value = "站点名称：\n站点地址：\n头像链接：\n站点描述：\n站点截图：", t.setSelectionRange(5, 5)), t.focus()
    },
    owoBig: () => {
        if (!document.getElementById("post-comment") || document.body.clientWidth < 768) return;
        let e = 1,
            t = "",
            o = document.createElement("div"),
            n = document.querySelector("body");
        o.id = "owo-big", n.appendChild(o), new MutationObserver((l => {
            for (let a = 0; a < l.length; a++) {
                let i = l[a].addedNodes,
                    s = "";
                if (2 == i.length && "OwO-body" == i[1].className) s = i[1];
                else {
                    if (1 != i.length || "tk-comment" != i[0].className) continue;
                    s = i[0]
                }
                s.onmouseover = l => {
                    e && ("OwO-body" == s.className && "IMG" == l.target.tagName || "tk-owo-emotion" == l.target.className) && (e = 0, t = setTimeout((() => {
                        let e = 3 * l.path[0].clientHeight,
                            t = 3 * l.path[0].clientWidth,
                            a = l.x - l.offsetX - (t - l.path[0].clientWidth) / 2,
                            i = l.y - l.offsetY;
                        a + t > n.clientWidth && (a -= a + t - n.clientWidth + 10), a < 0 && (a = 10), o.style.cssText = `display:flex; height:${e}px; width:${t}px; left:${a}px; top:${i}px;`, o.innerHTML = `<img src="${l.target.src}">`
                    }), 300))
                }, s.onmouseout = () => {
                    o.style.display = "none", e = 1, clearTimeout(t)
                }
            }
        })).observe(document.getElementById("post-comment"), {
            subtree: !0,
            childList: !0
        })
    },
};
```

2. 新建文件 `\source\css\kslink.css`，并写入如下代码，颜色可以换成你自己喜欢的：

``` CSS
/* 添加友链按钮 */
/* 快速填写格式 */
.addBtn {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.addBtn button {
    transition: .2s;
    display: flex;
    margin: 5px auto;
    color: var(--global-bg);
    padding: 15px;
    border-radius: 40px;
    background: var(--search-result-title);
    align-items: center;
}

button {
    padding: 0;
    outline: 0;
    border: none;
    background: 0 0;
    cursor: pointer;
    touch-action: manipulation;
}
.fa-solid, .fas {
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
}
.addBtn i {
    font-size: 1.3rem;
    margin-right: 10px;
}
.addBtn button:hover {
    background: var(--theme-color);
    color: #fff;
}

```

3. 在你的友链页面 `\source\link\index.md` 对应的md文件最后，引入以上两个文件以及定义按钮元素：

``` MARKDOWN
<div class="addBtn"><button onclick="leonus.linkCom()"><i class="fa-solid fa-circle-plus"></i>快速申请 (默认样式)</button> <button onclick="leonus.linkCom(&quot;bf&quot;)"><i class="fa-solid fa-circle-plus"></i>快速申请 (Butterfly)</button></div>
<link rel="stylesheet" href="/css/kslink.css">
<script src="/js/kslink.js"></script>
```

4. 然后一键三连本地看效果

``` BASH
hexo clean; hexo g; hexo s
```
<details>

### 添加侧边栏小人

<details>
<summary><code><strong>「添加侧边栏小人」</strong></code></summary>

1. 在 `themes/anzhiyu/layout/includes/widget` 创建文件 `card_anim.pug`

``` PUG
.card-widget.card-revolve
    .twopeople(style="margin: 0;align-items: center;justify-content: center;text-align: center; background: linear-gradient(to bottom, #D9A7C7, #FFFCDC);")
        .container(style="height: 50px; margin: 0; align-items: center; justify-content: center; text-align: center;")
            h2 学习的小白,欢迎互换
                a(href="你的网站链接/link/") 友链.
        canvas.illo(width="600" height="600" style="display: block;margin: 0 auto;cursor: move;max-width: 200px; max-height: 200px; touch-action: none; width: 480px; height: 480px;")

| <script src="https://npm.elemecdn.com/justlovesmile-static/js/twopeople1.js"></script>
| <script src="https://npm.elemecdn.com/justlovesmile-static/js/zdog.dist.js"></script>
| <script id="rendered-js" src="https://npm.elemecdn.com/justlovesmile-static/js/twopeople.js"></script>
```

2. 在 `themes/anzhiyu/layout/includes/widget/index.pug` 引入创建的 `card_anim.pug`

```
#aside-content.aside-content
  //- post
  if is_post()
    - const tocStyle = page.toc_style_simple
    - const tocStyleVal = tocStyle === true || tocStyle === false ? tocStyle : theme.toc.style_simple
    if showToc && tocStyleVal
      .sticky_layout
        include ./card_post_toc.pug
    else
      !=partial('includes/widget/card_author', {}, {cache: true})
+      !=partial('includes/widget/card_anim', {}, {cache: true})  
      !=partial('includes/widget/card_announcement', {}, {cache: true})
      !=partial('includes/widget/card_weixin', {}, {cache: true})
      !=partial('includes/widget/card_top_self', {}, {cache: true})
      .sticky_layout
        if showToc
          include ./card_post_toc.pug
        !=partial('includes/widget/card_recent_post', {}, {cache: true})
        !=partial('includes/widget/card_ad', {}, {cache: true})
  else
    //- page
    !=partial('includes/widget/card_author', {}, {cache: true})
+    !=partial('includes/widget/card_anim', {}, {cache: true}) 
    !=partial('includes/widget/card_announcement', {}, {cache: true})
    !=partial('includes/widget/card_weixin', {}, {cache: true})
```

3. 在 `themes\anzhiyu\source\css\_layout\aside.styl` 找到 `#aside-content` 在下面添加

``` STYL
if hexo-config('aside.enable')
  #aside-content
+    >.card-widget.card-revolve
+      text-align: left;
+      font-size: 12px;
+      margin-top: 20px;
+      padding: 0px 0px;
+      border-radius: 12px;
+      width: 100%;
+      background: linear-gradient(to bottom, #D9A7C7, #FFFCDC);
+      a
+        color: #f18ed4;text-decoration: none;
```

4. 配置正确的话然后一键三连本地看效果

``` BASH
hexo clean; hexo g; hexo s
```
</details>
