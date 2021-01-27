/*
 * @Autor        : Pat
 * @Description  : Mock utlis
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-26 17:29:43
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 10:19:01
 */
import Mock from "mockjs";
import { MockMethod } from 'vite-plugin-mock';
export default Mock;
/**
 * @description: setup current http success data
 * @param {string} url request address
 * @param {string} method request type
 * @param {any} resultSuccess callback data
 * @param {number} timeout request time
 * @return {MockMethod[]}
 * @Date: 2021-01-27 10:08:29
 * @author: Pat
 */
export function setupMock(url: string = "", method: string = "get", resultSuccess: any = {}, timeout: number = 100): MockMethod[] {
    return [{
        url,
        method,
        timeout,
        response: () => {
            return resultSuccess
        },
    }] as MockMethod[];
};

/**
 * @description: create common mock data
 * @param {any} result callback data
 * @param {number} code request callback type parameter
 * @param {string} msg Request callback message description
 * @return {Mock.mock}
 * @Date: 2021-01-27 10:09:27
 * @author: Pat
 */
export function createDataType(result: any, code: number = 200, msg: string = "success"): any {
    return Mock.mock({ code, msg, result })
};