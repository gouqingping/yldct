/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 16:24:08
 * @LastEditors  : Pat
 * @LastEditTime : 2020-08-10 09:05:46
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules/', true, /\.js||.ts$/)
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    modules[modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')] = modulesFiles(modulePath).default
    return modules
}, {})
export default new Vuex.Store({ modules, getters })