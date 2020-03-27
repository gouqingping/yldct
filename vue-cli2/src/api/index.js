/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 15:31:14
 * @LastEditors  : Pat
 * @LastEditTime : 2020-02-28 17:16:20
 */
import { get, post, postJson, uploadFile } from './axios/axios'
import api from "@/config/init/api.js";

// 出差住宿查询
export function travelHotelQuery(params = {
    pageNo: 1, //int 页码 *
    pageSize: 10, //int 每页显示条数 *
    companyName: "", //String  公司名称 * refCompanyName
    name: "", //String 姓名
    deptName: "", //String 部门
    startTime: "", //String  入住时间(格式：2020-02-09 hh:mm:ss)
    leaveTime: "", //String  离开时间(格式：2020-02-09 hh:mm:ss)
}) {
    return new Promise((resolve, reject) => {
        postJson(api.requestUrl + '/travel/hotel/query', params).then(e => {
            resolve(e)
        }, err => {
            reject(err)
        })
            .catch(err => {
                reject(err)
            })
    })
}