<template>
	<view class="page">
		<!-- <view class="tab">
			<view class="tab_son" v-for="(item,index) in tabList" :key="index" @click="dl(index)">
				<view class="text" :style="tabIndex==index?'color:#3091F2;':''">{{item}}</view>
				<view class="hr" v-if="tabIndex==index"></view>
			</view>
		</view> -->
		<ls-skeleton :animate="animate" :skeleton="skeleton" :loading="loading" ref="skeleton">
		<view class="content">
			<block v-if="courseList.length>0">
				<block v-if="tabIndex==0">
					<view class="course" v-for="(item,index) in courseList" :key="index" @click="goDetail(item)">
						<image :src="item.activity_image" mode="aspectFill"></image>
						<view class="right">
							<view class="centent">
								<view class="title">{{item.activity_title}}</view>
								<view class="info">{{item.activity_introduction}}</view>
								<view class="time">活动时间：{{item.start_time}} - {{item.end_time}}</view>
							</view>
							<view class="state" v-if="item.is_join=='1'">已报名</view>
						</view>
					</view>
				</block>
				<block v-else>
					<view class="course" v-for="(item,index) in courseList" :key="index" @click="goDetail(item)">
						<image :src="item.image" mode="aspectFill"></image>
						<view class="right">
							<view class="title">{{item.title}}</view>
							<view class="info">{{item.introduction}}</view>
							<view class="info" style="margin-top: 16rpx;">支持会员卡：{{item.member_card.card_name}}</view>
						</view>
					</view>
				</block>
			</block>
			<block v-else>
				<view class="no_course">
					<image src="../../static/no_data.png"></image>
					<view>没有活动可以报名～ o(︶︿︶)o</view>
				</view>
			</block>
		</view>
		<view class="bottom">
			<view class="button" @click="myActivity">查看我的报名</view>
		</view>
		</ls-skeleton>
		<aui-loading ref="auiLoading" :show="true" :type="3" :mask="true"></aui-loading>
	</view>
</template>

<script>
	import { apiGatActivity } from '@/api/user.js'
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
					'line*3',
					40,
					'card-lg',
					'line*3',
					40,
					'card-lg',
					'line*3',
				],
				tabList:['活动报名','全民砍价'],
				tabIndex:0,
				courseList:[]
			}
		},
		onPullDownRefresh() {
			let _this = this
			let userid = uni.getStorageSync('userid')
			if (userid) {
				uni.request({//活动信息
					// url: 'https://wudao.gxhxinfo.com/activity/v1/Home/gatActivity',
					url: 'https://keep.gxhxinfo.com/activity/v1/Home/gatActivity',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data:{
						user_id:userid
					},
					success: res => {
						_this.courseList = res.data.data
					}
				});
				uni.stopPullDownRefresh();
			}
		},
		onShow() {
			let _this = this
			this.$refs.auiLoading.show();
			this.loading = true;
			let userid = uni.getStorageSync('userid')
			this.tabIndex = 0
			uni.request({//活动信息
				// url: 'https://wudao.gxhxinfo.com/activity/v1/Home/gatActivity',
				url: 'https://keep.gxhxinfo.com/activity/v1/Home/gatActivity',
				method: 'GET',
				header: {
					'content-type': 'application/x-www-form-urlencoded',
				},
				data:{
					user_id:userid
				},
				success: res => {
					_this.courseList = res.data.data
					this.$refs.auiLoading.hide();
					this.loading = false;
				}
			});
		},
		methods:{
			dl(index){
				let _this = this
				this.tabIndex = index
				let userid = uni.getStorageSync('userid')
				if(index==0){
					uni.request({//活动信息
						// url: 'https://wudao.gxhxinfo.com/activity/v1/Home/gatActivity',
						url: 'https://keep.gxhxinfo.com/activity/v1/Home/gatActivity',
						method: 'GET',
						header: {
							'content-type': 'application/x-www-form-urlencoded',
						},
						data:{
							user_id:userid
						},
						success: res => {
							_this.courseList = res.data.data
						}
					});
				}else if(index==1){
					uni.request({//活动信息
						// url: 'https://wudao.gxhxinfo.com/activity/v1/Home/gatActivityHaggle',
						url: 'https://keep.gxhxinfo.com/activity/v1/Home/gatActivityHaggle',
						method: 'GET',
						header: {
							'content-type': 'application/x-www-form-urlencoded',
						},
						data:{
							user_id:userid
						},
						success: res => {
							_this.courseList = res.data.data
						}
					});
				}
			},
			goHome(){
				uni.switchTab({
					url:'../index/index'
				})
			},
			myActivity(){
				uni.navigateTo({
					url:'./myActivity/myActivity'
				})
			},
			goDetail(item){
				if(this.tabIndex==0){
					uni.navigateTo({
						url:'./Activity-details?id='+item.id
					})
				}else{
					uni.navigateTo({
						url:'./Bargaining?id='+item.id
					})
				}
			}
		}
	}
</script>

<style>
	page{
		background-color: #EBEFF2;
	}
</style>
<style lang="scss">
	page{
		width: 750rpx;
		// background-color: #EDF2F7;
	}
	.page{
		width: 750rpx;
		margin: 0 auto;
	}
	.tab{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		
		.tab_son{
			flex: 1;
			display: flex;
			flex-direction: column;
			// justify-content: center;
			align-items: center;
			box-sizing: border-box;
			height: 80rpx;
			// padding: 20rpx 0;
			padding-top: 20rpx;
			.text{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #45474D;
			}
			.hr{
				width: 40rpx;
				height: 6rpx;
				margin-top: 10rpx;
				background: #3091F2;
				border-radius: 4rpx;
			}
		}
	}
	.about{
		padding: 20rpx 30rpx;
		display: flex;
		flex-direction: row;
		border-bottom: 2rpx solid #cccccc;
		
		image{
			width: 100rpx;
			height: 100rpx;
			margin-right: 20rpx;
			border-radius: 50%;
		}
		.about_info{
			flex: 1;
			
			.title{
				margin-bottom: 8rpx;
				font-size: 30rpx;
				font-weight: 600;
				color: #333333;
			}
			.info{
				font-size: 24rpx;
				color: grey;
			}
		}
	}
	.content{
		display: flex;
		flex-direction: column;
		padding: 0 24rpx 150rpx 24rpx;
		
		.course{
			display: flex;
			flex-direction: column;
			margin-top: 32rpx;
			padding-bottom: 16rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			box-shadow: 0rpx 6rpx 16rpx 0rpx rgba(255, 255, 255, 0.6);
			image{
				width: 100%;
				height: 320rpx;
				// border-radius: 10rpx;
				margin-right: 22rpx;
				border-top-left-radius: 10rpx;
				border-top-right-radius: 10rpx;
			}
			.right{
				padding: 16rpx 20rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				.centent{
					flex: 1;
					.title{
						margin-bottom: 16rpx;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
					}
					.info{
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #808080;
					}
					.time{
						margin-top: 6rpx;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #808080;
					}
				}
				.state{
					margin-left: 24rpx;
					font-size: 34rpx;
					font-weight: 600;
					color: #D71418;
				}
			}
		}
		
		.no_course{
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			margin-top: 100rpx;
			
			image{
				width: 160rpx;
				height: 140rpx;
			}
			
			view{
				margin-top: 40rpx;
				text-align: center;
				font-size: 28rpx;
				color: #808080;
			}
		}
	}
	.bottom{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 750rpx;
		height: 88rpx;
		padding: 24rpx 0;
		background-color: #f2f2f2;
		position: fixed;
		bottom: 0;
		left: 0;
		
		.button{
			width: 702rpx;
			height: 88rpx;
			margin: 0 24rpx;
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
