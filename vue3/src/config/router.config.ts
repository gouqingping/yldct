/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-14 16:08:20
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 16:13:17
 */

import type { RouteRecordRaw } from 'vue-router';
const Layout = () => import("/@/components/Nav");
export const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import("/@/page/Error.tsx"),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("/@/page/Login.tsx"),
    },
    {
        path: '/home',
        name: 'Home',
        component: Layout,
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import("/@/page/Home.tsx"),
                meta: {
                    isMenu: false,
                }
            }
        ],
        meta: {
            // 菜单显示名称
            title: "首页",
            // 图标
            icon: "el-icon-s-home",
            // 菜单自定义样式
            class: "",
            // 设置为菜单 true or false
            isMenu: true,
            // 扩展项
            extend: ""
        }
    },
];


// 动态路由配置
export const asyncRoutes: RouteRecordRaw[] = [
    {
        path: '/Test',
        name: 'Test',
        component: Layout,
        children: [
            {
                path: '',
                name: 'HelloWorld',
                component: () => import("/@/page/Home.tsx"),
                meta: {
                    title: "HelloWorld",
                    icon: "",
                    class: "",
                    isMenu: true,
                    extend: ""
                }
            }
        ],
        meta: {
            // 菜单显示名称
            title: "测试",
            // 图标
            icon: "el-icon-s-platform",
            // 菜单自定义样式
            class: "",
            // 设置为菜单 true or false
            isMenu: true,
            // 扩展项
            extend: ""
        }
    }
]