/*
 * @Autor        : Pat
 * @Description  : App Main
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-20 09:20:23
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-28 15:31:04
 */
import { defineComponent } from 'vue';
import { RouterView } from "vue-router";
// Initialization App main
// Vue tsx development model
// https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md
export default defineComponent({
	name: 'App',
	setup() {
		return () => <RouterView></RouterView>;
	}
});