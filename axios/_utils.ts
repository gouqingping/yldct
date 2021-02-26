/*
 * @Autor        : Pat
 * @Description  : axios utils
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-27 10:03:02
 * @LastEditors  : Pat
 * @LastEditTime : 2021-02-26 18:03:04
 */
/**
 * @description: Determine whether the data type is the specified type
 * @param {any} obj all data type
 * @param {string} type specified type
 * @return {boolean} Whether the specified type
 * @Date: 2021-01-27 10:20:37
 * @author: Pat
 */
export function isType(obj: any, type: string = "object"): boolean {
    return Object.prototype.toString.call(obj) === `[object ${Case(type.toLowerCase())}]`
}
/**
 * @description: Set the first letter of English string to uppercase
 * @param {string} str
 * @return {string}
 * @Date: 2020-07-06 11:16:13
 * @author: Pat
 */
export function firstCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * @description: All English strings are converted to lowercase, the first letter is uppercase
 * @param {string} str
 * @return {string}
 * @Date: 2021-01-27 10:22:59
 * @author: Pat
 */
export function Case(str: string): string {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}
/**
 * @description: throttl
 * @param {Function} callback
 * @param {number} time
 * @Date: 2021-02-26 15:27:52
 * @author: Pat
 */
export function throttl(time: number = 500) {
    let d: any = "";
    return function (callback: Function) {
        clearTimeout(d);
        return new Promise((resolve) => {
            d = setTimeout(async () => resolve(callback), time);
        })
    }
}