<!--
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 20:34:33
 * @LastEditors  : Pat
 * @LastEditTime : 2020-08-05 17:31:42
 -->
<template>
	<div class="nav-header">
		<div class="nav-header-logo" @click="controlSiderBar" :style="{'font-size':fontSize}">
			<img v-if="logo" :src="logo" :alt="title" />
			{{title}}
		</div>
		<div class="nav-center">
			<div class="item" v-if="userName">
				你好，
				<span>{{userName}}</span>
			</div>
			<div
				v-for="(key,index) of subTitle"
				:key="index"
				class="item"
				:class="key.class"
				@click="bindEvent(key.event?key.event:e=>e)"
			>
				<img v-if="key.icon" :src="key.icon" :class="key.class" :alt="key.name" />
				<i v-else :class="key.iconClass"></i>
				<span>{{key.name}}</span>
			</div>
			<div class="item" @click="loginOut">
				<i class="el-icon-switch-button"></i>
				<span>注销</span>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
@import "./src/scss/index";
</style>
<script>
import Component from "vue-class-component";
import HeaderClass from "./src/index";
@Component({})
export default class Header extends HeaderClass {
	siderBarFlag = false;
	userName = null;
	constructor() {
		super();
	}
	//展开和收缩左侧栏
	controlSiderBar() {
		this.siderBarFlag = !this.siderBarFlag;
		this.$emit("choiceSiderBarFlag", this.siderBarFlag);
	}
	//登出
	loginOut() {
		localStorage.removeItem("token");
		localStorage.removeItem("userInfo");
		this.$router.push("/login");
	}
}
</script>
