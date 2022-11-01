import request from './request'

export function topList(data) {
	return request.get('/toplist/detail', data)
}
export function topDetail(data) {
	return request.get('/playlist/detail', data)
}
