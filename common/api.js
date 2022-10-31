import request from './request'

export function topList(data) {
	return request.get('/toplist/detail', data)
}
