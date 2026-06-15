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
  { id: 'zhang-xue',      label: '张雪：从流浪汉到CEO',     level: 'L1' },
  { id: 'wang-jibing',    label: '王计兵：外卖诗人',        level: 'L1' },
  { id: 'cai-yongbin',    label: '蔡勇斌：盲人程序员',      level: 'L1' },
  { id: 'emperor-delivery', label: '古代皇帝穿越当外卖骑手', level: 'L1' },
  { id: 'gaokao-100days',   label: '重返高三：距离高考100天', level: 'L1' },
  { id: 'danmu-world',      label: '活在弹幕世界',          level: 'L1' },
  { id: 'liu-xuelian',    label: '刘学莲：388分到双一流硕士', level: 'L1' },
  { id: 'miao-jie',       label: '苗姐：柔术单亲妈妈',      level: 'L1' },
  { id: 'xie-lin',        label: '谢琳：大漠独行女侠',      level: 'L2' },
  { id: 'zheng-jinxing',  label: '郑金行：一米一三的高大人生', level: 'L2' },
  { id: 'min-denghua',    label: '闵登华：脑瘫博士26年',    level: 'L2' },
  { id: 'zhang-guimei',   label: '张桂梅：山区女校长',      level: 'L2' },
  { id: 'lu-hong',        label: '陆鸿：残疾创业者',        level: 'L2' },
  { id: 'jin-xiaoyu',     label: '金晓宇：天才翻译家',      level: 'L2' },
  { id: 'song-yuansheng', label: '宋元生：煤矿到教授',      level: 'L2' },
  { id: 'xiao-yuting',    label: '肖玉婷：残臂农妇17年照护', level: 'L2' },
  { id: 'su-min',         label: '苏敏：56岁自驾出逃的母亲', level: 'L3' },
  { id: 'jiang-yanchen',  label: '姜彦辰：反向折叠人重获新生', level: 'L3' },
  { id: 'li-jia',         label: '李佳：乡村教师',          level: 'L1' },
  { id: 'haiyun-ayi',     label: '海云阿姨：家政女王',      level: 'L1' },
  { id: 'john-davidson',  label: 'John Davidson：跨国收养', level: 'L2' },
  { id: 'wu-shaoqing',    label: '吴少卿：海归返乡',        level: 'L1' },
  { id: 'pompeii-baker',      label: '庞贝末日：面包师的最后24小时', level: 'L2' },
  { id: 'antarctic-winter',   label: '南极越冬站：极夜90天',       level: 'L2' },
  { id: 'alien-office-worker',label: '外星人上班第一天',           level: 'L1' },
  { id: 'easter-island-speaker', label: '复活节岛最后的母语者',    level: 'L2' },
  { id: 'gaokao-30days',         label: '高三学生高考前最后30天',   level: 'L2' },
  { id: 'tokyo-fake-japanese',   label: '我在东京当了三年假日本人', level: 'L2' },
  { id: 'cao-xueqin-modern',     label: '如果曹雪芹生在当代',       level: 'L2' },
  { id: 'kyoto-wagashi-heir',    label: '京都百年老铺第四代传人',    level: 'L1' },
  { id: 'er-nurse-newyear',      label: '急诊科护士的跨年值班夜',   level: 'L2' },
  { id: 'sat-diver-rescue',      label: '深海饱和潜水员水下救援72h', level: 'L3' },
  { id: 'qin-no-burning-books',  label: '如果秦始皇没有焚书坑儒',     level: 'L1' },
  { id: 'bus-night-driver',      label: '公交车末班车司机的午夜归程',   level: 'L1' },
  { id: 'qing-palace-maid',      label: '清朝宫女出宫后的第一天',       level: 'L1' },
  { id: 'oil-rig-worker',        label: '海上石油钻井平台工人28天',     level: 'L2' },
  { id: 'lighthouse-keeper',     label: '灯塔守护人的最后一次值守',       level: 'L2' },
  { id: 'retired-cadre-day1',    label: '退休第一天的老干部',             level: 'L2' },
  { id: 'quanzhou-maritime-merchant', label: '如果明朝没有海禁',           level: 'L1' },
  { id: 'rain-memory-collector',      label: '雨水记忆师：收集最后一滴记忆之雨', level: 'L1' },
  { id: 'gender-swap-week',           label: '性别交换体验：程序员与美妆博主互换一周', level: 'L2' },
  { id: 'stutterer-interview',        label: '重度口吃者的求职面试', level: 'L3' },
  { id: 'no-fire-humanity',           label: '如果人类从未学会用火', level: 'L2' },
  { id: 'mali-gold-merchant',         label: '马里帝国黄金商队', level: 'L1' },
  { id: 'midlife-crisis-day1',        label: '中年危机的第一天：40岁生日被裁', level: 'L2' },
  { id: 'railway-crossing-keeper',    label: '铁路道口看守员的最后一班岗', level: 'L1' },
  { id: 'tang-huji-wine-shop',        label: '唐朝长安胡姬酒肆的当垆女', level: 'L1' },
  { id: 'dyslexia-exam-week',         label: '失读症大学生的期末考试周', level: 'L3' },
  { id: 'emotion-weather-forecaster', label: '情绪天气预报员的混乱第一天', level: 'L1' },
  { id: 'aymara-weaver',              label: '安第斯山脉艾马拉织布妇人的最后一代', level: 'L1' },
  { id: 'cip-patient-daily',          label: '无痛之境：先天性无痛症患者的日常', level: 'L3' },
  { id: 'mortuary-makeup-artist',     label: '殡仪馆化妆师：给逝者画上最后一张脸', level: 'L2' },
  { id: 'bianjing-night-market',      label: '宋朝汴京夜市摆摊指南：一个小摊贩的烟火人生', level: 'L1' }
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
      ctx.fillText(story.label, padding + 16, y + itemH / 2 + 6);

      // 等级标签
      ctx.textAlign = 'right';
      ctx.fillStyle = story.level === 'L1' ? '#4CAF50' : story.level === 'L2' ? '#FFC107' : '#FF5722';
      ctx.font = '12px "PingFang SC", sans-serif';
      ctx.fillText(story.level, canvas.width - padding - 16, y + itemH / 2 + 4);
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
        setTimeout(() => loadStory(TIMELINE_LIST[i].id), 200);
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
