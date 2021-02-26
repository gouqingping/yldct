// import qs from "qs";
import { Case, isType, throttl } from "./_utils";
import axios from "./axios.config";
import { AnyObject } from "element-plus/lib/el-table/src/table.type";
const request = (type: string, url: string, data: any, headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
}) => new Promise((resolve, reject) => {
    axios[type](url, Case(type) === Case("post") ? JSON.stringify(data) : data, { headers })
        .then((res: any) => {
            resolve(res)
        }, (err: any) => {
            reject(err)
        })
        .catch((err: any) => {
            reject(err)
        })
}), REQUEST_AXIOS: AnyObject = {
    /**
     * @description: post request
     * @param {string} url  
     * @param {any} data
     * @return: Promise
     * @Date: 2020-07-31 14:29:27
     * @author: Pat
     */
    async post(url: string, data: any) { return await request("post", url, data) },
    /**
     * @description: put request
     * @param {string} url  
     * @param {any} data
     * @return: Promise
     * @Date: 2020-07-31 14:29:27
     * @author: Pat
     */
    async put(url: string, data: any) {
        return await request("put", url, data, {
            'Content-Type': 'application/json'
        })
    },
    /**
     * @description: post json request
     * @param {string} url  
     * @param {any} data
     * @return: Promise
     * @Date: 2020-07-31 14:29:27
     * @author: Pat
     */
    async postJson(url: string, data: AnyObject = {}) {
        return await request("post", url, data, {
            'Content-Type': 'application/json'
        })
    },
    /**
     * @description: get request
     * @param {string} url  
     * @param {any} params
     * @param {object} headers
     * @return: Promise
     * @Date: 2020-07-31 14:29:27
     * @author: Pat
     */
    async get(url: string, params: AnyObject, headers: any) {
        const data = await request("get", url, { params: params }, headers)
        return new Promise((resolve, reject) => {
            resolve(data)
        })
    },
    /**
     * @description: File upload request
     * @param {string} url  
     * @param {any} params
     * @return: Promise
     * @Date: 2020-07-31 14:29:27
     * @author: Pat
     */
    uploadRequest(url: string, params: AnyObject) {
        return new Promise((resolve, reject) => {
            axios.create({
                withCredentials: true
            }).post(url, params).then((response: any) => {
                resolve(response)
            }, (err: AnyObject) => {
                reject(err)
            }).catch((error: AnyObject) => {
                reject(error)
            })
        })
    },
    /**
     * @description: File upload request
     * @param {string} url  
     * @param {any} data
     * @return: Promise
     * @Date: 2020-07-31 14:29:27
     * @author: Pat
     */
    uploadFile(url: string, data: any) {
        let Authorization: string | null = ""
        if (localStorage.getItem("token")) {
            Authorization = localStorage.getItem("token")
        }
        return new Promise((resolve, reject) => {
            axios.create({
                withCredentials: true
            }).post(url, data, {
                headers: {
                    "Authorization": Authorization,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response: any) => {
                resolve(response)
            }, (err: any) => {
                reject(err)
            }).catch((error: any) => {
                reject(error)
            })
        })
    }
};

let currentUrl: string, requestThrottl: Function;

export default async function ElAxios(type: string, url: string, params: any) {
    let key: string = `${url}_${type}_${JSON.stringify(params)}`;
    if (currentUrl != key) {
        currentUrl = key;
        requestThrottl = throttl(0)
    }
    if (!type && !isType(type, "string")) {
        throw 'ElAxios Error: type is undefined!'
        return
    } else if (!url && !isType(url, "string")) {
        throw 'ElAxios Error: url is undefined!'
        return
    }
    if (REQUEST_AXIOS[type]) {
        return requestThrottl(await REQUEST_AXIOS[type](url, params))
    } else {
        throw 'ElAxios Error: Type is undefined!'
        return
    }
}
