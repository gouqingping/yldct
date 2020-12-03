/*
 * @Autor        : Pat
 * @Description  : ObsX utils
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-12-03 17:15:23
 * @LastEditors  : Pat
 * @LastEditTime : 2020-12-03 17:17:53
 */

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
/**
 * @description: 对比两个对象
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {Boolean}
 * @Date: 2020-11-26 16:51:57
 * @author: Pat
 */
export function juxtaposeObject(obj1, obj2) { 
    let whether = true;
    Object.keys(obj2).map(item => { 
        if (typeof obj1[item]==="undefined") { 
            whether = false;
        }
    })
    return whether;
}