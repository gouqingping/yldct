<!--
 * @Autor        : Pat
 * @Description  : Breadcrumb
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 15:47:15
 * @LastEditors  : Pat
 * @LastEditTime : 2020-08-10 09:28:07
 -->
<template>
	<el-breadcrumb class="app-breadcrumb" separator="/">
		<transition-group name="breadcrumb">
			<template v-for="(item,index)  in levelList">
				<el-breadcrumb-item :key="item.path" v-if="item.meta.name">
					<span
						v-if="item.redirect==='noredirect'||index==levelList.length-1"
						class="no-redirect"
					>{{item.meta.name}}</span>
					<router-link v-else :to="item.redirect||item.path" class="can-router">{{item.meta.name}}</router-link>
				</el-breadcrumb-item>
			</template>
		</transition-group>
	</el-breadcrumb>
</template>
<style lang="scss" scoped>
@import "./src/scss/index";
</style>
<script>
import Vue from "vue";
import Component from "vue-class-component";
import { Breadcrumb, BreadcrumbItem } from "element-ui";
@Component({
	components: {
		elBreadcrumb: Breadcrumb,
		elBreadcrumbItem: BreadcrumbItem,
	},
})
export default class BreadcrumbClass extends Vue {
	levelList = null;
	watch = {
		$route() {
			this.getBreadcrumb();
		},
	};
	created() {
		this.getBreadcrumb();
	}
	getBreadcrumb() {
		const {
			$route: { matched: ROUTER_MATCHED },
		} = this;
		let matched = ROUTER_MATCHED.filter((item) => item.meta.name);
		const first = matched[0];
		try {
			if (first && first.meta.name !== "首页") {
				matched = [{ path: "/home", meta: { name: "首页" } }].concat(
					matched
				);
			}
		} catch (e) {}
		Vue.set(this, "levelList", matched);
	}
}
</script>
