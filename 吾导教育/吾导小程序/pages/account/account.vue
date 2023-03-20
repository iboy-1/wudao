<template>
	<view class="page">
		<!-- #ifdef H5 -->
		<view class="box">
			<view class="item">
				<view class="item_text">手机号：</view>
				<input type="number" />
			</view>
			<view class="item">
				<view class="item_text">校验码：</view>
				<input type="text" />
				<!-- <image></image> -->
			</view>
			<view class="item">
				<view class="item_text">验证码：</view>
				<input type="number" />
				<view class="getCode">获取验证码</view>
			</view>
			<view class="items">
				<radio></radio>
				<view class="agree">同意<text>《会员协议》</text></view>
			</view>
			<view class="button" @click="toLogin">登录</view>
			<!-- <button class='bottom' type='primary' lang="zh_CN" @click="getUserInfo">
				授权登录
			</button> -->
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view>
			<view>
				<view class='header'>
					<image src='../../static/logo.jpg' mode="aspectFill"></image>
				</view>
		
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像等)</text>
				</view>
		
				<button class='bottom' type='primary' lang="zh_CN" @click="getUserInfo">
					授权登录
				</button>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import { apiLogin } from '@/api/user.js'
	export default{
		data(){
			return{
				shareId:'',
				activity_id:''
			}
		},
		onLoad(option) {
			// if(option.shareId&&option.activity_id){//邀请新用户
			// 	this.shareId = option.shareId
			// 	this.activity_id = option.activity_id
			// }
			// this.isWeixin = this.isWechat()
			// console.log(this.isWeixin)
			// if(this.isWeixin){
			// 	this.checkWeChatCode()//通过微信官方接口获取code之后，会重新刷新设置的回调地址【redirect_uri】
			// }
		},
		methods:{
			getUserInfo(e){
				let _this = this
					uni.showLoading({
						title:'正在登录'
					})
					uni.getUserProfile({
						desc: 'Weixin', // 这个参数是必须的
						success: res => {
							_this.userInfo = res.userInfo
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log(loginRes.code)
									_this.getOpnenid(loginRes.code)
								},
								fail(err) {
									console.log('err1'+err)
									uni.hideLoading()
									uni.showToast({
										icon: 'none',
										title: '获取用户信息失败'
									})
									setTimeout(function(){
										uni.switchTab({
											url: '../index/index'
										})
									},1300)
								}
							});
					
						},
						fail: err => {
							console.log(err)
							uni.hideLoading()
							uni.showToast({
								icon: 'none',
								title: '获取用户信息失败'
							})
							setTimeout(function(){
								uni.switchTab({
									url: '../index/index'
								})
							},1300)
						}
					})
				
			},
			getOpnenid(code){
				let token = uni.getStorageSync('token')
				let _this = this
				uni.request({
					// url: 'https://wudao.gxhxinfo.com/login/v1/ApiUserLogin/getWeChatOpnenid',
					url: 'https://keep.gxhxinfo.com/login/v1/ApiUserLogin/getWeChatOpnenid',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Authorization':token
					},
					data: {
						code: code
					},
					success: (res) => {
						console.log(res.data)
						let res1 = JSON.parse(res.data)
						_this.openid = res1.openid
						console.log(_this.openid)
						_this.register()
					}
				})
			},
			register(){
				console.log(this.userInfo)
				let scene = uni.getStorageSync('scene')
				let my_superior = ''
				let code = ''
				let attribute = ''
				apiLogin({
					my_superior:my_superior,
					code:code,
					attribute:attribute,
					registertype:'thirdparty',
					lr_type:'wechatapp',
					openid:this.openid,
					avatarUrl:this.userInfo.avatarUrl,
					city:this.userInfo.city,
					country:this.userInfo.country,
					gender: this.userInfo.gender,
					language: this.userInfo.language,
					nickName: this.userInfo.nickName,
					province: this.userInfo.province,
					// user_id:this.shareId,
					// activity_id:this.activity_id
				}).success(res=>{
					console.log(res)
					if(res.code == 200){
						let _this = this
						wx.getSystemInfo({
							success: res => {
								let modelmes = res.model;
								let isIphone = false
								let iphoneArr = ['iPhone X', 'iPhone XR', 'iPhone XS', 'iPhone XS MAX', 'iPhone 11', 'iPhone 11 Pro',
									'iPhone 11 Pro Max', 'iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Pro Max'
								]
								iphoneArr.forEach(function(value) {
									if (modelmes.search(value) != -1) {
										isIphone = true
									}
								})
								uni.setStorageSync('isIphone', isIphone)
							}
						})
						if(res.debug.AppDebug){
							let AppDebug
							if(Object.prototype.toString.call(res.debug.testUser) === '[object Object]'){
								for(let key in res.debug.testUser){
									if(res.data.userdata[0].id == res.debug.testUser[key]){
										AppDebug = true
									}
								}
								if(!AppDebug){
									uni.setStorageSync('AppDebug',false)
								}else{
									uni.setStorageSync('AppDebug',AppDebug)
								}
							}else{
								uni.setStorageSync('AppDebug',false)
							}
						}else{
							uni.setStorageSync('AppDebug',false)
						}
						uni.hideLoading()
						uni.setStorageSync('token', res.data.userdata[0].token)
						uni.setStorageSync('userid', res.data.userdata[0].id)
						uni.setStorageSync('userInfo', res.data.userdata[0])
						uni.setStorageSync('couponMemuShow',true)
						uni.setStorageSync('luckyAuthority',true)
						uni.setStorageSync('openid',_this.openid)
								
						if(res.data.userdata[0].attribute == '1' && res.data.userdata[0].phone=='-1'){
							uni.reLaunch({
								url:'./bind-phone'
							})
						}else{
							uni.switchTab({
								url:'../index/index'
							})
						}
					}
					uni.hideLoading()
				}).fail(err=>{
					uni.hideLoading()
					uni.showToast({
						icon:'none',
						title:err.data.msg
					})
					setTimeout(function(){
						uni.switchTab({
							url:'../index/index'
						})
					},1200)
				})
			},
			// 公众号登录
			isWechat() {
				return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
			},
			checkWeChatCode() {
				let code = this.getUrlCode('code')
				uni.showToast({
					title:`微信code=${code}`
				})
				if (code) {
					this.getOpenidAndUserinfo(code)
				}
			},
			getUrlCode() {
				// 截取url中的code方法
				var url = location.href; //获取打开的公众号的路径
				let winUrl = url;
				var theRequest = new Object();
				if (url.indexOf('?') != -1) {
					var str = url.substr(url.indexOf('?') + 1);
					var strs = str.split('&');
					for (var i = 0; i < strs.length; i++) {
						var items = strs[i].split('=');
						theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
					}
				}
				return theRequest;
			},
			toLogin(){
				// let local = encodeURIComponent(window.location.href); //获取当前页面地址作为回调地址
				let local = 'https://wudao.gxhxinfo.com/wechat/v1/Info/gongZhongHaoRedirect'
				console.log(local)
				let appid = 'wx7529c4793ca0ede6'
				window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + local + "&response_type=code&scope=snsapi_userinfo#wechat_redirect";
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		width: 750rpx;
		margin: 0 auto;
	}
	.box{
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		
		.item{
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 100%;
			padding: 20rpx 0;
			border-top: 2rpx solid #cccccc;
			font-size: 24rpx;
			
			.item_text{
				color: #999999;
			}
			
			input{
				flex: 1;
			}
			
			.getCode{
				padding: 0 15rpx;
				border-left: 2rpx solid #cccccc;
				font-size: 24rpx;
			}
			
		}
		.items{
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 100%;
			padding: 40rpx 0;
			border-top: 2rpx solid #cccccc;
			font-size: 24rpx;
			
			.agree{
				margin-left: 20rpx;
			}
		}
		.button{
			width: 100%;
			height: 80rpx;
			border-radius: 10rpx;
			background-color: #3a3c48;
			color: #FFFFFF;
			text-align: center;
			line-height: 80rpx;
		}
	}
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}
	  
	.header image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}
	  
	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}
	  
	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}
	  
	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
