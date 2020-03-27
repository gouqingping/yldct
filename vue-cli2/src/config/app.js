/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 15:31:14
 * @LastEditors  : Pat
 * @LastEditTime : 2020-02-23 22:44:06
 */
const api = require('@/init/api.js');
const sys = require('@/init/sys.js');
const amb = require(`@/init/amb.js`);
const loginName = `${sys.type == 'education' ? "单位" : "单位"}服务系统`
const loginEname = `${amb.moduleEname} Epidemic Prevention and Control Tracking Service Platform`
let appConfig = {
    // 项目启动IP
    host: '0.0.0.0',
    buildName: !amb.buildName ? "qy" : amb.buildName,
    // 项目启动端口
    port: 8089,
    //预请求缓存1天内
    cacheTime: 1800000,
    // 设置路由模式
    // hash or history
    router_mode: 'hash',
    proxyTable: {},
    user: null,
    sysType: sys.type,
    loginName: loginName,
    loginCname: amb.moduleName,
    moduleName: sys.type == 'education' ? "学校" : "单位",
    name: `${amb.moduleName}疫情防控跟踪服务平台·${loginName}`,
    loginEname: loginEname,
    ename: `${loginEname} · ${sys.type == 'education' ? "School" : "Enterprise"} Service System`,
}
for (let i in api) {
    appConfig[i] = api[i]
}
module.exports = appConfig