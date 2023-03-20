<template>
	<view class="page">
		<ls-skeleton :animate="animate" :skeleton="skeleton" :loading="loading" ref="skeleton">
		<block v-if="list.length>0">
			<view class="course" v-for="(item,index) in list" :key="index" :style="index==list.length-1?'border-bottom:none':''">
				<image :src="item.teacher.avatar" class="course_img" mode="aspectFill"></image>
				<view class="info">
					<view class="top">
						<view class="name" v-if="item.course">{{item.course.course_name}}</view>
						<view class="name" v-else>无</view>
					</view>
					<view class="label">
						<view class="label_item" v-for="(label,key1) in label[index]" :key="key1">{{label}}</view>
					</view>
					<view class="teacher" v-if="item.teacher">老师：{{item.teacher.nickname}}</view>
					<view class="teacher" v-else>老师：无</view>
				</view>
				<view class="time">
					{{item.course_manage.start_time}} - {{item.course_manage.end_time}}
				</view>
			</view>
		</block>
		<block v-else>
			<view class="no_course">
				<image src="../../static/no_data.png"></image>
				<view>近期没有支持的课程哟~~</view>
			</view>
		</block>
		</ls-skeleton>
		<aui-loading ref="auiLoading" :show="true" :type="3" :mask="true"></aui-loading>
	</view>
</template>

<script>
	import { apiSupportCourse } from '@/api/course.js'
	import lsSkeleton from '@/components/ls-skeleton/ls-skeleton.nvue';
	import auiLoading from '@/components/aui-loading/aui-loading.vue';
	export default{
		components: {
			lsSkeleton,
			auiLoading
		},
		data(){
			return{
				card_id:null,
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
				apiSupportCourse({member_card_id:this.card_id}).success(res=>{
					console.log(res)
					this.list = res.data
					this.getTime()
				})
				uni.stopPullDownRefresh();
			}
		},
		onLoad(option) {
			this.$refs.auiLoading.show();
			this.loading = true
			let id = option.id
			this.card_id = option.id
			apiSupportCourse({member_card_id:id}).success(res=>{
				console.log(res)
				this.list = res.data
				this.getTime()
			})
		},
		methods:{
			getTime(){//获取开课结课时间、课程标签
				let _this = this
				this.list.forEach(function(value){
					let arr = []
					
					_this.label.push(arr)
					let start_time = value.course_manage.start_time.split(':')[0]+':'+value.course_manage.start_time.split(':')[1]
					let end_time = value.course_manage.end_time.split(' ')[1].split(':')[0]+':'+value.course_manage.end_time.split(' ')[1].split(':')[1]
					value.course_manage.start_time = start_time
					value.course_manage.end_time = end_time
					if(!(value.course)){
						return false
					}
					if(value.course.tag){
						arr = value.course.tag.split(',')
					}
				})
				this.$refs.auiLoading.hide();
				this.loading = false
			}
		}
	}
</script>

<style lang="scss">
	page{
		width: 750rpx;
		background-color: #F2F2F2;
	}
	.page{
		width: 750rpx;
		margin: 0 auto;
		padding-bottom: 100rpx;
	}
	.course{
		position: relative;
		padding: 80rpx 30rpx 48rpx;
		background-color: #FFFFFF;
		border-bottom: 2rpx solid #cccccc;
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
			// background: #3091F2;
			// box-shadow: 0rpx 6rpx 16rpx 0rpx rgba(48, 145, 242, 0.6);
			background: #FFFFFF;
			border: 2rpx solid #CCCCCC;
			border-radius: 26rpx;
			text-align: center;
			line-height: 52rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #4D4D4D;
		}
		.button1{
			width: 140rpx;
			height: 52rpx;
			background: #17E6BC;
			box-shadow: 0rpx 6rpx 16rpx 0rpx rgba(23, 230, 188, 0.6);
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
			left: -10rpx;
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
</style>
