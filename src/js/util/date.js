/**
 * Created by lu on 2016/9/28.
 */

export var time = {
    dateToStamp: function (dateStr) {
        if (dateStr.length == 10) {
            dateStr = dateStr + ' 00:00:00';
        }
        var newStr = dateStr.replace(/-/g, '/');
        var date = new Date(newStr);
        var time_str = date.getTime();	// 得到的是秒
        return time_str / 1000;

    },
    stampToDate: function (timestamp, place) {
        var timestamp_str = timestamp.toString();
        if (timestamp_str.length <= 10) {
            timestamp = timestamp * 1000;
        }
        var unixtime = timestamp;
        var date = new Date(unixtime);
        var year = date.getFullYear();
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        if (place == 'all') {
            return year + "/" + month + "/" + currentDate + ' ' + hh + ':' + mm + ':' + ss;
        } else {
            return year + "/" + month + "/" + currentDate;
        }
    }
};

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
export function formatData(dataTime) {
    var timestamp = new Date().getTime();
    var dataTime = timestamp - new Date(dataTime).getTime();
    var days = Math.floor(dataTime / (24 * 3600 * 1000));
    if (days > 1 || days == 1) {
        return days + '天前';
    } else {
        var times = Math.floor(dataTime / (3600 * 1000));
        if (times > 1) {
            return times + '小时';//+  new Date(dataTime).Format("hh:mm:ss");
        } else {
            times = Math.floor(dataTime / (60 * 1000));
            if (times > 5) {
                return times + '分钟前'
            } else {
                return '刚刚';
            }
        }
    }
}