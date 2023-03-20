import request from '@/utils/request'

/**
 * 获取老师列表
 */
export function apiGetTeacher(param) {
	return request({
		url: 'teacher/v1/Home/query',
		method: 'GET',
		data: param
	})
}

/**
 * 获取老师详情
 */
export function apiGetTeacherDetail(param) {
	return request({
		url: 'teacher/v1/Home/teacherDetail',
		method: 'GET',
		data: param
	})
}
