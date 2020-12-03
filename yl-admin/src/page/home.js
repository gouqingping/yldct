import amb from "@/init/amb.js";
import Vue from "vue";
import { login } from "@/api/index.js";
import Component from "vue-class-component";
@Component({})
export default class Hmoe extends Vue {
	SYS_INFO = {
		name: amb.moduleName,
		style: {
			home: {
				padding: "20px",
				width: "100%",
				height: "100%",
				boxSizing: "border-box",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			},
			title: {
				color: "#2e2a58",
				fontSize: "36px",
			},
			span: {
				color: "#2196F3",
			},
			main: {},
		},
	};

	constructor() {
		super();
		this.getData();
	}

	async getData() {
		console.log(await login());
	}

	render() {
		const { name: SYS_NAME, style: SYS_STYLE } = this.SYS_INFO;
		return (
			<div style={SYS_STYLE.home}>
				<div style={SYS_STYLE.main}>
					<div style={SYS_STYLE.title}>
						欢迎进入
						<span style={SYS_STYLE.span}>{SYS_NAME}</span>
						系统
					</div>
					Welcome to this system,This's the background management
					system of Vue + Element UI
				</div>
			</div>
		);
	}
}