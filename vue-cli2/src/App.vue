<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: "App",
	mounted() {
		let allowBack = localStorage.getItem("allowBack");
		window.onpopstate = () => {
			if (!allowBack) {
				history.go(1);
			}
		};
	}
};
</script>

<style>
html,
body,
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 100%;
	margin: 0;
	padding: 0;
	/* background-color: #f4f4f5; */
}
</style>