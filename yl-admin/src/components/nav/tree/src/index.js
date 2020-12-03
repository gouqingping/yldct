/*
 * @Autor        : Pat
 * @Description  : Nav Tree
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-08-05 14:08:47
 * @LastEditors  : Pat
 * @LastEditTime : 2020-08-06 10:25:37
 */
import Vue from "vue";
export default class TreeOperatingCountry extends Vue {
    constructor() {
        super();
    }
    //是否显示菜单
    isShowMenu(item) {
        if (item && item.meta && item.meta.isShowMenu) {
            return false;
        } else {
            return true;
        }
    }
	/**
	 * 获取完整路由路径
	 * @param {String} val 当前节点的路由路径
	 */
    getFullPath(val) {
        if (!this.parentPath) {
            return val;
        } else {
            let fullpath = val ? this.parentPath + "/" + val : this.parentPath;
            return fullpath;
        }
    }
	/**
	 * 是否是子节点全为非现实路由
	 * 只要有一个节点为导航节点，则返回true
	 *
	 * @param {Object} item 路由节点数据
	 *
	 * @return {Boolean}
	 */
    isSingleNav(item) {
        let children = item.children;
        if (children instanceof Array) {
            for (let i = 0; i < children.length; i++) {
                if (children[i].meta.isNav) {
                    return true;
                }
            }
        }
        return false;
    }
    hasMoreThanOneShowChildren(children) {
        let showChildNum = 0;
        if (children) {
            children.forEach((item) => {
                if (
                    item.meta.isShowMenu === undefined ||
                    !item.meta.isShowMenu
                ) {
                    showChildNum++;
                }
            });
        }
        return showChildNum > 0;
    }
    redirectNo(menu) {
        if (menu.redirect === "noredirect") {
            return false;
        } else {
            return true;
        }
    }
}