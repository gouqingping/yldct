/*
 * @Autor        : Pat
 * @Description  : Vuex config
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 16:24:08
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-28 15:30:29
 */
import type { App } from 'vue';
import { createStore } from 'vuex';
// The import.meta object exposes context-specific metadata to a JavaScript module. 
// It contains information about the module, like the module 's URL.
// https://developer.mozilla.org/zh-cn/docs/web/javascript/reference/statements/import.meta
const modulesGlob = import.meta.globEager('./**/*.ts'), modules: any = {};
// Set global vuex getters
let getters: any = "";
// Get all the folders under the modules folder, 
// traverse the file object to set Vuex modules and getters
Object.keys(modulesGlob).map((key) => {
    if (key.indexOf("modules") >= 0) {
        modules[key.split("/")[key.split("/").length - 1].replace(/\.ts|.js/, "")] = modulesGlob[key].default;
    } else {
        getters = modulesGlob[key].default;
    }
});
// Create vuex store
// set modules getters and strict
// https://next.vuex.vuejs.org/
const store = createStore({
    modules,
    getters,
    strict: false
});
// Throw current store
export default store;
/**
 * @description: setup use store
 * @param {App<Element>} app 
 * @Date: 2021-01-28 15:28:43
 * @author: Pat
 */
export function setupStore(app: App<Element>): any {
    app.use(store);
}
