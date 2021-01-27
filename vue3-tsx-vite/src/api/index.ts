/*
 * @Autor        : Pat
 * @Description  : API
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-07-31 14:10:26
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 13:20:12
 */
import ElAxios from "/@/api/axios";
import api from "/@/init/api";
import { useLogin } from "./type/use.d";
/**
 * @description: 用户登录接口
 * @param {params} params {USER_LOGIN_NAME USER_PASSWORD}
 * @return: USER_INFO
 * @Date: 2020-07-31 14:54:01
 * @author: Pat
 */
export const getAccountInfo = async (params: useLogin) => await ElAxios('get', `${api.requestUrl}/api/account/getAccountInfo`, params);

