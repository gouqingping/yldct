/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 15:31:14
 * @LastEditors  : Pat
 * @LastEditTime : 2020-02-22 15:33:10
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const createRouter = () => new Router({
	scrollBehavior: () => ({ y: 0 }),
	routes: [{
		path: '*',
		component: () => import("@/page/test.vue"),
		meta: {
			name: "test"
		}
	}]
})

const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router