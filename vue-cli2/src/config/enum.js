/*
 * @Autor        : Pat
 * @Description  : 系统枚举值
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-20 12:25:51
 * @LastEditors  : Pat
 * @LastEditTime : 2020-03-02 09:49:05
 */
import app from "./app.js"
let enums = {
    // 用户角色
    USERROLE: [
        { label: `${app.moduleName}负责人`, value: 0 },
        { label: "防疫物资管理员", value: 1 },
        { label: "管理用户", value: 2 },
        { label: "普通用户", value: 3 },
    ],
}
/**
 * @description: 获取枚举值
 * @param {String} name 枚举值参数名 enums[name]
 * @param {String} key 枚举值参数的值 all 全部、0 获取 vlaue 等于0的label 
 * @return: Array and String
 * @author: Pat
 */
export function getEnum(name, key) {
    let POLICYTYPE = new Map()
    for (let item of enums[name]) {
        POLICYTYPE.set(item.value, item.label)
    }
    POLICYTYPE.set('all', enums[name])
    return POLICYTYPE.get(!key ? 'all' : key)
}
/**
 * @description: 设置枚举值
 * @param {String} name 枚举值参数名 enums[name]
 * @param {String} value 枚举值参数的值 value
 * @param {String} label 枚举值参数的值 label
 * @author: Pat
 */
export function setEnum(name, value, label) {
    enums[name].concat({ label: label, value: value })
}


