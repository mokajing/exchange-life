/**
 * 交换人生 - 微信小游戏入口
 * 沉浸式人生体验渲染引擎
 */

const TimelinePlayer = require('./js/timeline-player');

// 初始化Canvas
const canvas = wx.createCanvas();
const ctx = canvas.getContext('2d');
const { windowWidth, windowHeight } = wx.getSystemInfoSync();

// 加载张雪Timeline数据（实际项目中应从云函数或本地缓存加载）
const timelineData = require('./timelines/zhang-xue.json');

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
