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
// 响应时间
//axios.defaults.timeout = 5 * 10000
// 配置cookie
// axios.defaults.withCredentials = true
// 配置请求头
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 配置接口地址
axios.defaults.baseURL = ''

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
	config => {
		if (localStorage.getItem("token")) {
			config.headers.Authorization = localStorage.getItem("token")
		}
		return config
	},
	err => {
		return Promise.reject(err)
	}
)

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
	res => {
		return res.data
	},
	err => {
		//Message.error("链接服务器失败！请稍后再试。")
		return Promise.reject(err)
	}
)
// 发送请求
export function post(url, data) {
	return new Promise((resolve, reject) => {
		//console.log(type != "formData" ? qs.stringify(data) : data)
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

// 发送请求
export function put(url, data) {
	return new Promise((resolve, reject) => {
		axios.put(url, data, {
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => {
			resolve(res)
		}, err => {
			reject(err)
		}).catch(err => {
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
		}).then(res => {
			if (res) {
				resolve(res);
			}
		}, err => {
			reject(err)
		})
	})
}

export function get(url, params, headers) {
	return new Promise((resolve, reject) => {
		axios.get(url, { params: params }, headers)
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
	let Authorization = ""
	if (localStorage.getItem("token")) {
		Authorization = localStorage.getItem("token")
	}
	return new Promise((resolve, reject) => {
		axios.create({
			withCredentials: true
		}).post(url, data, {
			headers: {
				"Authorization": Authorization,
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