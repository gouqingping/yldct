/*
 * @Autor        : Pat
 * @Description  : yldct axios api
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 15:31:14
 * @LastEditors  : Pat
 * @LastEditTime : 2020-12-29 14:52:43
 */
import axios from "axios";
// 响应时间
axios.defaults.timeout = 5 * 10000;
// 配置cookie
// axios.defaults.withCredentials = true
// 配置请求头
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 异常拦截处理器
const errorStatus = (error) => {
    if (error.response) { 
        const ERR_STATUS = error.response.status;
        switch (ERR_STATUS) {
            /* eslint-disable no-param-reassign */
            case 400: error.message = '请求错误'; break;
            case 401: error.message = '未授权，请登录'; break;
            case 403: error.message = '拒绝访问'; break;
            case 404: error.message = `请求地址出错: ${error.response.config.url}`; break;
            case 408: error.message = '请求超时'; break;
            case 500: error.message = '服务器内部错误'; break;
            case 501: error.message = '服务未实现'; break;
            case 502: error.message = '网关错误'; break;
            case 503: error.message = '服务不可用'; break;
            case 504: error.message = '网关超时'; break;
            case 505: error.message = 'HTTP版本不受支持'; break;
            default: break;
            /* eslint-disabled */
        }
        return Promise.reject(error);
    }
};

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(config => {
    if (localStorage.getItem("token")) {
        config.headers.Authorization = localStorage.getItem("token")
    };
    return config;
}, errorStatus);

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(res => {
    if (res.data) {
        return res.data;
    } else {
        return res;
    };
}, errorStatus);

export default axios;