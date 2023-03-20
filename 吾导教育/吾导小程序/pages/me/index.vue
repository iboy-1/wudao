<template>
	<view class="page">
		<ls-skeleton :animate="animate" :skeleton="skeleton" :loading="loading" ref="skeleton">
		<view class="header">
			<view class="user-logo">
				<image :src="userInfo.avatar" mode="" class="head"></image>
			</view>
			<view class="username">{{userInfo.nikanme}}</view>
			<view class="user-phone" v-if="userInfo.phone!='-1'">{{userInfo.phone}}</view>
			<view class="myInfo">
				<view class="box" v-for="(item,index) in myInfo" :key="index" @click="goNext(index)">
					<image :src="item.img"></image>
					<view class="title">{{item.title}}</view>
				</view>
			</view>
		</view>
		<view class="me">
			<view class="me_item" @click="goNext(5)">
				<image src="../../static/data.png" class="left_img"></image>
				<view class="right">
					<text>账号资料</text>
					<image src="../../static/left.png" class="right_img"></image>
				</view>
			</view>
			<view class="me_item" @click="goNext(3)">
				<image src="../../static/icon_4.png" class="left_img"></image>
				<view class="right">
					<text>训练建议</text>
					<image src="../../static/left.png" class="right_img"></image>
				</view>
			</view>
			<view class="me_item" style="border-bottom: none;" @click="goNext(4)">
				<image src="../../static/icon_5.png" class="left_img"></image>
				<view class="right" style="border-bottom: none;">
					<text>健身报告</text>
					<image src="../../static/left.png" class="right_img"></image>
				</view>
			</view>
			<!-- <view class="me_item" style="border-bottom: none;" @click="goNext(6)">
				<image src="../../static/icon_5.png" class="left_img"></image>
				<view class="right" style="border-bottom: none;">
					<text>转卡记录</text>
					<image src="../../static/left.png" class="right_img"></image>
				</view>
			</view> -->
		</view>
		</ls-skeleton>
		<aui-loading ref="auiLoading" :show="true" :type="3" :mask="true"></aui-loading>
	</view>
</template>

<script>
	import lsSkeleton from '@/components/ls-skeleton/ls-skeleton.nvue';
	import auiLoading from '@/components/aui-loading/aui-loading.vue';
	export default{
		components: {
			lsSkeleton,
			auiLoading
		},
		data(){
			return{
				animate: true,
				loading: true,
				skeleton: [
					'card-lg',
					'card*5'
				],
				myInfo:[
					{img:'../../static/appointment.png',title:'我的预约'},
					{img:'../../static/icon_3.png',title:'我的会员卡'},
					{img:'../../static/video.png',title:'视频课程'}
				],
				userInfo: null,
				isIphone: false,
				statusBarHeight: 0,
			}
		},
		onShareAppMessage(res) {
		    return {
		        title:'吾导教育',
		        path:'/pages/index/index',
				// imageUrl:'/static/map_share.png',
		        success(res){
		            uni.showToast({
		                title:'分享成功'
		            })
		        },
		        fail(res){
		            uni.showToast({
		                title:'分享失败',
		                icon:'none'
		            })
		        },
		    }
		},
		onShareTimeline(res){
			return {
			    title:'吾导教育',
			    path:'/pages/index/index',
				// imageUrl:'/static/map_share.png',
			    success(res){
			        uni.showToast({
			            title:'分享成功'
			        })
			    },
			    fail(res){
			        uni.showToast({
			            title:'分享失败',
			            icon:'none'
			        })
			    },
			}
		},
		onShow() {
			this.$refs.auiLoading.show();
			this.loading = true
			this.render()
		},
		methods:{
			render(){
				//获取手机状态栏高度
				this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight'];
				this.isIphone = uni.getStorageSync('isIphone')
				let _this = this
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
									url: '../account/account'
								})
							} else if (res.cancel) {
								uni.switchTab({
									url: '../index/index'
								})
							}
						}
					});
				} else {
					this.userInfo = uni.getStorageSync('userInfo')
					if(this.userInfo.phone == '-1'){
						uni.showModal({
							title: '提示',
							content: '您还未绑定手机号~',
							cancelText: '我再逛逛',
							confirmText: '立即绑定',
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url:'../account/bind-phone'
									})
								} else if (res.cancel) {
						
								}
							}
						});
					}
				}
				this.$refs.auiLoading.hide();
				this.loading = false
			},
			goNext(index){
				if(index==0){
					uni.navigateTo({
						url:'./myAppointment/myAppointment'
					})
				}else if(index==1){
					uni.navigateTo({
						url:'./myCard/myCard'
					})
				}else if(index==2){
					uni.navigateTo({
						url:'./myVideo/myVideo'
					})
				}else if(index==3){
					uni.navigateTo({
						url:'./myProposal/myProposal'
					})
				}else if(index==4){
					uni.navigateTo({
						url:'./myReport/myReport'
					})
				}else if(index==5){
					uni.navigateTo({
						url:'./myData/myData'
					})
				}else if(index==6){
					uni.navigateTo({
						url:'./myTransfer/myTransfer'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.page{
		width: 750rpx;
		height: 100vh;
		background-color: #EDF2F7;
		margin: 0 auto;
		overflow: hidden;
	}
	.header{
		width: 750rpx;
		height: 452rpx;
		padding: 36rpx 0;
		background: linear-gradient(180deg, #D4EFF6, #D4EFF6, #FFFFFF);
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.head{
			width: 132rpx;
			height: 132rpx;
			margin: 0 30rpx;
			// background-color: #007AFF;
			border-radius: 50%;
		}
		
		.username{
			margin: 20rpx 0;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #4D4D4D;
		}
		
		.user-phone{
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #808080;
		}
		
		// image{
		// 	width: 12rpx;
		// 	height: 20rpx;
		// 	margin-right: 30rpx;
		// }
		
		.myInfo{
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}
		.box{
			flex: 1;
			margin-top: 45rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image{
				width: 92rpx;
				height: 92rpx;
				margin-bottom: 24rpx;
			}
			.title{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #2E3033;
			}
		}
	}
	.me{
		width: 710rpx;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		padding: 0 24rpx 0 28rpx;
		display: flex;
		flex-direction: column;
		
		.me_item{
			width: 100%;
			// padding: 20rpx 0rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			
			.left_img{
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 40rpx 0 40rpx 0;
				border-bottom: 2rpx solid #D9D9D9;
				text{
					flex: 1;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #45474D;
				}
				.right_img{
					width: 12rpx;
					height: 20rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
