/**
 * 交换人生 - Timeline Schema 校验工具
 * 用于验证AI蒸馏引擎生成的人生时间线数据是否符合规范
 */

const fs = require('fs');
const path = require('path');

// 轻量级JSON Schema校验（不依赖外部库，适配微信小游戏环境）
class TimelineValidator {
  constructor() {
    this.errors = [];
  }

  validate(timeline) {
    this.errors = [];
    
    // 顶层必填字段
    this._requireFields(timeline, ['meta', 'events', 'emotionalArc'], 'root');
    
    if (this.errors.length > 0) return this._result();

    // meta校验
    this._validateMeta(timeline.meta);
    
    // events校验
    this._validateEvents(timeline.events);
    
    // emotionalArc校验
    this._validateEmotionalArc(timeline.emotionalArc, timeline.events);
    
    // safetyInfo校验（可选但推荐）
    if (timeline.safetyInfo) {
      this._validateSafetyInfo(timeline.safetyInfo);
    }

    return this._result();
  }

  _validateMeta(meta) {
    this._requireFields(meta, ['id', 'title', 'sourceType', 'narrativeTemplate'], 'meta');
    
    const validSourceTypes = ['biography', 'documentary', 'news', 'social_media', 'ugc_submission', 'podcast'];
    if (meta.sourceType && !validSourceTypes.includes(meta.sourceType)) {
      this.errors.push(`meta.sourceType "${meta.sourceType}" 不在允许范围内: ${validSourceTypes.join(', ')}`);
    }

    const validTemplates = ['hero_journey', 'daily_poetry', 'crossroads', 'flashback', 'single_turning_point'];
    if (meta.narrativeTemplate && !validTemplates.includes(meta.narrativeTemplate)) {
      this.errors.push(`meta.narrativeTemplate "${meta.narrativeTemplate}" 不在允许范围内: ${validTemplates.join(', ')}`);
    }
  }

  _validateEvents(events) {
    if (!Array.isArray(events)) {
      this.errors.push('events 必须是数组');
      return;
    }
    if (events.length < 3) {
      this.errors.push(`events 至少需要3个事件，当前仅${events.length}个`);
    }

    const validCategories = ['growth', 'education', 'career', 'relationship', 'health', 'crisis', 'achievement', 'loss', 'travel', 'spiritual', 'daily_life', 'other'];
    const validEmotions = ['joy', 'sadness', 'anger', 'fear', 'surprise', 'disgust', 'neutral', 'mixed'];
    const validTones = ['warm', 'cool', 'dark', 'bright', 'neutral'];

    events.forEach((event, idx) => {
      const prefix = `events[${idx}]`;
      this._requireFields(event, ['id', 'title', 'ageRange', 'category'], prefix);

      if (event.category && !validCategories.includes(event.category)) {
        this.errors.push(`${prefix}.category "${event.category}" 不在允许范围内`);
      }

      if (event.emotion && !validEmotions.includes(event.emotion)) {
        this.errors.push(`${prefix}.emotion "${event.emotion}" 不在允许范围内`);
      }

      if (event.emotionIntensity !== undefined) {
        if (typeof event.emotionIntensity !== 'number' || event.emotionIntensity < 0 || event.emotionIntensity > 1) {
          this.errors.push(`${prefix}.emotionIntensity 必须是0-1之间的数字`);
        }
      }

      if (event.visualTone && !validTones.includes(event.visualTone)) {
        this.errors.push(`${prefix}.visualTone "${event.visualTone}" 不在允许范围内`);
      }

      if (event.ageRange) {
        if (event.ageRange.start === undefined) {
          this.errors.push(`${prefix}.ageRange.start 是必填字段`);
        }
        if (event.ageRange.end !== undefined && event.ageRange.end < event.ageRange.start) {
          this.errors.push(`${prefix}.ageRange.end 不能小于 start`);
        }
      }

      // 交互选择点校验
      if (event.isKeyNode && event.interactionChoice) {
        if (!event.interactionChoice.prompt) {
          this.errors.push(`${prefix}.interactionChoice.prompt 是必填字段（isKeyNode=true时）`);
        }
        if (!event.interactionChoice.options || event.interactionChoice.options.length === 0) {
          this.errors.push(`${prefix}.interactionChoice.options 至少需要1个选项`);
        }
        if (event.interactionChoice.options && event.interactionChoice.options.length > 3) {
          this.errors.push(`${prefix}.interactionChoice.options 最多3个选项`);
        }
      }
    });

    // 检查事件ID唯一性
    const ids = events.map(e => e.id).filter(Boolean);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (duplicates.length > 0) {
      this.errors.push(`events中存在重复ID: ${[...new Set(duplicates)].join(', ')}`);
    }
  }

  _validateEmotionalArc(arc, events) {
    const validTones = ['uplifting', 'melancholic', 'bittersweet', 'tense', 'serene', 'dramatic'];
    if (arc.overallTone && !validTones.includes(arc.overallTone)) {
      this.errors.push(`emotionalArc.overallTone "${arc.overallTone}" 不在允许范围内`);
    }

    // 验证peakMoments/valleyMoments引用的事件ID存在
    const eventIds = new Set(events.map(e => e.id));
    [...(arc.peakMoments || []), ...(arc.valleyMoments || [])].forEach(refId => {
      if (!eventIds.has(refId)) {
        this.errors.push(`emotionalArc中引用了不存在的事件ID: ${refId}`);
      }
    });
  }

  _validateSafetyInfo(safety) {
    const validLevels = { complianceLevel: ['L1','L2','L3','L4','L5'], popularityLevel: ['S','A','B','C'], commercialValue: ['V1','V2','V3','V4'] };
    Object.entries(validLevels).forEach(([field, allowed]) => {
      if (safety[field] && !allowed.includes(safety[field])) {
        this.errors.push(`safetyInfo.${field} "${safety[field]}" 不在允许范围内: ${allowed.join(', ')}`);
      }
    });
  }

  _requireFields(obj, fields, prefix) {
    fields.forEach(f => {
      if (obj[f] === undefined || obj[f] === null) {
        this.errors.push(`${prefix}.${f} 是必填字段`);
      }
    });
  }

  _result() {
    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      errorCount: this.errors.length
    };
  }
}

// CLI模式：node validate-timeline.js <timeline.json>
if (require.main === module) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.log('Usage: node validate-timeline.js <timeline.json>');
    process.exit(1);
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const validator = new TimelineValidator();
    const result = validator.validate(data);

    if (result.valid) {
      console.log('✅ Timeline校验通过');
      console.log(`   事件数: ${data.events.length}`);
      console.log(`   关键节点: ${data.events.filter(e => e.isKeyNode).length}`);
      console.log(`   叙事模板: ${data.meta.narrativeTemplate}`);
      if (data.safetyInfo) {
        console.log(`   安全等级: ${data.safetyInfo.complianceLevel}/${data.safetyInfo.popularityLevel}/${data.safetyInfo.commercialValue}`);
      }
    } else {
      console.log(`❌ Timeline校验失败 (${result.errorCount}个错误):`);
      result.errors.forEach(e => console.log(`   • ${e}`));
      process.exit(1);
    }
  } catch (err) {
    console.error(`读取文件失败: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { TimelineValidator };
