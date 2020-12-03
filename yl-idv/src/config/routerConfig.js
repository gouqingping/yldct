/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-08-03 12:41:47
 * @LastEditors  : Pat
 * @LastEditTime : 2020-10-13 10:47:52
 */
// 静态路由配置
export const constantRoutes = [
    {
        path: '*',
        component: () => import("@/page/error.js"),
        meta: {
            name: "404"
        }
    }
]

// 动态路由配置
export const asyncRoutes = [
    {
        path: "/home",
        component: ()=>import("@/page/home.js"),
        meta: {
            name: "home"
        }
    }
]