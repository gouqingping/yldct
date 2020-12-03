/*
 * @Autor        : Pat
 * @Description  : API
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-07-31 14:10:26
 * @LastEditors  : Pat
 * @LastEditTime : 2020-08-10 17:16:32
 */
import ylAxios from "@/api/axios/index.js"
import api from "@/init/api.js";
require('@/mock/mock.create.js')
/**
 * @description: 用户登录接口
 * @param {params} params {USER_LOGIN_NAME USER_PASSWORD}
 * @return: USER_INFO
 * @Date: 2020-07-31 14:54:01
 * @author: Pat
 */
export const login = async params => await ylAxios('get', `${api.requestUrl}/sys/login`, params)

