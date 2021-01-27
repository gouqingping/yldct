/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 16:24:08
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 11:48:57
 */
import type { App } from 'vue';
import { createStore } from 'vuex';

const modulesGlob = import.meta.globEager('./**/*.ts'), modules: any = {};
let getters: any = "";

Object.keys(modulesGlob).map((key) => {
    if (key.indexOf("modules") >= 0) {
        let name = key.split("/")[key.split("/").length - 1].replace(/\.ts|.js/, "");
        modules[name] = modulesGlob[key].default;
    } else {
        getters = modulesGlob[key].default;
    }
});

const store = createStore({
    modules,
    getters,
    strict: false
});

export default store;
export function setupStore(app: App<Element>) {
    app.use(store);
}
