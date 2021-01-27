/*
 * @Autor        : Pat
 * @Description  : Router intercept processing
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-08-03 12:41:47
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 14:27:03
 */
import store from "/@/config/store";
import { asyncRoutes } from "/@/config/router.config";
import { getsub } from "/@/config/Storage";
import { moduleName } from "/@/config/lang"
import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
export default function routerBeforeEach(VueRouter: any) {
    // This's vue router beforeEcah routers
    VueRouter.beforeEach(async (to: RouteLocationNormalized, form: RouteLocationNormalized, next: NavigationGuardNext) => {
        const userInfo = getsub("userInfo"), toDepth = to.path.split('/').length, fromDepth = form.path.split('/').length;
        to.meta.transitionName = toDepth > fromDepth ? 'slide-left' : (to.path === "/home" ? 'slide-left' : 'slide-right');
        // Used as a login page, the browser cannot move forward or backward
        // Exist current to router name
        // Document title is current to router name
        document.title = `${moduleName}-${to.meta.name ? to.meta.name : to.name}`;
        // Not's allowBack set localStorage item allowBack is allowBack
        // Set current history is current location href
        if (!to.meta.allowBack) {
            localStorage.setItem("allowBack", to.meta.allowBack);
            history.pushState(null, "", location.href)
        };
        if (to.path === "/login") {
            next();
        } else {
            if (to.path === "/" || !userInfo) {
                next("/login");
            } else {
                const { getters: { permission: permissionRoutes }, dispatch } = store,
                    hasPermissions = permissionRoutes && permissionRoutes.length > 0;
                dispatch("UserInfo/generateUser", userInfo);
                // This's not exist permission routers
                // Get vuex dispatch add router
                // Else router next path is default path
                if (!hasPermissions) {
                    const newRouters = await dispatch('permission/generateRoutes', asyncRoutes) as any;
                    newRouters.map((routerItem: any) => {
                        VueRouter.addRoute(routerItem);
                    });
                };

                VueRouter.getRoutes().map((item: any) => {
                    // Vue Router saves information on the history.state. 
                    // If you have any code manually calling history.pushState(), 
                    // you should likely avoid it or refactor it with a regular router.push() and a history.replaceState()
                    // https://next.router.vuejs.org/guide/migration/#removal-of-unnamed-parameters
                    history.replaceState({ ...history.state }, item.path);
                });
                // This's not exist router
                // This's router next path default path
                next();
            };
        }
    })
}