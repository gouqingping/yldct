<!--
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-12-29 11:16:41
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-15 10:11:29
-->
<template>
	<div>
		<h1>{{ msg }}11:index</h1>
	</div>
</template>

<script>
import { login } from "/@/api/index.js";
export default {
	name: "HelloWorld",
	props: {
		msg: String,
	},
	data() {
		return {
			count: 0,
		};
	},
};
</script>
