import BASE_URL from './BASE_URL.js';
import {
	getStorage
} from '../common/js/storage';
var util = require('@/common/util.js')
import utilMd5 from '@/common/js/wechat-app/md5.js'

const request = (opt) => {
	console.log(opt)
	var ApiUrl = BASE_URL;
	var token = uni.getStorageSync('token');
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
			
			let random = Math.random()
			if(random >= 1){
				random = parseInt(random*100000000000)+''
			}else{
				random = parseInt(random*1000000000000)+''
			}
			let time = Math.round(new Date() / 1000) + ''
			let token = uni.getStorageSync('token')
			let strData = "lvdunyun"+ time +random+token+"lvdunyun"
			let sha1Str = util.sha1(strData)
			opt.data.timestamp = time
			opt.data.randomstr = random
			opt.data.sign = utilMd5.hexMD5(sha1Str)
			opt = opt || {};
			opt.url = opt.url || '';
			opt.data = opt.data || null;
			opt.method = opt.method || 'GET';
			opt.header = {
				// 'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/x-www-form-urlencoded', //设置跨域头部    
				// "content-type": "text/html; charset=UTF-8",
				"Authorization": token
			};
			opt.success = opt.success || function() {};
			opt.fail = opt.fail || function() {};
			uni.request({
				url: ApiUrl + opt.url,
				data: opt.data,
				method: opt.method,
				header: opt.header,
				dataType: 'json',
				success: function(res) {
					// Log(ApiUrl + opt.url,opt.data,res)
					if (res.data.code == 200) {
						opt.success(res.data);
					} else if (res.data.code == 400) {
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
						if(res.data.data=='No token' || res.data.msg=='invalid' || res.data.msg=='Expired'){
							uni.showToast({
								title: '登录过期请重新登录',
								icon: 'none',
							})
							setTimeout(function(){
								uni.clearStorageSync()
								uni.redirectTo({
									url:'/pages/authorization/authorization'
								})
							},1200)
							opt.fail(res.data);
						}else{
							uni.showToast({
								icon:'none',
								title:res.data.msg
							})
							opt.success(res.data);
						}
					} else if (parseInt(res.data.code) >= 700) {
						uni.showToast({
							title: '登录过期请重新登录',
							icon: 'none'
						})
						uni.clearStorageSync()
						uni.redirectTo({
							url: '/pages/login/index.vue'
						})
					} else if (res.data.code == 201){
						opt.fail(res.data);
					}else{
						opt.success(res.data);
					}

				},
				fail: function(error) {
					// Log(ApiUrl + opt.url,opt.data,error)
					if (error.statusCode == 400) {
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
						setTimeout(function(){
							uni.clearStorageSync()
							uni.redirectTo({
								url:'/pages/authorization/authorization.vue'
							})
						},300)
					}
					opt.fail(error);
				},
				complete(res) {
					
				}
			})
		}
	})
	var returnObj = {}; // 返回的对象
	returnObj.success = function(callback) {
		opt.success = callback; // 变更回调
		return returnObj;
	}
	returnObj.fail = function(callback) {
		opt.fail = callback;
		return returnObj;
	}
	return returnObj

}

function Log(url,params,option){
	let userid = uni.getStorageSync('userid')
	if(!userid){
		userid = '游客'
	}
	uni.request({ 
		url: BASE_URL + 'ljairport/v1/Journal/record',
		data: {
			url:url,
			content:JSON.stringify(params),
			return_result:JSON.stringify(option),
			operator:userid
		},
		method: 'POST',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded', //设置跨域头部   
		},
		dataType: 'json',
		success: function(res) {
		},
		fail: function(error) {
			
		},
	})
}


export default request;
