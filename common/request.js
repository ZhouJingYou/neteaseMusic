import {
	baseUrl
}
from './config'

function request(url, data, method) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			data,
			method,
			header: {
				'content-type': 'application/json;charset=UTF-8',
			},
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		})
	}).catch((err) => {
		uni.showToast({
			title: '网络异常',
			icon: 'none',
			duration: 2000
		})
	})
}
const get = (url, data) => request(url, data, 'get')
const post = (url, data) => request(url, data, 'post')
export default {
	get,
	post
}
