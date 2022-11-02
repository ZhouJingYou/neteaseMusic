import request from './request'

export function topListDetail(data) {
	return request.get('/toplist/detail', data)
}
export function playlistDetail(data) {
	return request.get('/playlist/detail', data)
}

export function songDetail(data) {
	return request.get('/song/detail', data)
}
export function songUrl(data) {
	return request.get('/song/url', data)
}
export function lyric(data) {
	return request.get('/lyric', data)
}
