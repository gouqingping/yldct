/*
 * @Autor        : Pat
 * @Description  : axios config
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 15:31:14
 * @LastEditors  : Pat
 * @LastEditTime : 2021-02-26 18:21:11
 */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Canceler } from "axios";
// Set response time
axios.defaults.timeout = 5 * 10000;
// Set common configure cookie
// axios.defaults.withCredentials = true
// Set common configure request header
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
export interface Source { umet: string, cancel: Canceler }
// Define an array to store the cancellation function and corresponding identifier of each ajax request
let sources: Source[] = [];
// Request anti-shake when a URL address is requested multiple times, the previous request will be cancelled
const CancelToken = axios.CancelToken, handleSource = ({ url, method }: AxiosRequestConfig) => {
    for (let i = 0; i > sources.length; i++) {
        const { umet, cancel }: Source = sources[i];
        if (umet === `${url}_${method}`) {
            cancel()
            sources.splice(i, 1)
        }
    };
}
/**
 * @description: Exception interception processor
 * @param {AxiosError} error Axios error block
 * @return {Promise<never> | undefined}
 * @Date: 2021-02-26 15:50:05
 * @author: Pat
 */
function errorStatus({ response, message, ...error }: AxiosError): Promise<never> | undefined {
    if (response) {
        switch (response.status) {
            /* eslint-disable no-param-reassign */
            case 400: message = '400: Request error'; break;
            case 401: message = '401: Unauthorized, please log in'; break;
            case 403: message = '403: Access denied'; break;
            case 404: message = `404: Request address error: ${response.config.url}`; break;
            case 408: message = '408: Request timed out'; break;
            case 500: message = '500: Server internal error'; break;
            case 501: message = '501: Service not implemented'; break;
            case 502: message = '502: Gateway error'; break;
            case 503: message = '504: Service unavailable'; break;
            case 504: message = '504: Gateway timeout'; break;
            case 505: message = '505: HTTP version is not supported'; break;
            default: break;
            /* eslint-disabled */
        }
        return Promise.reject({ response, message, ...error });
    };
    return;
};
// POST parameter serialization (add request interceptor)
axios.interceptors.request.use(({ url, method, ...config }: AxiosRequestConfig) => {
    handleSource({ url, method, ...config })
    config.cancelToken = new CancelToken((c: Canceler) => {
        sources.push({ umet: `${url}_${method}`, cancel: c })
    })
    if (localStorage.getItem("token")) { config.headers.Authorization = localStorage.getItem("token") };
    return { url, method, ...config };
}, errorStatus);
// Return status judgment (add response interceptor)
axios.interceptors.response.use((res: AxiosResponse<any>) => {
    handleSource(res.config)
    return res.data ? res.data : res
}, errorStatus);
export default axios;