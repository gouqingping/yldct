/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-08-03 12:41:47
 * @LastEditors  : Pat
 * @LastEditTime : 2020-10-29 09:30:33
 */
import {
    moduleName
} from "@/init/amb.js"
const Layout = () => import("@/components/nav/index.vue")
const Home = () => import("@/page/home.js")
// 动态路由配置
const dynamicRouters = [{
    path: '/test',
    component: () => import("@/page/error.vue"),
    meta: {
        name: '测试'
    },
    hidden: true,
    children: [{
        path: 'index',
        component: () => import("@/page/error.vue"),
        meta: {
            name: '公共组件使用1',
            icon: "el-icon-s-platform"
        },
        hidden: true
    }]
}]
// 静态路由配置
export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/home',
                name: moduleName,
                component: Home,
                meta: {
                    title: moduleName,
                    isShowMenu: true
                },
                hidden: true
            },
            {
                path: '/error',
                name: "Error",
                component: () => import("@/page/error.vue"),
                meta: {
                    title: "Error",
                    isShowMenu: true
                }
            }
        ],
        meta: {
            name: "首页",
            icon: "el-icon-s-home"
        }
    },
    {
        path: '/test',
        name: "test",
        component: () => import("@/page/test.vue"),
        meta: {
            title: "test",
            isShowMenu: true
        }
    }
]


export const asyncRoutes = [{
    name: '',
    path: "",
    component: Layout,
    redirect: "noredirect",
    children: dynamicRouters
}]