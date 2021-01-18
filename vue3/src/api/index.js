/*
 * @Autor        : Pat
 * @Description  : API
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-07-31 14:10:26
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-14 15:59:23
 */
import ylAxios from "/@/api/axios/index.js";
import api from "/@/init/api.js";
// import '/@/mock/mock.create.js';
/**
 * @description: 用户登录接口
 * @param {params} params {USER_LOGIN_NAME USER_PASSWORD}
 * @return: USER_INFO
 * @Date: 2020-07-31 14:54:01
 * @author: Pat
 */
export const login = async params => await ylAxios('get', `${api.requestUrl}/sys/login`, params)

