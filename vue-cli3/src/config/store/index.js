/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 16:24:08
 * @LastEditors  : Pat
 * @LastEditTime : 2020-02-19 16:41:22
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules/', true, /\.ts$/)
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const permission = modulesFiles.keys().reduce((modules, modulePath) => {
    modules[modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')] = modulesFiles(modulePath).default
    return modules
}, {})
const store = new Vuex.Store({
    modules: permission, getters
})
export default store
