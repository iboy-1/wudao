<template>
	<view class="page">
		<ls-skeleton :animate="animate" :skeleton="skeleton" :loading="loading" ref="skeleton">
		<view class="title">我的报名</view>
		<block v-if="list.length>0">
			<view class="course" v-for="(item,index) in list" :key="index" @click="goDetail(item)">
				<image :src="item.hactivity.activity_image"></image>
				<view class="right">
					<view class="title1">{{item.hactivity.activity_title}}</view>
					<view class="info">{{item.hactivity.activity_introduction}}</view>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="no_video">
				<image src="../../../static/no_data.png"></image>
				<view>没有报名～ o(︶︿︶)o</view>
			</view>
		</block>
		</ls-skeleton>
		<aui-loading ref="auiLoading" :show="true" :type="3" :mask="true"></aui-loading>
	</view>
</template>

<script>
	import { apiMemberActivity } from '@/api/user.js'
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
					'card+line*3',
					'card+line*3',
					'card+line*3',
					'card+line*3',
					'card+line*3',
				],
				list:[]
			}
		},
		onShow() {
			this.$refs.auiLoading.show();
			this.loading = true;
			let userid = uni.getStorageSync('userid')
			apiMemberActivity({user_id:userid}).success(res=>{
				console.log(res)
				this.list = res.data
				this.$refs.auiLoading.hide();
				this.loading = false;
			})
		},
		methods:{
			goDetail(item){
				uni.navigateTo({
					url:'../Activity-details?id='+item.activity_id+'&type=1'
				})
			}
		}
	}
</script>

<style lang="scss">
	.page{
		padding: 30rpx;
		margin: 0 auto;
	}
	.title{
		width: 100%;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #cccccc;
		font-size: 30rpx;
		font-weight: 600;
		color: #333333;
	}
	.course{
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
		padding: 20rpx 40rpx 46rpx 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		border-bottom: 2rpx solid #E6E6E6;
		image{
			width: 140rpx;
			height: 140rpx;
			border-radius: 10rpx;
			margin-right: 22rpx;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			.title1{
				margin-bottom: 16rpx;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}
			.info{
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #808080;
			}
		}
	}
	.no_video{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		margin-top: 100rpx;
			
		image{
			width: 180rpx;
			height: 156rpx;
		}
			
		view{
			margin-top: 20rpx;
			text-align: center;
			font-size: 28rpx;
			color: #808080;
		}
	}
</style>
