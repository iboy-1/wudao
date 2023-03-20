import request from '@/utils/request'

/**
 * 接送服务下单
 */
export function apiWXPay(form) {
	return request({
		url: 'pay/v1/Payment/PayPortal',
		method: 'POST',
		data: form
	})
}
