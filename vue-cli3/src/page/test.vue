<!--
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-03-11 20:00:44
 * @LastEditors  : Pat
 * @LastEditTime : 2020-03-12 17:22:09
 -->
<template>
	<div>{{amb.moduleName}}</div>
</template>
<script>
import amb from "@/init/amb.js";
import Vue from "vue";
import Component from "vue-class-component";
@Component({
	props: {
		child: {
			type: String,
			default: "ComponentA test",
			required: true
		}
	}
})
export default class ComponentA extends Vue {
	name = amb.moduleName;
}
</script>