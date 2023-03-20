<template>
	<view class="page">
		<ls-skeleton :animate="animate" :skeleton="skeleton" :loading="loading" ref="skeleton">
		<view class="add" @click="isOpen = false">
			<view class="title">课程预约：</view>
			<view class="add_box">
				<ccPicker class="item" :range="list_country" v-model="person.country" @picker_change="country_change"></ccPicker>
				<image src="../../static/bottom1.png"></image>
			</view>
		</view>
		<view class="time_box">
			<view class="item" v-for="(tab,index) in timeList" :key="index" :class="index==tabIndex?'item1':'item'" @click="dl(index)">
				<view class="date">{{tab.date}}</view>
				<view class="date">{{tab.week}}</view>
			</view>
			<view class="rl" @click="dlCalendar">
				<view class="text">选择日期</view>
				<image src="../../static/bottom.png"></image>
			</view>
			
		</view>
		<view :class="isOpen?'calendar':'calendar1'">
			<ren-calendar ref='ren' :markDays='markDays' :headerBar='true' :collapsible="false" @onDayClick='onDayClick'></ren-calendar>
		</view>
		<view class="model1" @touchmove.stop.prevent="moveHandle" v-if="isOpen">
			<view class="add" @click="isOpen = false">
				<view class="title">课程预约：</view>
				<view class="add_box">
					<ccPicker class="item" :range="list_country" v-model="person.country" @picker_change="country_change"></ccPicker>
					<image src="../../static/bottom1.png"></image>
				</view>
			</view>
			<view class="time_box">
				<view class="item" v-for="(tab,index) in timeList" :key="index" :class="index==tabIndex?'item1':'item'" @click="dl(index)">
					<view class="date">{{tab.date}}</view>
					<view class="date">{{tab.week}}</view>
				</view>
				<view class="rl" @click="dlCalendar">
					<view class="text">选择日期</view>
					<image src="../../static/bottom.png"></image>
				</view>
				
			</view>
			<view :class="isOpen?'calendar':'calendar1'" catchtouchmove="true">
				<ren-calendar ref='ren' :markDays='markDays' :headerBar='true' :collapsible="false" @onDayClick='onDayClick'></ren-calendar>
			</view>
		</view>
		
		<view class="content">
			<block v-if="isChoice">
				<block v-for="(i,key) in courseList" :key="key">
					<block v-if="courseList[key].course.length>0">
						<view class="head">
							<view class="left">
								<image src="../../static/address.png"></image>
								<view class="venue_name">{{i.venue_name}}</view>
							</view>
							<view class="right" @click="goAddress(i)">
								<text>场馆位置</text>
								<image src="../../static/left.png"></image>
							</view>
						</view>
						<view class="course" v-for="(item,index) in courseList[key].course" :key="index" :style="index==courseList[key].course.length-1?'border-bottom:none':''">
							<view class="rt_text" v-if="(!item.isReserve)">已结束</view>
							<image src="../../static/model.png" class="rt" v-if="(!item.isReserve)"></image>
							<image :src="item.images" class="course_img" mode="aspectFill"></image>
							<view class="info">
								<view class="top">
									<view class="name" :style="item.isReserve?'':'color:#CCCCCC'">{{item.course_name}}</view>
								</view>
								<view class="label">
									<view class="label_item" v-for="(label,key1) in label[key][index]" :key="key1" :style="item.isReserve?'':'background:#CCCCCC'">{{label}}</view>
								</view>
								<view class="teacher" :style="item.isReserve?'':'color:#CCCCCC'">老师：{{item.teacher.nickname}}</view>
								<!-- <view class="bottom">{{item.start_date}} {{item.start_time}} - {{item.end_time}}</view> -->
							</view>
							<view class="right">
								<view class="button_box">
									<block v-if="item.isReserve">
										<view class="button" @click="reserve(item)" v-if="item.mark==0">预约</view>
										<view class="button" style="font-size: 26rpx;" @click="reserve(item)" v-else>已预约</view>
									</block>
								</view>
								<view class="appoint" v-if="item.isReserve">
									<text style="color: #3091F2;">{{item.mark_number}}</text><text style="color: #B3B3B3;">/{{item.number}}</text>
								</view>
							</view>
							<view class="time" :style="item.isReserve?'':'color:#CCCCCC'">
								{{item.start_time}} - {{item.end_time}}
							</view>
						</view>
					</block>
				</block>
			</block>
			<block v-else>
				<view class="no_course">
					<image src="../../static/no_data.png"></image>
					<view>没有课程了～ o(︶︿︶)o</view>
				</view>
			</block>
		</view>
		<view class="model" @touchmove.stop.prevent="moveHandle" v-if="venue" @click="venue = false"></view>
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
		<view class="model" @touchmove.stop.prevent="moveHandle" v-if="venue1" @click="venue1 = false"></view>
		<view class="box" v-if="venue1">
			<view class="title">您暂无支持该课程的会员卡，请先购买</view>
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
	import RenCalendar from '@/components/ren-calendar/ren-calendar.vue'
	import ccPicker from "@/components/cc-picker/cc-picker.vue"
	import auiLoading from '@/components/aui-loading/aui-loading.vue';
	import lsSkeleton from '@/components/ls-skeleton/ls-skeleton.nvue';
	import { apiGetAppointment,apiGetVenueList,apiMakeCourse,apiCourseCardMark } from '@/api/course.js'
	import { apiMarkCardList  } from '@/api/card.js'
	export default{
		components:{
		    RenCalendar,
			ccPicker,
			lsSkeleton,
			auiLoading
		},
		data(){
			return{
				animate: true,
				loading: true,
				skeleton: [
					'square-lg+square-lg+square-lg+square-lg+square-lg',
					'card-sm',
					'square-lg+line-lg*3',
					'square-lg+line-lg*3',
					'square-lg+line-lg*3',
					'square-lg+line-lg*3',
				],
				person: {
				    country: '-1',
				},
				list_country: [
				    { V: '-1', K: '所有场馆' },
				],
				isOpen:false,
				timeList:[
					{date:'06-20',time:'周日'},
					{date:'06-21',time:'周一'},
					{date:'06-22',time:'周二'},
					{date:'06-23',time:'周三'}
				],
				timeList1:[],
				address:[{venue_name:'所有门店',id:'-1'}],
				courseList:[],
				tabIndex:0,
				markDays:[],
				isChoice:true,
				tabVenue:0,
				venue_name:'',
				venue_id:null,
				label:[],
				cardList:[],
				cardList1:[],
				isAppear:0,
				venue:false,
				venue1:false,
				course_id:null,
				card_info:{}
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
				apiGetAppointment({
					venue_id:this.venue_id,
					user_id:userid,
					start_time:this.timeList1[this.tabIndex].date
				}).success(res=>{
					let _this = this
					this.label = []
					this.courseList = []
					this.courseList = res.data
					let arr = []
					this.courseList.forEach(function(value){
						if(value.course.length>0){
							arr.push(value)
						}
					})
					if(arr.length>0){
						_this.isChoice = true
						_this.getTime()
					}else{
						_this.isChoice = false
					}
				})
				uni.stopPullDownRefresh();
			}
		},
		onShow() {
			this.loading = true
			this.$refs.auiLoading.show();
			this.venue = false
			this.venue1 = false
			this.tabIndex = 0
			this.render()
		},
		methods:{
			render(){
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
				let dates1 = []
				let dates2 = []
				for(let i=0;i<4;i++){
					let date1 = new Date().setDate(new Date().getDate() + i);
					let date2 = new Date(date1)
					let y = date2.getFullYear();
					let m = date2.getMonth()+1
					let d = date2.getDate()
					d = d > 9 ? d : '0' + d;
					m = m > 9 ? m : '0' + m;
					let date3 = y +"-"+ m +"-"+ d
					let date4 = m + "-"+ d
					// console.log('0' + m + "-"+'0' + d)
					let week = new Date(date3).getDay();
					let weekText = ['日', '一', '二', '三', '四', '五', '六'];
					let formatWeek = '周' + weekText[week];
					let response = {
						date: date4,
						week: formatWeek
					};
					let response1 = {
						date: date3,
						week: formatWeek
					};
					dates1.push(response)
					dates2.push(response1)
				} 
				this.timeList = dates1
				this.timeList1 = dates2
				this.list_country = [{ V: '-1', K: '所有场馆' }]
				
				uni.request({//获取场馆
					// url: 'https://wudao.gxhxinfo.com/member/v1/Home/venueList',
					url: 'https://keep.gxhxinfo.com/member/v1/Home/venueList',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					success: (res) => {
						let userid = uni.getStorageSync('userid')
						console.log(res.data.data.data)
						res.data.data.data.forEach(function(value){
							let obj = {}
							console.log(value)
							obj.V = value.id
							obj.K = value.venue_name
							_this.list_country.push(obj)
						})
						console.log(_this.list_country)
						_this.person.country = _this.list_country[0].V
						_this.address = res.data.data.data
						_this.venue_name = _this.address[0].venue_name
						_this.venue_id = _this.list_country[0].V
						
						apiGetAppointment({
							venue_id:_this.list_country[0].V,
							user_id:userid,
							start_time:_this.timeList1[0].date
						}).success(res=>{
							console.log(res.data)
							_this.courseList = []
							_this.courseList = res.data
							let arr = []
							_this.courseList.forEach(function(value){
								if(value.course.length>0){
									arr.push(value)
								}
							})
							if(arr.length>0){
								_this.isChoice = true
								_this.getTime()
							}else{
								_this.isChoice = false
							}
							_this.$refs.auiLoading.hide();
							_this.loading = false
						})
					}
				})
			},
			dl(index){
				this.isOpen = false
				this.$refs.auiLoading.show();
				let userid = uni.getStorageSync('userid')
				this.tabIndex = index
				apiGetAppointment({
					venue_id:this.venue_id,
					user_id:userid,
					start_time:this.timeList1[index].date
					
				}).success(res=>{
					let _this = this
					this.label = []
					this.courseList = []
					this.courseList = res.data
					let arr = []
					this.courseList.forEach(function(value){
						if(value.course.length>0){
							arr.push(value)
						}
					})
					if(arr.length>0){
						_this.isChoice = true
						_this.getTime()
					}else{
						_this.isChoice = false
					}
					this.$refs.auiLoading.hide();
				})
			},
			appear(item,index){
				let _this = this
				this.isAppear = index
				this.card_info = item
				console.log(this.card_info)
			},
			appear1(){
				let userid = uni.getStorageSync('userid')
				this.venue = false
				console.log(this.card_info)
				apiMakeCourse({
					user_id:userid,
					member_card_id:this.card_info.member_card.member_card_id,
					card_buy_id:this.card_info.member_card.id,
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
			choice(item,index){//选择场馆
				let userid = uni.getStorageSync('userid')
				this.tabVenue = index
				this.venue_name = item.venue_name
				this.venue_id = item.id
				apiGetAppointment({
					venue_id:this.venue_id,
					user_id:userid,
					start_time:this.timeList1[this.tabIndex].date
				}).success(res=>{
					console.log(res)
					this.courseList = res.data
					this.getTime()
				})
			},
			country_change(e){
				this.isOpen = false
				this.$refs.auiLoading.show();
				let userid = uni.getStorageSync('userid')
				this.venue_id = e.new_v
				apiGetAppointment({
					venue_id:this.venue_id,
					user_id:userid,
					start_time:this.timeList1[this.tabIndex].date
				}).success(res=>{
					console.log(res)
					let _this = this
					this.courseList = []
					this.courseList = res.data
					let arr = []
					this.courseList.forEach(function(value){
						if(value.course.length>0){
							arr.push(value)
						}
					})
					if(arr.length>0){
						_this.isChoice = true
						_this.getTime()
					}else{
						_this.isChoice = false
					}
					this.$refs.auiLoading.hide();
				})
			},
			go(){
				uni.navigateTo({
					url:'./course'
				})
			},
			getCard(){
				uni.switchTab({
					url:'../card/index'
				})
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
				// uni.navigateTo({
				// 	url:'../address/address'
				// })
			},
			dlCalendar(){
				this.isOpen = !this.isOpen
			},
			onDayClick(dates1,dates2){//选择日期回调
				this.$refs.auiLoading.show();
				let userid = uni.getStorageSync('userid')
				this.timeList = dates1
				this.timeList1 = dates2
				this.tabIndex = 0
				this.isOpen = false
				console.log(this.timeList1)
				apiGetAppointment({
					venue_id:this.venue_id,
					user_id:userid,
					start_time:this.timeList1[0].date
				}).success(res=>{
					console.log(res)
					let _this = this
					this.courseList = []
					this.courseList = res.data
					this.label = []
					let arr = []
					this.courseList.forEach(function(value){
						if(value.course.length>0){
							arr.push(value)
						}
					})
					if(arr.length>0){
						_this.isChoice = true
						_this.getTime()
					}else{
						_this.isChoice = false
					}
					this.$refs.auiLoading.hide();
				})
			},
			show(){
				this.isChoice = !this.isChoice
			},
			reserve(item){//预约课程
				// if(item.mark=='1'){
				// 	uni.showModal({
				// 		// title: '提示',
				// 		showCancel:false,
				// 		content: '您已经预约过了呢~~',
				// 		// confirmText: '我知道了',
				// 		success: function(res) {
							
				// 		}
				// 	});
				// 	return false
				// }
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
					console.log(res)
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
							console.log(res1)
						})
					}
				})
			},
			getTime(){//获取开课结课时间、课程标签
				let _this = this
				this.label = []
				for(let i = 0;i<_this.courseList.length;i++){
					let arr = []
					this.courseList[i].course.forEach(function(value){
						let arr1 = []
						if(value.tag){
							arr1 = value.tag.split(',')
						}
						arr.push(arr1)
						let start_time = value.start_time.split(' ')[1].split(':')[0]+':'+value.start_time.split(' ')[1].split(':')[1]
						let end_time = value.end_time.split(' ')[1].split(':')[0]+':'+value.end_time.split(' ')[1].split(':')[1]
						value.start_time = start_time
						value.end_time = end_time
					})
					_this.label.push(arr)
				}
				
				console.log(this.label)
				_this.getTime1()
			},
			getTime1(){
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
				this.courseList.forEach(function(value){
					value.course.forEach(function(value1){
						console.log(value1.deadline)
						if(now<value1.deadline){
							value1.isReserve = true
						}
					})
				})
			},
		}
	}
</script>

<style>
	page{
		width: 100%;
		height: 100%;
		background-color: #EDF2F7;
	}
</style>
<style lang="scss">
	.page{
		width: 750rpx;
		margin: 0 auto;
		padding-bottom: 50rpx;
	}
	.time_box{
		width: 100%;
		height: 116rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		
		.item{
			height: 100rpx;
			box-sizing: border-box;
			// border-right: 2rpx solid #cccccc;
			// border-bottom: 2rpx solid #cccccc;
			margin: 0 30rpx;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #4D4D4D;
			
			.date{
				margin-top: 14rpx;
				font-size: 24rpx;
			}
		}
		
		.item1{
			height: 100rpx;
			box-sizing: border-box;
			// border-right: 2rpx solid #cccccc;
			// border-bottom: 4rpx solid #333333;
			margin: 0 30rpx;
			background: #3091F2;
			border-radius: 20rpx;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #FFFFFF;
			
			.date{
				margin-top: 14rpx;
				font-size: 24rpx;
			}
		}
		
		.rl{
			width: 44rpx;
			height: 80rpx;
			margin-right: 22rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-sizing: border-box;
			// justify-content: center;
			align-items: center;
			
			.text{
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #808080;
			}
			image{
				width: 20rpx;
				height: 12rpx;
				margin-top: 12rpx;
			}
		}
	}
	.calendar{
		box-shadow: 0rpx 6rpx 20rpx rgba(128,128,128,0.5);
		overflow: hidden;
		height: 590rpx;
		position: fixed;
		z-index: 10;
		transition: all 1s cubic-bezier(0.25, 1.0, 0.25, 1.0);
	}
	.calendar1{
		overflow: hidden;
		position: fixed;
		height: 0;
		transition: all 1s cubic-bezier(0.25, 1.0, 0.25, 1.0);
	}
	.add{
		position: relative;
		height: 80rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-top: 2rpx solid #F1F1F1;
		border-bottom: 2rpx solid #F1F1F1;
		
		.title{
			padding: 0 26rpx;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #808080;
		}
		
		.add_box{
			padding: 0 26rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			image{
				width: 20rpx;
				height: 12rpx;
				margin-left: 16rpx;
			}
		}
		.address{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #3399FF;
		}
		.choice{
			position: absolute;
			z-index: 8;
			top: 82rpx;
			width: 630rpx;
			padding: 10rpx 40rpx 10rpx 80rpx;
			height: 300rpx;
			background-color: #FFFFFF;
			border-bottom: 2rpx solid #cccccc;
			box-shadow: 0rpx 6rpx 20rpx rgba(128,128,128,0.5);
			
			.choice_item{
				width: 100%;
				padding: 10rpx 0;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				.name{
					font-size: 28rpx;
					color: #666666;
				}
				.img{
					width: 30rpx;
					height: 30rpx;
				}
			}
		}
	}
	.model1{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		width: 750rpx;
		height: 100vh;
		background: rgba(0,0,0,0.6);
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
			.rt_text{
				position: absolute;
				right: 5rpx;
				top: 18rpx;
				z-index: 100;
				transform:rotate(45deg);
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}
			.rt{
				position: absolute;
				right: 0;
				top: 0;
				width: 94rpx;
				height: 90rpx;
			}
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
		z-index: 1000;
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
		z-index: 1001;
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
