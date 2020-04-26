/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 15:31:14
 * @LastEditors  : Pat
 * @LastEditTime : 2020-04-26 15:19:35
 */
import { postJson, post, get, uploadFile } from './axios/axios'
import api from "@/init/api.js";
require('@/mock/mock.create.js')
export function Login(params) {
    return new Promise((resolve, reject) => {
        get(`${api.requestUrl}/sys/login`, params).then(e => {
            resolve(e)
        }, err => {
            reject(err)
        }).catch(err => {
            resolve(err)
        })
    })
}