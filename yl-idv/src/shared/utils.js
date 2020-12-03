/*
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-07-06 10:41:55
 * @LastEditors  : Pat
 * @LastEditTime : 2020-10-15 09:04:34
 */
import PinYin from "./PinYin";
/**
 * @description: 验证是否是整数 
 * @param {type} 
 * @return {Boolen}
 * @Date: 2020-07-06 11:16:56
 * @author: Pat
 */
export function isValidArrayIndex(val) {
    var n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * @description: 全部转小写
 * @param {string} 
 * @return {string}
 * @Date: 2020-07-06 11:20:02
 * @author: Pat
 */
export function toLowerCase(str) {
    return str.toLowerCase()
}

/**
 * @description: 全部转大写
 * @param {string} 
 * @return {string}
 * @Date: 2020-07-06 11:20:02
 * @author: Pat
 */
export function toUpperCase(str) {
    return str.toUpperCase()
}

/**
 * @description: 判断数据类型
 * @param {All Type} 
 * @return {string}
 * @Date: 2020-07-06 11:20:02
 * @author: Pat
 */
export function isType(obj, type) {
    return Object.prototype.toString.call(obj) === `[object ${Case(type.toLowerCase(type))}]`
}

/**
 * @description: 获取数据类型
 * @param {All Type} 
 * @return {string}
 * @Date: 2020-07-06 11:20:02
 * @author: Pat
 */
export function getType(obj) {
    return Object.prototype.toString.call(obj).replace(/\[/g, "").replace(/\]/g, "").replace(/\s/g, "").replace(/\object/g, "")
}

/**
 * @description:  设置首字母大写
 * @param {string} 
 * @return {string}
 * @Date: 2020-07-06 11:16:13
 * @author: Pat
 */
export function firstCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function Case(str) {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

/**
 * @description: 设置key，value
 * @param {all type} 目标
 * @param {all type} index or key
 * @param {all type} value
 * @return {all type}
 * @Date: 2020-07-06 11:17:26
 * @author: Pat
 */
export function set(target, key, val) {
    if ((!target)) {
        console.warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target)}`)
    }
    // 数组的处理
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key)
        target.splice(key, 1, val)
        return val
    }
    // key为对象，val为null的处理
    if (key instanceof Object) {
        Reflect.ownKeys(key).map(item => {
            target[item] = key[item]
        })
        return val
    }
    // 对象，并且该属性原来已存在于对象中，则直接更新
    if (key in target && !(key in Object.prototype)) {
        target[key] = val
        return val
    }
    // 响应式对象(比如 data 里定义的对象)都加了一个 __ob__ 属性，
    // 如果一个对象有这个 __ob__ 属性，那么就说明这个对象是响应式对象，我们修改对象已有属性的时候就会触发页面渲染。
    // 非 data 里定义的就不是响应式对象。
    const ob = (target).__ob__
    if (target._isVue || (ob && ob.vmCount)) {
        process.env.NODE_ENV !== 'production' && warn(
            'Avoid adding reactive properties to a Vue instance or its root $data ' +
            'at runtime - declare it upfront in the data option.'
        )
        return val
    }
    // 不是响应式对象
    if (!ob) {
        target[key] = val
        return val
    }
    // 是响应式对象，进行依赖收集
    defineReactive(ob.value, key, val)
    // 触发更新视图
    ob.dep.notify()
    return val
}
export function get(target, key) {
    if ((!target)) {
        console.warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target)}`)
    }
    // 数组的处理
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        return target[key]
    }
    if (key in target && !(key in Object.prototype)) {
        return target[key]
    }
}

export function Throw(cn, msg) {
    throw `${cn} Error: ${msg}`;
    return;
}

// 检查字符串是否为json格式
export function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return true;
            } else {
                return false;
            }

        } catch (e) {
            return false;
        }
    }
}

// 判断数据是否相等
export function isEqual(v1, v2) {
    const Q1 = isType(v1, "string") ? v1 : JSON.stringify(v1)
    const Q2 = isType(v2, "string") ? v2 : JSON.stringify(v2)
    return Q1 === Q2
}

export function isValueEqual(p1, p2) {
    if (!p1 || !p2) return false;
    for (let k in p1) {
        if (!p2[k] || p2[k] !== p1[k]) {
            return false;
        }
    }
    return true;
};

/**
 * 获取对象数组中对象的索引
 * @param array
 * @param obj
 * @returns {number}
 */
export function objIndexOf(array, obj) {
    for (let i = 0; i < array.length; i++) {
        if (isValueEqual(array[i], obj)) {
            return i;
        }
    }
    return -1;
}

/**
 * @description: 判断数据类是否有null/ undefined
 * @param {Object} json 
 * @return: boolen
 * @Date: 2020-07-20 11:19:22
 * @author: Pat
 */
export function isNullAndUndefined(json, showThrow = false) {
    let isNull = false
    if (!isType(json, "object")) {
        Throw("isNullAndUndefined", "data is not object!");
    }
    for (let item in json) {
        if (!json[item]) {
            if (JSON.stringify(json[item]) != "false") {
                isNull = true
                if (showThrow) {
                    Throw("isNullAndUndefined", `${item} is ${typeof json[item]}!!!`);
                }
            }
        }
    }
    return isNull
}
/**
 * @description: 时间格式化
 * @param {fmt} 格式 
 * @param {date} 时间 
 * @return: fmt
 * @Date: 2020-05-28 16:05:30
 * @author: Pat
 */
export function  getDate(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString(),          // 秒
        "W+": date.getDay().toString(),            // 周
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}


// 汉字转拼音
export function ConvertPinyin(l1, firstBoolen = true) {
    var l2 = l1.length;
    var I1 = "";
    var reg = new RegExp('[a-zA-Z0-9\- ]');
    for (var i = 0; i < l2; i++) {
        var val = l1.substr(i, 1);
        var name = arraySearch(val, PinYin, firstBoolen ? firstCase : firstBoolen);
        if (reg.test(val)) {
            I1 += val;
        } else if (name !== false) {
            I1 += name;
        }

    }
    I1 = I1.replace(/ /g, '-');
    while (I1.indexOf('--') > 0) {
        I1 = I1.replace('--', '-');
    }
    return I1;
}

// 在对象中搜索
export function arraySearch(l1, l2, ucfirst) {
    for (var name in PinYin) {
        if (PinYin[name].indexOf(l1) != -1) {
            if (ucfirst) {
                return ucfirst(name);
            } else {
                return name
            }
            break;
        }
    }
    return false;
}

/**
 * @description: 根据分辨率不同显示不同字体大小
 * @param {Number} 大小
 * @return: 大小
 */
export function fontSize(res) {
    let docEl = document.documentElement,
        clientWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = clientWidth / 5760;
    return res * fontSize;
};