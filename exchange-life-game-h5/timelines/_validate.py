"""Validate timeline JSON files against the schema requirements."""
import json
import sys

VALID_SOURCE_TYPES = ['biography', 'documentary', 'news', 'social_media', 'ugc_submission', 'podcast']
VALID_TEMPLATES = ['hero_journey', 'daily_poetry', 'crossroads', 'flashback', 'single_turning_point']
VALID_CATEGORIES = ['growth', 'education', 'career', 'relationship', 'health', 'crisis', 'achievement', 'loss', 'travel', 'spiritual', 'daily_life', 'other']
VALID_EMOTIONS = ['joy', 'sadness', 'anger', 'fear', 'surprise', 'disgust', 'neutral', 'mixed']
VALID_TONES = ['warm', 'cool', 'dark', 'bright', 'neutral']
VALID_OVERALL_TONES = ['uplifting', 'melancholic', 'bittersweet', 'tense', 'serene', 'dramatic']
VALID_COMPLIANCE = ['L1', 'L2', 'L3', 'L4', 'L5']

def validate(filepath):
    errors = []
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Top-level required
    for field in ['meta', 'events', 'emotionalArc']:
        if field not in data:
            errors.append(f"root.{field} is required")
    if errors:
        return False, errors
    
    # Meta validation
    meta = data['meta']
    for field in ['id', 'title', 'sourceType', 'narrativeTemplate']:
        if field not in meta:
            errors.append(f"meta.{field} is required")
    if meta.get('sourceType') and meta['sourceType'] not in VALID_SOURCE_TYPES:
        errors.append(f"meta.sourceType '{meta['sourceType']}' invalid")
    if meta.get('narrativeTemplate') and meta['narrativeTemplate'] not in VALID_TEMPLATES:
        errors.append(f"meta.narrativeTemplate '{meta['narrativeTemplate']}' invalid")
    
    # Events validation
    events = data['events']
    if not isinstance(events, list):
        errors.append("events must be an array")
        return False, errors
    if len(events) < 3:
        errors.append(f"events needs at least 3 items, got {len(events)}")
    
    event_ids = set()
    key_node_count = 0
    for i, evt in enumerate(events):
        prefix = f"events[{i}]"
        for field in ['id', 'title', 'ageRange', 'category']:
            if field not in evt:
                errors.append(f"{prefix}.{field} is required")
        
        if evt.get('category') and evt['category'] not in VALID_CATEGORIES:
            errors.append(f"{prefix}.category '{evt['category']}' invalid")
        if evt.get('emotion') and evt['emotion'] not in VALID_EMOTIONS:
            errors.append(f"{prefix}.emotion '{evt['emotion']}' invalid")
        if evt.get('visualTone') and evt['visualTone'] not in VALID_TONES:
            errors.append(f"{prefix}.visualTone '{evt['visualTone']}' invalid")
        if evt.get('emotionIntensity') is not None:
            ei = evt['emotionIntensity']
            if not isinstance(ei, (int, float)) or ei < 0 or ei > 1:
                errors.append(f"{prefix}.emotionIntensity must be 0-1")
        if evt.get('ageRange'):
            ar = evt['ageRange']
            if 'start' not in ar:
                errors.append(f"{prefix}.ageRange.start is required")
            if 'end' in ar and ar['end'] < ar['start']:
                errors.append(f"{prefix}.ageRange.end < start")
        
        # Check narrativeText length
        nt = evt.get('narrativeText', '')
        if len(nt) < 100:
            errors.append(f"{prefix}.narrativeText too short ({len(nt)} chars, need >=100)")
        
        # Key node + interaction choice
        if evt.get('isKeyNode'):
            key_node_count += 1
            ic = evt.get('interactionChoice')
            if ic:
                if not ic.get('prompt'):
                    errors.append(f"{prefix}.interactionChoice.prompt required when isKeyNode=true")
                opts = ic.get('options', [])
                if len(opts) == 0:
                    errors.append(f"{prefix}.interactionChoice.options needs >=1 option")
                if len(opts) > 3:
                    errors.append(f"{prefix}.interactionChoice.options max 3")
                for j, opt in enumerate(opts):
                    if 'label' not in opt:
                        errors.append(f"{prefix}.interactionChoice.options[{j}].label required")
                    if 'response' not in opt:
                        errors.append(f"{prefix}.interactionChoice.options[{j}].response required")
        
        # ID uniqueness
        eid = evt.get('id')
        if eid:
            if eid in event_ids:
                errors.append(f"Duplicate event ID: {eid}")
            event_ids.add(eid)
    
    # Emotional arc
    arc = data['emotionalArc']
    if arc.get('overallTone') and arc['overallTone'] not in VALID_OVERALL_TONES:
        errors.append(f"emotionalArc.overallTone '{arc['overallTone']}' invalid")
    for ref_id in arc.get('peakMoments', []) + arc.get('valleyMoments', []):
        if ref_id not in event_ids:
            errors.append(f"emotionalArc references non-existent event ID: {ref_id}")
    
    # Safety info
    si = data.get('safetyInfo')
    if si:
        if si.get('complianceLevel') and si['complianceLevel'] not in VALID_COMPLIANCE:
            errors.append(f"safetyInfo.complianceLevel '{si['complianceLevel']}' invalid")
    
    valid = len(errors) == 0
    return valid, errors, len(events), key_node_count, meta.get('narrativeTemplate', '?'), si.get('complianceLevel', '?') if si else '?'

if __name__ == '__main__':
    files = sys.argv[1:]
    all_ok = True
    for fp in files:
        result = validate(fp)
        valid = result[0]
        errs = result[1]
        if valid:
            print(f"\u2705 Timeline\u6821\u9a8c\u901a\u8fc7: {fp}")
            print(f"   \u4e8b\u4ef6\u6570: {result[2]}")
            print(f"   \u5173\u952e\u8282\u70b9: {result[3]}")
            print(f"   \u53d9\u4e8b\u6a21\u677f: {result[4]}")
            print(f"   \u5b89\u5168\u7b49\u7ea7: {result[5]}")
        else:
            all_ok = False
            print(f"\u274c Timeline\u6821\u9a8c\u5931\u8d25 ({len(errs)}\u4e2a\u9519\u8bef): {fp}")
            for e in errs:
                print(f"   \u2022 {e}")
    sys.exit(0 if all_ok else 1)
