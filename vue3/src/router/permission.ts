/*
 * @Autor        : Pat
 * @Description  : Router intercept processing
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-08-03 12:41:47
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-15 17:38:44
 */
import VueRouter from './index';
import store from "/@/config/store/index";
import { asyncRoutes } from "/@/config/router.config";
// This's vue router beforeEcah routers
VueRouter.beforeEach(async (to: any, form: any, next: Function) => {
    // Used as a login page, the browser cannot move forward or backward
    // Exist current to router name
    // Document title is current to router name
    document.title = to.meta.name ? to.meta.name : to.name;
    // Not's allowBack set localStorage item allowBack is allowBack
    // Set current history is current location href
    if (!to.meta.allowBack) {
        localStorage.setItem("allowBack", to.meta.allowBack);
        history.pushState(null, "", location.href)
    };
    if (to.path === "/") {
        next("/home");
    } else {
        const { getters: { permission: permissionRoutes }, dispatch: vuexDispatch } = store,
            hasPermissions = permissionRoutes && permissionRoutes.length > 0;
        // This's not exist permission routers
        // Get vuex dispatch add router
        // Else router next path is default path
        if (!hasPermissions) {
            const newRouters = await vuexDispatch('permission/generateRoutes', asyncRoutes) as any;
            newRouters.map((routerItem: any) => {
                VueRouter.addRoute(routerItem);
                // Vue Router saves information on the history.state. 
                // If you have any code manually calling history.pushState(), 
                // you should likely avoid it or refactor it with a regular router.push() and a history.replaceState()
                // https://next.router.vuejs.org/guide/migration/#removal-of-unnamed-parameters
                history.replaceState({ ...history.state }, '', routerItem.path);
            })
        }
        // This's not exist router
        // This's router next path default path
        next()
    };
})