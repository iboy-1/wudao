<template>
	<view class="page">
		<ls-skeleton :animate="animate" :skeleton="skeleton" :loading="loading" ref="skeleton">
		<view class="tab">
			<view class="tab_son" v-for="(item,index) in tabList" :key="index" @click="dl(index)">
				<text class="text" :style="tabIndex==index?'color:#3091F2':''">{{item}}</text>
				<view class="hr" v-if="tabIndex==index"></view>
			</view>
		</view>
		<view class="venue">
			<ccPicker class="item" :range="list_country" v-model="person.country" @picker_change="country_change"></ccPicker>
			<image src="../../../static/bottom1.png"></image>
		</view>
		<view class="content">
			<block v-if="isChoice">
				<block v-for="(i,key) in courseList" :key="key">
					<block v-if="courseList[key].booking_course.length>0">
						<view class="head">
							<view class="left">
								<image src="../../../static/address.png"></image>
								<view class="venue_name">{{i.venue_name}}</view>
							</view>
							<view class="right" @click="goAddress(i)">
								<text>场馆位置</text>
								<image src="../../../static/left.png"></image>
							</view>
						</view>
						<view class="course" v-for="(item,index) in courseList[key].booking_course" :key="index" :style="index==courseList[key].booking_course.length-1?'border-bottom:none':''">
							<image :src="item.course.images" class="course_img" mode="aspectFill"></image>
							<view class="info">
								<view class="top">
									<view class="name" v-if="item.course">{{item.course.course_name}}</view>
									<view class="name" v-else>无</view>
								</view>
								<view class="label">
									<view class="label_item" v-for="(label,key1) in label[key][index]" :key="key1">{{label}}</view>
								</view>
								<view class="teacher">老师：{{item.teacher.nickname}}</view>
							</view>
							<view class="right">
								<view class="button_box">
									<view class="button" @click="submit(item)" v-if="item.state==0&&item.isEnd!=0&&item.course" :class="item.state==0?'button1':''">签到</view>
									<view class="button" style="font-size: 26rpx;" @click="pushEva(item)" v-else-if="item.is_reply=='0'&&item.course">评价</view>
									<view class="button" style="font-size: 26rpx;" v-else-if="item.is_reply=='1'">已评价</view>
								</view>
								<view class="appoint">
									<text style="font-size: 24rpx;font-weight: 500;color: #17E6BC;" v-if="item.state==0&&item.isEnd!=0&&item.course">{{item.beforTime}}后开课</text>
								</view>
							</view>
							<view class="time" v-if="item.isEnd==2">
								{{item.course_manage.start_time}}-{{item.course_manage.end_time}}
							</view>
							<view class="time1" v-else-if="item.isEnd==0">
								已结束
							</view>
							<view class="time1" style="color: #3091F2;" v-else-if="item.isEnd==1">
								已开课
							</view>
						</view>
					</block>
				</block>
			</block>
			<block v-else>
				<view class="no_course">
					<image src="../../../static/no_data.png"></image>
					<view>您还没有课程～ o(︶︿︶)o</view>
				</view>
			</block>
		</view>
		</ls-skeleton>
		<aui-loading ref="auiLoading" :show="true" :type="3" :mask="true"></aui-loading>
	</view>
</template>

<script>
	import { apiMemberMakeList } from '@/api/user.js'
	import { apiMarkCourseSign } from '@/api/course.js'
	import ccPicker from "@/components/cc-picker/cc-picker.vue"
	import auiLoading from '@/components/aui-loading/aui-loading.vue';
	import lsSkeleton from '@/components/ls-skeleton/ls-skeleton.nvue';
	export default{
		components:{
			ccPicker,
			lsSkeleton,
			auiLoading
		},
		data(){
			return{
				animate: true,
				loading: true,
				skeleton: [
					'card-sm*3',
					'card-sm',
					'card-lg+card-sm*3+square-sm',
					'card-lg+card-sm*3+square-sm',
					'card-lg+card-sm*3+square-sm'
				],
				tabList:['全部预约','未签到','已签到'],
				tabIndex:0,
				courseList:[],
				label:[],
				person: {
				    country: '-1',
				},
				list_country: [
				    { V: '-1', K: '所有场馆' },
				],
				isChoice:true,
				venue_id:-1,
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
				apiMemberMakeList({
					venue_id:this.venue_id,
					user_id:userid,
					state:this.tabIndex-1
				}).success(res=>{
					console.log(res)
					this.courseList = res
					let arr = []
					this.courseList.forEach(function(value){
						if(value.booking_course.length>0){
							arr.push(value)
						}
					})
					if(arr.length>0){
						this.isChoice = true
						this.getTime()
					}else{
						this.isChoice = false
					}
				})
				uni.stopPullDownRefresh();
			}
		},
		onLoad() {
			this.$refs.auiLoading.show();
			this.loading = true
		},
		onShow() {
			let _this = this
			let userid = uni.getStorageSync('userid')
			this.list_country = [{ V: '-1', K: '所有场馆' }]
			uni.request({//获取场馆
				// url: 'https://wudao.gxhxinfo.com/member/v1/Home/venueList',
				url: 'https://keep.gxhxinfo.com/member/v1/Home/venueList',
				method: 'GET',
				header: {
					'content-type': 'application/x-www-form-urlencoded',
				},
				success: (res) => {
					console.log(res)
					res.data.data.data.forEach(function(value){
						let obj = {}
						console.log(value)
						obj.V = value.id
						obj.K = value.venue_name
						_this.list_country.push(obj)
					})
					_this.person.country = _this.list_country[0].V
					apiMemberMakeList({
						user_id:userid,
						state:'-1',
						venue_id:_this.list_country[0].V
					}).success(res=>{
						console.log(res)
						_this.courseList = res
						let arr = []
						_this.courseList.forEach(function(value){
							if(value.booking_course.length>0){
								arr.push(value)
							}
						})
						if(arr.length>0){
							_this.isChoice = true
							_this.getTime()
						}else{
							_this.isChoice = false
							_this.$refs.auiLoading.hide();
							_this.loading = false
						}
					})
				},
			})
			
		},
		methods:{
			dl(index){
				this.tabIndex = index
				let userid = uni.getStorageSync('userid')
				apiMemberMakeList({
					venue_id:this.venue_id,
					user_id:userid,
					state:this.tabIndex-1
				}).success(res=>{
					console.log(res)
					this.courseList = res
					let arr = []
					this.courseList.forEach(function(value){
						if(value.booking_course.length>0){
							arr.push(value)
						}
					})
					if(arr.length>0){
						this.isChoice = true
						this.getTime()
					}else{
						this.isChoice = false
					}
				})
			},
			go(index){
				console.log(this.label[index])
			},
			goAddress(item){
				let venueLatitude = item.coordinate.split(',')[1]
				let venueLongitude = item.coordinate.split(',')[0]
				uni.openLocation({
					latitude: Number(venueLatitude),
					longitude: Number(venueLongitude),
					scale: 18,
					name:item.venue_name,
					address:item.address,
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			country_change(e){
				console.log(e)
				let userid = uni.getStorageSync('userid')
				this.venue_id = e.new_v
				apiMemberMakeList({
					user_id:userid,
					state:this.tabIndex-1,
					venue_id:this.venue_id
				}).success(res=>{
					console.log(res)
					this.courseList = res
					let arr = []
					this.courseList.forEach(function(value){
						if(value.booking_course.length>0){
							arr.push(value)
						}
					})
					if(arr.length>0){
						this.isChoice = true
						this.getTime()
					}else{
						this.isChoice = false
					}
				})
			},
			getTime(){//获取开课结课时间、课程标签
				let _this = this
				this.courseList.forEach(function(value){
					let arr = []
					value.booking_course.forEach(function(value1){
						let arr1 = []
						if(!(value1.course)){
							return false
						}
						if(value1.course.tag){
							arr1 = value1.course.tag.split(',')
						}
						arr.push(arr1)
						
						//获取距离现在的时间
						let time = Date.parse(new Date(value1.course_manage.start_time.replace(/-/g,"/")))
						let time1 = Date.parse(new Date(value1.course_manage.end_time.replace(/-/g,"/")))
						let nowTime = Date.parse(new Date())
						let beforTime = (time - nowTime)/1000
						let theTime = parseInt(beforTime);// 需要转换的时间秒
						let theTime1 = 0;// 分
						let theTime2 = 0;// 小时
						let theTime3 = 0;// 天
						if(theTime > 60) {
							theTime1 = parseInt(theTime/60);
							theTime = parseInt(theTime%60);
							if(theTime1 > 60) {
								theTime2 = parseInt(theTime1/60);
								theTime1 = parseInt(theTime1%60);
								if(theTime2 > 24){
									//大于24小时
									theTime3 = parseInt(theTime2/24);
									theTime2 = parseInt(theTime2%24);
								}
							}
						}
						if(theTime3>0){
							value1.beforTime = theTime3 + '天' + theTime2 + '小时'
						}else{
							value1.beforTime = theTime2 + '小时' + theTime1 + '分钟'
						}
						if(nowTime>time&&nowTime<time1){
							value1.isEnd = 1
						}else if(theTime<0){
							value1.isEnd = 0//0已结束，1已开课，2未开课
						}else{
							value1.isEnd = 2
						}
						console.log(value1.isEnd)
						
						let start_time = value1.course_manage.start_time.split(':')[0]+':'+value1.course_manage.start_time.split(':')[1]
						let end_time = value1.course_manage.end_time.split(' ')[1].split(':')[0]+':'+value1.course_manage.end_time.split(' ')[1].split(':')[1]
						console.log(start_time)
						value1.course_manage.start_time = start_time
						value1.course_manage.end_time = end_time
					})
					_this.label.push(arr)
				})
				this.$refs.auiLoading.hide();
				this.loading = false
			},
			submit(item){
				let _this = this
				uni.showModal({
					content: '是否确认签到？',
					cancelText: '取消',
					confirmText: '签到',
					success: function(res) {
						if (res.confirm) {
							apiMarkCourseSign({id:item.id}).success(res1=>{
								console.log(res1)
								if(res1.code=200){
									uni.showToast({
										icon:'success',
										title:res1.data
									})
									let userid = uni.getStorageSync('userid')
									apiMemberMakeList({
										user_id:userid,
										state:_this.tabIndex-1,
										venue_id:_this.venue_id
									}).success(res2=>{
										console.log(res2)
										_this.courseList = res2
										_this.getTime()
									})
								}else{
									uni.showToast({
										icon:'none',
										title:res1.data
									})
								}
							})
						} else if (res.cancel) {
				
						}
					}
				});
			},
			pushEva(item){
				uni.setStorageSync('courseInfo',item)
				uni.navigateTo({
					url:'./evaluate'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f2f2f2;
	}
</style>
<style lang="scss">
	page{
		width: 750rpx;
		background-color: #EDF2F7;
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
		padding-top: 20rpx;
		background-color: #FFFFFF;
		
		.tab_son{
			flex: 1;
			display: flex;
			flex-direction: column;
			// justify-content: center;
			align-items: center;
			height: 70rpx;
			// line-height: 90rpx;
			box-sizing: border-box;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #45474D;
			
			.hr{
				width: 40rpx;
				height: 6rpx;
				margin-top: 10rpx;
				background: #3091F2;
				border-radius: 4rpx;
			}
		}
	}
	.venue{
		width: 100%;
		height: 80rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		image{
			width: 20rpx;
			height: 12rpx;
			margin: 15rpx 10rpx 10rpx 10rpx;
		}
	}
	.content{
		// width: 100%;
		display: flex;
		flex-direction: column;
		
		.head{
			margin-top: 24rpx;
			padding: 30rpx 30rpx;
			background-color: #FFFFFF;
			border-bottom: 2rpx solid #e6e6e6;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			.left{
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				image{
					width: 28rpx;
					height: 28rpx;
					margin-right: 10rpx;
				}
			}
			.right{
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #808080;
				image{
					width: 12rpx;
					height: 18rpx;
					margin-left: 10rpx;
				}
			}
		}
		.course{
			position: relative;
			padding: 80rpx 30rpx 48rpx;
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
			// .garden_box{
			// 	width: 100rpx;
			// 	height: 100rpx;
			// 	margin-right: 30rpx;
			// 	overflow: hidden;
			// 	background: #f5f5f5;
			// 	border: 2rpx solid #666666;
			// 	border-radius: 100%;
			// 	position: relative;
			// 	.bg{
			// 		width: 100rpx;
			// 		height: 120rpx;
			// 		position: absolute;
			// 		left: 0;
			// 	}
			// 	.garden{
			// 		position: absolute;
			// 		z-index: 10;
			// 		width: 100rpx;
			// 		height: 100rpx;
			// 		font-size: 26rpx;
			// 		font-weight: 600;
			// 		// background-color: #F2F2F2;
			// 		border-radius: 50%;
			// 		font-size: 30rpx;
			// 		text-align: center;
			// 		line-height: 100rpx;
			// 	}
			// }
			
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
			.button_box{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-end;
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
				border: none;
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
			.time1{
				position: absolute;
				top: 16rpx;
				left: -10rpx;
				width: 130rpx;
				height: 48rpx;
				background: #EDF2F7;
				border-radius: 0rpx 24rpx 24rpx 0rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: bold;
				text-align: center;
				line-height: 48rpx;
				color: #999999;
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
	}
	.model{
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,0.6);
		position: fixed;
		top: 0;
		left: 0;
	}
	.eva_box{
		width: 100%;
		background: #FFFFFF;
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		.bottom{
			padding: 30rpx;
			textarea{
				width: 660rpx;
				height: 150rpx;
				background-color: #dddddd;
				border-radius: 10rpx;
				padding: 15rpx;
			}
		}
	}
</style>
