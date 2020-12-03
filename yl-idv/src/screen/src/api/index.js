/*
 * @Autor        : Pat
 * @Description  : screen api
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-11-06 10:52:00
 * @LastEditors  : Pat
 * @LastEditTime : 2020-11-06 13:44:11
 */
import ylAxios from "@/api/axios/index.js"
const { amapKey } = require("@/init/amb.js")
/**
 * @description: 获取天气信息
 * @param {string} city
 * @return {Promise}
 * @Date: 2020-11-06 13:34:00
 * @author: Pat
 */
export async function getWthrcdn(city) {
    return await ylAxios("get",`https://restapi.amap.com/v3/weather/weatherInfo`, {
        city: city,
        key: amapKey?amapKey:'67438bba221815f4cbda87849c79bc21'
    })
}
/**
 * @description: 获取IP地址定位
 * @return {Promise}
 * @Date: 2020-11-06 13:34:00
 * @author: Pat
 */
export async function getPostion() {
    return await ylAxios("get",`https://restapi.amap.com/v3/ip`, { key: amapKey?amapKey:'67438bba221815f4cbda87849c79bc21' })
}
/**
 * @description: 根据地址获取获取经纬度
 * @param {string} address
 * @return {Promise}
 * @Date: 2020-11-06 13:34:00
 * @author: Pat
 */
export async function getCoordinates(address) {
    return await ylAxios("get",`http://restapi.amap.com/v3/geocode/geo`, {
        address,
        key: amapKey?amapKey:'67438bba221815f4cbda87849c79bc21'
    })
}