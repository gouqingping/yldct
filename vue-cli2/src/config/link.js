/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 20:34:33
 * @LastEditors  : Pat
 * @LastEditTime : 2020-03-01 16:18:11
 */
import app from "./app.js"
const Home = () => import("@/page/Home.vue")

export const constantRoutes = [
	{
		path: '/',
		component: Home
	},
]

export const asyncRoutes = [
]