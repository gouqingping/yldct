/*
 * @Autor        : Pat
 * @Description  :
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-07-06 10:41:55
 * @LastEditors  : Pat
 * @LastEditTime : 2021-03-05 17:54:02
 */
import PinYin from "./PinYin.js"
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
export function getDate(fmt, date) {
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
    let fontSize = clientWidth / 5408;
    return res * fontSize;
};


// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
export function colorRgb(sColor, a) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    //处理六位的颜色值
    let sColorChange = [];
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = "#";
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
    } else {
        let matcgColor = sColor.match(/\((.+)\)/g);
        matcgColor = matcgColor.length < 0 ? "(0,0,0)" : matcgColor[0];
        sColorChange = matcgColor.replace(/\(|\)/g, '').split(',');
    }
    const [r, g, b] = sColorChange,rgb = a ? `rgba(${r}, ${g}, ${b},${a})` : `rgb(${r}, ${g}, ${b})`;
    return rgb.replace(/\s+/g,"");
};// 将rgb表示方式转换为hex表示方式
export function colorHex(rgb) {
    let _this = rgb;
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
        let aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
        let strHex = "#";
        for (let i = 0; i < aColor.length; i++) {
            let hex = Number(aColor[i]).toString(16);
            hex = hex < 10 ? 0 + '' + hex : hex;// 保证每个rgb的值为2位
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = _this;
        }
        return strHex;
    } else if (reg.test(_this)) {
        let aNum = _this.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return _this;
        } else if (aNum.length === 3) {
            let numHex = "#";
            for (let i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    } else {
        return _this;
    }
}
/**
 * @description: 图片懒加载
 * @param {any} tags
 * @Date: 2021-03-05 16:37:53
 * @author: Pat
 */
export function lazyLoad(tags,node = null) {
    let globals = node||window||globalThis||global, ele = node||document.documentElement;
    // 获取当前Tag滚动条的高度
    const _getTop = tag => {
        let ot = tag.offsetTop;
        while(tag = tag.offsetParent) {
            ot += tag.offsetTop;
        }
        return ot
    }, 
    // 遍历所有Tag判断
    // 如果当前可视区域高度+当前页面滚动条的高度 大于 当前Tag所在的位置
    // 那么开始加载当前的Tag，将Tag data-src 的值转换为 src
    _loadImg = tagArr => {
        // 获取可视区域高度
        let sltHeight = ele.clientHeight,slTop = ele.scrollTop || document.body.scrollTop;
        tagArr.forEach(tag=>{
            if ((sltHeight + slTop) > _getTop(tag)) {
                const src = tag.getAttribute("data-src");
                tag.removeAttribute("data-src");
                tag.src = src?src:tag.src;
            }
        })
    },
    currentScrollChange = () => (_loadImg(tags)),
    currentNodeStateChange = ()=> (globals.removeEventListener("scroll",currentScrollChange));
    currentScrollChange();
    //onscroll()在滚动条滚动的时候触发
    globals.addEventListener('scroll', currentScrollChange);
    globals.addEventListener("beforeunload",currentNodeStateChange);
    globals.addEventListener('DOMNodeRemoved',currentNodeStateChange);
}