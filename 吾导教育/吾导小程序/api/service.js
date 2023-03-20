import request from '@/utils/request'

/**
 * 查询定制服务
 */
export function apiQueryCustomService(form) {
	return request({
		url: 'ljairport/v1/GxAirlines/queryCustomService',
		method: 'GET',
		data: form
	})
}

/**
 * 查询定制服务子项目
 */
export function apiQueryCustomServiceMince(form) {
	return request({
		url: 'ljairport/v1/GxAirlines/queryCustomServiceMince',
		method: 'GET',
		data: form
	})
}

/**
 * 查询定制服务子项目服务类型价目
 */
export function apiQueryCustomServiceMincePrice(form) {
	return request({
		url: 'ljairport/v1/GxAirlines/queryCustomServiceMincePrice',
		method: 'GET',
		data: form
	})
}

/**
 * 提交订单
 */
export function apiCheckOut(form) {
	return request({
		url: 'ljairport/v1/Order/checkOut',
		method: 'POST',
		data: form
	})
}

/**
 * 获取订单列表
 */
export function apiQueryMyOrderList(form) {
	return request({
		url: 'ljairport/v1/Order/queryMyOrderList',
		method: 'GET',
		data: form
	})
}

/**
 * 退款订单
 */
export function apiRefund(form) {
	return request({
		url: 'ljairport/v1/Order/refund',
		method: 'POST',
		data: form
	})
}

/**
 * 取消订单
 */
export function apiCancel(form) {
	return request({
		url: 'ljairport/v1/Order/cancel',
		method: 'POST',
		data: form
	})
}

/**
 * 取消订单
 */
export function apiQueryCustomServiceMinceFacilities(form) {
	return request({
		url: 'ljairport/v1/Admin/queryCustomServiceMinceFacilities',
		method: 'GET',
		data: form
	})
}

/**
 * 逾重行李下单
 */
export function apiExcessBaggage(form) {
	return request({
		url: 'ljairport/v1/Order/excessBaggage',
		method: 'POST',
		data: form
	})
}


/**
 * 逾重行李下单
 */
export function apiQueryExcessBaggageList(form) {
	return request({
		url: 'ljairport/v1/OrderManage/queryExcessBaggageList',
		method: 'GET',
		data: form
	})
}