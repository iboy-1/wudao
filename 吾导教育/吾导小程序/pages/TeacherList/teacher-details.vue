<template>
	<view class="page">
		<ls-skeleton :animate="animate" :skeleton="skeleton" :loading="loading" ref="skeleton">
		<view class="banner">
			<swiper :circular="true" autoplay @change="swiperChange">
				<block v-for="(item,index) in teacherDetails.manage" :key="index">
					<swiper-item>
						<image :src="item.imgurl" mode="aspectFill"></image>
					</swiper-item>
				</block>
			</swiper>
			<view class="dots-container">
			  <view v-for="(ad, index) in teacherDetails.manage" :key="index">
			    <view :class="['dot', index === swiperCurrent ? 'active' : '']"></view>
			  </view>
			</view>
		</view>
		
		<view class="header">
			<view class="img_box">
				<view class="avatar">
					<image :src="teacherDetails.avatar" class="img" mode="aspectFill"></image>
				</view>
			</view>
			<view class="introduction">
				<view class="auth">
					<view class="name_box">
						<view class="name">{{teacherDetails.nickname}}</view>
						<image src="../../static/sex1.png" class="sex" v-if="teacherDetails.sex=='1'" style="width: 26rpx;"></image>
						<image src="../../static/sex2.png" class="sex" v-else></image>
					</view>
					<view class="auth_box">
						<image src="../../static/auth.png" class="auth"></image>
						<text>认证导师</text>
					</view>
				</view>
				
				<view class="occupation_info">座右铭：{{teacherDetails.subtitle}}</view>
			</view>
		</view>
		<view class="teacher_info">
			<view class="hr_box">
				<view class="hr"></view>
				<text>个人简介</text>
			</view>
			<view class="info_box" v-html="teacherDetails.profile">
				<!-- {{teacherDetails.profile}} -->
			</view>
			<view class="label_box">
				<image src="../../static/icon_1.png"></image>
				<view class="label" v-for="(item,index) in label" :key="index">{{item}}</view>
			</view>
			<view class="address_box">
				<image src="../../static/add.png"></image>
				<view class="address" v-for="(item,index) in teacherDetails.venue" :key="index">
					{{item.venue_name}}
					<text v-if="index!=teacherDetails.venue.length-1">、</text>
				</view>
			</view>
		</view>
		<view class="evaluate" v-if="evaluate.length>0">
			<view class="title">
				<view class="hr"></view>
				<view class="text">学员评价</view>
			</view>
			<view class="item" v-for="(item,index) in evaluate" :key="index" :style="index==evaluate.length-1?'border-bottom:none;':''">
				<!-- <image :src="item.user_info.avatar" class="left"></image>
				<view class="right">
					<view class="top">
						<view class="name">{{item.user_info.nikanme}}</view>
						<view class="service_box">
							<view class="service">
								<view class="text">训练强度</view>
								<image src="../../static/logo.png"></image>
							</view>
							<view class="hr"></view>
							<view class="service">
								<view class="text">训练强度</view>
								<image src="../../static/logo.png"></image>
							</view>
						</view>
					</view>
					<view class="content">{{item.content}}</view>
					<view class="content1" v-if="item.creply">{{teacherDetails.nickname}} 回复：{{item.creply.content}}</view>
					<view class="bottom">训练课程：{{item.course.course_name}}</view>
				</view> -->
				<view class="top">
					<view class="left">
						<image :src="item.user_info.avatar"></image>
						<view class="service_box">
							<view class="name">{{item.user_info.nikanme}}</view>
							<sx-rate :disabled="true" :value="Number(star[index])" fontSize="26rpx"></sx-rate>
						</view>
					</view>
					<view class="right">
						<view class="time">{{item.add_date}}</view>
						<view class="course_name">{{item.course.course_name}}</view>
					</view>
				</view>
				<view class="bottom">
					{{item.content}}
				</view>
			</view>
		</view>
		<view class="course">
			<view class="title_box">
				<view class="hr"></view>
				<view class="title">近期课程</view>
			</view>
			<block  v-if="course.length>0">
				<view class="item" v-for="(item,index) in course" :key="index" :style="index==course.length-1?'border-bottom:none':''">
					<image :src="item.images" class="course_img"></image>
					<view class="info">
						<view class="top">
							<view class="name">{{item.course_name}}</view>
						</view>
						<view class="label">
							<view class="label_item" v-for="(label,key) in course_label[index]" :key="key">{{label}}</view>
						</view>
						<view class="teacher">老师：{{teacherDetails.nickname}}</view>
					</view>
					<view class="right">
						<view class="button_box">
							<block v-if="item.isReserve">
								<view class="button" @click="reserve(item)" v-if="item.mark==0">预约</view>
								<view class="button" style="font-size: 26rpx;" @click="reserve(item)" v-else>已预约</view>
							</block>
							<block v-else>
								<view class="button" style="background: #cccccc;box-shadow:none;" @click="reserve(item)">止</view>
							</block>
						</view>
						<view class="appoint">
							<text style="color: #3091F2;">{{item.mark_number}}</text><text style="color: #B3B3B3;">/{{item.number}}</text>
						</view>
					</view>
					<view class="time">
						{{item.start_time}} - {{item.end_time}}
					</view>
				</view>
			</block>
			<block v-else>
				<view class="no_course">
					<image src="../../static/no_data.png"></image>
					<view>没有课程了～ o(︶︿︶)o</view>
				</view>
			</block>
		</view>
		<!-- <view class="model" v-if="venue" @click="venue = false"></view>
		<view class="box" v-if="venue">
			<view class="card">
				<view class="item" v-for="(item,index) in cardList" :key="index" @click="appear(item,index)">
					<view class="left">
						<view class="circular" v-if="isAppear==index"></view>
					</view>
					<view class="right">{{item.card_manage.card_name}}</view>
				</view>
			</view>
		</view> -->
		<view class="model" v-if="venue" @click="venue = false"></view>
		<view class="box" v-if="venue">
			<view class="title">请选择您的会员卡</view>
			<view class="card">
				<view class="item" v-for="(item,index) in cardList" :key="index" @click="appear(item,index)" :style="isAppear==index?'border:2rpx solid #3091F2':''">
					<image src="../../static/select.png" class="select" v-if="isAppear==index"></image>
					<view class="left">
						<image :src="item.member_manage.card_image"></image>
					</view>
					<view class="right">
						<view class="card_name">{{item.member_manage.card_name}}</view>
						<view class="card_type" v-if="item.member_manage.card_value_type=='1'">次卡</view>
						<view class="card_type" v-else>储值卡</view>
						<view class="card_type" v-if="item.member_manage.card_value_type=='1'">剩余次数：{{item.member_card.member_card_amount}}次</view>
						<view class="card_type" v-else>余额：￥{{item.member_card.member_card_amount}}</view>
					</view>
				</view>
			</view>
			<view class="button_box">
				<view class="false" @click="venue = false">取消</view>
				<view class="true" @click="appear1">确定</view>
			</view>
		</view>
		<view class="model" v-if="venue1" @click="venue1 = false"></view>
		<view class="box" v-if="venue1">
			<view class="title">以下会员卡支持该课程</view>
			<view class="card">
				<view class="item" v-for="(item,index) in cardList1" :key="index" @click="appear(item,index)" style="border: 2rpx solid #3091F2;">
					<view class="left">
						<image :src="item.card.card_image"></image>
					</view>
					<view class="right">
						<view class="card_name">{{item.card.card_name}}</view>
						<view class="card_type" v-if="item.card.card_value_type=='1'">次卡</view>
						<view class="card_type" v-else>储值卡</view>
					</view>
				</view>
			</view>
			<view class="button_box">
				<view class="button" @click="getCard">购买会员卡</view>
			</view>
		</view>
		</ls-skeleton>
		<aui-loading ref="auiLoading" :show="true" :type="3" :mask="true"></aui-loading>
	</view>
</template>

<script>
	import SxRate from '@/components/sx-rate'
	import lsSkeleton from '@/components/ls-skeleton/ls-skeleton.nvue';
	import auiLoading from '@/components/aui-loading/aui-loading.vue';
	import { apiGetTeacherDetail } from '@/api/teacher.js'
	// import { apiGetCard  } from '@/api/card.js'
	import { apiMarkCardList  } from '@/api/card.js'
	import { apiMakeCourse,apiCourseCardMark } from '@/api/course.js'
	export default{
		components: {
		  SxRate,
		  lsSkeleton,
		  auiLoading
		},
		data(){
			return{
				animate: true,
				loading: true,
				skeleton: [
					'card-lg',
					'circle',
					'line-lg',
					'line*5',
					'circle+line*2+line*1',
					'line-lg*2',
					'circle+line*2+line*1',
					'line-lg*2',
					'circle+line*2+line*1',
					'line-lg*2'
				],
				current: 0,
				swiperCurrent: 0,
				active:'#ffffff',
				indicator:'rgba(255,255,255,0.5)',
				label:[],
				course_label:[],
				evaluate:[],
				course:[],
				teacherDetails:{},
				bg_top:[],
				cardList:[],
				cardList1:[],
				isAppear:0,
				venue:false,
				venue1:false,
				course_id:null,
				star:[],
				card_info:{}
			}
		},
		onLoad(option) {
			this.$refs.auiLoading.show();
			this.loading = true
			let id = option.id
			let userid = uni.getStorageSync('userid')
			apiGetTeacherDetail({
				id:id,
				user_id:userid
			}).success(res=>{
				console.log(res)
				let _this = this
				this.teacherDetails = res.data
				
				//设置富文本图片宽度
				let richtext = this.teacherDetails.profile;
				const regex = new RegExp('<img', 'gi');
				richtext = richtext.replace(regex,'<img style="max-width: 100%;"');
				const regex1 = new RegExp('data-fail="0" style="', 'gi');
				richtext = richtext.replace(regex1,'data-fail="0" style="max-width: 100%;');
				this.teacherDetails.profile = richtext
				
				this.course = res.data.course
				this.evaluate = res.data.comment
				this.evaluate.forEach(function(value){
					value.add_date = value.add_date.split(' ')[0]
					_this.star.push(value.serve_star)
				})
				console.log(_this.star)
				this.course.forEach(function(value){
					let arr = []
					if(value.tag){
						arr = value.tag.split(',')
					}
					_this.course_label.push(arr)
					let start_time = value.start_time.split(' ')[1].split(':')[0]+':'+value.start_time.split(' ')[1].split(':')[1]
					let end_time = value.end_time.split(' ')[1].split(':')[0]+':'+value.end_time.split(' ')[1].split(':')[1]
					let nickname = _this.teacherDetails.nickname
					let venue_name = _this.teacherDetails.venue.venue_name
					value.start_time = start_time
					value.end_time = end_time
					value.nickname = nickname
					value.venue_name = venue_name
					let number = (1-(value.mark_number/value.number))*100 + '%'
					_this.bg_top.push(number)
				})
				console.log(this.course_label)
				if(this.teacherDetails.tag){
					this.label = this.teacherDetails.tag.split(',')
				}
				this.getTime()
			})
		},
		methods:{
			swiperChange(e){
				this.swiperCurrent = e.detail.current
			},
			go(){
				uni.navigateTo({
					url:'../course/course'
				})
			},
			getCard(){
				uni.switchTab({
					url:'../card/index'
				})
			},
			getTime(){
				let date = new Date()
				let y = date.getFullYear()
				let m = date.getMonth() + 1
				let d = date.getDate()
				let h = date.getHours()
				let min = date.getMinutes()
				let s = date.getSeconds()
				m = m > 9 ? m : '0' + m
				d = d > 9 ? d : '0' + d
				h = h > 9 ? h : '0' + h
				min = min > 9 ? min : '0' + min
				s = s > 9 ? s : '0' + s
				let now = y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
				this.course.forEach(function(value){
					if(now<value.deadline){
						value.isReserve = true
					}else{
						value.isReserve = false
					}
				})
				this.$refs.auiLoading.hide();
				this.loading = false
			},
			appear(item,index){
				this.isAppear = index
				this.card_info = item
			},
			appear1(){
				let userid = uni.getStorageSync('userid')
				this.venue = false
				console.log(this.card_info)
				apiMakeCourse({
					user_id:userid,
					member_card_id:this.card_info.member_card.member_card_id,
					course_id:this.course_id
				}).success(cour_res=>{
					console.log(cour_res)
					if(cour_res.code==200){
						this.card_info = {}
						uni.showToast({
							icon:'success',
							title:cour_res.data
						})
						setTimeout(function(){
							uni.navigateTo({
								url:'../me/myAppointment/myAppointment'
							})
						},800)
					}else{
						this.card_info = {}
						uni.showToast({
							icon:'none',
							title:cour_res.data
						})
					}
				})
			},
			reserve(item){
				if(item.mark=='1'){
					uni.showModal({
						// title: '提示',
						showCancel:false,
						content: '您已经预约过了呢~~',
						// confirmText: '我知道了',
						success: function(res) {
							
						}
					});
					return false
				}
				if(!(item.isReserve)){
					uni.showModal({
						// title: '提示',
						showCancel:false,
						content: '停止预约了呢~~',
						// confirmText: '我知道了',
						success: function(res) {
							
						}
					});
					return false
				}
				this.cardList = []
				let userid = uni.getStorageSync('userid')
				apiMarkCardList({
					user_id:userid,
					course_id:item.course_id
				}).success(res=>{
					if(res.data.length>0){
						this.cardList = res.data
						this.course_id = item.course_id
						this.venue = true
						this.isAppear = 0
						this.card_info = this.cardList[0]
					}else{
						apiCourseCardMark({course_id:item.course_id}).success(res1=>{
							this.cardList1 = res1.data
							this.venue1 = true
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
		width: 750rpx;
		// padding-bottom: 100rpx;
		margin: 0 auto;
	}
	.banner{
		position: relative;
	}
	swiper{
		width: 100%;
		height: 540rpx;
		
		image{
			width: 100%;
			height: 100%;
		}
	}
	.dots-container {
	  position: absolute;
	  left: 0;
	  right: 0;
	  bottom: 24rpx;
	  display: flex;
	  justify-content: center;
	}
	.dot {
	  margin: 0 8rpx;
	  width: 8rpx;
	  height: 8rpx;
	  background: #FFFFFF;
	  opacity: 1;
	  border-radius: 50%;
	  transition: all .5s;
	}
	.dot.active {
		width: 40rpx;
		height: 8rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
	}
	.header{
		padding: 30rpx;
		background-color: #FFFFFF;
		// display: flex;
		// flex-direction: row;
		// justify-content: space-between;
		// align-items: center;
		
		.img_box{
			position: relative;
			margin-left: 14rpx;
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;
			.avatar{
				position: relative;
				margin-top: -80rpx;
				width: 136rpx;
				height: 136rpx;
				border-radius: 50%;
				background-color: #FFFFFF;
			}
			.img{
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
			.sex_box{
				width: 30rpx;
				height: 30rpx;
				border-radius: 50%;
				position: relative;
				background-color: #FFFFFF;
				position: absolute;
				right: 0;
				bottom: 0;
				
			}
		}
		
		
		.introduction{
			margin-top: 70rpx;
			// flex: 1;
			display: flex;
			flex-direction: column;
			
			.auth{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
			}
			.name_box{
				display: flex;
				flex-direction: row;
				align-items: center;
				
				.name{
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
				}
				.sex{
					width: 30rpx;
					height: 30rpx;
					margin-left: 16rpx;
				}
				.occupation{
					background: #fe912a;
					color: #fff;
					font-size: 20rpx;
					padding: 4rpx 10rpx;
					border-radius: 6rpx;
					margin: 0 10rpx;
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
			.occupation_info{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
			}
		}
	}
	.teacher_info{
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		
		.hr_box{
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #4D4D4D;
			.hr{
				width: 8rpx;
				height: 32rpx;
				margin-right: 18rpx;
				background: #3091F2;
				border-radius: 4rpx;
			}
		}
		.info_box{
			padding: 32rpx 30rpx 32rpx 0;
			padding-right: 30rpx;
			font-size: 24rpx;
			color: grey;
			line-height: 40rpx;
			text-align: justify;
			flex: 1;
		}
		.label_box{
			width: 100%;
			margin: 10rpx 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			
			image{
				width: 32rpx;
				height: 34rpx;
				margin-right: 12rpx;
			}
			.label{
				margin-right: 20rpx;
				font-size: 24rpx;
				color: grey;
			}
		}
		.address_box{
			display: flex;
			flex-direction: row;
			align-items: center;
			
			image{
				width: 32rpx;
				height: 32rpx;
				margin-right: 12rpx;
			}
			.address{
				// margin-right: 20rpx;
				font-size: 24rpx;
				color: grey;
			}
		}
	}
	.evaluate{
		margin-top: 20rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		
		.title{
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 24rpx 0;
			.hr{
				width: 8rpx;
				height: 32rpx;
				margin-right: 18rpx;
				background: #3091F2;
				border-radius: 4rpx;
			}
			.text{
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #45474D;
			}
		}
		.item{
			width: 100%;
			padding: 32rpx 0rpx;
			display: flex;
			flex-direction: column;
			border-bottom: 2rpx solid #F1F1F1;
			.top{
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				.left{
					display: flex;
					flex-direction: row;
					.service_box{
						display: flex;
						flex-direction: column;
						.name{
							font-size: 30rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #808080;
						}
					}
					image{
						width: 66rpx;
						height: 66rpx;
						margin-right: 14rpx;
						border-radius: 50%;
					}
				}
				.right{
					display: flex;
					flex-direction: column;
					.time{
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #B3B3B3;
						margin-bottom: 14rpx;
					}
					.course_name{
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #B3B3B3;
					}
				}
				
			}
			.bottom{
				margin-top: 26rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #45474D;
			}
		}
		
		// .left{
		// 	width: 80rpx;
		// 	height: 80rpx;
		// 	margin-right: 20rpx;
		// 	border-radius: 50%;
		// }
		
		// .right{
		// 	flex: 1;
			
		// 	.name{
		// 		font-size: 32rpx;
		// 		color: #333333;
		// 	}
		// 	.service_box{
		// 		margin-top: 10rpx;
		// 		display: flex;
		// 		flex-direction: row;
		// 		align-items: center;
				
		// 		.hr{
		// 			width: 2rpx;
		// 			height: 25rpx;
		// 			margin: 0 20rpx;
		// 			background-color: #999999;
		// 		}
				
		// 		.service{
		// 			display: flex;
		// 			flex-direction: row;
		// 			align-items: center;
					
		// 			image{
		// 				width: 30rpx;
		// 				height: 30rpx;
		// 				margin-left: 20rpx;
		// 				border-radius: 50%;
		// 			}
					
		// 			.text{
		// 				font-size: 22rpx;
		// 				color: #333333;
		// 			}
		// 		}
		// 	}
		// 	.content{
		// 		margin-top: 10rpx;
		// 		font-size: 22rpx;
		// 		color: #333333;
		// 	}
		// 	.content1{
		// 		padding: 20rpx;
		// 		border-radius: 10rpx;
		// 		background-color: #F2F2F2;
		// 		margin-top: 10rpx;
		// 		font-size: 22rpx;
		// 		color: #333333;
		// 	}
		// 	.bottom{
		// 		margin-top: 10rpx;
		// 		font-size: 22rpx;
		// 		color: #777777;
		// 	}
		// }
	}
	.course{
		padding: 24rpx 32rpx;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		
		.title_box{
			padding-bottom: 20rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			border-bottom: 2rpx solid #E6E6E6;
			.hr{
				width: 8rpx;
				height: 32rpx;
				background: #3091F2;
				border-radius: 4rpx;
			}
			.title{
				padding-left: 16rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #4D4D4D;
			}
		}
		
		.item{
			position: relative;
			padding: 80rpx 0 48rpx;
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
				left: -30rpx;
				width:230rpx;
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
			padding-bottom: 100rpx;
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
	.box{
		display: flex;
		flex-direction: column;
		width: 624rpx;
		height: 824rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		.title{
			padding: 32rpx 12rpx;
			border-bottom: 2rpx solid #E6E6E6;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			text-align: center;
			color: #808080;
		}
		.card{
			flex-grow: 1;
			width: 568rpx;
			padding: 48rpx 28rpx;
			display: flex;
			flex-direction: column;
			height: 0;
			overflow: hidden;
			overflow-y: auto;
		}
		.item{
			position: relative;
			width: 100%;
			margin: 20rpx 0;
			padding: 20rpx 0;
			border: 2rpx solid #E6E6E6;
			border-radius: 20rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			.select{
				position: absolute;
				right: 0;
				top: 0;
				width: 100rpx;
				height: 102rpx;
			}
			.left{
				padding: 24rpx;
				image{
					width: 240rpx;
					height: 146rpx;
					border-radius: 10rpx;
				}
			}
			.right{
				.card_name{
					margin-bottom: 16rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
				}
				.card_type{
					margin-bottom: 16rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #808080;
				}
			}
		}
		.button_box{
			padding: 24rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			.false{
				width: 260rpx;
				height: 72rpx;
				background: #FFFFFF;
				border: 2rpx solid #3091F2;
				border-radius: 10rpx;
				font-size: 30rpx;
				text-align: center;
				line-height: 72rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #3091F2;
			}
			.true{
				width: 260rpx;
				height: 72rpx;
				background: #3091F2;
				border-radius: 10rpx;
				font-size: 30rpx;
				text-align: center;
				line-height: 72rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}
			.button{
				width: 100%;
				height: 72rpx;
				background: #3091F2;
				border-radius: 10rpx;
				font-size: 30rpx;
				text-align: center;
				line-height: 72rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}
		}
	}
</style>
