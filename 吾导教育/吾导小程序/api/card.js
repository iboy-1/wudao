import request from '@/utils/request'

/**
 * 我的会员卡
 */
export function apiGetCard(form) {
	return request({
		url: 'member/v1/Home/meCard',
		method: 'GET',
		data: form
	})
}

/**
 * 根据场馆查可购买会员卡
 */
export function apiCardList(form) {
	return request({
		url: 'member/v1/Home/cardList',
		method: 'GET',
		data: form
	})
}

/**
 * 根据课程查会员卡
 */
export function apiMarkCardList(form) {
	return request({
		url: 'member/v1/Home/markCardList',
		method: 'GET',
		data: form
	})
}

/**
 * 购卡生成订单
 */
export function apiOrder(form) {
	return request({
		url: 'user/v1/Home/order',
		method: 'POST',
		data: form
	})
}