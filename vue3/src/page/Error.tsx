import "/@/assets/scss/error.scss";
import { defineComponent, onBeforeUpdate, onMounted } from 'vue';

function randomNum(): any {
	return Math.floor(Math.random() * 9) + 1;
};

function initMath(math: Array<string | null>): any {
	let time = 20, i = 0, timr: Array<number | any> = [];
	math.forEach((element: string | null, index: number) => {
		const currentElement: any = document.querySelector(`.Digit_${index}`);
		timr.push(setInterval(() => {
			if (i > (40 * (index + 0.6))) {
				clearInterval(timr[index]);
				currentElement.textContent = math[index];
			} else {
				currentElement.textContent = randomNum();
				i++;
			};
		}, time));
	});
	return timr;
};

export default defineComponent({
	setup() {
		let timr: Array<number | any> = [], math: Array<string | null> = ["4", "0", "4"], msg: String = "访问的页面不存在！";

		onMounted(() => {
			timr = initMath(math);
		});

		onBeforeUpdate(() => {
			timr.forEach(item => {
				clearInterval(item);
			});
		});

		return () => (
			<div class="error">
				<div class="container-floud">
					<div class="ground-color">
						<div class="container-error-404">
							{
								math.map((item, index) => {
									return (
										<div class="clip">
											<div class="shadow">
												<span class={`digit Digit_${index}`}>
													{item}
												</span>
											</div>
										</div>
									)
								})
							}
							<div class="msg">
								OH!
								<span class="triangle"></span>
							</div>
						</div>
						<h2 class="h1">{msg}</h2>
						<p><a class="tohome" href="./">返回首页</a></p>
					</div>
				</div>
			</div>
		)
	}
})