/*
 * @Autor        : Pat
 * @Description  : User Store
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 16:24:08
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-15 09:37:13
 */
const state = {
    user: {}
}

const mutations = {
    SET_USERINFO: (state: any, user: any) => {
        state.user = user
    }
}

const actions = {
    generateUser({ commit }: any, info: any) {
        return new Promise(resolve => {
            commit('SET_PERMISSIONS', info)
            resolve(info)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
