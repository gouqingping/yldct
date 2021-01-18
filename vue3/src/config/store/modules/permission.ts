/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 16:24:08
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-15 09:55:57
 */
import { asyncRoutes, constantRoutes } from '../../router.config'

function hasPermission(permissions: any, route: any) {
    if (route.name) {
        return permissions.some((permission: any) => route.name === permission.name)
    } else {
        return true
    }
}
export function filterAsyncRoutes(routes: any, permissions: any) {
    const res: any = [];
    routes.forEach((route: any) => {
        const tmp = { ...route }
        if (tmp.children && tmp.children.length > 0) {
            tmp.children = filterAsyncRoutes(tmp.children, permissions)
            if (tmp.children.length > 0) {
                res.push(tmp)
            }
        } else {
            if (hasPermission(permissions, tmp)) {
                res.push(tmp)
            }
        }
    })
    return res
}

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_PERMISSIONS: (state: any, routes: any) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({ commit }: any, permissions: any) {
        return new Promise(resolve => {
            const ACCESSED_ROUTERS = filterAsyncRoutes(asyncRoutes, permissions)
            commit('SET_PERMISSIONS', ACCESSED_ROUTERS)
            resolve(ACCESSED_ROUTERS)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
