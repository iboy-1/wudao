<template>
	<view class="page">
		<ls-skeleton :animate="animate" :skeleton="skeleton" :loading="loading" ref="skeleton">
		<block v-if="notice.length>0">
			<view class="item" v-for="(item,index) in notice" :key="index" @click="dl(item)">
				<image src="../../../static/notice.png" class="notice"></image>
				<view class="right">
					<view class="title">{{item.title}}</view>
					<view class="time_box">
						<image src="../../../static/time.png" class="time_img"></image>
						<view class="time">{{item.time}}</view>
					</view>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="no_course">
				<image src="../../../static/no_data.png"></image>
				<view>没有公告哦～ o(︶︿︶)o</view>
			</view>
		</block>
		</ls-skeleton>
		<aui-loading ref="auiLoading" :show="true" :type="3" :mask="true"></aui-loading>
	</view>
</template>

<script>
	import auiLoading from '@/components/aui-loading/aui-loading.vue';
	import lsSkeleton from '@/components/ls-skeleton/ls-skeleton.nvue';
	import { apiArticleGroup } from '@/api/user.js'
	export default{
		components:{
			auiLoading,
			lsSkeleton
		},
		data(){
			return{
				animate: true,
				loading: true,
				skeleton: [
					'square+card-sm',
					'square+card-sm',
					'square+card-sm',
					'square+card-sm',
					'square+card-sm',
					'square+card-sm',
					'square+card-sm',
					'square+card-sm',
					'square+card-sm',
					'square+card-sm',
				],
				notice:[]
			}
		},
		onShow() {
			this.loading = true
			this.$refs.auiLoading.show();
			let _this = this
			uni.request({//获取场馆
				// url: 'https://wudao.gxhxinfo.com/article/v1/Home/articleGroup',
				url: 'https://keep.gxhxinfo.com/article/v1/Home/articleGroup',
				method: 'GET',
				header: {
					'content-type': 'application/x-www-form-urlencoded',
				},
				success: (res) => {
					_this.$refs.auiLoading.hide();
					_this.notice = res.data.data
					_this.loading = false
				}
			})
		},
		methods:{
			dl(item){
				uni.navigateTo({
					url:'./Notice-detail?id='+item.id+'&title='+item.title
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		width: 750rpx;
		background-color: #EDF2F7;
	}
	.page{
		padding: 0rpx 24rpx;
		margin: 0 auto;
	}
	.item{
		width: 100%;
		padding: 36rpx 0rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		.notice{
			width: 40rpx;
			height: 40rpx;
		}
		.right{
			width: 578rpx;
			padding: 32rpx 26rpx 20rpx 34rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 6rpx 10rpx 0rpx rgba(14, 77, 45, 0.05);
			border-radius: 20rpx;
			.title{
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #45474D;
			}
			.time_box{
				margin-top: 24rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				
				.time_img{
					width: 24rpx;
					height: 24rpx;
					margin-right: 10rpx;
				}
				.time{
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #B3B3B3;
				}
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
