<!--
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-08-03 14:45:27
 * @LastEditors  : Pat
 * @LastEditTime : 2020-10-29 10:10:32
-->
<template>
	<div class="sys-contail">
		<!-- 页面头部 -->
		<div
			class="header"
			:style="{
				'background-color': headerBackgroundColor,
				color: headerTextColor,
				height: headerHeight,
				'line-height': headerHeight,
			}"
		>
			<NavHeader @choiceSiderBarFlag="choiceSiderBarFlag"></NavHeader>
		</div>
		<!-- 页面的主要内容区域 -->
		<div
			class="container"
			:style="{ height: `calc(100% - ${headerHeight})` }"
		>
			<!-- 菜单树 -->
			<div
				class="nav-sider-bar"
				:class="{ isCollapse: isCollapse }"
				:style="{
					'background-color': navBackgroundColor,
					color: navTextColor,
				}"
			>
				<nav-menu ref="siderBar"></nav-menu>
			</div>
			<!-- 主要内容显示区域 -->
			<div class="content" :class="{ contentIsCollapse: isCollapse }">
				<!-- 面包屑 -->
				<div v-if="$route.path !== '/home'">
					<Breadcrumb />
				</div>
				<!-- 内容区 -->
				<div class="app-main">
					<transition name="fade-transform" mode="out-in">
						<router-view :key="key"></router-view>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import navMenu from "./menu";
import NavHeader from "./header";
import Breadcrumb from "./Breadcrumb";
import Component from "vue-class-component";
import { header, menu } from "@/config/menu.config";
@Component({
	components: {
		navMenu,
		Breadcrumb,
		NavHeader,
	},
	computed: {
		key() {
			return this.$routepath;
		},
	},
})
export default class Tree extends Vue {
	isCollapse = false;
	headerTextColor = header.textColor ? header.textColor : "white";
	headerBackgroundColor = header.backgroundColor
		? header.backgroundColor
		: "#2196f3";
	headerHeight = header.height ? header.height : "36px";
	navTextColor = menu.textColor ? menu.textColor : "white";
	navBackgroundColor = menu.backgroundColor
		? menu.backgroundColor
		: "rgba(0, 0, 0, 0.6)";
	constructor() {
		super();
	}
	choiceSiderBarFlag(flag) {
		Vue.set(this, "isCollapse", flag);
		this.$refs.siderBar.changeFlag(flag);
	}
}
</script>
<style lang="scss" scoped>
.sys-contail {
	width: 100%;
	height: 100%;
	background-size: 100% 100%;
	background-repeat: no-repeat;
	overflow: hidden;
}
.header {
	width: 100%;
	height: 50px;
	padding: 0 15px;
	box-sizing: border-box;
	color: #ffffff;
	background-color: #2196f3;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.container {
	width: 100%;
	height: calc(100% - 56px);
}
.nav-sider-bar {
	float: left;
	width: 255px;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
	transition: all 0.3s;
	padding: 5px;
}

.content {
	position: relative;
	float: left;
	width: calc(100% - 285px);
	height: calc(100% - 15px);
	margin-bottom: 15px;
	overflow: hidden;
	background-color: white;
	margin: 10px;
	border-radius: 4px;
	transition: all 0.3s;
}
.app-main {
	height: calc(100% - 62px);
	overflow-y: auto;
	box-sizing: border-box;
	width: 100%;
	overflow-x: hidden;
	margin: 10px;
}
.isCollapse {
	width: 40px;
}
.contentIsCollapse {
	width: calc(100% - 70px);
}
.fade-transform-leave-active,
.fade-transform-enter-active {
	transition: all 0.3s;
}

.fade-transform-enter {
	opacity: 0;
	transform: translateX(-10px);
}

.fade-transform-leave-to {
	opacity: 0;
	transform: translateX(10px);
}
</style>
