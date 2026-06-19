// game.js - 微信小游戏主入口文件（完整版，修复逗号bug并补录缺失条目）

const TIMELINE_LIST = [
  'delivery-rider-first-day',
  'icu-nurse-night-shift',
  'elderly-memory-loss',
  'blind-date-awkwardness',
  'startup-founder-burnout',
  'retired-teacher-volunteer',
  'street-performer-dream',
  'single-parent-struggle',
  'exchange-student-culture-shock',
  'factory-worker-upgrade',
  'game-addict-recovery',
  'pet-owner-grief',
  'rural-teacher-devotion',
  'urban-migrant-homesick',
  'divorce-mediator-empathy',
  'autism-parent-journey',
  'homeless-person-dignity',
  'refugee-new-beginning',
  'prison-guard-dilemma',
  'funeral-director-compassion',
  'deaf-community-voice',
  'lgbtq-youth-acceptance',
  'addiction-counselor-burnout',
  'disaster-relief-volunteer',
  'chronic-pain-warrior',
  'foster-child-trust',
  'veteran-reintegration',
  'sex-worker-redemption',
  'cult-survivor-freedom',
  'human-trafficking-survivor',
  'mental-health-stigma',
  'poverty-cycle-breaker',
  'domestic-violence-survivor',
  'child-labor-rescue',
  'environmental-activist-sacrifice',
  'indigenous-culture-preservation',
  'war-correspondent-trauma',
  'hospice-caregiver-peace',
  'wrongful-conviction-hope',
  'organ-transplant-gratitude',
  'rare-disease-fighter',
  'caregiver-exhaustion',
  'bullying-victim-healing',
  'teen-pregnancy-choice',
  'aging-artist-legacy',
  'immigrant-language-barrier',
  'gig-economy-uncertainty',
  'climate-refugee-displacement',
  'digital-detox-awakening',
  'midlife-crisis-reinvention',
  'empty-nest-solitude',
  'career-change-courage',
  'long-distance-relationship-strain',
  'social-media-influencer-facade',
  'burnout-executive-reset',
  'retirement-purpose-search',
  'intergenerational-conflict',
  'cultural-identity-crisis',
  'workplace-discrimination',
  'neurodivergent-workplace',
  'grief-after-loss',
  'parenting-special-needs',
  'financial-ruin-rebuild',
  'religious-deconstruction',
  'political-dissident-exile',
  'whistleblower-consequences',
  'survivor-guilt-healing',
  'imposter-syndrome-overcome',
  'toxic-relationship-exit',
  'body-image-acceptance',
  'academic-pressure-collapse',
  'creative-block-breakthrough',
  'ethical-dilemma-integrity',
  'forgiveness-journey',
  'loneliness-connection',
  'ambition-vs-contentment',
  'tradition-vs-modernity',
  'technology-isolation',
  'nature-reconnection',
  'community-building',
  'mentorship-impact',
  'legacy-questioning',
  'resilience-after-failure',
  'joy-in-small-things',
  'gratitude-practice',
  'mindfulness-awakening',
  'self-worth-discovery',
  'boundary-setting',
  'vulnerability-strength',
  'authenticity-search',
  'purpose-finding',
  'healing-through-art',
  'service-to-others',
  'inner-child-reconciliation',
  'mortician-hand-warmth',
  'war-photographer-viewfinder',
  'mountain-guide-summit-trust',
  'colorblind-daily-vision',
  'sign-language-interpreter-silence',
  'night-market-vendor-dawn',
  'arctic-seed-vault-guardian',
  'migrant-to-driver-midlife',
  'synesthesia-daily-senses',
  'mongolian-gobi-nomad-storm',
  'search-history-documentary',
  'lanna-amulet-caster',
  'ai-life-score-daily',
  'shadow-relation-mediator',
  'adhd-woman-workplace-masking',
  'new-mom-3am-first-year',
  'mirror-parallel-life',
  'bomb-disposal-officer',
  'solo-chinese-new-year-eve',
  'read-reply-credit-score',
  'bankrupt-heir-waiter',
  'rural-postman-last-mile',
  'aksum-obelisk-carver',
  'streamer-to-shopkeeper',
  'air-crash-investigator',
  'detective-counselor-swap-week',
  'huli-wigman-coming-of-age',
  'retired-cadre-first-day',
  'tomb-mural-restorer',
  'cainiao-station-clerk',
  'maya-astronomer-priest',
  'shu-carpenter-wooden-ox',
  'mursi-lip-plate-coming-of-age',
  'smell-translator-first-month',
  { id: 'firefighter-obstetrician-swap', title: '男消防员与女产科医生互换身体的一周', file: 'timelines/firefighter-obstetrician-swap.json' },
  'benin-bronze-caster',
  'cat-perspective-day',
  'civil-servant-to-blogger',
  'iceland-volcano-monitor',
  'mediocre-cultivator',
  'scrap-yard-sorting-philosophy',
  'tuareg-salt-caravan',
  'wei-monk-sutra-copyist',
  'alarm-voice-critic-week',
  'ptsd-daily-life',
  'mycenaean-scribe-linear-b',
  'ming-forbidden-city-night-watchman',
  'community-group-leader-day',
  'amazigh-tattoo-master',
  'meghalaya-living-root-bridge',
  'sauranthropus-industrial-revolution',
  'market-vendor-dawn',
  'waste-sorter-supervisor',
  'orbital-debris-cleaner',
  'autism-supermarket-shopping',
  'motivation-awakener-first-month',
  't1d-child-school-day',
  'wasteland-scavenger-music-box',
  'time-guardian-first-month',
  'fireworks-master-last-show',
  'doctor-village-clinic-swap',
];

App({
  onLaunch() {
    console.log('交换人生游戏启动');
    
    // 初始化全局数据
    this.globalData = {
      currentTimeline: null,
      playerChoices: [],
      unlockedTimelines: ['delivery-rider-first-day'], // 默认解锁第一个
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
