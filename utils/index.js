export const getCurrentPage = () => {
	let pages = getCurrentPages()
	return pages[pages.length - 1].route
}
