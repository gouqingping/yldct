/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 15:31:14
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-15 17:49:26
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRoutes } from "/@/config/router.config";
export default createRouter({
	history: createWebHashHistory(),//createWebHashHistory or createWebHistory,
	routes: constantRoutes
});