/*
 * @Autor        : Pat
 * @Description  : Lang
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-22 11:18:43
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 11:28:20
 */
import { AnyObject } from "../type/global.d";
import amb from "/@/init/amb";
let currentLG: AnyObject | any;
const modulesGlob = import.meta.globEager('./**/*.*');
Object.keys(modulesGlob).forEach((key) => {
    let name = key.split("/")[key.split("/").length - 1].replace(/\.ts|.js/, "");
    if (amb.lang && amb.lang === name) {
        if (!currentLG && amb.lang === "zh-CN") {
            currentLG = modulesGlob[key].default;
            return;
        }
        currentLG = modulesGlob[key].default;
    };
});
currentLG.moduleName = amb.moduleName;
export const moduleName = amb.moduleName;
export default currentLG;