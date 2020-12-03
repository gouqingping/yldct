/*
 * @Autor        : Pat
 * @Description  : Index
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-10-13 10:01:12
 * @LastEditors  : Pat
 * @LastEditTime : 2020-11-09 17:23:26
 */
import Vue from "vue";
import Component from "vue-class-component";
import "./src/iconfont/iconfont.css";
import "./src/scss/index.scss";
import Header from "./src/core/header";
@Component({})
export default class Screen extends Vue {
    /**
     * @description: 构造函数
     * @Date: 2020-11-06 15:22:21
     * @author: Pat
     */   
	constructor() {
        super();
    }
    setHeader() { 
        return 
    }
    
    setLeft() { 
        return
    }
    
    setContent() { 
        return 
    }
    
    setRight() { 
        return
    }

    render() {
        const
            {
                setHeader,
                setRight,
                setLeft,
                setContent
            } = this,
            { titleHeight, mainSubWidth, spacing, titileColor, bgColor, bgImage, left, right } = Object.assign(setHeader() ? setHeader() : {}, {
                titleHeight: 96,
                mainSubWidth: 300,
                spacing: 10,
                titileColor: "#98e3fe",
                bgImage: require("./src/images/bg.png"),
                left: {
                    showDay: true,
                    showWeek: true,
                    showTime:true
                },
                right: {
                    showPosition: true,
                    showTemperature: true,
                    showWeather: true,
                    jsx:()=><div class={'font setting'}></div>
                }
            });
            const headerStyle = `--titleHeight: ${titleHeight}px;--mainSubWidth: ${mainSubWidth}px;--spacing: ${spacing}px;--titileColor: ${titileColor};`;
		return (
            <div class={'vue-screen'} style={headerStyle}>
                <Header bgImage={bgImage} bgColor={bgColor} left={left} right={right}></Header>
                <div class={'vue-screen-main'}>
                    <div class={'v-sc v-sc-left'}>
                        <div class={'main'}> {setLeft()}</div>
                    </div>
                    <div class={`v-sc v-sc-main`}>{setContent()}</div>
                    <div class={`v-sc v-sc-right`}>
                        <div class={'main'}>{setRight()}</div>
                    </div>
                </div>
			</div>
		);
	}
}