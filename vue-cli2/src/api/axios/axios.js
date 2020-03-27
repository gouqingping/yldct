/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 15:31:14
 * @LastEditors  : Pat
 * @LastEditTime : 2020-02-27 02:58:47
 */
import qs from 'qs'
import axios from 'axios'
import Storage from '@/assets/js/Storage.js'
import { Message, Loading } from 'element-ui'
// 响应时间
axios.defaults.timeout = 5 * 1000
// 配置cookie
// axios.defaults.withCredentials = true
// 配置请求头
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 配置接口地址
axios.defaults.baseURL = ''
var loadingInstance

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
	config => {
		loadingInstance = Loading.service({
			lock: true,
			background: 'rgba(0, 0, 0, 0.7)'
		})
		if (Storage.getItem('userInfo')) {
			config.headers.userRole = Storage.getItem('userInfo').userRole;
		}
		return config
	},
	err => {
		if (loadingInstance) {
			loadingInstance.close()
		}
		Message.error('请求错误')
		return Promise.reject(err)
	}
)

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
	res => {
		if (res.status == 200) {
			loadingInstance.close()
			return res.data
		} else {
			loadingInstance.close()
			Message.error(res.msg)
		}
	},
	err => {
		loadingInstance.close()
		//Message.error("链接服务器失败！请稍后再试。")
		return Promise.reject(err)
	}
)
// 发送请求
export function post(url, data) {
	return new Promise((resolve, reject) => {
		axios.post(url, qs.stringify(data))
			.then(res => {
				resolve(res)
			}, err => {
				reject(err)
			})
			.catch(err => {
				reject(err)
			})
	})
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function postJson(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (res) {
					resolve(res);
				}
			}, err => {
				reject(err)
			})
	})
}

export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, { params: params })
			.then(res => {
				resolve(res)
			})
			.catch(err => {
				reject(err)
			})
	})
}

export function uploadRequest(url, params) {
	return new Promise((resolve, reject) => {
		axios.create({
			withCredentials: true
		}).post(url, params).then(response => {
			resolve(response)
		}, err => {
			reject(err)
		}).catch((error) => {
			reject(error)
		})
	})
}


/**
 * 上传文件的请求
 * @param url
 * @returns {AxiosPromise}
 */
export function uploadFile(url, data) {
	return new Promise((resolve, reject) => {
		axios.create({
			withCredentials: true
		}).post(url, data, {
			headers: {
				"userRole": Storage.getItem('userInfo').userRole,
				'Content-Type': 'multipart/form-data'
			}
		}).then(response => {
			resolve(response)
		}, err => {
			reject(err)
		}).catch((error) => {
			reject(error)
		})
	})
};