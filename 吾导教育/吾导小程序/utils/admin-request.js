import BASE_URL from './admin-base-url.js';
import { getStorage } from '../common/js/storage';

const request = (opt) => {
	var ApiUrl = BASE_URL;
	var token;
	getStorage({
		key: '',
		success: function(res) {
			// if(typeof(res.data) != 'undefined') {
			// 	token = res.data
			// }else{
			// 	token = 'z031_token'
			// }
		},
		fail: function() {
			// token = 'z031_token';
		},
		complete: function() {
			opt = opt || {}; 
			opt.url = opt.url || ''; 
			opt.data = opt.data || null; 
			opt.method = opt.method || 'GET'; 
			opt.header = { 
				'Content-Type':'application/x-www-form-urlencoded' //设置跨域头部    
				// "content-type": "text/html; charset=UTF-8",
				// "Authorization": "Bearer" + ' ' + token
			}; 
			opt.success = opt.success || function () {}; 
			opt.fail = opt.fail || function () {}; 
			uni.request({ 
				url: ApiUrl + opt.url, 
				data: opt.data, 
				method: opt.method, 
				header: opt.header, 
				dataType: 'json', 
				success: function (res) {
					if (res.data.code==200) {
						opt.success(res.data);
					}
					else if(res.data.code==401) {
						// var page = getCurrentPages().length;
						// if(page==1) {
						// 	uni.navigateTo({
						// 		url: "/pages/login-register/login/login"
						// 	})
						// }else{
						// 	uni.redirectTo({
						// 		url: "/pages/login-register/login/login"
						// 	})
						// }
						// opt.fail(res.data);
					}else{
						opt.fail(res.data);
					}
					
				}, 
				fail: function (error) {
					if(error.statusCode==401) {
						// var page = getCurrentPages().length;
						// if(page==1) {
						// 	uni.navigateTo({
						// 		url: "/pages/login-register/login/login"
						// 	})
						// }else{
						// 	uni.redirectTo({
						// 		url: "/pages/login-register/login/login"
						// 	})
						// }
					}
					opt.fail(error);
				},
			})
		}
	})
	var returnObj = {}; // 返回的对象
	returnObj.success = function (callback) {
		opt.success = callback; // 变更回调
		return returnObj;
	}
	returnObj.fail = function (callback) {
		opt.fail = callback;
		return returnObj;
	}
	return returnObj
	
}


export default request;