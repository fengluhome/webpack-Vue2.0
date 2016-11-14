/**
 * Created by lu on 2016/9/27.
 */

/**
 * 查找指定元素的索引
 * @param array
 * @param item
 * @returns index
 */
export function arrayIndexOf(array, item) {
    if (typeof Array.prototype.indexOf === "function") {
        return Array.prototype.indexOf.call(array, item);
    }
    for (var i = 0, j = array.length; i < j; i++) {
        if (array[i] === item) {
            return i;
        }
    }
    return -1;
}

/**
 * 查询  object 数组 返回第一个符合条件元素
 * @param array
 * @param predicate
 * @param predicateOwner
 * @returns object
 */
export function arrayFirst(array, predicate, predicateOwner) {
    for (var i = 0, j = array.length; i < j; i++) {
        if (predicate.call(predicateOwner, array[i], i)) {
            return array[i];
        }

    }
    return null;
}

/**
 *查询  object 数组 返回第一个符合条件元素索引
 * @param array
 * @param predicate
 * @param predicateOwner
 * @returns 索引
 */
export function arrayFirstReturnIndex(array, predicate, predicateOwner) {
    for (var i = 0, j = array.length; i < j; i++) {
        if (predicate.call(predicateOwner, array[i], i)) {
            return {I: i, Item: array[i]};
        }
    }
    return null;
}
/**
 * 删除数组元素
 * @param array
 * @param itemToRemove
 */
export function arrayRemoveItem(array, itemToRemove) {
    var index = arrayIndexOf(array, itemToRemove);
    if (index > 0) {
        array.splice(index, 1);
    }
    else if (index === 0) {
        array.shift();
    }
}

/**
 * 把字符串转成char 数组
 * @param str
 * @returns {Array}
 */
export function stringToArray(str) {
    var arr = [], arrArr = new String(str);
    for (var i = 0; i < arrArr.length; i++) {
        arr.push(arrArr[i]);
    }
    return arr;
}
/**
 *
 * @param name
 * @returns {Function}
 */
export function sortBy(name) {
    return function (o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                if (isNaN(a) && isNaN(b)) {
                    return a < b ? -1 : 1;
                } else {
                    return a - b;
                }
            }
            return typeof a < typeof b ? -1 : 1;
        }
        else {
            throw ("error");
        }
    }
}