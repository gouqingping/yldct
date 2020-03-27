/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 16:24:08
 * @LastEditors  : Pat
 * @LastEditTime : 2020-02-26 23:00:05
 */
import { asyncRoutes, constantRoutes } from '@/config/link'

function hasPermission(permissions, route) {
    if (route.name && !route.meta.isShowMenu) {
        return permissions.some(permission => route.name === permission)
    } else {
        return true
    }
}
export function filterAsyncRoutes(routes, permissions) {
    const res = []

    routes.forEach(route => {
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
    SET_PERMISSIONS: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({ commit }, permissions) {
        return new Promise(resolve => {
            let accessedRoutes
            accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
            commit('SET_PERMISSIONS', permissions)
            resolve(permissions)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
