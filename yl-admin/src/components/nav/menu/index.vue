<!--
 * @Autor        : Pat
 * @Description  : Menu
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-08-05 15:11:43
 * @LastEditors  : Pat
 * @LastEditTime : 2020-08-06 10:14:28
-->
<template>
	<div class="navMenu">
		<div class="menu">
			<el-menu
				:router="true"
				:collapse="isCollapse"
				:collapse-transition="false"
				:background-color="backgroundColor"
				:text-color="textColor"
				:active-text-color="activeTextColor"
				:default-active="activeMenu"
				unique-opened
			>
				<NavTree :menus="permissionRoutes"></NavTree>
			</el-menu>
		</div>
	</div>
</template>
<style lang="scss">
@import "./src/scss/index";
</style>
<script>
import Vue from "vue";
import { Getter } from "vuex-class";
import NavTree from "../tree/index";
import MenuClass from "./src/index";
import Component from "vue-class-component";
import { Menu } from "element-ui";
@Component({
	components: {
		NavTree,
		elMenu: Menu,
	},
	computed: {
		activeMenu() {
			const route = this.$route;
			const { meta, path } = route;
			// if set path, the sidebar will highlight the path you set
			if (meta.activeMenu) {
				return meta.activeMenu;
			}
			return path;
		},
	},
})
export default class MyMenu extends MenuClass {
	@Getter("permission_routes") permissionRoutes;
	constructor() {
		super();
	}
}
</script>
