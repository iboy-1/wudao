import request from '@/utils/request'

/**
 * 根据日期场馆查课程
 */
export function apiGetAppointment(param) {
	return request({
		url: 'member/v1/Home/appointment',
		method: 'GET',
		data: param
	})
}

/**
 * 查询场馆列表
 */
export function apiGetVenueList(param) {
	return request({
		url: 'member/v1/Home/venueList',
		method: 'GET',
		data: param
	})
}

/**
 * 根据会员卡查7天课程
 */
export function apiSupportCourse(param) {
	return request({
		url: 'member/v1/Home/supportCourse',
		method: 'GET',
		data: param
	})
}

/**
 * 根据课程查会员卡
 */
export function apiCourseCardMark(param) {
	return request({
		url: 'member/v1/Home/courseCardMark',
		method: 'GET',
		data: param
	})
}

/**
 * 预约课程
 */
export function apiMakeCourse(param) {
	return request({
		url: 'user/v1/Home/makeCourse',
		method: 'POST',
		data: param
	})
}

/**
 * 课程签到
 */
export function apiMarkCourseSign(param) {
	return request({
		url: 'member/v1/Home/markCourseSign',
		method: 'POST',
		data: param
	})
}