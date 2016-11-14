/**
 * Created by lu on 2016/9/28.
 */

/**
 * 把字符串作为 URI 组件进行编码
 * @param key
 * @param value
 * @returns {string}
 */
export function toQueryPair(key, value) {
    return encodeURIComponent(String(key)) + "=" + encodeURIComponent(String(value));
}
/**
 * 参数对象进行URL字符串转换
 * @param obj
 * @returns {string}
 */
export function toQueryString(obj) {
    var result = [];
    for (var key in obj) {
        result.push(toQueryPair(key, obj[key]));
    }
    return result.join("&");
}
/**
 *获取当前url参数
 * @returns {{}}
 * @constructor
 */
export function getUrlParam() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
        arges = {},
        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;
    for (i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            arges[name] = value;
        }
    }
    return arges;
};
/**
 * 深拷贝
 * @param source
 * @returns 返回copy的副本
 */
export function deepCopy(source) {
    var result = {};
    for (var key in source) {
        result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key];
    }
    return result;
}
/**
 * 生成 UIID
 * @returns {string}
 */
export function guId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}
/**
 * 生成guidCss
 * @returns {string}
 */
export function guIdCSS() {
    return "a" + (((1 + Math.random()) * 0x1000000) | 0).toString(16).substring(1).toUpperCase();
}

/**
 *
 * @param str
 * @returns {number}
 */
export function getStrLen(str) {
    var i = 0,
        len = str.length,
        ret = {
            length: 0
        };

    for (; i < len; i++) {
        var _ascii = str.charCodeAt(i);
        if (_ascii > 255) {

            ret.length += 2;
        } else {

            //判断大写字符
            _ascii > 60 && _ascii < 90 ? ret.length += 2 : ret.length += 1;
        }
    }
    return ret.length;
}

