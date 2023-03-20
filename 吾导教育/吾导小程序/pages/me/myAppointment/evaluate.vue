<template>
	<view class="page">
		<view class="top">
			<view class="header">
				<image :src="course.course.images"></image>
				<view class="right">
					<view class="name">{{course.course.course_name}}</view>
					<view class="teacher">{{course.teacher.nickname}}</view>
				</view>
			</view>
			<view class="item">
				<view class="eva">对老师评分</view>
				<view class="pf">
					<sx-rate @change="setDriverScore1" :value="Number(driverScore1)" fontSize="42rpx"></sx-rate>
				</view>
			</view>
			<view class="eva_box">
				<textarea placeholder="🖊友善发言,温暖评论区" placeholder-style="font-size:30rpx" v-model="evaluate"></textarea>
			</view>
		</view>
		<view class="button_box">
			<view class="button" @click="submit">发布</view>
		</view>
	</view>
</template>

<script>
	import { apiCommentReply } from '@/api/user.js'
	import SxRate from '@/components/sx-rate'
	export default{
		components: {
		  SxRate
		},
		data(){
			return{
				driverScore:0,
				driverScore1:0,
				course:{},
				evaluate:'',
				label:[],
			}
		},
		onShow() {
			this.course = uni.getStorageSync('courseInfo')
			console.log(this.course)
			if(this.course.course.tag){
				this.label = this.course.course.tag.split(',')
			}
		},
		methods:{
			setDriverScore(e) {
				console.log(e)
				this.driverScore = e
			},
			setDriverScore1(e) {
				this.driverScore1 = e
			},
			submit(){
				if(this.driverScore1==0){
					uni.showToast({
						icon:'none',
						title:'至少打一颗星星哦！'
					})
					return false
				}
				if(this.evaluate==''){
					uni.showToast({
						icon:'none',
						title:'请输入评价内容！'
					})
					return false
				}
				let userid = uni.getStorageSync('userid')
				apiCommentReply({
					user_id:userid,
					content:this.evaluate,
					course_id:this.course.course_id,
					teacher_id:this.course.teacher.id,
					train_star:this.driverScore,
					serve_star:this.driverScore1
				}).success(res=>{
					console.log(res)
					if(res.code==200){
						uni.showToast({
							icon:'success',
							title:res.data
						})
						setTimeout(function(){
							uni.navigateBack({
								delta:'1'
							})
						},800)
					}else{
						uni.showToast({
							icon:'none',
							title:res.data
						})
					}
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
		padding: 18rpx 0rpx;
	}
	.top{
		width: 100%;
		border-radius: 15rpx;
		background-color: #FFFFFF;
		.header{
			padding: 36rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			image{
				width: 100rpx;
				height: 100rpx;
				margin-right: 20rpx;
				border-radius: 10rpx;
			}
			.right{
				flex: 1;
				.name{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #45474C;
				}
				.teacher{
					margin-top: 15rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #808080;
				}
			}
		}
		.eva_box{
			padding: 36rpx;
			textarea{
				height: 200rpx;
				font-size: 30rpx;
			}
		}
	}
	.item{
		padding: 0 36rpx 36rpx 36rpx;
		border-bottom: 2rpx solid #E6E6E6;
		display: flex;
		flex-direction: row;
		align-items: center;
		.eva{
			margin-right: 20rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #45474D;
		}
		.pf{
			
				display: flex;
				align-items: center;
				
		}
	}
	.bottom{
		padding: 30rpx;
		margin-top: 30rpx;
		border-radius: 15rpx;
		background-color: #FFFFFF;
		.name{
			margin-bottom: 40rpx;
			font-size: 32rpx;
			font-size: #333333;
		}
		.eva_box{
			width: 100%;
			
		}
	}
	.button_box{
		padding: 40rpx 30rpx;
		
		.button{
			width: 100%;
			height: 88rpx;
			background: #3091F2;
			border-radius: 8rpx;
			text-align: center;
			line-height: 88rpx;
			color: #FFFFFF;
		}
	}
</style>
