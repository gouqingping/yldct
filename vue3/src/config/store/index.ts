/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 16:24:08
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-14 17:48:23
 */
import { createStore } from 'vuex'
import getters from './getters';
import UserInfo from "./modules/UserInfo";
import permission from "./modules/permission";
export default createStore({
    modules: {
        UserInfo,
        permission
    }, getters
})