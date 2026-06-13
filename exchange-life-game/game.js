/**
 * 交换人生 - 微信小游戏入口
 * 沉浸式人生体验渲染引擎
 */

const TimelinePlayer = require('./js/timeline-player');

// 初始化Canvas
const canvas = wx.createCanvas();
const ctx = canvas.getContext('2d');
const { windowWidth, windowHeight } = wx.getSystemInfoSync();

// Timeline故事列表（按安全等级排序，L1优先）
const TIMELINE_LIST = [
  'zhang-xue',      // L1/S/V1 - 从流浪汉到CEO
  'wang-jibing',    // L1/A/V2 - 外卖诗人
  'cai-yongbin',    // L1/A/V2 - 盲人程序员
  'emperor-delivery', // L1/A/V2 - 古代皇帝穿越当外卖骑手 (P0脑洞)
  'gaokao-100days',   // L1/A/V2 - 重返高三100天 (P0脑洞)
  'danmu-world',      // L1/A/V2 - 活在弹幕世界 (P0脑洞)
  'xie-lin',        // L2/A/V2 - 大漠独行女侠
  'zheng-jinxing',  // L2/A/V2 - 一米一三的高大人生
  'min-denghua',    // L2/S/V2 - 脑瘫博士
  'su-min',         // L3/S/V1 - 56岁自驾出逃的母亲
  'zhang-guimei',   // L2/S/V1 - 山区女校长
  'lu-hong',        // 陆鸿 - 残疾创业者
  'jin-xiaoyu',     // 金晓宇 - 天才翻译家
  'li-jia',         // 李佳 - 乡村教师
  'haiyun-ayi',     // 海云阿姨 - 家政女王
  'john-davidson',  // John Davidson - 跨国收养
  'wu-shaoqing',    // 吴少卿 - 海归返乡
  'song-yuansheng', // L2/S/V1 - 煤矿到教授
  'liu-xuelian',    // L1/A/V2 - 388分到双一流硕士
  'miao-jie',       // L1/S/V1 - 柔术单亲妈妈
  'xiao-yuting',    // L2/A/V2 - 残臂农妇17年照护
  'jiang-yanchen'   // L3/S/V2 - 反向折叠人重获新生
];

// 当前加载的故事索引（可通过云函数或本地存储动态配置）
const currentStoryIndex = 0;
const timelineData = require(`./timelines/${TIMELINE_LIST[currentStoryIndex]}.json`);

console.log(`[ExchangeLife] Loading story: ${TIMELINE_LIST[currentStoryIndex]} (${timelineData.meta.title})`);

// 创建播放器实例
const player = new TimelinePlayer({
  canvas,
  ctx,
  width: windowWidth,
  height: windowHeight,
  timeline: timelineData,
  onChoice: (eventId, choiceIndex) => {
    console.log(`用户选择: ${eventId} -> 选项${choiceIndex}`);
  },
  onComplete: () => {
    console.log('体验完成');
  }
});

// 触摸事件处理
wx.onTouchStart((e) => player.onTouchStart(e));
wx.onTouchMove((e) => player.onTouchMove(e));
wx.onTouchEnd((e) => player.onTouchEnd(e));

// 启动游戏循环
let lastTime = Date.now();
function gameLoop() {
  const now = Date.now();
  const dt = (now - lastTime) / 1000;
  lastTime = now;

  player.update(dt);
  player.render();

  requestAnimationFrame(gameLoop);
}

// 开始体验
player.start();
gameLoop();
