<template>
	<view class="page">
		<view class="head"></view>
		<view>
			<view class="title">需要您的授权</view>
			<view class="content">为了给您提供更好的服务，需要绑定您的手机号码</view>
		</view>
		<view>
			<view class="btn-box">
				<button type="default" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="getPhoneNumber" class="commit-btn">确认授权</button>
			</view>
			<image src="../../static/bind_phone.png" class="bottom-img" mode=""></image>
		</view>
	</view>
</template>

<script>
	import { apiUpdateUser } from '@/api/user.js'
	export default {
		data() {
			return {
				openid:'',
				session_key:'',
				encryptedData:'',
				iv:''
			}
		},
		onLoad() {

		},
		methods: {
			getPhoneNumber(e){
				this.iv = e.detail.iv
				this.encryptedData = e.detail.encryptedData
				if(e.detail.errMsg == "getPhoneNumber:ok"){
					this.getUserInfo()
				}else{
				}
			},
			getUserInfo(){
				let token = uni.getStorageSync('token')
				let _this = this
				uni.showLoading({
					title:'正在绑定'
				})
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						_this.getOpnenid(loginRes.code)
					},
					fail(err) {
						console.log('err1')
						uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: '获取用户手机号失败'
						})
						setTimeout(function(){
							uni.switchTab({
								url: '../index/index'
							})
						},1300)
					}
				});
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
						console.log(res)
						let res1 = JSON.parse(res.data)
						console.log(res1)
						_this.session_key = res1.session_key
						_this.openid = res1.openid
						_this.register()
					},
					fail(err) {
						console.log('err2')
						uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: '获取用户手机号失败'
						})
						setTimeout(function(){
							uni.switchTab({
								url: '../index/index'
							})
						},1300)
					}
				})
			},
			register(){//获取手机号
				let token = uni.getStorageSync('token')
				let _this = this
				uni.request({
					// url: 'https://wudao.gxhxinfo.com/login/v1/ApiUserLogin/getWeChatPhone',
					url: 'https://keep.gxhxinfo.com/login/v1/ApiUserLogin/getWeChatPhone',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Authorization':token
					},
					data: {
						encryptedData: encodeURIComponent(this.encryptedData),
						iv: encodeURIComponent(this.iv),
						sessionKey: this.session_key,
					},
					success: (res) => {
						if(res.data.phoneNumber){
							console.log(res.data.phoneNumber)
							this.changeUserPhone(res.data.phoneNumber)
						}else{
							uni.hideLoading()
							uni.showToast({
								icon:'none',
								title:'授权失败请稍后再试'
							})
						}
					},
					fail(err) {
						uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: '获取用户手机号失败'
						})
						setTimeout(function(){
							uni.switchTab({
								url: '../index/index'
							})
						},1300)
					}
				})
			},
			changeUserPhone(phone){
				let userInfo = uni.getStorageSync('userInfo')
				apiUpdateUser({
					id:userInfo.id,
					phone:phone,
				}).success(res=>{
					if(res.code == '200'){
						uni.hideLoading()
						uni.showToast({
							icon:'success',
							title:'完善成功'
						})
						userInfo.phone = phone
						uni.setStorageSync('userInfo',userInfo)
						uni.switchTab({
							url:'../index/index'
						})
					}else{
						uni.hideLoading()
						uni.showToast({
							icon:'none',
							title:res.data
						})
					}
				}).fail(err=>{
					uni.hideLoading()
					uni.showToast({
						icon:'none',
						title:'更新失败请稍后再试'
					})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		width: 100%;
		height: 100vh;
		background-color: #F3F9FF;
		position: fixed;
		padding-top: 80rpx;
		box-sizing: border-box;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.head{
			height: 100rpx;
		}
		.bottom-img{
			width: 100%;
			height: 800rpx;
		}
		.title{
			font-size: 40rpx;
			color: #000000;
			font-weight: bold;
			text-align: center;
		}
		.content{
			font-size: 30rpx;
			color: #000000;
			text-align: center;
			margin-top: 20rpx;
		}
		.btn-box{
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 30rpx;
			.commit-btn{
				width: 400rpx;
				border-radius: 10rpx;
				height: 100rpx;
				text-align: center;
				background-color: #D71418;
				color: #fff;
				line-height: 100rpx;
				font-size: 36rpx;
				font-weight: bold;
			}
		}
	}
</style>
