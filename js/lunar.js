/**
 * 农历/干支转换工具
 */

const Lunar = {
    gan: ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'],
    zhi: ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'],
    solarTerms: [
        '立春','雨水','惊蛰','春分','清明','谷雨',
        '立夏','小满','芒种','夏至','小暑','大暑',
        '立秋','处暑','白露','秋分','寒露','霜降',
        '立冬','小雪','大雪','冬至','小寒','大寒'
    ],
    
    getYearGanZhi: function(year, month, day) {
        const liChunMonth = 2;
        const liChunDay = 4;
        
        let effectiveYear = year;
        if (month < liChunMonth || (month === liChunMonth && day < liChunDay)) {
            effectiveYear = year - 1;
        }
        
        const baseYear = 1984;
        const offset = effectiveYear - baseYear;
        const ganIndex = ((offset % 10) + 10) % 10;
        const zhiIndex = ((offset % 12) + 12) % 12;
        
        return {
            gan: this.gan[ganIndex],
            zhi: this.zhi[zhiIndex],
            ganZhi: this.gan[ganIndex] + this.zhi[zhiIndex],
            ganIndex: ganIndex,
            zhiIndex: zhiIndex,
            year: effectiveYear
        };
    },
    
    getCurrentSolarTerm: function(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        const termApprox = [
            {name:'立春', month:2, day:4}, {name:'雨水', month:2, day:19},
            {name:'惊蛰', month:3, day:6}, {name:'春分', month:3, day:21},
            {name:'清明', month:4, day:5}, {name:'谷雨', month:4, day:20},
            {name:'立夏', month:5, day:6}, {name:'小满', month:5, day:21},
            {name:'芒种', month:6, day:6}, {name:'夏至', month:6, day:21},
            {name:'小暑', month:7, day:7}, {name:'大暑', month:7, day:23},
            {name:'立秋', month:8, day:8}, {name:'处暑', month:8, day:23},
            {name:'白露', month:9, day:8}, {name:'秋分', month:9, day:23},
            {name:'寒露', month:10, day:8}, {name:'霜降', month:10, day:23},
            {name:'立冬', month:11, day:7}, {name:'小雪', month:11, day:22},
            {name:'大雪', month:12, day:7}, {name:'冬至', month:12, day:22},
            {name:'小寒', month:1, day:6}, {name:'大寒', month:1, day:20}
        ];
        
        let currentTerm = null;
        let nextTerm = null;
        let termIndex = 0;
        
        for (let i = 0; i < termApprox.length; i++) {
            const term = termApprox[i];
            const next = termApprox[(i + 1) % 24];
            
            const termDate = new Date(year, term.month - 1, term.day);
            let nextDate = new Date(year, next.month - 1, next.day);
            if (next.month < term.month) {
                nextDate = new Date(year + 1, next.month - 1, next.day);
            }
            
            const currentDate = new Date(year, month - 1, day);
            
            if (currentDate >= termDate && currentDate < nextDate) {
                currentTerm = term;
                nextTerm = next;
                termIndex = i;
                break;
            }
        }
        
        if (!currentTerm) {
            const firstTerm = termApprox[0];
            const lastTerm = termApprox[23];
            const lastDate = new Date(year - 1, lastTerm.month - 1, lastTerm.day);
            const firstDate = new Date(year, firstTerm.month - 1, firstTerm.day);
            const currentDate = new Date(year, month - 1, day);
            
            if (currentDate >= lastDate && currentDate < firstDate) {
                currentTerm = lastTerm;
                nextTerm = firstTerm;
                termIndex = 23;
            }
        }
        
        return {
            current: currentTerm,
            next: nextTerm,
            index: termIndex
        };
    },
    
    getFullGanZhi: function(year, month, day, hour) {
        const yearGZ = this.getYearGanZhi(year, month, day);
        
        const yearGanIndex = yearGZ.ganIndex;
        let monthGanStart;
        if (yearGanIndex === 0 || yearGanIndex === 5) monthGanStart = 2;
        else if (yearGanIndex === 1 || yearGanIndex === 6) monthGanStart = 4;
        else if (yearGanIndex === 2 || yearGanIndex === 7) monthGanStart = 6;
        else if (yearGanIndex === 3 || yearGanIndex === 8) monthGanStart = 8;
        else monthGanStart = 0;
        
        const lunarMonth = ((month - 2 + 12) % 12);
        const monthGanIndex = (monthGanStart + lunarMonth) % 10;
        const monthZhiIndex = (2 + lunarMonth) % 12;
        
        const baseDate = new Date(1900, 0, 31);
        const targetDate = new Date(year, month - 1, day);
        const diffDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
        const dayGanIndex = (diffDays % 10 + 10) % 10;
        const dayZhiIndex = (diffDays % 12 + 12) % 12;
        
        let hourZhiIndex = 0;
        if (hour !== null && hour !== undefined && hour !== '') {
            hourZhiIndex = Math.floor((parseInt(hour) + 1) % 12);
        }
        const hourGanStart = (dayGanIndex % 5) * 2;
        const hourGanIndex = (hourGanStart + hourZhiIndex) % 10;
        
        return {
            year: yearGZ,
            month: {
                gan: this.gan[monthGanIndex],
                zhi: this.zhi[monthZhiIndex],
                ganZhi: this.gan[monthGanIndex] + this.zhi[monthZhiIndex],
                ganIndex: monthGanIndex,
                zhiIndex: monthZhiIndex
            },
            day: {
                gan: this.gan[dayGanIndex],
                zhi: this.zhi[dayZhiIndex],
                ganZhi: this.gan[dayGanIndex] + this.zhi[dayZhiIndex],
                ganIndex: dayGanIndex,
                zhiIndex: dayZhiIndex
            },
            hour: hour !== null && hour !== undefined && hour !== '' ? {
                gan: this.gan[hourGanIndex],
                zhi: this.zhi[hourZhiIndex],
                ganZhi: this.gan[hourGanIndex] + this.zhi[hourZhiIndex],
                ganIndex: hourGanIndex,
                zhiIndex: hourZhiIndex
            } : null
        };
    }
};
