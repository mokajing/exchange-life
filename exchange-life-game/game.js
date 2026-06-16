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
  'rain-memory-collector',              // L1/S/V1 - 雨水记忆师 (P0第192轮)
  'gender-swap-week',                      // L2/S/V1 - 性别交换体验·程序员与美妆博主互换一周 (P0第135卷)
  'stutterer-interview',                       // L3/S/V1 - 重度口吃者的求职面试 (P0第140卷)
  'no-fire-humanity',                              // L2/A/V2 - 如果人类从未学会用火 (P0第143卷)
  'mali-gold-merchant',                               // L1/A/V2 - 马里帝国黄金商队 (P0第144卷)
  'midlife-crisis-day1',                                  // L2/S/V1 - 中年危机的第一天 (P0第142卷)
  'railway-crossing-keeper',                                // L1/S/V1 - 铁路道口看守员的最后一班岗 (P0第141卷)
  'tang-huji-wine-shop',                                        // L1/S/V1 - 唐朝长安胡姬酒肆的当垆女 (P0第147卷)
  'dyslexia-exam-week',                                          // L3/S/V2 - 失读症大学生的期末考试周 (P0第146卷)
  'emotion-weather-forecaster',                                     // L1/S/V1 - 情绪天气预报员的混乱第一天 (P0第151卷)
  'aymara-weaver',                                                     // L1/S/V1 - 安第斯山脉艾马拉织布妇人的最后一代 (P0第156卷)
  'cip-patient-daily',                                                      // L3/S/V2 - 先天性无痛症患者的日常 (P0第157卷)
  'mortuary-makeup-artist',                                                     // L2/S/V1 - 殡仪馆化妆师 (P0第154卷)
  'bianjing-night-market',                                                          // L1/S/V1 - 宋朝汴京夜市摆摊指南 (P0第162卷)
  'volcano-scientist',                                                                 // L2/S/V1 - 火山爆发前夜的监测站值守科学家 (P0第166卷)
  'encyclopedia-editor',                                                                  // L1/S/V1 - 没有互联网世界的纸质百科全书编辑 (P0第167卷)
  'urban-demolition-windfall',                                                                // L2/S/V2 - 城中村拆迁户的一夜暴富 (P0第197卷)
  'intangible-heritage-last-day',                                                                  // L2/S/V2 - 非遗传承人的最后一天 (P0第202卷)
  'dyslexia-programmer',                                                                              // L3/S/V2 - 阅读障碍程序员的代码人生 (P0第207卷)
  'miner-to-streamer',                                                                                   // L2/S/V2 - 从煤矿工人到直播带货主播 (P0第219卷)
  'underwater-archaeologist',                                                                                // L2/S/V2 - 文物水下考古队员的南海沉船发掘 (P0第225卷)
  'mock-funeral',                                                                                               // L3/S/V2 - 提前体验自己的追悼会 (P0第231卷)
  'qin-great-wall-guard',                                                                                        // L2/S/V2 - 秦朝修筑长城的戍卒家书 (P0第239卷)
  'shadow-roast-day1',                                                                                            // L2/S/V2 - 影子吐槽大会第一天 (P0第245卷)
  'convenience-store-newyear',                                                                                     // L1/S/V1 - 便利店除夕夜值班员 (P0第247卷)
  'truth-translator-day',                                                                                           // L2/S/V2 - 真相翻译官的一天 (P0第248卷)
  'irish-traveller-memory',                                                                                          // L2/S/V2 - 爱尔兰旅人家族的游牧记忆 (P0第253卷)
  'tourette-classroom',                                                                                               // L3/S/V2 - 抽动秽语综合征患者的课堂日常 (P0第254卷)
  'bullet-train-mechanic',                                                                                             // L2/S/V2 - 高铁机械师的凌晨四点 (P0第255卷)
  'wechat-exposure-day',                                                                                                // L2/S/V2 - 微信群聊社死现场实录 (P0第257卷)
  'inca-quipu-keeper',                                                                                                   // L2/S/V2 - 印加帝国奇普记事官的最后一天 (P0第260卷)
  'funeral-ceremony-host',                                                                                                // L2/S/V2 - 殡仪馆司仪的告别仪式 (P0第265卷)
  'earthquake-search-dog-handler',                                                                                       // L2/S/V2 - 地震搜救犬训导员的废墟72小时 (P0第272卷)
  'ocd-morning-ritual',                                                                                                   // L3/S/V2 - 强迫症患者的出门仪式 (P0第271卷)
  'selective-mutism-kindergarten',                                                                                        // L3/S/V2 - 选择性缄默症儿童的幼儿园日常 (P0第270卷)
  'parent-role-swap-week',                                                                                                // L2/S/V2 - 全职妈妈与职场爸爸互换角色的一周 (P0第336卷)
  'county-bride-rich-family',                                                                                              // L1/S/V2 - 从县城体制内家庭嫁入一线城市豪门的第一年 (P0第338卷)
  'mortician-hand-warmth'                                                                                                  // L2/S/V2 - 入殓师的手温 (P0第345卷),
  'war-photographer-viewfinder'                                                                                              // L2/S/V2 - 战地摄影师的取景框 (P0第351卷)
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
