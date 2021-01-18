/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-12-15 11:47:20
 * @LastEditors  : Pat
 * @LastEditTime : 2020-12-21 11:26:46
 */
export default {
    // 设置缓存
    setItem(name, params, expires) {
        let options = {
            value: params,
            // 过期时间，设置为 always 一直保存
            expires: expires,
            // 记录何时将值存入缓存，毫秒级
            startTime: new Date().getTime()
        }
        if (!expires) {
            options.expires = (60 * 1000) * 60 * 24;
        }
        if (options.expires === "always") {
            localStorage.setItem(name, JSON.stringify(options));
        } else {
            let type = Object.prototype.toString.call(options.value);
            if (type == '[object Object]') {
                options.value = JSON.stringify(options.value);
            } else if (type == '[object Array]') {
                options.value = JSON.stringify(options.value);
            }
            localStorage.setItem(name, options.value,options.expires);
        }
    },
    // 获取缓存
    getItem(name) {
        let item = localStorage.getItem(name);
        let type = Object.prototype.toString.call(item);
        if (type == '[object Object]') {
            item = JSON.parse(item);
        } else if (type == '[object Array]') {
            item = JSON.parse(item);
        }
        try {
            item = JSON.parse(item);
        } catch (error) { };
        if (item) {
            // 有startTime的值
            // 设置了失效时间
            if (item.startTime) {
                let date = new Date().getTime();
                // 失效清除缓存 false
                if (date - item.startTime > item.expires) {
                    localStorage.removeItem(name);
                    return false;
                } else {
                    return item.value;
                }
            } else {
                // 没有设置失效时间，直接返回
                return item;
            }
        } else {
            return false;
        }
    },
    // 移出缓存
    removeItem(name) {
        localStorage.removeItem(name);
    },
    // 移出全部缓存
    clear() {
        localStorage.clear();
    }
}