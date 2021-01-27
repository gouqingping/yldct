/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 16:24:08
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 09:25:42
 */
import { asyncRoutes, constantRoutes } from '/@/config/router.config';
import type { RouteLocationNormalized, RouteRecordRaw } from "vue-router";

interface RouterState {
    routes: Array<any>,
    addRoutes: Array<RouteLocationNormalized>
}

function hasPermission(permissions: Array<RouteLocationNormalized>, route: RouteLocationNormalized) {
    if (route.name) {
        return permissions.some((permission: RouteLocationNormalized) => route !== permission)
    } else {
        return true
    }
};

export function filterAsyncRoutes(routes: RouteRecordRaw[], permissions: Array<RouteLocationNormalized>) {
    const res: Array<RouteLocationNormalized> = [];
    routes.forEach((route: any) => {
        const tmp = { ...route };
        if (tmp.children && tmp.children.length > 0) {
            tmp.children = filterAsyncRoutes(tmp.children, permissions);
            if (tmp.children.length > 0) {
                res.push(tmp);
            };
        } else {
            if (hasPermission(permissions, tmp)) {
                res.push(tmp);
            }
        };
    });
    return res;
};

const state: RouterState = {
    routes: [],
    addRoutes: []
};

const mutations = {
    SET_PERMISSIONS: (state: RouterState, routes: Array<any>) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
};

const actions = {
    generateRoutes({ commit }: any, permissions: Array<RouteLocationNormalized>) {
        return new Promise(resolve => {
            const ACCESSED_ROUTERS = filterAsyncRoutes(asyncRoutes, permissions);
            commit('SET_PERMISSIONS', ACCESSED_ROUTERS)
            resolve(ACCESSED_ROUTERS)
        })
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
