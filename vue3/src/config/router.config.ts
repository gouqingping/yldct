/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-14 16:08:20
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-15 10:57:47
 */

import { RouteRecordRaw } from 'vue-router';
export const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import("/@/page/Error"),
    },
    {
        path: '/home',
        name: 'Home2',
        component: () => import("/@/page/Home"),
    },
];


// 动态路由配置
export const asyncRoutes: RouteRecordRaw[] = [
    {
        path: '/index',
        name: 'Home1112',
        component: () => import("/@/page/HelloWorld.vue"),
    },
]