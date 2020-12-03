<!--
 * @Autor        : Pat
 * @Description  : tree 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-08-05 14:08:02
 * @LastEditors  : Pat
 * @LastEditTime : 2020-08-10 09:27:28
-->
<template>
	<div>
		<template v-for="(menu,index) in menus">
			<el-submenu
				:class="menu.meta&&menu.meta.class"
				v-if="hasMoreThanOneShowChildren(menu.children)&&redirectNo(menu)"
				:index="getFullPath(menu.path)"
				:key="index"
			>
				<template slot="title">
					<i class="iconfont" :class="menu.meta&&menu.meta.icon?menu.meta.icon:''"></i>
					<span slot="title">{{menu.meta&&menu.meta.name}}</span>
				</template>
				<NavTree :menus="menu.children" :parentPath="getFullPath(menu.path)"></NavTree>
			</el-submenu>
			<el-menu-item
				v-else-if="isShowMenu(menu) && redirectNo(menu)"
				:index="getFullPath(menu.path)"
				:key="index"
				:class="menu.meta&&menu.meta.class"
			>
				<i
					class="iconfont"
					v-if="menu.meta&&menu.meta.icon"
					:class="menu.meta&&menu.meta.icon?menu.meta.icon:''"
				></i>
				<span slot="title">{{menu.meta.name}}</span>
			</el-menu-item>
			<NavTree :key="index" v-else :menus="menu.children" :parentPath="getFullPath(menu.path)"></NavTree>
		</template>
	</div>
</template>
<script>
import NavTree from "./index.vue";
import Component from "vue-class-component";
import TreeOperatingCountry from "./src/index";
import { Submenu, MenuItem } from "element-ui";
@Component({
	name: "NavTree",
	props: ["menus", "parentPath"],
	components: {
		NavTree,
		elSubmenu: Submenu,
		elMenuItem: MenuItem,
	},
})
export default class Tree extends TreeOperatingCountry {
	constructor() {
		super();
	}
}
</script>