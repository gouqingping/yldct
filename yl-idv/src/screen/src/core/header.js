/*
 * @Autor        : Pat
 * @Description  : Index
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-10-13 10:01:12
 * @LastEditors  : Pat
 * @LastEditTime : 2020-11-09 17:26:47
 */
import amb from "@/init/amb";
import Component from "vue-class-component";
import { getWthrcdn, getPostion,getCoordinates } from "../api";
import { getDate, ConvertPinyin,set } from "@/shared/utils"
const CURRENT_DATE = new Date(),WEEKS = ["日", "一", "二", "三", "四", "五", "六"];
@Component({
    props: {
        bgImage: {
            default: require("../images/bg.png")
        },
        bgColor: {
            default: "rgba(0,0,0,0)",
            type:String
        },
        left: {
            default() { 
                return {
                    showDay: true,
                    showTime: true,
                    showWeek: true,
                    jsx: null
                }
            },
            type:Object
        },
        right: {
            default() { 
                return {
                    showPosition: true,
                    showTemperature:true,
                    showWeather:true,
                    jsx:null
                }
            },
            type:Object
        }
    }
})
export default class Header  {
    // 记录计时器
    timr = 0;
    weatherTimr = 0;
    // 时间
    date = {
        // 时分秒
        time: getDate("HH:MM:SS", CURRENT_DATE),
        // 年月日
        day: getDate("YYYY-mm-dd", CURRENT_DATE),
        // 周
        week: `星期${WEEKS[Math.floor(getDate("WW", CURRENT_DATE))]}`
    };
    // 城市信息
    city = {
        // 城市名称
        name: "",
        // 城市英语名称
        USAName: "",
        // 城市天气
        weather: null,
        weatherPinyin:"",
        // 城市温度
        temperature: "",
        // 城市经纬度
        location: "",
        // 城市代码
        code: "",
        // 城市级别
        level: "",
        // 行政区域编码
        adCode: "",
        // 所属省份
        province: "",
        // 所属国籍
        country:""
    };
    /**
     * @description: 构造函数
     * @Date: 2020-11-06 15:22:21
     * @author: Pat
     */   
    constructor() {
        window.onload = () => this.created();
        window.onbeforeunload = () => this.destroyed();
    }
    /**
     * @description: 设置获取当天日期
     * @return {string}
     * @Date: 2020-11-06 14:33:37
     * @author: Pat
     */
    get $day() { 
        return this.date.day
    }
    /**
     * @description: 设置天的setter函数激活设置周
     * @Date: 2020-11-06 15:22:38
     * @author: Pat
     */
    set $day(index) { 
        this.date.week = `星期${WEEKS[index]}`
    }
    /**
     * @description: 设置获取当前时间的getter
     * @return {string}
     * @Date: 2020-11-06 15:23:26
     * @author: Pat
     */
    get $time() { 
        return this.date.time
    }
    /**
     * @description: 设置时间的setter，激活获取是那一天
     * @param {string}
     * @Date: 2020-11-06 15:24:21
     * @author: Pat
     */
    set $time(time) { 
        this.date.time = time;
        this.date.day = getDate("YYYY-mm-dd", CURRENT_DATE);
        this.$day = Math.floor(getDate("WW", CURRENT_DATE));
    }
    /**
     * @description: 生命周期钩子函数初始设置数据
     * @Date: 2020-11-06 15:25:28
     * @author: Pat
     */
    created() {
        this.setWeather();
        this.timr = setInterval(() => this.$time = getDate("HH:MM:SS", new Date()), 1000);
        this.weatherTimr = setInterval(() => this.setWeather(), 30 * 60 * 1000);
    }
    /**
     * @description: 设置天气信息
     * @Date: 2020-05-28 17:17:17
     * @author: Pat
     */
    async setWeather() {
        const { city: CURRENT_CITY, adcode: AD_CODE } = await getPostion(),
            WEATHERS = ["风", "霾", "雨", "雪", "尘", "雾", "沙"],
            REPS = ["大风", "雾霾", "暴雨", "暴雪", "雾", "雾", "扬沙"];
        if (AD_CODE) { 
            const { lives: LIVES_INFO } = await getWthrcdn(Math.floor(AD_CODE)),
                { city: DEFAULT_CITY_INFO } = this;
            this.getCityCoordinates(CURRENT_CITY)
            if (LIVES_INFO&& LIVES_INFO.length > 0) {
                const { temperature, weather } = LIVES_INFO[0];
                let wea = weather
                WEATHERS.map((item,index) => { 
                    if (item.indexOf(weather) >= 0) { 
                        wea = REPS[index]
                    }
                })
                set(DEFAULT_CITY_INFO, {weather,temperature,weatherPinyin:ConvertPinyin(wea,false)});
            }
        }
    }
    /**
     * @description: 获取城市经纬度
     * @param {string} cityName 城市名称
     * @return {string}
     * @Date: 2020-11-06 13:45:02
     * @author: Pat
     */
    async getCityCoordinates(cityName) {
        const CITY_NAME = cityName.replace(/\省|市|县/g, ""),{ status: STATUS, geocodes: GEO_CODES, count: COUNT } = await getCoordinates(CITY_NAME);
        let  updataCityObject = {};
        if (STATUS === "1" && COUNT > 0) {
            const {citycode: code, location, level, province, country, adcode:adCode } = GEO_CODES[0];
            updataCityObject = {name:CITY_NAME, USAName:ConvertPinyin(CITY_NAME), code, location, level, province, country, adCode}
        }
        set(this.city,updataCityObject);
    }
    /**
     * @description: 设置canvas标题
     * @param {*}
     * @return {*}
     * @Date: 2020-11-09 17:26:10
     * @author: Pat
     */
    setTitle() { 
        const doc = document.createDocumentFragment(),
            createCanvans = document.createElement("canvas")
        createCanvans.width = 1000
        createCanvans.height = 100

        const context = createCanvans.getContext("2d");
        const gradient = context.createLinearGradient(0, 0, 0, 100);
        context.font = '46px 方正正中黑简体';
        context.textAlign = 'center';
        context.textBaseline = 'bottom';
        gradient.addColorStop(0,'#d7e6ff');
        gradient.addColorStop(1, '#58dffc');
        context.fillStyle = gradient;
        
        context.fillText(amb.moduleName, 500, 70);

        context.font = '16px Arial';
        context.fillStyle = '#acb4c5';
        context.fillText(amb.moduleEname, 500, 90);
        doc.appendChild(createCanvans);
        return doc;
    }

    render() {
        const
            {
                bgImage,
                bgColor,
                left: { showDay, showWeek, showTime,jsx:leftJSX },
                right: { showPosition, showTemperature, showWeather,jsx:rightJSX },
                date: { time, day, week },
                city: {
                    name: CURRENT_CITY_NAME,
                    weather: CURRENT_CITY_WEATHER,
                    weatherPinyin: CURRENT_CITY_WEATHER_PINYIN,
                    temperature: CURRENT_CITY_TEMPERATURE
                }
            } = this;
		return (
                <div class={'vue-screen-title'} style={`background-image:url(${bgImage});background-color:${bgColor}`}>
                    <div class={"v-sc left"}>
                        {
                            (showDay => {
                                if (showDay) {
                                    return <div class={'icon time'}>{day}</div>
                                }
                            })(showDay)
                        }
                        {
                            (showWeek => {
                                if (showWeek) { 
                                    return <div class={'font'}>{week}</div>
                                }
                            })(showWeek)
                        }
                        {
                            (showTime => {
                                if (showTime) { 
                                    return <div class={'font'}>{time}</div>
                                }
                            })(showTime)
                        }
                        {
                            (jsx => {
                                if (jsx) { 
                                    return jsx()
                                }
                            })(leftJSX)
                        }
                    </div>
                    <div class={"v-sc center"} ref={"title"}>
                        <div class={"title"}>
                            <div class={"cn-title"}>{amb.moduleName}</div>
                            {
                                (function (USAName) { 
                                    if (USAName) {
                                        return <div class={"en-title"}>{USAName}</div>
                                    }
                                })(amb.moduleEname)
                            }
                        </div>
                    </div>
                    <div class={"v-sc right"}>
                        {
                            (showPosition => {
                                if (showPosition) {
                                    return <div class="icon position">{CURRENT_CITY_NAME}</div>
                                }
                            })(showPosition)
                        }
                        {
                            (showWeather => {
                                if (showWeather) {
                                    return (
                                        <div class={`font iconfont icon-${!CURRENT_CITY_WEATHER_PINYIN ? 'iconfont icon-shaoyun' : CURRENT_CITY_WEATHER_PINYIN}`}></div>
                                    )
                                }
                            })(showWeather)
                        }
                        {
                            (showWeather => {
                                if (showWeather) {
                                    return <div class={'font'}>{CURRENT_CITY_WEATHER}</div>
                                }
                            })(showWeather)
                        }
                        {
                            (showTemperature => {
                                if (showTemperature) {
                                    return <div class={'font'}>{CURRENT_CITY_TEMPERATURE}℃</div>
                                }
                            })(showTemperature)
                        }
                        {
                            (jsx => {
                                if (jsx) { 
                                    return jsx()
                                }
                            })(rightJSX)
                        }
                    </div>
                </div>
		);
	}

    destroyed() { 
        clearInterval(this.timr);
        clearInterval(this.weatherTimr);
        this.timr = 0;
        this.weatherTimr = 0;
    }
}