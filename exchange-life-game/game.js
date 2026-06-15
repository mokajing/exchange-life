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
  'jiang-yanchen',  // L3/S/V2 - 反向折叠人重获新生
  'pompeii-baker',      // L2/S/V2 - 庞贝末日面包师 (P0脑洞)
  'antarctic-winter',   // L2/S/V2 - 南极越冬站极夜90天 (P0脑洞)
  'alien-office-worker',// L1/A/V2 - 外星人上班第一天 (P0脑洞)
  'easter-island-speaker', // L2/A/V2 - 复活节岛最后母语者 (P0脑洞)
  'gaokao-30days',          // L2/S/V2 - 高三学生高考前最后30天 (P0脑洞)
  'tokyo-fake-japanese',    // L2/S/V2 - 我在东京当了三年假日本人 (P0脑洞)
  'cao-xueqin-modern',      // L2/A/V2 - 如果曹雪芹生在当代 (P0第二卷)
  'kyoto-wagashi-heir',     // L1/A/V2 - 京都百年老铺第四代传人 (P0第3卷)
  'er-nurse-newyear',       // L2/S/V1 - 急诊科护士跨年值班夜 (P0第9卷)
  'sat-diver-rescue',       // L3/S/V1 - 深海饱和潜水员水下救援72h (P0第33卷)
  'qin-no-burning-books',   // L1/S/V2 - 如果秦始皇没有焚书坑儒 (P0第43卷)
  'bus-night-driver',          // L1/S/V2 - 公交车末班车司机的午夜归程 (P0第50卷)
  'qing-palace-maid',           // L1/S/V2 - 清朝宫女出宫后的第一天 (P0第87卷)
  'oil-rig-worker',              // L2/S/V1 - 海上石油钻井平台工人28天 (P0第85卷)
  'lighthouse-keeper',             // L2/S/V1 - 灯塔守护人的最后一次值守 (P0第90卷)
  'retired-cadre-day1',              // L2/S/V1 - 退休第一天的老干部 (P0第110卷)
  'quanzhou-maritime-merchant',        // L1/S/V2 - 如果明朝没有海禁 (P0第118卷)
  'rain-memory-collector'              // L1/S/V1 - 雨水记忆师 (P0第192轮)
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
