/**
 * 建议生成模块
 */

const Advice = {
    generate: function(birthGZ, currentYearGZ, qiInfo, keZhuAnalysis) {
        return {
            constitution: this.getConstitutionDesc(birthGZ),
            yearEnv: this.getYearEnvDesc(currentYearGZ),
            solarTerm: this.getSolarTermDesc(qiInfo),
            warnings: this.getWarnings(birthGZ, currentYearGZ, qiInfo, keZhuAnalysis),
            notices: this.getNotices(birthGZ, currentYearGZ, qiInfo, keZhuAnalysis),
            lifestyle: this.getLifestyle(birthGZ, currentYearGZ, qiInfo, keZhuAnalysis)
        };
    },
    
    getConstitutionDesc: function(birthGZ) {
        const wuYun = WuYunLiuQi.calcWuYun(birthGZ.year.gan);
        const constitution = WuYunLiuQi.analyzeConstitution(birthGZ.year.gan);
        
        if (!constitution) return '';
        
        const c = constitution.constitution;
        return `
            <span class="tag">${birthGZ.year.ganZhi}年</span>
            <span class="tag">${wuYun.element}运${wuYun.type}</span>
            <br><br>
            <strong>先天体质特点：</strong>${c.tendency}<br>
            <strong>相对偏弱：</strong>${c.weak}脏<br>
            <strong>相对偏强：</strong>${c.strong}脏
        `;
    },
    
    getYearEnvDesc: function(currentYearGZ) {
        const stzq = WuYunLiuQi.calcSiTianZaiQuan(currentYearGZ.year.zhi);
        const wuYun = WuYunLiuQi.calcWuYun(currentYearGZ.year.gan);
        
        if (!stzq) return '';
        
        return `
            <span class="tag">${currentYearGZ.year.ganZhi}年</span>
            <span class="tag">${wuYun.element}运${wuYun.type}</span>
            <span class="tag">${stzq.siTian}司天</span>
            <span class="tag">${stzq.zaiQuan}在泉</span>
            <br><br>
            <strong>全年气候特点：</strong>上半年偏${stzq.siTianNature}，下半年偏${stzq.zaiQuanNature}，
            全年${wuYun.element}气${wuYun.type === '太过' ? '偏盛' : '偏弱'}。
        `;
    },
    
    getSolarTermDesc: function(qiInfo) {
        if (!qiInfo || !qiInfo.zhuQi || !qiInfo.keQi) return '';
        
        return `
            <strong>当前主气：</strong>第${qiInfo.step}步 · ${qiInfo.zhuQi.name}（${qiInfo.zhuQi.nature}）<br>
            <strong>当前客气：</strong>${qiInfo.keQi.name}（${qiInfo.keQi.nature}）<br>
            <strong>对应脏腑：</strong>${qiInfo.zhuQi.organ}、${WuYunLiuQi.getOrganByQi(qiInfo.keQi.name)}
        `;
    },
    
    getWarnings: function(birthGZ, currentYearGZ, qiInfo, keZhuAnalysis) {
        const warnings = [];
        
        const constitution = WuYunLiuQi.analyzeConstitution(birthGZ.year.gan);
        const stzq = WuYunLiuQi.calcSiTianZaiQuan(currentYearGZ.year.zhi);
        
        if (!constitution || !stzq || !qiInfo) return warnings;
        
        const c = constitution.constitution;
        const zhuQi = qiInfo.zhuQi;
        const keQi = qiInfo.keQi;
        
        const weakOrgan = c.weak;
        const keOrgan = WuYunLiuQi.getOrganByQi(keQi.name);
        
        if (keOrgan === weakOrgan) {
            warnings.push(`<strong>${weakOrgan}气本弱</strong>，逢${keQi.name}客气当令，${weakOrgan}系统负担加重`);
        }
        
        if (keZhuAnalysis) {
            if (keZhuAnalysis.tendency === '外邪易入') {
                warnings.push(`<strong>客胜主（顺）</strong>：外邪容易侵袭${zhuQi.organ}，出现${this.getOrganSymptoms(zhuQi.organ)}`);
            } else if (keZhuAnalysis.tendency === '气机内郁') {
                warnings.push(`<strong>主胜客（逆）</strong>：气机郁滞于内，${zhuQi.organ}功能不畅，可能出现${this.getOrganSymptoms(zhuQi.organ)}`);
            }
        }
        
        const siTianNature = stzq.siTianNature;
        const constitutionElement = c.strong;
        
        if (siTianNature === '寒' && constitutionElement === '心') {
            warnings.push(`<strong>寒水司天 + 心阳偏弱</strong>：心寒相交，易出现心悸、畏寒、四肢不温`);
        }
        if (siTianNature === '热' && constitutionElement === '肾') {
            warnings.push(`<strong>火热司天 + 肾气偏弱</strong>：火灼肾阴，易出现口干、失眠、腰酸`);
        }
        
        if (zhuQi.nature === '湿') {
            warnings.push(`<strong>湿土当令</strong>：湿气困脾，易出现腹胀、食欲减退、肢体困重`);
        }
        if (zhuQi.nature === '燥') {
            warnings.push(`<strong>燥金当令</strong>：燥邪伤肺，易出现咽干、干咳、皮肤干燥`);
        }
        if (zhuQi.nature === '风') {
            warnings.push(`<strong>风木当令</strong>：风性善行数变，易出现头痛、眩晕、肢体麻木`);
        }
        if (zhuQi.nature === '寒') {
            warnings.push(`<strong>寒水当令</strong>：寒邪伤阳，易出现关节痛、腹痛、畏寒`);
        }
        
        const wuYun = WuYunLiuQi.calcWuYun(currentYearGZ.year.gan);
        if (wuYun) {
            if (wuYun.element === '火' && siTianNature === '寒') {
                warnings.push(`<strong>火运 + 寒水司天</strong>：寒热相搏，心脑血管负担加重`);
            }
            if (wuYun.element === '水' && siTianNature === '热') {
                warnings.push(`<strong>水运 + 火热司天</strong>：水火不济，易出现心烦失眠、上热下寒`);
            }
        }
        
        return warnings;
    },
    
    getNotices: function(birthGZ, currentYearGZ, qiInfo, keZhuAnalysis) {
        const notices = [];
        
        const constitution = WuYunLiuQi.analyzeConstitution(birthGZ.year.gan);
        const stzq = WuYunLiuQi.calcSiTianZaiQuan(currentYearGZ.year.zhi);
        
        if (!constitution || !stzq || !qiInfo) return notices;
        
        const c = constitution.constitution;
        const zhuQi = qiInfo.zhuQi;
        
        if (c.organ === '肝') {
            notices.push('情绪管理尤为重要，避免暴怒或长期抑郁');
            notices.push('春季和风大天气减少外出，戴帽子避风');
        }
        if (c.organ === '心') {
            notices.push('避免熬夜，23点前入睡最宜');
            notices.push('情绪激动时做深呼吸，防止心火亢盛');
        }
        if (c.organ === '脾') {
            notices.push('饮食定时定量，避免暴饮暴食');
            notices.push('生冷瓜果节制，尤其冰箱取出需回温');
        }
        if (c.organ === '肺') {
            notices.push('雾霾天减少户外运动，出门戴口罩');
            notices.push('秋季干燥时多饮温水，保持室内湿度');
        }
        if (c.organ === '肾') {
            notices.push('腰部保暖，避免久坐和过度劳累');
            notices.push('节制房事，冬季尤宜养藏');
        }
        
        if (zhuQi.nature === '湿') {
            notices.push('居室保持干燥通风，梅雨季节可用除湿机');
            notices.push('饮食宜清淡，少食油腻甜腻之物');
        }
        if (zhuQi.nature === '燥') {
            notices.push('多饮温水，可食用银耳、百合、梨等润燥');
            notices.push('皮肤涂抹保湿品，避免过度洗浴');
        }
        if (zhuQi.nature === '风') {
            notices.push('注意防风，尤其是头颈部');
            notices.push('运动后及时擦汗，避免当风受凉');
        }
        if (zhuQi.nature === '寒') {
            notices.push('添衣保暖，重点保护腰腹和脚踝');
            notices.push('饮食宜温热，可适当食用生姜、羊肉');
        }
        if (zhuQi.nature === '暑') {
            notices.push('避免正午外出，注意防暑降温');
            notices.push('汗出多时要补充淡盐水，忌狂饮冰水');
        }
        if (zhuQi.nature === '热') {
            notices.push('保持心情平静，避免情绪过激');
            notices.push('饮食清淡，可适当食用绿豆、苦瓜');
        }
        
        if (stzq.siTianNature === '湿') {
            notices.push('全年湿气偏重，脾胃功能弱的人尤其注意');
        }
        if (stzq.siTianNature === '寒') {
            notices.push('全年寒气偏重，心肾阳虚者注意保暖养阳');
        }
        
        return notices;
    },
    
    getLifestyle: function(birthGZ, currentYearGZ, qiInfo, keZhuAnalysis) {
        const lifestyle = [];
        
        const constitution = WuYunLiuQi.analyzeConstitution(birthGZ.year.gan);
        const stzq = WuYunLiuQi.calcSiTianZaiQuan(currentYearGZ.year.zhi);
        
        if (!constitution || !stzq || !qiInfo) return lifestyle;
        
        const c = constitution.constitution;
        const zhuQi = qiInfo.zhuQi;
        
        lifestyle.push('作息规律，早睡早起，顺应自然阴阳消长');
        lifestyle.push('适度运动，以微微出汗为度，避免大汗伤阳');
        
        if (c.organ === '肝') {
            lifestyle.push('宜柔和运动：太极拳、八段锦、散步');
            lifestyle.push('睡前可泡脚，配合按揉太冲穴');
            lifestyle.push('居室宜保持通风，色调以青绿为宜');
        }
        if (c.organ === '心') {
            lifestyle.push('午休15-30分钟，养心静神');
            lifestyle.push('睡前避免剧烈运动和刺激性内容');
            lifestyle.push('可练习静坐或冥想，每日10-15分钟');
        }
        if (c.organ === '脾') {
            lifestyle.push('饭后散步15分钟，助脾运化');
            lifestyle.push('晨起可摩腹100次，顺时针方向');
            lifestyle.push('避免久坐，每小时起身活动5分钟');
        }
        if (c.organ === '肺') {
            lifestyle.push('晨起深呼吸练习，扩胸运动');
            lifestyle.push('居室保持空气流通，避免烟尘');
            lifestyle.push('秋季可练"呬"字诀（六字诀）');
        }
        if (c.organ === '肾') {
            lifestyle.push('冬季早卧晚起，必待日光');
            lifestyle.push('可练习踮脚尖、搓腰眼');
            lifestyle.push('避免熬夜和过度劳累，保护精气');
        }
        
        if (zhuQi.nature === '湿') {
            lifestyle.push('居所除湿，衣物被褥勤晾晒');
            lifestyle.push('运动以汗出热退为度，忌汗出当风');
        }
        if (zhuQi.nature === '燥') {
            lifestyle.push('室内可使用加湿器，保持40-60%湿度');
            lifestyle.push('晨起喝杯温水，睡前涂润唇膏');
        }
        if (zhuQi.nature === '风') {
            lifestyle.push('外出戴帽子围巾，避风邪侵袭');
            lifestyle.push('运动出汗后及时擦干，更换干衣');
        }
        if (zhuQi.nature === '寒') {
            lifestyle.push('早睡晚起，等待日出后再起床活动');
            lifestyle.push('可多晒太阳，尤其是背部');
        }
        if (zhuQi.nature === '暑') {
            lifestyle.push('午间小憩，避开烈日');
            lifestyle.push('运动后补充淡盐水或绿豆汤');
        }
        
        lifestyle.push(`<strong>饮食建议：</strong>${this.getDietAdvice(c, zhuQi, stzq)}`);
        
        return lifestyle;
    },
    
    getDietAdvice: function(constitution, zhuQi, stzq) {
        let advice = '';
        
        if (constitution.organ === '肝') {
            advice += '宜食绿色蔬菜、枸杞、山楂；';
        }
        if (constitution.organ === '心') {
            advice += '宜食红色食物如红枣、红豆、西红柿；';
        }
        if (constitution.organ === '脾') {
            advice += '宜食黄色食物如小米、南瓜、山药；';
        }
        if (constitution.organ === '肺') {
            advice += '宜食白色食物如百合、银耳、梨；';
        }
        if (constitution.organ === '肾') {
            advice += '宜食黑色食物如黑豆、黑芝麻、核桃；';
        }
        
        if (zhuQi.nature === '湿') {
            advice += '当前湿重，可加薏米、赤小豆、茯苓祛湿；';
        }
        if (zhuQi.nature === '燥') {
            advice += '当前偏燥，宜多饮水，食蜂蜜、雪梨润燥；';
        }
        if (zhuQi.nature === '寒') {
            advice += '当前偏寒，宜食生姜、羊肉、桂圆温阳；';
        }
        if (zhuQi.nature === '暑') {
            advice += '当前偏热，宜食绿豆、西瓜、苦瓜清热；';
        }
        
        return advice;
    },
    
    getOrganSymptoms: function(organ) {
        const symptoms = {
            '肝': '头痛、眩晕、胁痛、情绪不畅',
            '心': '心悸、失眠、口舌生疮、烦躁',
            '脾': '腹胀、食欲差、便溏、乏力',
            '肺': '咳嗽、咽干、气短、鼻塞',
            '肾': '腰酸、耳鸣、畏寒、水肿',
            '三焦': '胸闷、寒热往来、水道不利'
        };
        return symptoms[organ] || '相关不适';
    }
};
