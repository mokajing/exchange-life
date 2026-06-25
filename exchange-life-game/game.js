// game.js - 微信小游戏主入口文件（完整版，修复逗号bug并补录缺失条目）

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
  'bhutan-thangka-painter',
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
  'memory-beautifier-authenticator',
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

App({
  onLaunch() {
    console.log('交换人生游戏启动');
    
    // 初始化全局数据
    this.globalData = {
      currentTimeline: null,
      playerChoices: [],
      unlockedTimelines: ['adhd-woman-workplace-masking'], // 默认解锁第一个
      totalPlayTime: 0,
      achievementProgress: {}
    };
    
    // 从本地存储加载进度
    this.loadProgress();
  },
  
  loadProgress() {
    try {
      const savedData = wx.getStorageSync('gameProgress');
      if (savedData) {
        Object.assign(this.globalData, JSON.parse(savedData));
        console.log('游戏进度已加载');
      }
    } catch (e) {
      console.error('加载进度失败:', e);
    }
  },
  
  saveProgress() {
    try {
      wx.setStorageSync('gameProgress', JSON.stringify(this.globalData));
      console.log('游戏进度已保存');
    } catch (e) {
      console.error('保存进度失败:', e);
    }
  },
  
  unlockTimeline(timelineId) {
    if (!this.globalData.unlockedTimelines.includes(timelineId)) {
      this.globalData.unlockedTimelines.push(timelineId);
      this.saveProgress();
      
      // 触发解锁动画/提示
      wx.showToast({
        title: '新故事解锁！',
        icon: 'success',
        duration: 2000
      });
    }
  },
  
  globalData: null
});
