<template>
	<view class="page">
		<ls-skeleton :animate="animate" :skeleton="skeleton" :loading="loading" ref="skeleton">
		<block v-if="list.length>0">
			<!-- <view class="list">
				<view class="item" v-for="(item,index) in list" :key="index" @click="dl(item)">
					<image :src="item.video.images"></image>
					<view class="course">
						<view class="course_name">{{item.course.course_name}}</view>
					</view>
				</view>
			</view> -->
			<view class="item" v-for="(item,index) in list" :key="index" :style="index==list.length-1?'border-bottom:none':''">
				<image :src="item.video.images" class="course_img"></image>
				<view class="info">
					<view class="top">
						<view class="name">{{item.course.course_name}}</view>
					</view>
					<view class="label">
						<view class="label_item" v-for="(label,key) in label[index]" :key="key">{{label}}</view>
					</view>
					<view class="teacher">老师：{{item.teacher.nickname}}</view>
				</view>
				<view class="right">
					<view class="button_box">
						<view class="button" @click="dl(item)">播放</view>
					</view>
				</view>
				<view class="time">
					{{item.course_manage.start_time}}-{{item.course_manage.end_time}}
				</view>
			</view>
		</block>
		<block v-else>
			<view class="no_video">
				<image src="../../../static/no_data.png"></image>
				<view>您还没有视频课程哦～ o(︶︿︶)o</view>
			</view>
		</block>
		</ls-skeleton>
		<aui-loading ref="auiLoading" :show="true" :type="3" :mask="true"></aui-loading>
	</view>
</template>

<script>
	import { apiMemberVideo } from '@/api/user.js'
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
					// 'line-sm*3',
					// 40,
					'card',
					'circle+line-sm*2',
					'line',
					'card-lg',
					// 40,
					'news',
					'square+square+square+square+square+square',
					'line-sm*3+square',
				],
				list:[],
				label:[]
			}
		},
		onShow() {
			this.$refs.auiLoading.show();
			this.loading = true
			let _this = this
			let userid = uni.getStorageSync('userid')
			apiMemberVideo({user_id:userid}).success(res=>{
				this.list = []
				let list = res
				console.log(list)
				list.forEach(function(value){
					if(value.video){
						_this.list.push(value)
					}
				})
				if(this.list.length>0){
					this.getTime()
				}
				this.$refs.auiLoading.hide();
				this.loading = false
			})
		},
		methods:{
			dl(item){
				uni.navigateTo({
					url:'./playVideo?url='+item.video.video_url
				})
			},
			getTime(){
				let _this = this
				this.list.forEach(function(value){
					let arr = []
					if(value.course.tag){
						arr = value.course.tag.split(',')
					}
					_this.label.push(arr)
					let start_time = value.course_manage.start_time.split(':')[0]+':'+value.course_manage.start_time.split(':')[1]
					let end_time = value.course_manage.end_time.split(' ')[1].split(':')[0]+':'+value.course_manage.end_time.split(' ')[1].split(':')[1]
					value.course_manage.start_time = start_time
					value.course_manage.end_time = end_time
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
		width: 750rpx;
		margin: 0 auto;
	}
	// .list{
	// 	padding: 0 24rpx;
	// 	display: flex;
	// 	flex-direction: column;
	// 	.item{
	// 		width: 100%;
	// 		padding: 24rpx 0;
	// 		border-bottom: 2rpx solid #EDF2F7;
	// 		display: flex;
	// 		flex-direction: row;
	// 		image{
	// 			width: 160rpx;
	// 			height: 160rpx;
	// 			margin-right: 26rpx;
	// 			border-radius: 32rpx;
	// 		}
	// 	}
	// }
	.item{
		position: relative;
		padding: 80rpx 24rpx 48rpx;
		background-color: #FFFFFF;
		border-bottom: 2rpx solid #E6E6E6;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		
		.course_img{
			width: 160rpx;
			height: 160rpx;
			margin-right: 26rpx;
			border-radius: 32rpx;
		}
		
		.info{
			flex: 1;
			
			.top{
				display: flex;
				flex-direction: row;
				// margin-bottom: 10rpx;
				
				.type{
					margin-right: 20rpx;
					line-height: 40rpx;
					padding: 0rpx 8rpx;
					background-color: #fd9f45;
					font-size: 20rpx;
					color: #FFFFFF;
				}
				
				.name{
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					font-weight: 600;
				}
			}
			.bottom{
				font-size: 24rpx;
				color: #a5a5a5;
			}
		}
		.label{
			margin: 24rpx 0;
			display: flex;
			flex-direction: row;
			
			.label_item{
				width: 50rpx;
				height: 24rpx;
				margin-right: 16rpx;
				background: #FFBF66;
				border-radius: 0rpx 6rpx 0rpx 6rpx;
				font-size: 16rpx;
				font-family: PingFang SC;
				font-weight: 500;
				text-align: center;
				line-height: 24rpx;
				color: #FFFFFF;
			}
		}
		.teacher{
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #808080;
		}
		.button{
			width: 140rpx;
			height: 52rpx;
			background: #3091F2;
			box-shadow: 0rpx 6rpx 16rpx 0rpx rgba(48, 145, 242, 0.6);
			border-radius: 26rpx;
			text-align: center;
			line-height: 52rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
		.appoint{
			margin-top: 24rpx;
			text-align: center;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #3091F2;
		}
		.time{
			position: absolute;
			top: 16rpx;
			left: 0rpx;
			width:336rpx;
			height: 48rpx;
			background: #EDF2F7;
			border-radius: 0rpx 24rpx 24rpx 0rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: bold;
			text-align: center;
			line-height: 48rpx;
			color: #3091F2;
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
