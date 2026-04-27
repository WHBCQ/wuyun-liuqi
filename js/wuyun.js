/**
 * 五运六气核心计算
 */

const WuYunLiuQi = {
    wuYunMap: {
        '甲': { element: '土', type: '太过' },
        '己': { element: '土', type: '不及' },
        '乙': { element: '金', type: '不及' },
        '庚': { element: '金', type: '太过' },
        '丙': { element: '水', type: '太过' },
        '辛': { element: '水', type: '不及' },
        '丁': { element: '木', type: '不及' },
        '壬': { element: '木', type: '太过' },
        '戊': { element: '火', type: '太过' },
        '癸': { element: '火', type: '不及' }
    },
    
    siTianMap: {
        '子': { qi: '少阴君火', nature: '热' },
        '午': { qi: '少阴君火', nature: '热' },
        '丑': { qi: '太阴湿土', nature: '湿' },
        '未': { qi: '太阴湿土', nature: '湿' },
        '寅': { qi: '少阳相火', nature: '暑' },
        '申': { qi: '少阳相火', nature: '暑' },
        '卯': { qi: '阳明燥金', nature: '燥' },
        '酉': { qi: '阳明燥金', nature: '燥' },
        '辰': { qi: '太阳寒水', nature: '寒' },
        '戌': { qi: '太阳寒水', nature: '寒' },
        '巳': { qi: '厥阴风木', nature: '风' },
        '亥': { qi: '厥阴风木', nature: '风' }
    },
    
    zaiQuanMap: {
        '厥阴风木': '少阳相火',
        '少阴君火': '阳明燥金',
        '太阴湿土': '太阳寒水',
        '少阳相火': '厥阴风木',
        '阳明燥金': '少阴君火',
        '太阳寒水': '太阴湿土'
    },
    
    zhuQi: [
        { step: 1, name: '厥阴风木', nature: '风', organ: '肝' },
        { step: 2, name: '少阴君火', nature: '热', organ: '心' },
        { step: 3, name: '少阳相火', nature: '暑', organ: '三焦' },
        { step: 4, name: '太阴湿土', nature: '湿', organ: '脾' },
        { step: 5, name: '阳明燥金', nature: '燥', organ: '肺' },
        { step: 6, name: '太阳寒水', nature: '寒', organ: '肾' }
    ],
    
    keQiOrder: ['厥阴风木', '少阴君火', '太阴湿土', '少阳相火', '阳明燥金', '太阳寒水'],
    
    organElements: {
        '肝': '木', '胆': '木',
        '心': '火', '小肠': '火',
        '脾': '土', '胃': '土',
        '肺': '金', '大肠': '金',
        '肾': '水', '膀胱': '水',
        '三焦': '火'
    },
    
    shengKe: {
        '木': { sheng: '火', ke: '土', beiKe: '金' },
        '火': { sheng: '土', ke: '金', beiKe: '水' },
        '土': { sheng: '金', ke: '水', beiKe: '木' },
        '金': { sheng: '水', ke: '木', beiKe: '火' },
        '水': { sheng: '木', ke: '火', beiKe: '土' }
    },
    
    calcWuYun: function(gan) {
        return this.wuYunMap[gan] || null;
    },
    
    calcSiTianZaiQuan: function(zhi) {
        const siTian = this.siTianMap[zhi];
        if (!siTian) return null;
        
        const zaiQuan = this.zaiQuanMap[siTian.qi];
        return {
            siTian: siTian.qi,
            siTianNature: siTian.nature,
            zaiQuan: zaiQuan,
            zaiQuanNature: this.getQiNature(zaiQuan)
        };
    },
    
    getQiNature: function(qiName) {
        const map = {
            '厥阴风木': '风',
            '少阴君火': '热',
            '太阴湿土': '湿',
            '少阳相火': '暑',
            '阳明燥金': '燥',
            '太阳寒水': '寒'
        };
        return map[qiName] || '';
    },
    
    calcKeQi: function(siTianName) {
        const order = this.keQiOrder;
        const siTianIndex = order.indexOf(siTianName);
        if (siTianIndex === -1) return null;
        
        const keQi = [];
        for (let i = 0; i < 6; i++) {
            const idx = (siTianIndex - 2 + i + 6) % 6;
            keQi.push({
                step: i + 1,
                name: order[idx],
                nature: this.getQiNature(order[idx])
            });
        }
        
        return keQi;
    },
    
    getCurrentQi: function(solarTermIndex, siTianName) {
        const qiStep = Math.floor(solarTermIndex / 4) + 1;
        const zhuQi = this.zhuQi[qiStep - 1];
        
        const keQiList = this.calcKeQi(siTianName);
        const keQi = keQiList ? keQiList[qiStep - 1] : null;
        
        return {
            step: qiStep,
            zhuQi: zhuQi,
            keQi: keQi
        };
    },
    
    analyzeKeZhu: function(zhuQi, keQi) {
        if (!zhuQi || !keQi) return null;
        
        const zhuElement = this.organElements[zhuQi.organ];
        const keElement = this.organElements[this.getOrganByQi(keQi.name)];
        
        let relation = '平气';
        let tendency = '平和';
        
        if (zhuQi.nature === keQi.nature) {
            relation = '同气';
            tendency = zhuQi.nature === '风' || zhuQi.nature === '暑' || zhuQi.nature === '热' ? '偏热' : 
                       zhuQi.nature === '寒' ? '偏寒' : '偏湿';
        } else {
            const sk = this.shengKe[zhuElement];
            if (sk) {
                if (sk.ke === keElement) {
                    relation = '主胜客（逆）';
                    tendency = '气机内郁';
                } else if (sk.beiKe === keElement) {
                    relation = '客胜主（顺）';
                    tendency = '外邪易入';
                } else if (sk.sheng === keElement) {
                    relation = '主生客';
                    tendency = '正气外散';
                } else {
                    relation = '客生主';
                    tendency = '得天之助';
                }
            }
        }
        
        return {
            relation: relation,
            tendency: tendency,
            zhuElement: zhuElement,
            keElement: keElement
        };
    },
    
    getOrganByQi: function(qiName) {
        const map = {
            '厥阴风木': '肝',
            '少阴君火': '心',
            '太阴湿土': '脾',
            '少阳相火': '三焦',
            '阳明燥金': '肺',
            '太阳寒水': '肾'
        };
        return map[qiName] || '';
    },
    
    analyzeConstitution: function(yearGan) {
        const wuYun = this.calcWuYun(yearGan);
        if (!wuYun) return null;
        
        const element = wuYun.element;
        const type = wuYun.type;
        
        const constitutionMap = {
            '木': {
                organ: '肝',
                tendency: type === '太过' ? '肝气偏旺，易亢逆' : '肝血偏弱，易郁结',
                weak: type === '太过' ? '脾' : '肺',
                strong: '肝'
            },
            '火': {
                organ: '心',
                tendency: type === '太过' ? '心火偏旺，易烦躁' : '心阳偏弱，易畏寒',
                weak: type === '太过' ? '肾' : '心',
                strong: '心'
            },
            '土': {
                organ: '脾',
                tendency: type === '太过' ? '脾湿偏盛，易困重' : '脾气偏弱，易消化不良',
                weak: type === '太过' ? '肾' : '肝',
                strong: '脾'
            },
            '金': {
                organ: '肺',
                tendency: type === '太过' ? '肺气偏燥，易干咳' : '肺气偏弱，易感冒',
                weak: type === '太过' ? '肝' : '脾',
                strong: '肺'
            },
            '水': {
                organ: '肾',
                tendency: type === '太过' ? '肾水偏寒，易畏寒' : '肾气偏弱，易腰酸',
                weak: type === '太过' ? '心' : '肾',
                strong: '肾'
            }
        };
        
        return {
            wuYun: wuYun,
            constitution: constitutionMap[element]
        };
    }
};
