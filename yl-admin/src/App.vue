<!--
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-08-03 12:41:47
 * @LastEditors  : Pat
 * @LastEditTime : 2020-10-29 09:27:51
-->
<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: "App",
};
</script>

<style lang="scss">
#app,
html,
body {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	margin: 0;
	padding: 0;
	width: 100vw;
	height: 100vh;
	font-size: 12px;
}
</style>
