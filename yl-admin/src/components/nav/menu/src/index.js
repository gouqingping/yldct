/*
 * @Autor        : Pat
 * @Description  : Header
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-08-05 14:51:35
 * @LastEditors  : Pat
 * @LastEditTime : 2020-08-05 19:10:07
 */

import Vue from "vue";
import { menu } from "@/config/menu.config";
const { nav: { backgroundColor, textColor, activeTextColor } } = menu
export default class MenuClass extends Vue {
    isCollapse = false
    navList = []
    textColor = textColor ? textColor : "white";
    activeTextColor = activeTextColor ? activeTextColor : "white";
    backgroundColor = backgroundColor ? backgroundColor : "rgba(0,0,0,0)";
    created() {
        this.setMenu();
    }
    //改变展开和收缩的状态
    changeFlag(flag) {
        Vue.set(this, "isCollapse", flag)
    }
	/**
	 * 设置路由数据
	 */
    setMenu() {
        let menu = this.getMenuByRouter();
        this.navList = menu;
    }
	/**
	 * 通过路由配置获取导航
	 * 获取路由名称为index的路由节点，返回该节点下的children作为菜单数据
	 * @return {Array} 路由菜单数组
	 */
    getMenuByRouter() {
        let routers = this.$router.options.routes;
        for (let i = 0; i < routers.length; i++) {
            if (routers[i].path === "/") {
                if (routers[i].children && routers[i].children.length) {
                    return routers[i].children;
                }
            }
        }
        return [];
    }
}