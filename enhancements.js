// ============================================================
// 时候 V2.0 增强模块
// 编码日期：2026-04-28
// 来源：《素问》五篇大论（五运行/气交变/天元纪/六微旨/五常政）
// ============================================================

const WuYunV2 = {
    
    // ──────────────────────────────────────────
    // 增强D/F：年度病候数据库（气交变大论）
    // ──────────────────────────────────────────
    yearDiseasePatterns: {
        // 太过
        '木太过': {
            name: '发生', climate: '风气流行', victim: '脾土', victimOrgan: '脾',
            symptoms: ['飧泄', '食减', '体重', '烦冤', '肠鸣', '腹支满'],
            severe: ['忽忽善怒', '眩冒巅疾'],
            fatalPulse: '冲阳绝',
            source: '岁木太过，风气流行，脾土受邪'
        },
        '火太过': {
            name: '赫曦', climate: '炎暑流行', victim: '金肺', victimOrgan: '肺',
            symptoms: ['疟', '少气咳喘', '血溢', '血泄注下', '嗌燥', '耳聋', '中热肩背热'],
            severe: ['胸中痛', '胁支满胁痛', '膺背肩胛间痛', '两臂内痛'],
            fatalPulse: '太渊绝',
            source: '岁火太过，炎暑流行，金肺受邪'
        },
        '土太过': {
            name: '敦阜', climate: '雨湿流行', victim: '肾水', victimOrgan: '肾',
            symptoms: ['腹痛', '清厥意不乐', '体重', '烦冤'],
            severe: ['肌肉萎', '足痿不收', '行善瘈', '四支不举'],
            fatalPulse: '太谿绝',
            source: '岁土太过，雨湿流行，肾水受邪'
        },
        '金太过': {
            name: '坚成', climate: '燥气流行', victim: '肝木', victimOrgan: '肝',
            symptoms: ['两胁下少腹痛', '目赤痛眦疡', '耳无所闻'],
            severe: ['喘咳逆气', '尻阴股膝髀腨䯒足皆病'],
            fatalPulse: '太冲绝',
            source: '岁金太过，燥气流行，肝木受邪'
        },
        '水太过': {
            name: '流衍', climate: '寒气流行', victim: '心火', victimOrgan: '心',
            symptoms: ['身热烦心', '躁悸', '阴厥上下中寒', '谵妄心痛'],
            severe: ['腹大胫肿', '喘咳', '寝汗出憎风'],
            fatalPulse: '神门绝',
            source: '岁水太过，寒气流行，邪害心火'
        },
        // 不及（含复气）
        '木不及': {
            name: '委和', climate: '燥乃大行', victim: '肝木', victimOrgan: '肝',
            symptoms: ['中清', '胠胁痛', '少腹痛', '肠鸣溏泄'],
            severe: ['寒热疮疡疿胗痈痤'],
            fatalPulse: '',
            fuQi: '炎暑流火，湿性燥',
            fuSymptoms: ['寒热疮疡', '疿胗痈痤'],
            source: '岁木不及，燥乃大行，生气失应'
        },
        '火不及': {
            name: '伏明', climate: '寒乃大行', victim: '心火', victimOrgan: '心',
            symptoms: ['胸中痛', '胁支满', '两胁痛', '膺背肩胛间及两臂内痛', '郁冒朦昧', '心痛暴瘖'],
            severe: ['屈不能伸', '髋髀如别'],
            fatalPulse: '',
            fuQi: '埃郁大雨至，黑气乃辱',
            fuSymptoms: ['溏腹满', '寒中肠鸣', '暴挛痿痹'],
            source: '岁火不及，寒乃大行，长政不用'
        },
        '土不及': {
            name: '卑监', climate: '风乃大行', victim: '脾土', victimOrgan: '脾',
            symptoms: ['飧泄霍乱', '体重腹痛', '筋骨繇复', '肌肉瞤酸'],
            severe: ['留满否塞', '飧泄'],
            fatalPulse: '',
            fuQi: '收政严峻，名木苍凋',
            fuSymptoms: ['胸胁暴痛', '善太息'],
            source: '岁土不及，风乃大行，化气不令'
        },
        '金不及': {
            name: '从革', climate: '炎火乃行', victim: '肺金', victimOrgan: '肺',
            symptoms: ['肩背瞀重', '鼽嚏血便注下'],
            severe: ['口疮', '心痛'],
            fatalPulse: '',
            fuQi: '寒雨暴至，冰雹霜雪',
            fuSymptoms: ['阴厥且格', '头脑户痛', '发热'],
            source: '岁金不及，炎火乃行，生气乃用'
        },
        '水不及': {
            name: '涸流', climate: '湿乃大行', victim: '肾水', victimOrgan: '肾',
            symptoms: ['腹满', '身重', '濡泄', '腰股痛发', '足痿', '清厥'],
            severe: ['跗肿', '癃閟'],
            fatalPulse: '',
            fuQi: '大风暴发，草偃木零',
            fuSymptoms: ['面色时变', '筋骨并辟', '目视䀮䀮'],
            source: '岁水不及，湿乃大行，藏气不政'
        }
    },

    // ──────────────────────────────────────────
    // 增强E：年度风险评估算法
    // ──────────────────────────────────────────
    analyzeYearRisk: function(yearPattern, constitution) {
        if (!yearPattern || !constitution) return { level: 'UNKNOWN', desc: '' };
        
        const victimOrgan = yearPattern.victimOrgan;
        const weakOrgan = constitution.weak;
        const strongOrgan = constitution.strong;
        const userOrgan = constitution.organ; // 先天本脏
        
        let level = 'MEDIUM';
        let desc = '';
        
        // 弱脏遇克 → 高危
        if (weakOrgan === victimOrgan) {
            level = 'HIGH';
            desc = `先天${weakOrgan}偏弱，今年${victimOrgan}受年运克伐，双重承压。`;
        }
        // 本脏遇克 → 中高危
        else if (userOrgan === victimOrgan) {
            level = 'HIGH';
            desc = `先天${userOrgan}为本脏，今年${victimOrgan}受年运克伐，本气受损。`;
        }
        // 强脏遇克 → 低危（能扛）
        else if (strongOrgan === victimOrgan) {
            level = 'LOW';
            desc = `先天${strongOrgan}偏旺，今年虽${victimOrgan}受克，你尚有抗衡之力。`;
        }
        // 中性
        else {
            level = 'MEDIUM';
            desc = `今年${victimOrgan}受年运克伐，你的${victimOrgan}既非最强也非最弱，常规注意即可。`;
        }
        
        return { level, desc, victimOrgan };
    },

    // ──────────────────────────────────────────
    // 增强I/L：特殊年份判定
    // ──────────────────────────────────────────
    tianFuMap: {
        '少阴君火': '火', '少阳相火': '火',
        '太阴湿土': '土',
        '阳明燥金': '金',
        '太阳寒水': '水',
        '厥阴风木': '木'
    },
    
    suiHuiMap: {
        '木': ['卯'], '火': ['午'],
        '土': ['辰','戌','丑','未'],
        '金': ['酉'], '水': ['子']
    },
    
    getYearSpecialStatus: function(yearGan, yearZhi) {
        const wuyun = WuYunLiuQi.calcWuYun(yearGan);
        const sitian = WuYunLiuQi.siTianMap[yearZhi];
        if (!wuyun || !sitian) return null;
        
        const wuyunElement = wuyun.element;
        const sitianElement = this.tianFuMap[sitian.qi];
        const isTianFu = wuyunElement === sitianElement;
        const isSuiHui = this.suiHuiMap[wuyunElement]?.includes(yearZhi);
        
        if (isSuiHui && isTianFu) {
            return { type: '太乙天符', level: 'CRITICAL', desc: '天地人三气叠加，气候最烈，病暴而死', color: 'critical' };
        }
        if (isTianFu) {
            return { type: '天符', level: 'HIGH', desc: '司天与中运同气，病速而危', color: 'high' };
        }
        if (isSuiHui) {
            return { type: '岁会', level: 'LOW', desc: '气之平也，反而平和', color: 'low' };
        }
        return null;
    },

    // ──────────────────────────────────────────
    // 增强M：亢害承制
    // ──────────────────────────────────────────
    chengZhiMap: {
        '木': { cheng: '金', chengOrgan: '肺', food: '百合、银耳、梨' },
        '火': { cheng: '水', chengOrgan: '肾', food: '黑豆、黑芝麻、核桃' },
        '土': { cheng: '木', chengOrgan: '肝', food: '枸杞、菠菜、山楂' },
        '金': { cheng: '火', chengOrgan: '心', food: '红枣、红豆、西红柿' },
        '水': { cheng: '土', chengOrgan: '脾', food: '山药、小米、南瓜' }
    },
    
    getChengZhiAdvice: function(yearElement) {
        const cz = this.chengZhiMap[yearElement];
        if (!cz) return null;
        return {
            text: `${yearElement}亢则${cz.cheng}承。健运${cz.chengOrgan}，助自然制衡之力。`,
            food: `宜食${cz.food}以实${cz.chengOrgan}气。`
        };
    },

    // ──────────────────────────────────────────
    // 增强O：司天下临病候
    // ──────────────────────────────────────────
    sitianXialin: {
        '少阳相火': {
            xialin: '火气', zang: '肺',
            symptoms: ['咳嚏', '鼽衄', '鼻窒', '寒热', '胕肿', '心痛', '胃脘痛'],
            desc: '火气下临，肺气上从，白起金用'
        },
        '阳明燥金': {
            xialin: '燥气', zang: '肝',
            symptoms: ['胁痛', '目赤', '掉振鼓慄', '筋痿', '不能久立', '暴热', '小便变'],
            desc: '燥气下临，肝气上从，苍起木用'
        },
        '太阳寒水': {
            xialin: '寒气', zang: '心',
            symptoms: ['心热烦', '嗌干', '善渴', '鼽嚏', '善悲', '数欠', '心痛'],
            desc: '寒气下临，心气上从，火且明'
        },
        '厥阴风木': {
            xialin: '风气', zang: '脾',
            symptoms: ['体重', '肌肉萎', '食减', '口爽', '目转', '耳鸣', '大热消烁'],
            desc: '风气下临，脾气上从，土且隆'
        },
        '少阴君火': {
            xialin: '热气', zang: '肺',
            symptoms: ['喘呕', '寒热', '嚏鼽衄', '鼻窒', '大暑流行', '疮疡燔灼'],
            desc: '热气下临，肺气上从，白起金用'
        },
        '太阴湿土': {
            xialin: '湿气', zang: '肾',
            symptoms: ['胸中不利', '阴痿', '气大衰', '腰脽痛', '心下否痛', '腹满浮肿'],
            desc: '湿气下临，肾气上从，黑起水变'
        }
    },

    // ──────────────────────────────────────────
    // 增强P：在泉治法谷味
    // ──────────────────────────────────────────
    zaiquanTherapy: {
        '少阳相火': { buSheng: '寒毒', zhiWei: ['苦', '酸'], guYi: ['苍', '丹'], color: '青、红' },
        '阳明燥金': { buSheng: '湿毒', zhiWei: ['辛', '苦', '甘'], guYi: ['丹', '素'], color: '红、白' },
        '太阳寒水': { buSheng: '热毒', zhiWei: ['淡', '咸'], guYi: ['黅', '秬'], color: '黄、黑' },
        '厥阴风木': { buSheng: '清毒', zhiWei: ['酸', '苦'], guYi: ['苍', '赤'], color: '青、红' },
        '少阴君火': { buSheng: '寒毒', zhiWei: ['辛', '苦', '甘'], guYi: ['白', '丹'], color: '白、红' },
        '太阴湿土': { buSheng: '燥毒', zhiWei: ['甘', '咸'], guYi: ['黅', '秬'], color: '黄、黑' }
    },

    getZaiquanDiet: function(zaiquanName) {
        const t = this.zaiquanTherapy[zaiquanName];
        if (!t) return null;
        return {
            zhiWei: t.zhiWei.join('、'),
            guYi: t.guYi.join(''),
            color: t.color,
            desc: `在泉为${zaiquanName}，${t.buSheng}不生。治以${t.zhiWei.join('、')}味，宜食${t.color}色谷物。`
        };
    }
};

// ============================================================
// Advice V2 增强建议生成器
// ============================================================

const AdviceV2 = {
    
    // 增强D：年度病候预警
    getYearDiseaseWarning: function(birthGZ, currentGZ) {
        const yearGan = currentGZ.year.gan;
        const wuyun = WuYunLiuQi.calcWuYun(yearGan);
        if (!wuyun) return null;
        
        const patternKey = wuyun.element + wuyun.type;
        const pattern = WuYunV2.yearDiseasePatterns[patternKey];
        if (!pattern) return null;
        
        // 先天体质
        const constitution = WuYunLiuQi.analyzeConstitution(birthGZ.year.gan);
        
        // 风险评估
        const risk = constitution ? WuYunV2.analyzeYearRisk(pattern, constitution.constitution) : null;
        
        let html = `<div style="margin-bottom:12px;">`;
        html += `<strong style="color:#8b4513;">${currentGZ.year.ganZhi}年 · ${pattern.name}之纪</strong><br>`;
        html += `<span class="tag">${wuyun.element}运${wuyun.type}</span>`;
        html += `<span class="tag">${pattern.climate}</span>`;
        
        // 特殊年份标记
        const special = WuYunV2.getYearSpecialStatus(yearGan, currentGZ.year.zhi);
        if (special) {
            const color = special.color === 'critical' ? '#c0392b' : special.color === 'high' ? '#e67e22' : '#27ae60';
            html += `<span class="tag" style="background:${color};color:#fff;">${special.type}</span>`;
        }
        
        html += `<br><br>`;
        html += `<strong>全年气候底色：</strong>${pattern.source}<br>`;
        html += `<strong>受邪脏腑：</strong>${pattern.victim}（${pattern.victimOrgan}）<br>`;
        html += `<strong>常见不适：</strong>${pattern.symptoms.join('、')}<br>`;
        
        if (pattern.severe.length > 0) {
            html += `<strong style="color:#c0392b;">加重信号：</strong>${pattern.severe.join('、')}<br>`;
        }
        
        if (risk) {
            const riskColor = risk.level === 'HIGH' ? '#c0392b' : risk.level === 'LOW' ? '#27ae60' : '#f39c12';
            html += `<br><strong style="color:${riskColor};">【你的体质层面】</strong><br>`;
            html += `${risk.desc}<br>`;
            if (constitution) {
                html += `先天偏弱：${constitution.constitution.weak} · 先天偏强：${constitution.constitution.strong}`;
            }
        }
        
        // 不及年复气
        if (pattern.fuQi) {
            html += `<br><br><strong>【复气预警】</strong><br>`;
            html += `本气不足，${pattern.fuQi}。可能出现：${pattern.fuSymptoms.join('、')}`;
        }
        
        // 亢害承制
        const chengZhi = WuYunV2.getChengZhiAdvice(wuyun.element);
        if (chengZhi) {
            html += `<br><br><strong>【制衡之道】</strong><br>`;
            html += `${chengZhi.text}<br>${chengZhi.food}`;
        }
        
        html += `</div>`;
        return html;
    },

    // 增强O：司天下临预警
    getSitianWarning: function(currentGZ) {
        const stzq = WuYunLiuQi.calcSiTianZaiQuan(currentGZ.year.zhi);
        if (!stzq) return null;
        
        const sitianName = stzq.siTian;
        const xl = WuYunV2.sitianXialin[sitianName];
        if (!xl) return null;
        
        let html = `<strong>司天：${sitianName}</strong><br>`;
        html += `${xl.desc}<br>`;
        html += `<strong>上半年群体病候：</strong>${xl.symptoms.join('、')}`;
        return html;
    },

    // 增强P：在泉饮食建议
    getZaiquanDietAdvice: function(currentGZ) {
        const stzq = WuYunLiuQi.calcSiTianZaiQuan(currentGZ.year.zhi);
        if (!stzq) return null;
        
        const zaiquanName = stzq.zaiQuan;
        const diet = WuYunV2.getZaiquanDiet(zaiquanName);
        if (!diet) return null;
        
        return diet.desc;
    },

    // 增强C：情志调摄
    getEmotionAdvice: function(constitution) {
        if (!constitution || !constitution.constitution) return [];
        
        const organ = constitution.constitution.organ;
        const emotionMap = {
            '肝': { taboo: '怒', overcome: '悲', method: '情绪低落时听哀伤音乐，以悲平肝火', source: '怒伤肝，悲胜怒' },
            '心': { taboo: '喜（过喜）', overcome: '恐', method: '得意时提醒自己乐极生悲，以恐制过喜', source: '喜伤心，恐胜喜' },
            '脾': { taboo: '思', overcome: '怒', method: '焦虑钻牛角尖时去运动、发泄怒气', source: '思伤脾，怒胜思' },
            '肺': { taboo: '忧', overcome: '喜', method: '情绪低落时看喜剧、找朋友聊天', source: '忧伤肺，喜胜忧' },
            '肾': { taboo: '恐', overcome: '思', method: '害怕时理性分析、写清单拆解', source: '恐伤肾，思胜恐' }
        };
        
        const e = emotionMap[organ];
        if (!e) return [];
        
        return [
            `<strong>${e.source}</strong>：先天${organ}为本脏。`,
            `禁忌：${e.taboo}。${e.method}`,
            `——《素问·阴阳应象大论》`
        ];
    }
};
