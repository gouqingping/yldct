<!--
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 15:47:54
 * @LastEditors  : Pat
 * @LastEditTime : 2020-03-08 13:02:52
 -->
<template>
	<div class="home">
		<div class="title">
			<div class="titleH4">
				欢迎进入
				<span style="color:#2196F3">{{$app.name}}</span>
			</div>
			<p>Welcome to {{$app.ename}}</p>
		</div>
	</div>
</template>

<script>
export default {
	created() {},
	mounted() {},
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss">
.home {
	padding: 20px;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: white;
	.titleH4 {
		color: #2e2a58;
		font-size: 36px;
	}
	p {
		padding: 0;
		margin: 0;
	}
}
</style>
