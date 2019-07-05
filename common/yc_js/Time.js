const Utils = {
    formatTime: (time) => {
        if (typeof time !== 'number' || time < 0) {
            return time
        }

        var hour = parseInt(time / 3600)
        time = time % 3600
        var minute = parseInt(time / 60)
        time = time % 60
        var second = time

        return ([hour, minute, second]).map(function(n) {
            n = n.toString()
            return n[1] ? n : '0' + n
        }).join(':')
    },
    toTimestamp: (date, num) => {
        var num = parseInt(num);
        if (isNaN(num)) {
            num = 1000;
        }
        return Date.parse(new Date(date)) / num;
    },
    /**var time=new Date(parseInt(1420184730) * 1000).format('yyyy年M月d日');
     * 月(M)、日(d)、小时(h)、分(m)、秒(s) 毫秒(S)、季度(q) 可以用 1-2 个占位符，
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * 例子：
     * (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     * */
    formatDate: (timep, timetype) => {
            if (timep && parseInt(timep) != timep) {
                // 判断时间戳是否是数字，不是数字原数据返回
                return timep;
            } else if (!timep) {
                var timep = Date.parse(new Date()) / 1000;
            } else if (timep.length == 10) {
                var timep = parseInt(timep)
            } else if (timep.length > 10) {
                var timep = timep.substring(0, 10);
            }
            // return '收到'+timep;

            var timetype = timetype || "yyyy-M-d hh:mm:ss";
            Date.prototype.format = function(fmt) { //author: meizz
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp
                    .$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(
                            ("" + o[k]).length)));
                return fmt;
            }
            var time = new Date(parseInt(timep) * 1000).format(timetype);
            return time;
        }
        // 		,
        // 	formatLocation:(longitude, latitude)=>{
        // 		if (typeof longitude === 'string' && typeof latitude === 'string') {
        // 			longitude = parseFloat(longitude)
        // 			latitude = parseFloat(latitude)
        // 		}
        // 
        // 		longitude = longitude.toFixed(2)
        // 		latitude = latitude.toFixed(2)
        // 
        // 		return {
        // 			longitude: longitude.toString().split('.'),
        // 			latitude: latitude.toString().split('.')
        // 		}
        // }
        /**
         * 获取时间戳 默认10位,
         */
        ,
    getTime: (num) => {
        var num = parseInt(num);
        if (isNaN(num)) {
            num = 1000;
        }

        return Date.parse(new Date()) / num;
    }
}
var dateUtils = {
    UNITS: {
        '年': 31557600000,
        '月': 2629800000,
        '天': 86400000,
        '小时': 3600000,
        '分钟': 60000,
        '秒': 1000
    },
    humanize: (diff) => {
        var humanize = '';
        for (var key in dateUtils.UNITS) {
            if (diff >= dateUtils.UNITS[key]) {
                humanize = Math.floor(diff / dateUtils.UNITS[key]) + key + '前';
                break;
            }
        }
        return humanize || '刚刚';
    },
    // 使用
    format: (dateStr, timetype) => {
        // console.log([parseInt(dateStr),dateStr])
        if (isNaN(parseInt(dateStr)) &&  !isNaN(dateUtils.parse(dateStr).getTime())) {
            var date = dateUtils.parse(dateStr).getTime()
        }else{
            var date = dateStr;
        }
        // console.log(date)
        var length = date.toString().length

        if (length < 13) {
            for (let i = 0; i < (13 - length); i++) {
                date = date * 10
            }

        }
        var timetype = timetype || "hh:mm";
        // console.log(date)

        
        var diff = Date.now() - date;
        // console.log([new Date(date).getDate(), new Date().getDate()])
        if (diff < dateUtils.UNITS['天']) {
            return dateUtils.humanize(diff);

        } else if ((new Date(date).getDate()) != (new Date().getDate())) {
            timetype = "M-d hh:mm";
        } else if ((new Date(date).getMonth()) != (new Date().getMonth())) {
            timetype = "M-d hh:mm";
        } else if ((new Date(date).getFullYear()) != (new Date().getFullYear())) {
            timetype = "yy-M-d hh:mm";
        }

        return Utils.formatDate(date, timetype);
    },
    parse: (str) => { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
        // console.log(str)
        var a = str.split(/[^0-9]/);
        return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
    }
}
export default {
    toTimestamp: Utils.toTimestamp, //日期时间转成时间戳
    getTime: Utils.getTime, //当前时间戳
    // 						// formatTime:Utils.formatTime,
    formatDate: Utils.formatDate, //时间戳转日期
    // formatLocation:Utils.formatLocation,
    dateTimeformat: dateUtils.format, //获取距离时间 直接用
    dateUtils: dateUtils, //距离时间组件
}
