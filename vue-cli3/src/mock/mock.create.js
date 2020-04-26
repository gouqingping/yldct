/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-04-26 14:39:14
 * @LastEditors  : Pat
 * @LastEditTime : 2020-04-26 15:27:39
 */
const Mock = require('mockjs');
import * as MockList from './index';
import amb from "@/init/amb.js";
/*
* rurl接口名
* rtype是接口方式post/get
* template是数据模板
* cb用于生成响应数据的函数。
* */
//这个函数还没做好内部的判断和验证，以及post的处理
const MockCreate = (rurl, rtype, template, cb) => {
    //用来判断是否有返回函数的方法，生成相应数据
    const judgeCb = (meRurl, rtype, template, cb) => {
        switch (typeof cb) {
            case undefined || "undefined":
                return Mock.mock(meRurl, rtype, template)
            default:
                return Mock.mock(meRurl, rtype, cb)
        }
    }
    //如果连接地址是一个数组
    if (rurl instanceof Array === true) {
        rurl.map((i, j) => {
            let meRurl = new RegExp(i);
            judgeCb(meRurl, rtype, template, cb)

        })
        return;
    }
    let meRurl = new RegExp(rurl);
    judgeCb(meRurl, rtype, template, cb)

}
//遍历接口列表
if (amb.mock) {
    console.log("%c启用mock接口%c", "color:red;font-weight:bold", "color:black;")
    Object.keys(MockList).map((i, j) => {
        MockCreate(
            MockList[i].rurl,
            MockList[i].rtype,
            MockList[i].template,
            MockList[i].cb)
    })
}
