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

// Timeline故事列表（按安全等级排序，L1优先）
const TIMELINE_LIST = [
  'adhd-woman-workplace-masking',
  'ai-life-score-daily',
  'air-crash-investigator',
  'aksum-obelisk-carver',
  'alarm-voice-critic-week',
  'alien-office-worker',
  'amazigh-tattoo-master',
  'antarctic-winter',
  'aphasia-daily-communication',
  'arctic-seed-vault-guardian',
  'autism-supermarket-shopping',
  'aymara-weaver',
  'bankrupt-heir-waiter',
  'benin-bronze-caster',
  'bianjing-night-market',
  'bomb-disposal-officer',
  'bullet-train-mechanic',
  'bus-night-driver',
  'cai-yongbin',
  'cainiao-station-clerk',
  'cao-xueqin-modern',
  'carthage-elephant-handler',
  'cat-perspective-day',
  'cip-patient-daily',
  'civil-servant-to-blogger',
  'colorblind-daily-vision',
  'community-group-leader-day',
  'convenience-store-newyear',
  'county-bride-rich-family',
  'danakil-sulfur-miner',
  'danmu-world',
  'detective-counselor-swap-week',
  'doctor-village-clinic-swap',
  'dorm-gender-swap-first-night',
  'dyslexia-exam-week',
  'dyslexia-programmer',
  'earthquake-search-dog-handler',
  'easter-island-speaker',
  'egyptian-scribe-nile-dawn',
  'emotion-weather-forecaster',
  'empathy-broker-feelmarket',
  'emperor-delivery',
  'encyclopedia-editor',
  'er-nurse-newyear',
  'execution-officer-last-day',
  'firefighter-obstetrician-swap',
  'fireworks-master-last-show',
  'first-peer-obituary',
  'funeral-ceremony-host',
  'gaokao-100days',
  'gaokao-30days',
  'gender-swap-week',
  'haiyun-ayi',
  'huli-wigman-coming-of-age',
  'iceland-volcano-monitor',
  'inca-quipu-keeper',
  'intangible-heritage-last-day',
  'irish-traveller-memory',
  'jiang-yanchen',
  'jin-xiaoyu',
  'john-davidson',
  'kyoto-wagashi-heir',
  'lanna-amulet-caster',
  'lawyer-legal-aid-swap',
  'left-behind-homecoming',
  'li-jia',
  'lighthouse-keeper',
  'linan-tea-shop-rainy-season',
  'liu-xuelian',
  'lu-hong',
  'mali-gold-merchant',
  'market-vendor-dawn',
  'maya-astronomer-priest',
  'mediocre-cultivator',
  'meghalaya-living-root-bridge',
  'memory-authenticator-first-month',
  'memory-freshman-first-month',
  'miao-jie',
  'midlife-crisis-day1',
  'migrant-to-driver-midlife',
  'min-denghua',
  'miner-to-streamer',
  'ming-forbidden-city-night-watchman',
  'ming-no-sea-ban',
  'mirror-parallel-life',
  'mock-funeral',
  'mongolian-gobi-nomad-storm',
  'mortician-hand-warmth',
  'motivation-awakener-first-month',
  'mursi-lip-plate-coming-of-age',
  'mycenaean-scribe-linear-b',
  'new-mom-3am-first-year',
  'no-fire-humanity',
  'ocd-morning-ritual',
  'oil-rig-worker',
  'oral-historian-last-day',
  'orbital-debris-cleaner',
  'parent-role-swap-week',
  'pompeii-baker',
  'ptsd-daily-life',
  'qin-great-wall-guard',
  'qin-no-burning-books',
  'qing-palace-maid',
  'quanzhou-maritime-merchant',
  'railway-crossing-keeper',
  'rain-memory-collector',
  'read-reply-credit-score',
  'retired-cadre-day1',
  'retired-cadre-first-day',
  'rural-postman-last-mile',
  'sad-reunion-anxiety',
  'sat-diver-rescue',
  'sauranthropus-industrial-revolution',
  'scrap-yard-sorting-philosophy',
  'search-history-documentary',
  'selective-mutism-kindergarten',
  'shadow-relation-mediator',
  'shadow-roast-day1',
  'sherpa-everest-guide',
  'shu-carpenter-wooden-ox',
  'smell-translator-first-month',
  'solo-chinese-new-year-eve',
  'song-yuansheng',
  'streamer-to-shopkeeper',
  'stutterer-interview',
  'su-min',
  'synesthesia-daily-senses',
  't1d-child-school-day',
  'tang-huji-wine-shop',
  'time-guardian-first-month',
  'tokyo-fake-japanese',
  'tomb-mural-restorer',
  'tourette-classroom',
  'truth-filter-day1',
  'truth-translator-day',
  'tuareg-salt-caravan',
  'underwater-archaeologist',
  'urban-demolition-windfall',
  'volcano-scientist',
  'wang-jibing',
  'war-photographer-viewfinder',
  'waste-sorter-supervisor',
  'wasteland-scavenger-music-box',
  'wechat-exposure-day',
  'wei-monk-sutra-copyist',
  'wu-shaoqing',
  'xiao-yuting',
  'xie-lin',
  'yuan-post-rider-blizzard',
  'zhang-guimei',
  'zhang-xue',
  'zheng-jinxing'
];

let player = null;

// Load timeline data (H5 uses fetch instead of require)
async function init() {
  try {
    // 显示故事选择界面
    showStorySelector();
  } catch (err) {
    console.error('初始化失败:', err);
    document.body.innerHTML = '<div style="color:#fff;padding:40px;font-size:18px;">加载失败，请确保通过HTTP服务器访问（非file://协议）</div>';
  }
}

function showStorySelector() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let selectedIndex = -1;
  const itemH = 50;
  const gap = 10;
  const padding = 30;
  const startY = 100;
  const maxVisible = Math.floor((canvas.height - startY - 60) / (itemH + gap));

  function renderSelector() {
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 标题
    ctx.textAlign = 'center';
    ctx.fillStyle = '#D4A574';
    ctx.font = 'bold 28px "PingFang SC", sans-serif';
    ctx.fillText('交换人生', canvas.width / 2, 50);
    ctx.fillStyle = '#888';
    ctx.font = '14px "PingFang SC", sans-serif';
    ctx.fillText('选择一个人生开始体验', canvas.width / 2, 78);

    // 故事列表
    TIMELINE_LIST.forEach((story, i) => {
      if (i >= maxVisible) return;
      const y = startY + i * (itemH + gap);
      const isSelected = i === selectedIndex;

      // 背景
      ctx.fillStyle = isSelected ? 'rgba(212,165,116,0.2)' : 'rgba(255,255,255,0.05)';
      ctx.beginPath();
      ctx.roundRect(padding, y, canvas.width - padding * 2, itemH, 8);
      ctx.fill();

      // 边框
      ctx.strokeStyle = isSelected ? '#D4A574' : 'rgba(255,255,255,0.1)';
      ctx.lineWidth = isSelected ? 2 : 1;
      ctx.stroke();

      // 文字
      ctx.textAlign = 'left';
      ctx.fillStyle = isSelected ? '#D4A574' : '#E0E0E0';
      ctx.font = `${isSelected ? 'bold ' : ''}16px "PingFang SC", sans-serif`;
      ctx.fillText(typeof story === 'string' ? story : story.label, padding + 16, y + itemH / 2 + 6);

      // 等级标签
      ctx.textAlign = 'right';
      var lvl = typeof story === 'string' ? 'L1' : story.level; ctx.fillStyle = lvl === 'L1' ? '#4CAF50' : lvl === 'L2' ? '#FFC107' : '#FF5722';
      ctx.font = '12px "PingFang SC", sans-serif';
      ctx.fillText(lvl, canvas.width - padding - 16, y + itemH / 2 + 4);
    });

    // 提示
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '12px "PingFang SC", sans-serif';
    ctx.fillText('点击选择 · 共' + TIMELINE_LIST.length + '个故事', canvas.width / 2, canvas.height - 20);
  }

  renderSelector();

  // 点击处理
  function handleSelect(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    for (let i = 0; i < Math.min(TIMELINE_LIST.length, maxVisible); i++) {
      const iy = startY + i * (itemH + gap);
      if (x >= padding && x <= canvas.width - padding && y >= iy && y <= iy + itemH) {
        selectedIndex = i;
        renderSelector();
        // 延迟后加载故事
        setTimeout(() => loadStory(typeof TIMELINE_LIST[i] === 'string' ? TIMELINE_LIST[i] : TIMELINE_LIST[i].id), 200);
        canvas.removeEventListener('click', handleSelect);
        canvas.removeEventListener('touchstart', handleTouchSelect);
        return;
      }
    }
  }

  function handleTouchSelect(e) {
    e.preventDefault();
    handleSelect(e);
  }

  canvas.addEventListener('click', handleSelect);
  canvas.addEventListener('touchstart', handleTouchSelect, { passive: false });
}

async function loadStory(storyId) {
  try {
    const response = await fetch('timelines/' + storyId + '.json');
    const timelineData = await response.json();

    const canvas = document.getElementById('gameCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    // Handle resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (player) {
        player.width = canvas.width;
        player.height = canvas.height;
      }
    });

    // Create player (using global TimelinePlayer from script tag)
    player = new TimelinePlayer({
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
      },
      onBackToMenu: () => {
        // 停止当前游戏循环
        player = null;
        // 移除所有事件监听器（通过替换canvas节点）
        const oldCanvas = document.getElementById('gameCanvas');
        const newCanvas = oldCanvas.cloneNode(true);
        oldCanvas.parentNode.replaceChild(newCanvas, oldCanvas);
        // 回到故事选择界面
        showStorySelector();
      }
    });

    // Touch events (H5 uses standard DOM events, not wx API)
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      player.onTouchStart(e);
    }, { passive: false });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      player.onTouchMove(e);
    }, { passive: false });
    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      player.onTouchEnd(e);
    }, { passive: false });

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
    console.error('加载故事失败:', err);
    alert('加载故事失败: ' + err.message);
    showStorySelector();
  }
}

init();
