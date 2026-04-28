// ============================================================
// 时候 V2.1 增强模块
// 编码日期：2026-04-29
// 来源：《素问·至真要大论》《素问·六元正纪大论》
// ============================================================

const WuYunV21 = {

    // ══════════════════════════════════════════
    // 增强S：病机十九条引擎
    // ══════════════════════════════════════════
    
    bingJiPatterns: {
        // 五脏病机（5条）
        wind: {
            keyword: ['掉', '眩', '头晕', '眼花', '震颤', '抽搐', '动摇'],
            organ: '肝',
            element: '木',
            text: '诸风掉眩，皆属于肝',
            nature: '风',
            mechanism: '肝风内动，上扰清空'
        },
        cold: {
            keyword: ['寒', '收引', '拘急', '蜷缩', '冷痛', '畏寒', '屈伸不利'],
            organ: '肾',
            element: '水',
            text: '诸寒收引，皆属于肾',
            nature: '寒',
            mechanism: '肾阳不足，寒凝经脉'
        },
        qi: {
            keyword: ['气', '喘', '咳', '胸闷', '胀满', '痞塞', '呼吸不畅', '短气'],
            organ: '肺',
            element: '金',
            text: '诸气膹郁，皆属于肺',
            nature: '气逆',
            mechanism: '肺气上逆，清肃失司'
        },
        damp: {
            keyword: ['湿', '肿', '满', '胀', '沉重', '困倦', '浮肿', '水肿', '腹大'],
            organ: '脾',
            element: '土',
            text: '诸湿肿满，皆属于脾',
            nature: '湿',
            mechanism: '脾失健运，湿浊内停'
        },
        fire_heart: {
            keyword: ['痛', '痒', '疮', '疡', '痈', '痘', '疹', '疖', '红肿', '溃烂'],
            organ: '心',
            element: '火',
            text: '诸痛痒疮，皆属于心',
            nature: '火',
            mechanism: '心火亢盛，血热肉腐'
        },
        
        // 火病机（5条）
        fire_1: {
            keyword: ['热', '瞀', '瘈', '昏蒙', '神昏', '谵语', '发狂', '痉厥'],
            organ: '心/心包',
            element: '火',
            text: '诸热瞀瘈，皆属于火',
            nature: '火',
            mechanism: '火热内扰，神明错乱'
        },
        fire_2: {
            keyword: ['禁', '鼓慄', '寒战', '战栗', '牙关紧闭', '如丧神守', '神不守舍'],
            organ: '心',
            element: '火',
            text: '诸禁鼓慄，如丧神守，皆属于火',
            nature: '火',
            mechanism: '火郁于内，阳不外达'
        },
        fire_3: {
            keyword: ['逆', '冲上', '呕逆', '咳逆', '气逆', '上冲', '奔豚', '噫气'],
            organ: '肝/胃',
            element: '火',
            text: '诸逆冲上，皆属于火',
            nature: '火',
            mechanism: '肝火冲逆，气火上炎'
        },
        fire_4: {
            keyword: ['躁', '狂', '越', '烦躁', '狂躁', '登高而歌', '弃衣而走', '怒骂'],
            organ: '心',
            element: '火',
            text: '诸躁狂越，皆属于火',
            nature: '火',
            mechanism: '心火亢极，神无所主'
        },
        fire_5: {
            keyword: ['胕肿', '肿', '疼酸', '惊骇', '惊', '骇', '恐惧', '心悸'],
            organ: '心',
            element: '火',
            text: '诸病胕肿，疼酸惊骇，皆属于火',
            nature: '火',
            mechanism: '心火内炽，营血壅滞'
        },
        
        // 上下病机（2条）
        lower: {
            keyword: ['厥', '固泄', '便秘', '泄泻', '二便不利', '下利', '癃闭', '遗精', '滑泄'],
            organ: '肾/下焦',
            element: '水',
            text: '诸厥固泄，皆属于下',
            nature: '下焦',
            mechanism: '下焦虚寒或热结，二便失司'
        },
        upper: {
            keyword: ['痿', '喘', '呕', '呕吐', '喘息', '呼吸急促', '痿弱', '不用'],
            organ: '肺/上焦',
            element: '金',
            text: '诸痿喘呕，皆属于上',
            nature: '上焦',
            mechanism: '上焦不清，肺胃失和'
        },
        
        // 热病机（4条）
        heat_1: {
            keyword: ['胀', '腹大', '鼓胀', '腹胀', '腹水', '腹满'],
            organ: '脾/胃',
            element: '火',
            text: '诸胀腹大，皆属于热',
            nature: '热',
            mechanism: '湿热蕴结，气机壅滞'
        },
        heat_2: {
            keyword: ['有声', '鼓之如鼓', '肠鸣', '腹鸣', '漉漉有声', '腹胀响'],
            organ: '脾/胃',
            element: '火',
            text: '诸病有声，鼓之如鼓，皆属于热',
            nature: '热',
            mechanism: '热邪壅滞，气机奔迫'
        },
        heat_3: {
            keyword: ['转', '反戾', '水液浑浊', '小便黄', '尿赤', '浑浊', '转筋', '抽搐'],
            organ: '膀胱/小肠',
            element: '火',
            text: '诸转反戾，水液浑浊，皆属于热',
            nature: '热',
            mechanism: '热灼津液，筋脉失濡'
        },
        heat_4: {
            keyword: ['呕吐酸', '吐酸', '反酸', '嗳酸', '暴注', '下迫', '里急后重', '热痢'],
            organ: '胃/肠',
            element: '火',
            text: '诸呕吐酸，暴注下迫，皆属于热',
            nature: '热',
            mechanism: '胃热上逆，肠热下迫'
        },
        
        // 风寒湿病机（3条）
        damp_stiff: {
            keyword: ['痉', '项强', '强直', '角弓反张', '脖子硬', '颈项强痛'],
            organ: '脾',
            element: '土',
            text: '诸痉项强，皆属于湿',
            nature: '湿',
            mechanism: '湿阻经脉，筋脉拘急'
        },
        wind_stiff: {
            keyword: ['暴强直', '强直', '猝然僵硬', '突然僵硬', '角弓'],
            organ: '肝',
            element: '木',
            text: '诸暴强直，皆属于风',
            nature: '风',
            mechanism: '肝风暴急，筋脉挛缩'
        },
        cold_clear: {
            keyword: ['水液澄彻清冷', '小便清长', '痰稀白', '清稀', '澄澈', '清冷'],
            organ: '肾',
            element: '水',
            text: '诸病水液，澄彻清冷，皆属于寒',
            nature: '寒',
            mechanism: '阳虚不化，水寒内盛'
        }
    },

    /**
     * 病机分析引擎：输入症状描述，返回匹配的病机分析
     * @param {string} symptoms - 症状描述文本
     * @returns {Array} 匹配的病机条目，按匹配度排序
     */
    analyzeBingJi: function(symptoms) {
        if (!symptoms || typeof symptoms !== 'string') return [];
        
        const symptomText = symptoms.toLowerCase();
        const matches = [];
        
        for (const [key, pattern] of Object.entries(this.bingJiPatterns)) {
            let score = 0;
            let matchedKeywords = [];
            
            for (const keyword of pattern.keyword) {
                if (symptomText.includes(keyword.toLowerCase())) {
                    score += 1;
                    matchedKeywords.push(keyword);
                }
            }
            
            if (score > 0) {
                matches.push({
                    key: key,
                    text: pattern.text,
                    organ: pattern.organ,
                    element: pattern.element,
                    nature: pattern.nature,
                    mechanism: pattern.mechanism,
                    score: score,
                    matchedKeywords: matchedKeywords,
                    confidence: Math.min(score * 25, 100) // 简单置信度计算
                });
            }
        }
        
        // 按匹配度降序排列
        matches.sort((a, b) => b.score - a.score);
        
        return matches;
    },

    /**
     * 结合运气背景深化病机分析
     * @param {Array} bingJiResult - 基础病机分析结果
     * @param {Object} luckContext - 当前运气上下文 {yearPattern, currentQi, constitution}
     */
    deepAnalyzeWithLuck: function(bingJiResult, luckContext) {
        if (!bingJiResult || bingJiResult.length === 0) return [];
        
        const yearPattern = luckContext?.yearPattern;
        const currentQi = luckContext?.currentQi;
        
        return bingJiResult.map(match => {
            let luckFactor = '';
            let riskLevel = '平';
            
            // 年运与病机脏腑的生克关系
            if (yearPattern) {
                const yearElement = yearPattern.element;
                const matchElement = match.element;
                const shengKe = WuYunLiuQi.shengKe[yearElement];
                
                if (shengKe) {
                    if (shengKe.ke === matchElement) {
                        luckFactor = `本年${yearElement}运偏盛，正克${matchElement}（${match.organ}），病势易加重`;
                        riskLevel = '高';
                    } else if (shengKe.beiKe === matchElement) {
                        luckFactor = `本年${yearElement}运受${matchElement}反克，病势缠绵`;
                        riskLevel = '中';
                    } else if (shengKe.sheng === matchElement) {
                        luckFactor = `本年${yearElement}运生${matchElement}，得运之助，病易缓解`;
                        riskLevel = '低';
                    }
                }
            }
            
            // 当前客气与病机的呼应
            if (currentQi && currentQi.keQi) {
                const keQiOrgan = WuYunLiuQi.getOrganByQi(currentQi.keQi.name);
                if (keQiOrgan && match.organ.includes(keQiOrgan)) {
                    luckFactor += (luckFactor ? '；' : '') + 
                        `当前客气${currentQi.keQi.name}正临${keQiOrgan}，天时与病相合`;
                    if (riskLevel === '平') riskLevel = '中';
                }
            }
            
            return {
                ...match,
                luckFactor: luckFactor || '本年运气与此病无明显冲突',
                riskLevel: riskLevel
            };
        });
    },

    // ══════════════════════════════════════════
    // 增强T：五味补泻精确化
    // ══════════════════════════════════════════
    
    wuWeiBuXie: {
        '木': { organ: '肝', xie: '酸', bu: '辛', xieFood: ['醋', '乌梅', '山楂', '柠檬'], buFood: ['葱', '姜', '蒜', '花椒', '桂皮'] },
        '火': { organ: '心', xie: '甘', bu: '咸', xieFood: ['甘草', '大枣', '蜂蜜', '饴糖'], buFood: ['海带', '紫菜', '盐', '虾'] },
        '土': { organ: '脾', xie: '苦', bu: '甘', xieFood: ['苦瓜', '黄连', '栀子', '茶叶'], buFood: ['粳米', '小米', '山药', '甘草', '大枣'] },
        '金': { organ: '肺', xie: '辛', bu: '酸', xieFood: ['葱', '姜', '蒜', '花椒', '薄荷'], buFood: ['醋', '乌梅', '山楂', '五味子'] },
        '水': { organ: '肾', xie: '咸', bu: '苦', xieFood: ['盐', '海带', '紫菜', '虾'], buFood: ['苦瓜', '茶叶', '黄柏', '知母'] }
    },

    /**
     * 获取五味补泻建议
     * @param {string} element - 五行属性
     * @param {string} xuShi - '虚' 或 '实'
     */
    getWuWeiAdvice: function(element, xuShi) {
        const wx = this.wuWeiBuXie[element];
        if (!wx) return null;
        
        if (xuShi === '虚') {
            return {
                element: element,
                organ: wx.organ,
                condition: '虚',
                shouldUse: wx.bu,
                shouldUseFood: wx.buFood,
                shouldAvoid: wx.xie,
                shouldAvoidFood: wx.xieFood,
                principle: `${wx.organ}气虚，宜${wx.bu}味补之，忌${wx.xie}味泻之`,
                classic: `《至真要大论》：${element}位之主，其补以${wx.bu}，其泻以${wx.xie}`
            };
        } else {
            return {
                element: element,
                organ: wx.organ,
                condition: '实',
                shouldUse: wx.xie,
                shouldUseFood: wx.xieFood,
                shouldAvoid: wx.bu,
                shouldAvoidFood: wx.buFood,
                principle: `${wx.organ}气实，宜${wx.xie}味泻之，忌${wx.bu}味补之（补则助邪）`,
                classic: `《至真要大论》：${element}位之主，其泻以${wx.xie}，其补以${wx.bu}（实证忌补）`
            };
        }
    },

    /**
     * 结合年度体质给出五味建议
     */
    getConstitutionWuWei: function(constitution) {
        if (!constitution || !constitution.constitution) return [];
        
        const c = constitution.constitution;
        const element = WuYunLiuQi.organElements[c.strong];
        const weakElement = WuYunLiuQi.organElements[c.weak];
        
        const advices = [];
        
        // 本命脏腑的补泻
        const mainElement = WuYunLiuQi.organElements[c.organ];
        const mainType = constitution.wuYun.type === '太过' ? '实' : '虚';
        advices.push(this.getWuWeiAdvice(mainElement, mainType));
        
        // 弱脏的补法
        if (c.weak && weakElement) {
            advices.push(this.getWuWeiAdvice(weakElement, '虚'));
        }
        
        return advices.filter(a => a !== null);
    },

    // ══════════════════════════════════════════
    // 增强U：六气标本从化判定
    // ══════════════════════════════════════════
    
    biaoBenCongHua: {
        '厥阴风木': { cong: '中', from: '少阳相火', result: '风中有火', nature: '风火相煽' },
        '少阴君火': { cong: '本从标', from: '少阴君火/太阳寒水', result: '火+热', nature: '火热同气' },
        '太阴湿土': { cong: '本', from: '太阴湿土', result: '纯湿', nature: '湿浊独盛' },
        '少阳相火': { cong: '本', from: '少阳相火', result: '纯火', nature: '火热独盛' },
        '阳明燥金': { cong: '中', from: '太阴湿土', result: '燥中有湿', nature: '燥湿相兼' },
        '太阳寒水': { cong: '本从标', from: '太阳寒水/少阴君火', result: '寒+水', nature: '寒湿同气' }
    },

    /**
     * 获取六气标本从化分析
     * @param {string} qiName - 六气名称
     */
    getBiaoBenAnalysis: function(qiName) {
        const bb = this.biaoBenCongHua[qiName];
        if (!bb) return null;
        
        return {
            qiName: qiName,
            congHua: bb.cong,
            fromQi: bb.from,
            result: bb.result,
            nature: bb.nature,
            classic: bb.cong === '本' ? 
                `《六微旨大论》：${qiName}从本，其气纯一` :
                bb.cong === '本从标' ? 
                `《六微旨大论》：${qiName}从本从标，本标同气` :
                `《六微旨大论》：${qiName}从中，中气为化`
        };
    },

    /**
     * 标本从化对客主加临的影响分析
     */
    analyzeBiaoBenKeZhu: function(zhuQi, keQi) {
        const zhuBB = this.getBiaoBenAnalysis(zhuQi.name);
        const keBB = this.getBiaoBenAnalysis(keQi.name);
        
        if (!zhuBB || !keBB) return null;
        
        // 判断从化后的复合性质
        let compoundNature = '';
        let compoundRisk = '';
        
        // 如果主气或客气有从中化，其实际性质会变化
        const zhuRealNature = zhuBB.result;
        const keRealNature = keBB.result;
        
        // 复合分析
        if (zhuBB.cong === '中' || keBB.cong === '中') {
            compoundNature = `${zhuQi.name}(${zhuRealNature}) + ${keQi.name}(${keRealNature})`;
            compoundRisk = '从化使病机构成复杂，需辨标本主次';
        } else {
            compoundNature = `${zhuQi.name} + ${keQi.name}`;
            compoundRisk = '标本单纯，正邪分明';
        }
        
        return {
            zhuQi: zhuBB,
            keQi: keBB,
            compoundNature: compoundNature,
            compoundRisk: compoundRisk,
            clinicalNote: '标本从化分析提示：病机有表里深浅之别，治当辨标本缓急'
        };
    },

    // ══════════════════════════════════════════
    // 增强V：客主胜复病候细化（至真要大论）
    // ══════════════════════════════════════════
    
    keZhuShengFu: {
        // 厥阴司天
        '厥阴风木': {
            keSheng: { // 客气胜（风木之气偏胜）
                symptoms: ['耳鸣', '头晕', '目眩', '掉振', '寒热', '胁痛', '呕吐', '气郁', '瘈疭'],
                mechanism: '厥阴风木司天，客气风木胜，肝气上逆',
                organ: '肝/胃/脾'
            },
            zhuSheng: { // 主气胜（风木之气被制）
                symptoms: ['胸满', '咳逆', '嗌干', '头痛', '郁冒', '暴厥', '胸胁痛'],
                mechanism: '主气胜复，厥阴之郁得以发泄，但正气亦伤',
                organ: '肝/肺/心'
            }
        },
        // 少阴司天
        '少阴君火': {
            keSheng: {
                symptoms: ['胸中烦热', '嗌干', '右胠满', '皮肤痛', '寒热咳喘', '鼽嚏', '衄血', '疮疡'],
                mechanism: '少阴君火司天，客气火热胜，肺金受灼',
                organ: '心/肺'
            },
            zhuSheng: {
                symptoms: ['心热烦躁', '胁痛', '善呕', '咳喘', '鼻塞', '头痛', '面赤'],
                mechanism: '主气胜复，火热内郁，心胃不和',
                organ: '心/胃/肺'
            }
        },
        // 太阴司天
        '太阴湿土': {
            keSheng: {
                symptoms: ['头面浮肿', '呼吸气喘', '胸腹满', '甚则胁痛', '少气', '身重', '跗肿'],
                mechanism: '太阴湿土司天，客气湿胜，脾土壅滞',
                organ: '脾/肺/肾'
            },
            zhuSheng: {
                symptoms: ['胸中不利', '清涕出', '咳逆', '嗌干', '腰痛', '尻痛', '少腹痛'],
                mechanism: '主气胜复，湿郁化热，上焦不清',
                organ: '肺/脾/肾'
            }
        },
        // 少阳司天
        '少阳相火': {
            keSheng: {
                symptoms: ['丹疹', '丹熛', '疮疡', '咳逆', '喉痹', '头痛', '嗌肿', '耳聋', '血溢'],
                mechanism: '少阳相火司天，客气火胜，炎灼上焦',
                organ: '三焦/心/肺'
            },
            zhuSheng: {
                symptoms: ['心热烦躁', '胁痛', '目赤', '善呕', '咳喘', '衄血', '疮疡'],
                mechanism: '主气胜复，相火内郁，上扰心肺',
                organ: '心/肝/肺'
            }
        },
        // 阳明司天
        '阳明燥金': {
            keSheng: {
                symptoms: ['清发于中', '左胠胁痛', '咳逆', '嗌塞', '心膈满', '胸中不便', '咳喘'],
                mechanism: '阳明燥金司天，客气燥胜，肝木受刑',
                organ: '肺/肝/脾'
            },
            zhuSheng: {
                symptoms: ['咳逆', '嗌塞', '嗌干', '肩背痛', '头痛', '胁满', '嗌痛'],
                mechanism: '主气胜复，燥金偏盛，肺肝俱病',
                organ: '肺/肝/大肠'
            }
        },
        // 太阳司天
        '太阳寒水': {
            keSheng: {
                symptoms: ['喘咳', '胸中满', '仰息', '血泄', '鼽嚏', '善悲', '寒热', '嗌干', '善呕'],
                mechanism: '太阳寒水司天，客气寒胜，心火受抑',
                organ: '心/肺/肾'
            },
            zhuSheng: {
                symptoms: ['喉嗌中鸣', '喘咳', '胸满', '仰息', '尻阴股膝髀腨䯒足病'],
                mechanism: '主气胜复，寒水偏盛，下焦肾阳受困',
                organ: '肾/心/肺'
            }
        }
    },

    /**
     * 分析客主胜复病候
     * @param {string} siTianName - 司天名称
     * @param {string} type - 'keSheng'（客气胜）或 'zhuSheng'（主气胜）
     */
    getKeZhuShengFu: function(siTianName, type) {
        const data = this.keZhuShengFu[siTianName];
        if (!data) return null;
        
        const result = data[type];
        if (!result) return null;
        
        return {
            siTian: siTianName,
            type: type === 'keSheng' ? '客气胜（天时之邪偏盛）' : '主气胜（地气之复偏盛）',
            symptoms: result.symptoms,
            mechanism: result.mechanism,
            organ: result.organ,
            classic: `《至真要大论》：${siTianName}司天，${type === 'keSheng' ? '客胜' : '主胜'}则${result.symptoms.slice(0, 3).join('、')}...`
        };
    },

    /**
     * 综合客主胜复分析
     */
    analyzeKeZhuCompound: function(siTianName, keZhuRelation) {
        const keSheng = this.getKeZhuShengFu(siTianName, 'keSheng');
        const zhuSheng = this.getKeZhuShengFu(siTianName, 'zhuSheng');
        
        if (!keSheng || !zhuSheng) return null;
        
        let dominant = '';
        let advice = '';
        
        if (keZhuRelation && keZhuRelation.relation) {
            const relation = keZhuRelation.relation;
            if (relation.includes('客胜主')) {
                dominant = '客气偏盛，外邪为主';
                advice = '治当散客邪、护正气，防其深入';
            } else if (relation.includes('主胜客')) {
                dominant = '主气偏盛，正气抗邪有力';
                advice = '治当顺其势、助其复，但勿过伤正';
            } else if (relation.includes('同气')) {
                dominant = '客主同气，邪气亢盛';
                advice = '邪气叠加，病重势急，当急则治标';
            } else {
                dominant = '客主平和，正邪相持';
                advice = '缓则治本，调和阴阳';
            }
        }
        
        return {
            siTian: siTianName,
            keSheng: keSheng,
            zhuSheng: zhuSheng,
            dominant: dominant,
            advice: advice,
            clinicalNote: '客主胜复病候细化，提示病情深浅与转机所在'
        };
    },

    // ══════════════════════════════════════════
    // 增强W：六十甲子药食宜数据库（六元正纪大论）
    // ══════════════════════════════════════════
    
    sixtyJiaZi: {
        // 子午年（少阴君火司天，阳明燥金在泉）
        '甲子': { siTian: '少阴君火', zhongYun: '太宫土', zaiQuan: '阳明燥金', shang: '咸寒', zhong: '苦热', xia: '酸热' },
        '甲午': { siTian: '少阴君火', zhongYun: '太宫土', zaiQuan: '阳明燥金', shang: '咸寒', zhong: '苦热', xia: '酸热' },
        '丙子': { siTian: '少阴君火', zhongYun: '太羽水', zaiQuan: '阳明燥金', shang: '咸寒', zhong: '咸热', xia: '酸温' },
        '丙午': { siTian: '少阴君火', zhongYun: '太羽水', zaiQuan: '阳明燥金', shang: '咸寒', zhong: '咸热', xia: '酸温' },
        '戊子': { siTian: '少阴君火', zhongYun: '太徵火', zaiQuan: '阳明燥金', shang: '咸寒', zhong: '甘寒', xia: '酸温' },
        '戊午': { siTian: '少阴君火', zhongYun: '太徵火', zaiQuan: '阳明燥金', shang: '咸寒', zhong: '甘寒', xia: '酸温' },
        '庚子': { siTian: '少阴君火', zhongYun: '太商金', zaiQuan: '阳明燥金', shang: '咸寒', zhong: '辛凉', xia: '酸温' },
        '庚午': { siTian: '少阴君火', zhongYun: '太商金', zaiQuan: '阳明燥金', shang: '咸寒', zhong: '辛凉', xia: '酸温' },
        '壬子': { siTian: '少阴君火', zhongYun: '太角木', zaiQuan: '阳明燥金', shang: '咸寒', zhong: '酸凉', xia: '酸温' },
        '壬午': { siTian: '少阴君火', zhongYun: '太角木', zaiQuan: '阳明燥金', shang: '咸寒', zhong: '酸凉', xia: '酸温' },
        
        // 丑未年（太阴湿土司天，太阳寒水在泉）
        '乙丑': { siTian: '太阴湿土', zhongYun: '少商金', zaiQuan: '太阳寒水', shang: '苦热', zhong: '酸和', xia: '甘热' },
        '乙未': { siTian: '太阴湿土', zhongYun: '少商金', zaiQuan: '太阳寒水', shang: '苦热', zhong: '酸和', xia: '甘热' },
        '丁丑': { siTian: '太阴湿土', zhongYun: '少角木', zaiQuan: '太阳寒水', shang: '苦热', zhong: '辛温', xia: '甘热' },
        '丁未': { siTian: '太阴湿土', zhongYun: '少角木', zaiQuan: '太阳寒水', shang: '苦热', zhong: '辛温', xia: '甘热' },
        '己丑': { siTian: '太阴湿土', zhongYun: '少宫土', zaiQuan: '太阳寒水', shang: '苦热', zhong: '甘和', xia: '甘热' },
        '己未': { siTian: '太阴湿土', zhongYun: '少宫土', zaiQuan: '太阳寒水', shang: '苦热', zhong: '甘和', xia: '甘热' },
        '辛丑': { siTian: '太阴湿土', zhongYun: '少羽水', zaiQuan: '太阳寒水', shang: '苦热', zhong: '苦温', xia: '甘热' },
        '辛未': { siTian: '太阴湿土', zhongYun: '少羽水', zaiQuan: '太阳寒水', shang: '苦热', zhong: '苦温', xia: '甘热' },
        '癸丑': { siTian: '太阴湿土', zhongYun: '少徵火', zaiQuan: '太阳寒水', shang: '苦热', zhong: '咸温', xia: '甘热' },
        '癸未': { siTian: '太阴湿土', zhongYun: '少徵火', zaiQuan: '太阳寒水', shang: '苦热', zhong: '咸温', xia: '甘热' },
        
        // 寅申年（少阳相火司天，厥阴风木在泉）
        '丙寅': { siTian: '少阳相火', zhongYun: '太羽水', zaiQuan: '厥阴风木', shang: '咸寒', zhong: '咸温', xia: '辛凉' },
        '丙申': { siTian: '少阳相火', zhongYun: '太羽水', zaiQuan: '厥阴风木', shang: '咸寒', zhong: '咸温', xia: '辛凉' },
        '戊寅': { siTian: '少阳相火', zhongYun: '太徵火', zaiQuan: '厥阴风木', shang: '咸寒', zhong: '甘热', xia: '辛凉' },
        '戊申': { siTian: '少阳相火', zhongYun: '太徵火', zaiQuan: '厥阴风木', shang: '咸寒', zhong: '甘热', xia: '辛凉' },
        '庚寅': { siTian: '少阳相火', zhongYun: '太商金', zaiQuan: '厥阴风木', shang: '咸寒', zhong: '辛凉', xia: '辛凉' },
        '庚申': { siTian: '少阳相火', zhongYun: '太商金', zaiQuan: '厥阴风木', shang: '咸寒', zhong: '辛凉', xia: '辛凉' },
        '壬寅': { siTian: '少阳相火', zhongYun: '太角木', zaiQuan: '厥阴风木', shang: '咸寒', zhong: '酸凉', xia: '辛凉' },
        '壬申': { siTian: '少阳相火', zhongYun: '太角木', zaiQuan: '厥阴风木', shang: '咸寒', zhong: '酸凉', xia: '辛凉' },
        '甲寅': { siTian: '少阳相火', zhongYun: '太宫土', zaiQuan: '厥阴风木', shang: '咸寒', zhong: '苦热', xia: '辛凉' },
        '甲申': { siTian: '少阳相火', zhongYun: '太宫土', zaiQuan: '厥阴风木', shang: '咸寒', zhong: '苦热', xia: '辛凉' },
        
        // 卯酉年（阳明燥金司天，少阴君火在泉）
        '丁卯': { siTian: '阳明燥金', zhongYun: '少角木', zaiQuan: '少阴君火', shang: '苦小温', zhong: '辛和', xia: '咸寒' },
        '丁酉': { siTian: '阳明燥金', zhongYun: '少角木', zaiQuan: '少阴君火', shang: '苦小温', zhong: '辛和', xia: '咸寒' },
        '己卯': { siTian: '阳明燥金', zhongYun: '少宫土', zaiQuan: '少阴君火', shang: '苦小温', zhong: '甘和', xia: '咸寒' },
        '己酉': { siTian: '阳明燥金', zhongYun: '少宫土', zaiQuan: '少阴君火', shang: '苦小温', zhong: '甘和', xia: '咸寒' },
        '辛卯': { siTian: '阳明燥金', zhongYun: '少羽水', zaiQuan: '少阴君火', shang: '苦小温', zhong: '苦和', xia: '咸寒' },
        '辛酉': { siTian: '阳明燥金', zhongYun: '少羽水', zaiQuan: '少阴君火', shang: '苦小温', zhong: '苦和', xia: '咸寒' },
        '癸卯': { siTian: '阳明燥金', zhongYun: '少徵火', zaiQuan: '少阴君火', shang: '苦小温', zhong: '咸和', xia: '咸寒' },
        '癸酉': { siTian: '阳明燥金', zhongYun: '少徵火', zaiQuan: '少阴君火', shang: '苦小温', zhong: '咸和', xia: '咸寒' },
        '乙卯': { siTian: '阳明燥金', zhongYun: '少商金', zaiQuan: '少阴君火', shang: '苦小温', zhong: '酸和', xia: '咸寒' },
        '乙酉': { siTian: '阳明燥金', zhongYun: '少商金', zaiQuan: '少阴君火', shang: '苦小温', zhong: '酸和', xia: '咸寒' },
        
        // 辰戌年（太阳寒水司天，太阴湿土在泉）
        '丙辰': { siTian: '太阳寒水', zhongYun: '太羽水', zaiQuan: '太阴湿土', shang: '苦热', zhong: '咸温', xia: '甘热' },
        '丙戌': { siTian: '太阳寒水', zhongYun: '太羽水', zaiQuan: '太阴湿土', shang: '苦热', zhong: '咸温', xia: '甘热' },
        '戊辰': { siTian: '太阳寒水', zhongYun: '太徵火', zaiQuan: '太阴湿土', shang: '苦热', zhong: '甘温', xia: '甘热' },
        '戊戌': { siTian: '太阳寒水', zhongYun: '太徵火', zaiQuan: '太阴湿土', shang: '苦热', zhong: '甘温', xia: '甘热' },
        '庚辰': { siTian: '太阳寒水', zhongYun: '太商金', zaiQuan: '太阴湿土', shang: '苦热', zhong: '辛温', xia: '甘热' },
        '庚戌': { siTian: '太阳寒水', zhongYun: '太商金', zaiQuan: '太阴湿土', shang: '苦热', zhong: '辛温', xia: '甘热' },
        '壬辰': { siTian: '太阳寒水', zhongYun: '太角木', zaiQuan: '太阴湿土', shang: '苦热', zhong: '酸温', xia: '甘热' },
        '壬戌': { siTian: '太阳寒水', zhongYun: '太角木', zaiQuan: '太阴湿土', shang: '苦热', zhong: '酸温', xia: '甘热' },
        '甲辰': { siTian: '太阳寒水', zhongYun: '太宫土', zaiQuan: '太阴湿土', shang: '苦热', zhong: '苦温', xia: '甘热' },
        '甲戌': { siTian: '太阳寒水', zhongYun: '太宫土', zaiQuan: '太阴湿土', shang: '苦热', zhong: '苦温', xia: '甘热' },
        
        // 巳亥年（厥阴风木司天，少阳相火在泉）
        '丁巳': { siTian: '厥阴风木', zhongYun: '少角木', zaiQuan: '少阳相火', shang: '辛凉', zhong: '辛和', xia: '咸寒' },
        '丁亥': { siTian: '厥阴风木', zhongYun: '少角木', zaiQuan: '少阳相火', shang: '辛凉', zhong: '辛和', xia: '咸寒' },
        '己巳': { siTian: '厥阴风木', zhongYun: '少宫土', zaiQuan: '少阳相火', shang: '辛凉', zhong: '甘和', xia: '咸寒' },
        '己亥': { siTian: '厥阴风木', zhongYun: '少宫土', zaiQuan: '少阳相火', shang: '辛凉', zhong: '甘和', xia: '咸寒' },
        '辛巳': { siTian: '厥阴风木', zhongYun: '少羽水', zaiQuan: '少阳相火', shang: '辛凉', zhong: '苦和', xia: '咸寒' },
        '辛亥': { siTian: '厥阴风木', zhongYun: '少羽水', zaiQuan: '少阳相火', shang: '辛凉', zhong: '苦和', xia: '咸寒' },
        '癸巳': { siTian: '厥阴风木', zhongYun: '少徵火', zaiQuan: '少阳相火', shang: '辛凉', zhong: '咸和', xia: '咸寒' },
        '癸亥': { siTian: '厥阴风木', zhongYun: '少徵火', zaiQuan: '少阳相火', shang: '辛凉', zhong: '咸和', xia: '咸寒' },
        '乙巳': { siTian: '厥阴风木', zhongYun: '少商金', zaiQuan: '少阳相火', shang: '辛凉', zhong: '酸和', xia: '咸寒' },
        '乙亥': { siTian: '厥阴风木', zhongYun: '少商金', zaiQuan: '少阳相火', shang: '辛凉', zhong: '酸和', xia: '咸寒' }
    },

    /**
     * 获取六十甲子药食宜
     * @param {string} yearGanZhi - 干支年份，如'甲子'
     */
    getJiaZiTherapy: function(yearGanZhi) {
        const data = this.sixtyJiaZi[yearGanZhi];
        if (!data) return null;
        
        return {
            year: yearGanZhi,
            siTian: data.siTian,
            zhongYun: data.zhongYun,
            zaiQuan: data.zaiQuan,
            therapy: {
                shang: { taste: data.shang, target: '司天之气', level: '上治' },
                zhong: { taste: data.zhong, target: '中运之气', level: '中治' },
                xia: { taste: data.xia, target: '在泉之气', level: '下治' }
            },
            principle: `《六元正纪大论》：${yearGanZhi}年，${data.siTian}司天，${data.zhongYun}中运，${data.zaiQuan}在泉。上治${data.shang}，中治${data.zhong}，下治${data.xia}。`,
            note: '三层治味：上治司天客气，中治岁运，下治在泉。药食各取所宜。'
        };
    },

    // ══════════════════════════════════════════
    // 增强X：五运郁发预警
    // ══════════════════════════════════════════
    
    yuFa: {
        '木': {
            name: '木郁达之',
            trigger: '岁木不及，燥乃大行，生气失应，连续受克',
            warningSigns: ['耳鸣', '眩晕', '胁痛', '易怒', '关节拘急', '筋脉不利'],
            burstSymptoms: ['风邪暴发', '大风暴作', '草偃木零', '病见惊骇', '肢体震颤'],
            mechanism: '木气久郁，一旦暴发，肝风内动',
            advice: '郁发之前，宜疏肝理气，防其暴发；既发之后，宜平肝息风'
        },
        '火': {
            name: '火郁发之',
            trigger: '岁火不及，寒乃大行，长政不用，心阳受抑',
            warningSigns: ['心胸烦闷', '畏寒肢冷', '精神萎靡', '面色晦暗', '喜叹息'],
            burstSymptoms: ['炎暑流火', '埃郁大雨至', '寒热交作', '心痛暴瘖', '神志错乱'],
            mechanism: '火气久郁，一旦暴发，心火燎原',
            advice: '郁发之前，宜温通心阳，防其闭塞；既发之后，宜清泻心火'
        },
        '土': {
            name: '土郁夺之',
            trigger: '岁土不及，风乃大行，化气不令，脾土受克',
            warningSigns: ['腹胀', '便溏', '肌肉消瘦', '四肢无力', '面色萎黄'],
            burstSymptoms: ['山崩地陷', '土气暴发', '腹满如鼓', '吐泻交作', '肌肉瞤动'],
            mechanism: '土气久郁，一旦暴发，脾土壅滞',
            advice: '郁发之前，宜健脾燥湿，防其壅塞；既发之后，宜通泄夺之'
        },
        '金': {
            name: '金郁泄之',
            trigger: '岁金不及，炎火乃行，收气不行，肺金受克',
            warningSigns: ['皮肤干燥', '毛发枯槁', '呼吸短促', '声音低微', '易感冒'],
            burstSymptoms: ['冰雹霜雪', '寒雨暴至', '咳喘暴作', '皮毛焦枯', '鼻塞鼽衄'],
            mechanism: '金气久郁，一旦暴发，肺气上逆',
            advice: '郁发之前，宜润肺养阴，防其燥闭；既发之后，宜宣肺泄邪'
        },
        '水': {
            name: '水郁折之',
            trigger: '岁水不及，湿乃大行，藏气不政，肾水受克',
            warningSigns: ['腰膝酸软', '小便不利', '浮肿', '畏寒', '精神困顿'],
            burstSymptoms: ['大雨暴至', '洪水泛滥', '阴厥且格', '头脑户痛', '发热不止'],
            mechanism: '水气久郁，一旦暴发，肾水上逆',
            advice: '郁发之前，宜温肾化气，防其水停；既发之后，宜利水折之'
        }
    },

    /**
     * 五运郁发预警分析
     * @param {string} element - 五行
     * @param {Object} history - 往年运气历史（可选，用于判断郁发累积）
     */
    analyzeYuFa: function(element, history) {
        const yf = this.yuFa[element];
        if (!yf) return null;
        
        let riskLevel = '低';
        let isAccumulated = false;
        
        // 如果有历史数据，判断是否连续受克
        if (history && history.length >= 2) {
            const recentYears = history.slice(-3);
            let keCount = 0;
            for (const year of recentYears) {
                const sk = WuYunLiuQi.shengKe[year.element];
                if (sk && sk.ke === element) keCount++;
            }
            if (keCount >= 2) {
                riskLevel = '高';
                isAccumulated = true;
            } else if (keCount === 1) {
                riskLevel = '中';
            }
        }
        
        return {
            element: element,
            name: yf.name,
            trigger: yf.trigger,
            warningSigns: yf.warningSigns,
            burstSymptoms: yf.burstSymptoms,
            mechanism: yf.mechanism,
            advice: yf.advice,
            riskLevel: riskLevel,
            isAccumulated: isAccumulated,
            classic: `《六元正纪大论》：${yf.name}。郁极乃发，待时而作。`
        };
    },

    // ══════════════════════════════════════════
    // 增强Y：气至先后校正
    // ══════════════════════════════════════════
    
    qiZhiXianHou: {
        '太过': { 
            advance: '7-15天', 
            description: '太过之气先时至，未至而至',
            effect: '时令提前，人体未及适应，易感外邪',
            adjustment: '节气到来前一周即开始防护'
        },
        '不及': { 
            delay: '7-15天', 
            description: '不及之气后时至，至而不至',
            effect: '时令延后，人体期待已久而气不至，内生郁热',
            adjustment: '节气过后仍需延续防护，勿过早放松'
        },
        '平气': {
            onTime: '当时而至',
            description: '平气之年，气至如常',
            effect: '时令正应，人体易于适应',
            adjustment: '按常时防护即可'
        }
    },

    /**
     * 气至先后校正分析
     * @param {string} yearType - '太过'、'不及' 或 '平气'
     * @param {string} solarTerm - 当前节气名称
     */
    getQiZhiAdjustment: function(yearType, solarTerm) {
        const qz = this.qiZhiXianHou[yearType];
        if (!qz) return null;
        
        return {
            yearType: yearType,
            solarTerm: solarTerm,
            timing: qz.advance || qz.delay || qz.onTime,
            description: qz.description,
            effect: qz.effect,
            adjustment: qz.adjustment,
            clinicalNote: `《六元正纪大论》：${yearType}之年，气至${qz.advance ? '先' : qz.delay ? '后' : '当'}时。未至而至、至而不至，皆为逆气。`
        };
    },

    // ══════════════════════════════════════════
    // 增强Z：六气十二变症状索引
    // ══════════════════════════════════════════
    
    liuQiShiErBian: {
        '厥阴风木': {
            layers: [
                { name: '时化', symptoms: ['风气流行', '万物发荣', '和风舒畅'], level: '正常' },
                { name: '司化', symptoms: ['风邪偏盛', '掉眩', '拘急', '震颤'], level: '轻' },
                { name: '气化', symptoms: ['肝气上逆', '胁痛', '呕吐', '瘈疭', '耳鸣'], level: '中' },
                { name: '病之常', symptoms: ['风木太过', '卒中', '暴厥', '角弓反张', '神志昏蒙'], level: '重' }
            ]
        },
        '少阴君火': {
            layers: [
                { name: '时化', symptoms: ['热气流行', '万物蕃茂', '阳光普照'], level: '正常' },
                { name: '司化', symptoms: ['热邪偏盛', '身热', '口渴', '心烦'], level: '轻' },
                { name: '气化', symptoms: ['心火亢盛', '喘咳', '血溢', '疮疡', '嗌干'], level: '中' },
                { name: '病之常', symptoms: ['君火太过', '暴厥', '谵妄', '狂越', '血溢不止'], level: '重' }
            ]
        },
        '太阴湿土': {
            layers: [
                { name: '时化', symptoms: ['湿气流行', '万物化育', '雨泽丰沛'], level: '正常' },
                { name: '司化', symptoms: ['湿邪偏盛', '体重', '困倦', '胸闷'], level: '轻' },
                { name: '气化', symptoms: ['脾湿壅滞', '腹满', '泄泻', '水肿', '肌肉萎'], level: '中' },
                { name: '病之常', symptoms: ['湿土太过', '胀满', '癃闭', '饮邪泛滥', '四肢不举'], level: '重' }
            ]
        },
        '少阳相火': {
            layers: [
                { name: '时化', symptoms: ['暑气流行', '万物繁茂', '炎热当令'], level: '正常' },
                { name: '司化', symptoms: ['暑邪偏盛', '身热汗多', '口渴', '头晕'], level: '轻' },
                { name: '气化', symptoms: ['相火炎上', '咳逆', '喉痹', '耳聋', '血溢', '疮疡'], level: '中' },
                { name: '病之常', symptoms: ['相火太过', '暴热', '丹疹', '丹熛', '神昏痉厥'], level: '重' }
            ]
        },
        '阳明燥金': {
            layers: [
                { name: '时化', symptoms: ['燥气流行', '万物收敛', '清凉干燥'], level: '正常' },
                { name: '司化', symptoms: ['燥邪偏盛', '皮肤干燥', '咽干', '咳嗽'], level: '轻' },
                { name: '气化', symptoms: ['肺燥津伤', '喘咳', '胸痛', '便秘', '鼽衄'], level: '中' },
                { name: '病之常', symptoms: ['燥金太过', '暴厥', '胸胁暴痛', '喘息不续', '皮毛焦枯'], level: '重' }
            ]
        },
        '太阳寒水': {
            layers: [
                { name: '时化', symptoms: ['寒气流行', '万物闭藏', '凛冽肃杀'], level: '正常' },
                { name: '司化', symptoms: ['寒邪偏盛', '畏寒', '肢冷', '关节痛'], level: '轻' },
                { name: '气化', symptoms: ['肾寒水停', '腹大胫肿', '喘咳', '寝汗', '腰股痛'], level: '中' },
                { name: '病之常', symptoms: ['寒水太过', '阴厥', '谵妄', '心痛', '暴厥', '脉绝'], level: '重' }
            ]
        }
    },

    /**
     * 六气十二变症状索引
     * @param {string} qiName - 六气名称
     * @param {string} level - '正常'/'轻'/'中'/'重'，可选
     */
    getShiErBian: function(qiName, level) {
        const qi = this.liuQiShiErBian[qiName];
        if (!qi) return null;
        
        if (level) {
            const layer = qi.layers.find(l => l.level === level);
            return layer ? { qiName, ...layer } : null;
        }
        
        return {
            qiName: qiName,
            layers: qi.layers,
            clinicalNote: '六气十二变：时化→司化→气化→病之常，由浅入深四层递进'
        };
    },

    /**
     * 症状反查六气
     * @param {string} symptom - 症状关键词
     */
    findQiBySymptom: function(symptom) {
        const results = [];
        
        for (const [qiName, qi] of Object.entries(this.liuQiShiErBian)) {
            for (const layer of qi.layers) {
                if (layer.symptoms.some(s => s.includes(symptom))) {
                    results.push({
                        qiName: qiName,
                        layer: layer.name,
                        level: layer.level,
                        symptoms: layer.symptoms
                    });
                }
            }
        }
        
        return results;
    },

    // ══════════════════════════════════════════
    // 增强AA：灾宫方位提示
    // ══════════════════════════════════════════
    
    zaiGong: {
        // 正化/邪化对应灾宫（九宫方位）
        '厥阴': { zheng: '东南', xie: '西北', gong: 4, wuXing: '木' },
        '少阴': { zheng: '南', xie: '北', gong: 9, wuXing: '火' },
        '太阴': { zheng: '西南', xie: '东北', gong: 2, wuXing: '土' },
        '少阳': { zheng: '东', xie: '西', gong: 3, wuXing: '木' },
        '阳明': { zheng: '西', xie: '东', gong: 7, wuXing: '金' },
        '太阳': { zheng: '北', xie: '南', gong: 1, wuXing: '水' }
    },

    /**
     * 灾宫方位提示
     * @param {string} siTianPrefix - 司天前缀，如'厥阴'
     * @param {string} yearGanZhi - 干支年份
     */
    getZaiGong: function(siTianPrefix, yearGanZhi) {
        const zg = this.zaiGong[siTianPrefix];
        if (!zg) return null;
        
        // 判断正化/邪化：以年干阴阳定
        const gan = yearGanZhi.charAt(0);
        const yangGan = ['甲', '丙', '戊', '庚', '壬'];
        const isZheng = yangGan.includes(gan);
        
        return {
            siTian: siTianPrefix,
            year: yearGanZhi,
            hua: isZheng ? '正化' : '邪化',
            direction: isZheng ? zg.zheng : zg.xie,
            gong: zg.gong,
            wuXing: zg.wuXing,
            meaning: isZheng ? 
                `正化之年，气至平和，灾宫在${zg.zheng}（${zg.gong}宫），宜向此方调养` :
                `邪化之年，气至偏胜，灾宫在${zg.xie}（${zg.gong}宫），此方宜避之`,
            classic: `《六元正纪大论》：${siTianPrefix}司天，${isZheng ? '正' : '邪'}化度也，灾${zg.wuXing}宫。`
        };
    },

    // ══════════════════════════════════════════
    // V2.1 综合展示接口
    // ══════════════════════════════════════════
    
    /**
     * V2.1综合增强分析
     * 整合所有V2.1增强，返回完整分析结果
     */
    analyzeV21: function(yearGanZhi, constitution, currentQiInfo) {
        const result = {
            version: 'V2.1',
            modules: []
        };
        
        // 增强S：病机十九条（需要症状输入，此处预留接口）
        // 增强T：五味补泻
        const wuWei = this.getConstitutionWuWei(constitution);
        if (wuWei && wuWei.length > 0) {
            result.modules.push({
                code: 'T',
                name: '五味补泻精确化',
                data: wuWei
            });
        }
        
        // 增强U：标本从化
        if (currentQiInfo && currentQiInfo.keQi) {
            const biaoBen = this.analyzeBiaoBenKeZhu(
                currentQiInfo.zhuQi, 
                currentQiInfo.keQi
            );
            if (biaoBen) {
                result.modules.push({
                    code: 'U',
                    name: '六气标本从化',
                    data: biaoBen
                });
            }
        }
        
        // 增强V：客主胜复
        if (currentQiInfo && currentQiInfo.siTian) {
            const keZhuSF = this.analyzeKeZhuCompound(
                currentQiInfo.siTian,
                currentQiInfo.keZhuRelation
            );
            if (keZhuSF) {
                result.modules.push({
                    code: 'V',
                    name: '客主胜复病候',
                    data: keZhuSF
                });
            }
        }
        
        // 增强W：六十甲子药食宜
        const jiaZi = this.getJiaZiTherapy(yearGanZhi);
        if (jiaZi) {
            result.modules.push({
                code: 'W',
                name: '六十甲子药食宜',
                data: jiaZi
            });
        }
        
        // 增强X：五运郁发预警
        const constitutionElement = constitution?.constitution?.organ ? 
            WuYunLiuQi.organElements[constitution.constitution.organ] : null;
        if (constitutionElement) {
            const yuFa = this.analyzeYuFa(constitutionElement);
            if (yuFa) {
                result.modules.push({
                    code: 'X',
                    name: '五运郁发预警',
                    data: yuFa
                });
            }
        }
        
        // 增强Y：气至先后
        const yearType = constitution?.wuYun?.type;
        if (yearType) {
            const qiZhi = this.getQiZhiAdjustment(yearType, currentQiInfo?.solarTerm);
            if (qiZhi) {
                result.modules.push({
                    code: 'Y',
                    name: '气至先后校正',
                    data: qiZhi
                });
            }
        }
        
        // 增强Z：六气十二变
        if (currentQiInfo && currentQiInfo.zhuQi) {
            const shiErBian = this.getShiErBian(currentQiInfo.zhuQi.name);
            if (shiErBian) {
                result.modules.push({
                    code: 'Z',
                    name: '六气十二变',
                    data: shiErBian
                });
            }
        }
        
        // 增强AA：灾宫方位
        if (currentQiInfo && currentQiInfo.siTian) {
            const siTianPrefix = currentQiInfo.siTian.substring(0, 2);
            const zaiGong = this.getZaiGong(siTianPrefix, yearGanZhi);
            if (zaiGong) {
                result.modules.push({
                    code: 'AA',
                    name: '灾宫方位提示',
                    data: zaiGong
                });
            }
        }
        
        return result;
    }
};

// 导出模块（浏览器环境）
if (typeof window !== 'undefined') {
    window.WuYunV21 = WuYunV21;
}
