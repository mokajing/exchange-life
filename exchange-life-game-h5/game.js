/**
 * 交换人生 - H5版本入口
 * 使用标准Web API替代微信小游戏API
 */

// === wx API polyfill for H5 ===
const wx = {
  createCanvas: () => document.getElementById('gameCanvas'),
  getSystemInfoSync: () => ({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
  }),
  onTouchStart: (cb) => document.addEventListener('touchstart', (e) => cb(e), { passive: false }),
  onTouchMove: (cb) => document.addEventListener('touchmove', (e) => cb(e), { passive: false }),
  onTouchEnd: (cb) => document.addEventListener('touchend', (e) => cb(e), { passive: false }),
  createInnerAudioContext: () => {
    const audio = new Audio();
    return {
      src: '', volume: 1, loop: false,
      play: () => audio.play().catch(() => {}),
      stop: () => { audio.pause(); audio.currentTime = 0; },
      destroy: () => { audio.pause(); audio.src = ''; },
      set src(v) { audio.src = v; },
      set volume(v) { audio.volume = Math.max(0, Math.min(1, v)); },
      set loop(v) { audio.loop = v; },
      get volume() { return audio.volume; }
    };
  }
};

// Make wx globally available for shared modules
window.wx = wx;

// Load timeline data (H5 uses fetch instead of require)
async function init() {
  try {
    const response = await fetch('timelines/zhang-xue.json');
    const timelineData = await response.json();

    const canvas = document.getElementById('gameCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    // Handle resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      player.width = canvas.width;
      player.height = canvas.height;
    });

    // Create player (using global TimelinePlayer from script tag)
    const player = new TimelinePlayer({
      canvas,
      ctx,
      width: canvas.width,
      height: canvas.height,
      timeline: timelineData,
      onChoice: (eventId, choiceIndex) => {
        console.log(`用户选择: ${eventId} -> 选项${choiceIndex}`);
      },
      onComplete: () => {
        console.log('体验完成');
      }
    });

    // Touch events
    wx.onTouchStart((e) => player.onTouchStart(e));
    wx.onTouchMove((e) => player.onTouchMove(e));
    wx.onTouchEnd((e) => player.onTouchEnd(e));

    // Mouse fallback for desktop
    canvas.addEventListener('mousedown', (e) => {
      player.onTouchStart({ touches: [{ clientX: e.clientX, clientY: e.clientY }] });
    });
    canvas.addEventListener('mouseup', (e) => {
      player.onTouchEnd({ changedTouches: [{ clientX: e.clientX, clientY: e.clientY }] });
    });

    // Game loop
    let lastTime = Date.now();
    function gameLoop() {
      const now = Date.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      player.update(dt);
      player.render();

      requestAnimationFrame(gameLoop);
    }

    player.start();
    gameLoop();
  } catch (err) {
    console.error('初始化失败:', err);
    document.body.innerHTML = '<div style="color:#fff;padding:40px;font-size:18px;">加载失败，请确保通过HTTP服务器访问（非file://协议）</div>';
  }
}

init();
