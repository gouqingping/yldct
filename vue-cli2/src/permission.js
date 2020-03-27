/*
 * @Description:
 * @LastEditors  : Pat
 * @LastEditTime : 2020-02-28 16:03:43
 */
import router from '@/router/index'
import store from '@/config/store/index'
import { asyncRoutes } from '@/config/link'
//路由拦截
router.beforeEach(async (to, from, next) => {
    //用来做登录页不能浏览器前进回退
    let allowBack = true; //    给个默认值true
    let userInfo = !localStorage.getItem("userInfo") ? null : JSON.parse(localStorage.getItem("userInfo")).value
    if (to.meta.allowBack !== undefined) {
        allowBack = to.meta.allowBack;
    };
    if (!allowBack) {
        history.pushState(null, null, location.href)
    };
    localStorage.setItem("allowBack", allowBack);
    if (!userInfo) {
        if (to.path == "/login") {
            next();
        } else {
            next("/login");
        }
    } else {
        if (userInfo) {
            const hasPermissions = store.getters.permission_routes && store.getters.permission_routes.length > 0
            let routerArray = []
            if (!hasPermissions) {
                for (let router of asyncRoutes) {
                    if (!router.children) {
                        for (let params of router.meta.params) {
                            if (params == userInfo.userRole) {
                                routerArray.push(router)
                            }
                        }
                    } else {
                        let childs = []
                        if (router.meta.params) {
                            for (let params of router.meta.params) {
                                if (params == userInfo.userRole) {
                                    for (let child of router.children) {
                                        if (child.meta.params) {
                                            for (let childParams of child.meta.params) {
                                                if (childParams == userInfo.userRole || !childParams) {
                                                    childs.push(child)
                                                }
                                            }
                                        } else {
                                            if (params == userInfo.userRole || !params) {
                                                childs.push(child)
                                            }
                                        }
                                    }
                                    routerArray.push(router)
                                }
                            }
                        }
                    }
                }
                const accessRoutes = await store.dispatch('permission/generateRoutes', routerArray)
                router.addRoutes(accessRoutes)

                if (to.path == "/") {
                    next();
                } else {
                    next({ ...to, replace: true })
                }
            } else {
                if (to.path == "/") {
                    next("/");
                } else {
                    next();
                }
            }
        } else {
            next("/login");
        }
    }
})
