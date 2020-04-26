<!--
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-03-11 20:00:44
 * @LastEditors  : Pat
 * @LastEditTime : 2020-04-26 15:21:08
 -->
<template>
	<div>{{name}}</div>
</template>
<script>
import amb from "@/init/amb.js";
import Vue from "vue";
import { Login } from "@/api/index.js";
import Component from "vue-class-component";
@Component({})
export default class ComponentA extends Vue {
	name = amb.moduleName;
	mounted() {
		Login().then(res => {
			console.log(res);
		});
	}
}
</script>