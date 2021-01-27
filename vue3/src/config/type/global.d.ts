/*
 * @Autor        : Pat
 * @Description  : Global
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-27 10:31:23
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 11:18:15
 */
export interface StorageOption {
    value: any,
    expires: number | string,
    startTime: number
}

export interface StorageItem {
    key: string,
    value: string
}

export interface AnyObject {
    [key: string]: any;
}