<template>
	<view class="page">
		<view class="model" v-if="ismodel"></view>
		<view class="box" v-if="ismodel">
			<view class="button1" @click="Help">点击为好友助力</view>
		</view>
	</view>
</template>

<script>
	import { apiMemberActivityHaggle } from '@/api/user.js'
	export default{
		data(){
			return{
				help_id:'',
				haggle_id:'',
				ismodel:false
			}
		},
		onLoad(option) {
			let userid = uni.getStorageSync('userid')
			if (!userid) {
				uni.showModal({
					title: '提示',
					content: '您还未登录,请先登录~',
					cancelText: '我再逛逛',
					confirmText: '立即登录',
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '../account/account?'
							})
						} else if (res.cancel) {
			
						}
					}
				});
			}else{
				if(option.id&&option.activity_id&&option.ismodel==1){
					this.help_id = option.id
					this.haggle_id = option.activity_id
					this.ismodel = true
				}
			}
			
		},
		methods:{
			Help(){
				let user_id = uni.getStorageSync('userid')
				apiMemberActivityHaggle({
					haggle_id:this.haggle_id,
					help_id:this.help_id,
					user_id:user_id
				}).success(res=>{
					if(res.code==200){
						uni.showToast({
							icon:'success',
							title:res.data
						})
						setTimeout(function(){
							uni.switchTab({
								url:'../index/index'
							})
						},800)
					}else{
						uni.showToast({
							icon:'none',
							title:res.data
						})
						console.log(res.data)
					}
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss">
	.button{
		width: 702rpx;
		margin: 24rpx;
		height: 88rpx;
		background: #3091F2;
		border-radius: 10rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
	.model{
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 100vh;
		background: rgba(0,0,0,0.6);
	}
	.box{
		width: 554rpx;
		padding: 24rpx;
		height: 452rpx;
		background: #FFFFFF;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		.button1{
			position: absolute;
			bottom: 24rpx;
			left: 24rpx;
			width: 554rpx;
			// margin: 24rpx;
			height: 88rpx;
			background: #3091F2;
			border-radius: 10rpx;
			text-align: center;
			line-height: 88rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
</style>
