/*
 * @Autor        : Pat
 * @Description  : router config
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-08-03 12:41:47
 * @LastEditors  : Pat
 * @LastEditTime : 2020-10-13 10:49:06
 */
import router from './index'
import store from "@/config/store/index"
import { asyncRoutes } from "@/config/routerConfig"
//路由拦截
router.beforeEach(async (to, from, next) => {
    //用来做登录页不能浏览器前进回退
    const { meta: { name: TO_NAME, allowBack: TO_BACK }, path: TO_PATH } = to
    if (TO_NAME) { document.title = TO_NAME }
    if (typeof TO_BACK !== "undefined") { localStorage.setItem("allowBack", TO_BACK); }
    if (!TO_BACK) { history.pushState(null, null, location.href) }
    if (TO_PATH === "/") { next("/home"); } else {
        const { getters: { permission_routes: permissionRoutes }, dispatch: vuexDispatch } = store
        const hasPermissions = permissionRoutes && permissionRoutes.length > 0
        if (!hasPermissions) {
            const accessRoutes = await vuexDispatch('permission/generateRoutes', asyncRoutes)
            accessRoutes.push({ path: '*', redirect: '/error' })
            router.addRoutes(accessRoutes)
            next({ ...to, replace: true })
        } else {
            next();
        }
    }
})