<template>
	<view class="page">
		<ls-skeleton :animate="animate" :skeleton="skeleton" :loading="loading" ref="skeleton">
		<view class="list">
			<view class="item" v-for="(item,index) in teacherList" :key="index" :style="index==teacherList.length-1?'border-bottom:none':''" @click="go(item)">
				<image :src="item.avatar" class="tx" mode="aspectFill"></image>
				<view class="info_box">
					<view class="name_box">
						<view class="name">{{item.nickname}}</view>
						<image src="../../static/sex1.png" class="sex" v-if="item.sex=='1'" style="width: 22rpx;"></image>
						<image src="../../static/sex2.png" class="sex" v-else></image>
					</view>
					<view class="auth_box">
						<image src="../../static/auth.png" class="auth"></image>
						<text>认证导师</text>
					</view>
					<view class="motto">{{item.subtitle}}</view>
				</view>
				<image src="../../static/left.png" class="go"></image>
			</view>
		</view>
		</ls-skeleton>
		<aui-loading ref="auiLoading" :show="true" :type="3" :mask="true"></aui-loading>
	</view>
</template>

<script>
	import { apiGetTeacher } from '@/api/teacher.js'
	import auiLoading from '@/components/aui-loading/aui-loading.vue';
	import lsSkeleton from '@/components/ls-skeleton/ls-skeleton.nvue';
	export default{
		components: {
			lsSkeleton,
			auiLoading
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
		onPullDownRefresh() {
			let userid = uni.getStorageSync('userid')
			if (userid) {
				apiGetTeacher({limit:10}).success(res => {
					console.log(res)
					this.teacherList = res.data.data
				})
				uni.stopPullDownRefresh();
			}
		},
		data(){
			return{
				animate: true,
				loading: true,
				skeleton: [
					'circle-lg+line*3',
					'circle-lg+line*3',
					'circle-lg+line*3',
					'circle-lg+line*3',
					'circle-lg+line*3',
				],
				teacherList:[]
			}
		},
		onLoad() {
			this.$refs.auiLoading.show();
			this.loading = true
		},
		onShow() {
			this.getTeacher()
		},
		methods:{
			go(item){
				uni.navigateTo({
					url:'./teacher-details?id='+item.id
				})
			},
			getTeacher(){
				apiGetTeacher({limit:10}).success(res => {
					console.log(res)
					this.$refs.auiLoading.hide();
					this.loading = false
					this.teacherList = res.data.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.page{
		width: 750rpx;
		margin: 0 auto;
	}
	.list{
		padding: 0rpx 46rpx 0rpx 24rpx;
		
		.item{
			width: 100%;
			padding: 40rpx 0;
			border-bottom: 2rpx solid #e6e6e6;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			
			.tx{
				width: 136rpx;
				height: 136rpx;
				margin-right: 30rpx;
				border-radius: 50%;
			}
			.info_box{
				flex: 1;
				.name_box{
					display: flex;
					flex-direction: row;
					align-items: center;
					.name{
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
					}
					.sex{
						width: 28rpx;
						height: 28rpx;
						margin-left: 12rpx;
					}
				}
				.auth_box{
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					width: 154rpx;
					height: 44rpx;
					margin: 12rpx 0;
					background: #7555FF;
					border-radius: 22rpx;
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					.auth{
						width: 32rpx;
						height: 32rpx;
						margin-right: 8rpx;
					}
				}
				.motto{
					width: 440rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}
			.go{
				width: 12rpx;
				height: 20rpx;
			}
		}
	}
</style>
