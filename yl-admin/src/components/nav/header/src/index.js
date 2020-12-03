/*
 * @Autor        : Pat
 * @Description  : Header
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-08-05 14:51:35
 * @LastEditors  : Pat
 * @LastEditTime : 2020-08-05 17:31:35
 */

import Vue from "vue";
import { header } from "@/config/menu.config";
const { moduleName } = require("@/init/amb");
export default class HeaderClass extends Vue {
    title = header.title ? header.title : moduleName;
    logo = header.icon;
    searchData;
    userName;
    subTitle = header.bar;
    fontSize = header.fontSize;
    constructor() {
        super();
    }
    bindEvent(event = (e) => e) {
        event();
    }
}