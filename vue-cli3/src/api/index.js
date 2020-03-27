/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 15:31:14
 * @LastEditors  : Pat
 * @LastEditTime : 2020-02-28 17:16:20
 */
import { postJson, get, uploadFile } from './axios/axios'
import api from "@/init/api.js";
export function setPhoto(params = {
    appGuid: "",  // ruiyanai 的项目ID
    file: "", // 上传的文件 file
    md5: "" // 指定的MD5转码 CryptoJS
}) {
    let fromData = new FormData()
    for (let item in params) {
        fromData.append(item, params[item])
    }
    return new Promise((resolve, reject) => {
        // api.aioSrc
        //uploadFile(`/api/device/photo/${params.appGuid}/upload`, fromData).then(e => {
        uploadFile(`${api.requestUrl}/faceUpload`, fromData).then(e => {

            resolve(e)
        }, err => {
            reject(err)
        }).catch(err => {
            resolve(err)
        })
    })
}

export function getToken(params) {
    return new Promise((resolve, reject) => {
        get(`${api.requestUrl}/face/token`, params).then(e => {
            resolve(e)
        }, err => {
            reject(err)
        }).catch(err => {
            resolve(err)
        })
    })
}
export function photoSynchronization(params = {
    card: "",//身份证号码
    sex: "",//0-男生，1-女生
    userName: "",//姓名
    photoIds: {
        md5: "",
        photoId: ""
    }
}) {
    return new Promise((resolve, reject) => {
        postJson(`${api.requestUrl}/photoSynchronization`, params).then(e => {
            resolve(e)
        }, err => {
            reject(err)
        }).catch(err => {
            resolve(err)
        })
    })
}

export function getPhoto(params = {
    appGuid: "",  // ruiyanai 的项目ID
    photoId: ""
}) {
    return new Promise((resolve, reject) => {
        get(`${api.aioSrc}/photo/${params.appGuid}`, params).then(e => {
            resolve(e)
        }, err => {
            reject(err)
        }).catch(err => {
            resolve(err)
        })
    })
}
