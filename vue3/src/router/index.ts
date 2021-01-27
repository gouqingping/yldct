/*
 * @Autor        : Pat
 * @Description  : Router Config
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 15:31:14
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 15:07:03
 */
import type { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw, RouteLocationNormalized } from 'vue-router';
import { constantRoutes } from "/@/config/router.config";
import routerBeforeEach from "./permission";
const router = createRouter({
	history: createWebHashHistory(),//createWebHashHistory or createWebHistory,
	routes: constantRoutes as RouteRecordRaw[],
	strict: false,
	scrollBehavior: async function (to: any, from: any, savedPosition: any) {
		// await scrollWaiter.wait();
		// Use predefined scroll behavior if defined, defaults to no scroll behavior
		const behavior = 'smooth';
		// Returning the `savedPosition` (if available) will result in a native-like
		// behavior when navigating with back/forward buttons
		if (savedPosition) {
			return { ...savedPosition, behavior };
		}
		// Scroll to anchor by returning the selector
		if (to.hash) {
			return { el: decodeURI(to.hash), behavior };
		}
		// Check if any matched route config has meta that discourages scrolling to top
		if (to.matched.some((m: RouteLocationNormalized) => m.meta.scrollToTop === false)) {
			// Leave scroll as it is
			return false;
		}
		// Always scroll to top
		return { left: 0, top: 0, behavior };
	}
});

routerBeforeEach(router);
export default router;

export function setRoute(app: App<Element>) {
	app.use(router);
};