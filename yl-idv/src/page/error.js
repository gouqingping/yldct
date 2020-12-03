import Qs from "qs";
import Vue from "vue";
import Component from "vue-class-component";
import "@/assets/scss/error.scss";
@Component({
	data() {
		return {
			math: ["4", "0", "4"],
			msg: "访问的页面不存在！",
			loop1: null,
			loop2: null,
			loop3: null,
		};
	}
})
export default class Error extends Vue {
	constructor() {
		super();
	}
	created() {}
	mounted() {
		this.init();
	}
	// 销毁完成事件
	destroyed() {
		// 遍历定义的计时器集合
		// 销毁计时器
		window.clearInterval(this.loop1);
		window.clearInterval(this.loop2);
		window.clearInterval(this.loop3);
		this.loop1 = null;
		this.loop2 = null;
		this.loop3 = null;
	}
	randomNum() {
		return Math.floor(Math.random() * 9) + 1;
	}
	
	init() {
		var time = 30,
			i = 0,
			number;
		const query = Qs.parse(location.pathname);
		var math = this.math;
		for (let item in query) {
			if (item.slice(1) == "500") {
				math = item.slice(1).split("");
				this.msg = "服务器发生错误……";
			}
		}
		this.loop3 = setInterval(() => {
			if (i > 40) {
				clearInterval(this.loop3);
				document.querySelector(".thirdDigit").textContent = math[0];
			} else {
				document.querySelector(
					".thirdDigit"
				).textContent = this.randomNum();
				i++;
			}
		}, time);
		this.loop2 = setInterval(() => {
			if (i > 80) {
				clearInterval(this.loop2);
				document.querySelector(".secondDigit").textContent =
					math[1];
			} else {
				document.querySelector(
					".secondDigit"
				).textContent = this.randomNum();
				i++;
			}
		}, time);
		this.loop1 = setInterval(() => {
			if (i > 100) {
				clearInterval(this.loop1);
				document.querySelector(".firstDigit").textContent = math[2];
			} else {
				document.querySelector(
					".firstDigit"
				).textContent = this.randomNum();
				i++;
			}
		}, time);
	}

	render() {
		return (
			<div class="error">
				<div class="container-floud">
					<div class="col-xs-12 ground-color text-center">
						<div class="container-error-404">
							<div class="clip">
								<div class="shadow">
									<span class="digit thirdDigit">
										{this.math[0]}
									</span>
								</div>
							</div>
							<div class="clip">
								<div class="shadow">
									<span class="digit secondDigit">
										{this.math[1]}
									</span>
								</div>
							</div>
							<div class="clip">
								<div class="shadow">
									<span class="digit firstDigit">
										{this.math[2]}
									</span>
								</div>
							</div>
							<div class="msg">
								OH!
								<span class="triangle"></span>
							</div>
						</div>
						<h2 class="h1">{this.msg}</h2>
						<p>
							<a class="tohome" href="/">
								返回首页
							</a>
						</p>
					</div>
				</div>
			</div>
		);
	}
};