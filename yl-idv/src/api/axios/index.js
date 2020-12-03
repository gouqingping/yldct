import qs from 'qs'
import { Case, isType } from "@/shared/utils"
import axios from "./axios.config"
export const request = (type, url, data, headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
}) => new Promise((resolve, reject) => {
    axios[type](url, Case(type) === Case("post") ? qs.stringify(data) : data, { headers })
        .then(res => {
            resolve(res)
        }, err => {
            reject(err)
        })
        .catch(err => {
            reject(err)
        })
})

export const REQUEST_AXIOS = {
    /**
     * @description: post request
     * @param {string} url  
     * @param {any} data
     * @return: Promise
     * @Date: 2020-07-31 14:29:27
     * @author: Pat
     */
    async post(url, data) { return await request("post", url, data) },
    /**
     * @description: put request
     * @param {string} url  
     * @param {any} data
     * @return: Promise
     * @Date: 2020-07-31 14:29:27
     * @author: Pat
     */
    async put(url, data) {
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
    async postJson(url, data = {}) {
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
    async get(url, params, headers) {
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
    uploadRequest(url, params) {
        return new Promise((resolve, reject) => {
            axios.create({
                withCredentials: true
            }).post(url, params).then(response => {
                resolve(response)
            }, err => {
                reject(err)
            }).catch((error) => {
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
    uploadFile(url, data) {
        let Authorization = ""
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
            }).then(response => {
                resolve(response)
            }, err => {
                reject(err)
            }).catch((error) => {
                reject(error)
            })
        })
    }
}

export default async function ylAxios(type, url, params) {
    if (!type && !isType(type, "string")) {
        throw 'ylAxios Error: type is undefined!'
        return
    } else if (!url && !isType(url, "string")) {
        throw 'ylAxios Error: url is undefined!'
        return
    }
    if (REQUEST_AXIOS[type]) {
        return await REQUEST_AXIOS[type](url, params)
    } else {
        throw 'ylAxios Error: Type is undefined!'
        return
    }
}
