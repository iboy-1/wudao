import request from '@/utils/request'

/**
 * 用户登录
 */
export function apiLogin(form) {
	return request({
		url: 'login/v1/ApiUserLogin/login',
		method: 'POST',
		data: form
	})
}

/**
 * 用户基本信息
 */
export function apiUserDetail(form) {
	return request({
		url: 'user/v1/Home/userDetail',
		method: 'GET',
		data: form
	})
}

/**
 * 编辑用户基本信息
 */
export function apiUserDetailEdit(form) {
	return request({
		url: 'user/v1/Home/userDetailEdit',
		method: 'POST',
		data: form
	})
}

/**
 * 意见反馈
 */
export function apiFeedback(form) {
	return request({
		url: 'feedback/v1/Home/add',
		method: 'POST',
		data: form
	})
}

/**
 * 获取公告列表
 */
export function apiArticleGroup(form) {
	return request({
		url: 'article/v1/Home/articleGroup',
		method: 'GET',
		data: form
	})
}

/**
 * 获取公告内容
 */
export function apiArticleContents(form) {
	return request({
		url: 'article/v1/Home/articleContents',
		method: 'GET',
		data: form
	})
}

/**
 * 查询预约课程
 */
export function apiMemberMakeList(form) {
	return request({
		url: 'user/v1/Home/memberMakeList',
		method: 'GET',
		data: form
	})
}

/**
 * 完善手机号
 */
export function apiUpdateUser(form) {
	return request({
		url: 'login/v1/ApiUserLogin/update',
		method: 'POST',
		data: form
	})
}

/**
 * 获取会员协议
 */
export function apiAgreement(form) {
	return request({
		url: 'article/v1/Home/agreement',
		method: 'GET',
		data: form
	})
}

/**
 * 获取我的视频
 */
export function apiMemberVideo(form) {
	return request({
		url: 'user/v1/Home/memberVideo',
		method: 'GET',
		data: form
	})
}

/**
 * 提交评论
 */
export function apiCommentReply(form) {
	return request({
		url: 'member/v1/Home/commentReply',
		method: 'POST',
		data: form
	})
}

/**
 * 转卡记录
 */
export function apiTransferCardList(form) {
	return request({
		url: 'member/v1/Home/transferCardList',
		method: 'GET',
		data: form
	})
}

/**
 * 获取活动列表
 */
export function apiGatActivity(form) {
	return request({
		url: 'activity/v1/Home/gatActivity',
		method: 'GET',
		data: form
	})
}

/**
 * 获取活动详情
 */
export function apiGatActivityDetail(form) {
	return request({
		url: 'activity/v1/Home/gatActivityDetail',
		method: 'GET',
		data: form
	})
}

/**
 * 获取我的活动列表
 */
export function apiMemberActivity(form) {
	return request({
		url: 'activity/v1/Home/memberActivity',
		method: 'GET',
		data: form
	})
}

/**
 * 获取全民砍价活动详情
 */
export function apiGatActivityDetailHaggle(form) {
	return request({
		url: 'activity/v1/Home/gatActivityDetailHaggle',
		method: 'GET',
		data: form
	})
}

/**
 * 报名全民砍价活动详情
 */
export function apiActivityRegistrationHaggle(form) {
	return request({
		url: 'activity/v1/Home/activityRegistrationHaggle',
		method: 'POST',
		data: form
	})
}

/**
 * 助力全民砍价
 */
export function apiMemberActivityHaggle(form) {
	return request({
		url: 'activity/v1/Home/memberActivityHaggle',
		method: 'POST',
		data: form
	})
}
 
/**
 * 助力列表
 */
export function apiGatHaggleJoin(form) {
	return request({
		url: 'activity/v1/Home/gatHaggleJoin',
		method: 'GET',
		data: form
	})
}