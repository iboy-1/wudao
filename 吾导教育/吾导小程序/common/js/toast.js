var toast = {
	success(msg) {
		uni.showToast({
			title: msg,
			icon: 'success',
			duration: 1200
		})
	},
	fail(msg) {
		uni.showToast({
			title: msg,
			icon: 'none',
			duration: 1200
		})
	},
	error() {
		uni.showToast({
			title: '数据加载错误',
			icon: 'none',
			duration: 1200
		})
	}
}
export default toast;