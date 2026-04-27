/**
 * 主逻辑模块
 */

document.addEventListener('DOMContentLoaded', function() {
    const birthForm = document.getElementById('birthForm');
    const resultSection = document.getElementById('resultSection');
    
    birthForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const year = parseInt(document.getElementById('birthYear').value);
        const month = parseInt(document.getElementById('birthMonth').value);
        const day = parseInt(document.getElementById('birthDay').value);
        const hour = document.getElementById('birthHour').value;
        
        if (!year || !month || !day) {
            alert('请填写完整的出生日期');
            return;
        }
        
        // 计算出生干支
        const birthGZ = Lunar.getFullGanZhi(year, month, day, hour);
        
        // 获取当前时间
        const now = new Date();
        const currentYearGZ = Lunar.getYearGanZhi(now.getFullYear(), now.getMonth() + 1, now.getDate());
        const currentGZ = Lunar.getFullGanZhi(now.getFullYear(), now.getMonth() + 1, now.getDate(), '');
        
        // 获取当前节气
        const solarTerm = Lunar.getCurrentSolarTerm(now);
        
        // 计算司天在泉
        const stzq = WuYunLiuQi.calcSiTianZaiQuan(currentGZ.year.zhi);
        
        // 计算当前主气客气
        let qiInfo = null;
        if (stzq && solarTerm) {
            qiInfo = WuYunLiuQi.getCurrentQi(solarTerm.index, stzq.siTian);
        }
        
        // 客主加临分析
        let keZhuAnalysis = null;
        if (qiInfo && qiInfo.zhuQi && qiInfo.keQi) {
            keZhuAnalysis = WuYunLiuQi.analyzeKeZhu(qiInfo.zhuQi, qiInfo.keQi);
        }
        
        // 生成建议
        const advice = Advice.generate(birthGZ, currentGZ, qiInfo, keZhuAnalysis);
        
        // 显示结果
        displayResults(advice, now, solarTerm);
        
        // 滚动到结果
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    function displayResults(advice, now, solarTerm) {
        // 当前时间
        const timeStr = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日';
        let termStr = '';
        if (solarTerm && solarTerm.current) {
            termStr = ' · 当前节气：' + solarTerm.current.name;
        }
        document.getElementById('currentTime').textContent = timeStr + termStr;
        
        // 先天体质
        document.getElementById('constitutionInfo').innerHTML = advice.constitution;
        
        // 今年大环境
        document.getElementById('yearEnvInfo').innerHTML = advice.yearEnv;
        
        // 当下节气
        document.getElementById('solarTermInfo').innerHTML = advice.solarTerm;
        
        // 可能出现的不适
        const warningHtml = advice.warnings.length > 0 
            ? '<ul>' + advice.warnings.map(w => '<li>' + w + '</li>').join('') + '</ul>'
            : '<p>当前运气平和，暂无特殊预警</p>';
        document.getElementById('warningInfo').innerHTML = warningHtml;
        
        // 注意事项
        const noticeHtml = advice.notices.length > 0
            ? '<ul>' + advice.notices.map(n => '<li>' + n + '</li>').join('') + '</ul>'
            : '<p>常规养生即可</p>';
        document.getElementById('noticeInfo').innerHTML = noticeHtml;
        
        // 起居建议
        const lifestyleHtml = advice.lifestyle.length > 0
            ? '<ul>' + advice.lifestyle.map(l => '<li>' + l + '</li>').join('') + '</ul>'
            : '<p>保持规律作息</p>';
        document.getElementById('lifestyleInfo').innerHTML = lifestyleHtml;
    }
});
