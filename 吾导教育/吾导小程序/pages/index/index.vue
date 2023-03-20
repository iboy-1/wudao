<template>
	<view class="page">
		<ls-skeleton :animate="animate" :skeleton="skeleton" :loading="loading" ref="skeleton">
		<view class="banner">
			<swiper :circular="true" autoplay @change="swiperChange">
				<block v-for="(item,index) in banner" :key="index">
					<swiper-item>
						<image :src="item.url" mode="aspectFill" @click="goOther(item)"></image>
					</swiper-item>
				</block>
			</swiper>
			
			<view class="dots-container">
			  <view v-for="(ad, index) in banner" :key="index">
			    <view :class="['dot', index === swiperCurrent ? 'active' : '']"></view>
			  </view>
			</view>
		</view>
		
		<view class="content">
			<view class="news_box" @click="goNotice">
				<image src="../../static/news_bg.png" class="back-img" mode=""></image>
				<view class="news">
					<view class="news_txt">最新公告</view>
					<view class="news_txt1">
						<text>Notice</text>
						<image src="../../static/ice.png"></image>
					</view>
					<view class="imgs">
						<image src="../../static/news.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="right">
				<view class="course" style="margin-bottom: 20rpx;" @click="goCourse">
					<image src="../../static/course_bg.png" class="back-img" mode=""></image>
					<view class="right-content">
						<text class="name">预约课程</text>
						<text class="name1">APP/Online</text>
						<image src="../../static/left2.png" class="go"></image>
					</view>
					<view class="imgs">
						<image src="../../static/course_img.png" mode="" class="imgs1"></image>
					</view>
				</view>
				<view class="course" @click="goCard">
					<image src="../../static/card_bg.png" class="back-img" mode=""></image>
					<view class="right-content">
						<text class="name">在线购卡</text>
						<text class="name1">Renewal</text>
						<image src="../../static/left1.png" class="go"></image>
					</view>
					<view class="imgs">
						<image src="../../static/card_img.png" mode="" class="imgs2"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="list_son" v-for="(item,index) in list" :key="index" @click="go(item.url,index)">
				<image :src="'../../static/'+item.bg" class="bg"></image>
				<view class="centent">
					<image :src="'../../static/'+item.img" class="img"></image>
					<view class="news_txt">{{item.name}}</view>
					<view class="news_txt1">{{item.type}}</view>
				</view>
			</view>
		</view>
		<view class="venue">
			<view class="nearby">
				<view class="hr"></view>
				<view class="text1">附近场馆</view>
			</view>
			<scroll-view :scroll-anchoring="true" @scrolltolower="scrolltolower" @scrolltoupper="scrolltoupper" :scroll-x="true"
			 class="recommend-box" ><!-- :style="scrollMargin" -->
				<view @click="toHotelVideo(item)" class="recommend-item skeleton-rect-radius" v-for="(item, index) in venueList"
				 :key="index">
					<view class="model"></view>
					<view class="img-wrapper">
						<image class="recommend-img" :src="item.image_url" mode="aspectFill"></image>
						<view class="fabulous">
							<view class="title">{{item.venue_name}}</view>
							<view class="add_box">
								<view class="address">{{item.address}}</view>
								<image src="../../static/add1.png"></image>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- <text class="text">欢迎您，iboy</text> -->
		</ls-skeleton>
		<aui-loading ref="auiLoading" :show="true" :type="3" :mask="true"></aui-loading>
	</view>
</template>

<script>
	import { apiBanner } from '@/api/user.js'
	import lsSkeleton from '@/components/ls-skeleton/ls-skeleton.nvue';
	import auiLoading from '@/components/aui-loading/aui-loading.vue';
	export default {
		components: {
			lsSkeleton,
			auiLoading
		},
		data() {
			return {
				animate: true,
				loading: true,
				skeleton: [
					'card-lg',
					40,
					'square-lg+card-sm*2',
					40,
					'square-lg*3+square-lg*3+square-lg*3'
				],
				banner:[],
				current: 0,
				swiperCurrent: 0,
				list:[
					{name:'我的会员卡',type:'VIP',img:'vip.png',	url:'../me/myCard/myCard',bg:'vip_bg.png'},
					// {name:'预约课程',type:'App/Online',img:'online.png',	url:'../course/index'},
					{name:'管理预约',type:'Reservation',img:'reservation.png',url:'../me/myAppointment/myAppointment',bg:'reservation_bg.png'},
					// {name:'在线购卡',type:'Renewal',img:'renewal.png',url:'../card/index'},
					{name:'活动报名',type:'Registration',img:'activity.png',	url:'../Activity/Activity',bg:'activity_bg.png'},
					// {name:'云小店',type:'Store',img:'store.png',	url:'../course/index',url:'',bg:'store_bg.png'},
					{name:'导师简介',type:'Teachers',img:'teacher.png',url:'../TeacherList/TeacherList',bg:'teacher_bg.png'},
					// {name:'工作室地址',type:'Contact',img:'contact.png',	url:'../address/address'},
					{name:'意见箱',type:'Suggestion',img:'suggestion.png',url:'../opinion/opinion',bg:'suggestion_bg.png'},
				],
				scrollMargin: 'margin-left:24rpx',
				venueList:['','',''],
				shareId:'',
				activity_id:''
			}
		},
		onShareAppMessage(res) {
			let userid = uni.getStorageSync('userid')
		    return {
		        title:'吾导教育',
		        path:'/pages/index/index?id='+userid,
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
			let _this = this
			let userid = uni.getStorageSync('userid')
			if (userid) {
				uni.request({//轮播图
					// url: 'https://wudao.gxhxinfo.com/article/v1/Home/banner',
					url: 'https://keep.gxhxinfo.com/article/v1/Home/banner',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					success: res => {
						_this.banner = res.data.data
					}
				});
				uni.request({//获取场馆
					// url: 'https://wudao.gxhxinfo.com/member/v1/Home/venueList',
					url: 'https://keep.gxhxinfo.com/member/v1/Home/venueList',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					success: (res) => {
						this.loading = false;
						console.log(res.data.data.data)
						_this.venueList = res.data.data.data
					}
				})
				uni.stopPullDownRefresh();
			}
		},
		onLoad(option) {
			if(option.id){
				this.shareId = option.id
				this.activity_id = option.activity_id
			}
		},
		onShow() {
			this.$refs.auiLoading.show();
			this.loading = true;
			this.render()
		},
		methods: {
			swiperChange(e){
				this.swiperCurrent = e.detail.current
			},
			render(){
				let _this = this
				uni.request({//轮播图
					// url: 'https://wudao.gxhxinfo.com/article/v1/Home/banner',
					url: 'https://keep.gxhxinfo.com/article/v1/Home/banner',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					success: res => {
						_this.banner = res.data.data
					}
				});
				uni.request({//获取场馆
					// url: 'https://wudao.gxhxinfo.com/member/v1/Home/venueList',
					url: 'https://keep.gxhxinfo.com/member/v1/Home/venueList',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					success: (res) => {
						this.$refs.auiLoading.hide();
						this.loading = false;
						console.log(res.data.data.data)
						_this.venueList = res.data.data.data
					}
				})
			},
			goNotice(){
				uni.navigateTo({
					url:'./Notice/Notice'
				})
			},
			dl(e){
				console.log(e)
			},
			go(url,index){
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
									// url: '../account/account?shareId='+_this.shareId+'&activity_id='+_this.activity_id
									url: '../account/account'
								})
							} else if (res.cancel) {
				
							}
						}
					});
				}else{
					let userInfo = uni.getStorageSync('userInfo')
					if(userInfo.phone != '-1'){
						if(url){
							uni.navigateTo({
								url:url
							})
						}else{
							uni.showToast({
								icon:'none',
								title:'暂未开放...'
							})
						}
						
					}else{
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
			},
			goOther(item){
				if(item.skip_url){
					uni.navigateTo({
						url:'../address/other?url='+item.skip_url
					})
				}
			},
			scrolltolower(e) {
				let _this = this;
				this.$nextTick(function() {
					_this.scrollMargin = 'margin-right:24rpx';
				});
				this.scrollMargin = 'margin-right:24rpx';
			},
			scrolltoupper(e) {
				let _this = this;
				this.$nextTick(function() {
					_this.scrollMargin = 'margin-left:24rpx';
				});
			},
			goCourse(){
				uni.switchTab({
					url:'../course/index'
				})
			},
			goCard(){
				uni.switchTab({
					url:'../card/index'
				})
			},
			toHotelVideo(item){
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
				// 	url:'../address/nav-map'
				// })
			}
		}
	}
</script>

<style lang="scss">
	.page {
		width: 750rpx;
		margin: 0 auto;
		padding-bottom: 50rpx;
		background: #EBEFF2;
	}
	
	.banner{
		position: relative;
	}
	
	swiper {
		width: 100%;
		height: 400rpx;
		
		swiper-item{
			width: 100%;
			height: 100%;
			
			image{
				width: 100%;
				height: 100%;
			}
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

	.content {
		padding: 24rpx;
		display: flex;
		flex-direction: row;
		
		.news_box{
			position: relative;
			padding: 40rpx 26rpx 16rpx 40rpx;
			width: 320rpx;
			height: 344rpx;
			margin-right: 24rpx;
			border-radius: 32rpx;
			background-color: #FFFFFF;
			
			.back-img{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				z-index: 0;
			}
			.news{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
				.news_txt{
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #4D4D4D;
				}
				.news_txt1{
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 300;
					color: #B3B3B3;
					image{
						width: 28rpx;
						margin-left: 10rpx;
						height: 20rpx;
					}
				}
				.imgs{
					margin-top: 40rpx;
					image{
						width: 204rpx;
						height: 192rpx;
					}
				}
			}
		}
		.right{
			width: 362rpx;
			height: 400rpx;
			.course{
				position: relative;
				display: flex;
				padding: 30rpx 26rpx 16rpx 40rpx;
				box-sizing: border-box;
				flex-direction: row;
				justify-content: space-between;
				width: 100%;
				height: 190rpx;
				border-radius: 32rpx;
				background-color: #FFFFFF;
				.back-img{
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					z-index: 0;
				}
				.right-content{
					display: flex;
					flex-direction: column;
					
					.name{
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #4D4D4D;
					}
					.name1{
						margin: 20rpx 0 12rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 300;
						color: #B3B3B3;
					}
					.go{
						width: 36rpx;
						height: 36rpx;
					}
				}
				.imgs{
					display: flex;
					align-items: flex-end;
					// width: 72rpx;
					height: 130rpx;
					.imgs1{
						width: 72rpx;
						height: 130rpx;
						// margin-left: 98rpx;
					}
					.imgs2{
						width: 88rpx;
						height: 70rpx;
						// margin-left: 80rpx;
					}
				}
			}
		}
	}
	.list{
		// padding: 20rpx 24rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		
		.list_son{
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 220rpx;
			height: 190rpx;
			background-color: #FFFFFF;
			border-radius: 32rpx;
			margin: 0 0 20rpx 24rpx ;
			.bg{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
			}
			.centent{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.img{
					width: 60rpx;
					height: 60rpx;
					margin-bottom: 10rpx;
				}
				.news_txt{
					font-size: 24rpx;
					color: #333333;
				}
				.news_txt1{
					font-size: 24rpx;
					color: #999999;
				}
			}
		}
	}
	.text{
		display: flex;
		justify-content: center;
		margin-top: 30rpx;
		font-size: 24rpx;
		color: #999999;
	}
	.venue{
		margin-top: 40rpx;
		padding: 0 24rpx;
		.nearby{
			margin-bottom: 20rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			.hr{
				width: 8rpx;
				height: 30rpx;
				margin-right: 14rpx;
				background: #292E33;
				border-radius: 4rpx;
			}
			.text1{
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #4D4D4D;
			}
		}
	}
	.recommend-box{
		// width: 100%;
		// height: 270upx;
		// padding: 0rpx 24rpx 12rpx;
		white-space: nowrap;/*文本不会换行，文本会在在同一行上继续*/
		// overflow-x:auto;/*可滑动*/
		box-sizing: border-box;
		// overflow: hidden;
		padding-bottom: 12rpx;
		// margin-left: 24rpx;
		width: calc(100% - 24rpx);
		margin-bottom: 30rpx;
		.recommend-item{
			&:last-child{
				margin-right: 0;
			}
			position: relative;
			width: 600rpx;
			height: 300rpx;
			margin-right: 24rpx;
			display: inline-block;/*行内块元素*/
			position: relative;
			.model{
				position: absolute;
				top: 0;
				left: 0;
				z-index: 100;
				width: 100%;
				height: 100%;
				border-radius: 32rpx;
				background: rgba(0,0,0,0.3);
			}
			.img-wrapper{
				position: relative;
				width: 600rpx;
				height: 300rpx;
				border-radius: 32rpx;
				overflow: hidden;
				.recommend-img{
					width: 100%;
					height: 100%;
				}
				.fabulous{
					height: 50upx;
					position: absolute;
					z-index: 102;
					left: 30rpx;
					bottom: 50rpx;
					display: flex;
					flex-direction: column;
					// align-items: center;
					image{
						width: 26rpx;
						height: 32rpx;
						margin-left: 40rpx;
					}
					.title{
						margin-bottom: 16rpx;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
					}
					.add_box{
						display: flex;
						flex-direction: row;
					}
					.address{
						width: 464rpx;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						overflow:hidden;
						text-overflow:ellipsis;
						white-space:nowrap;
					}
				}
			}
			.hotel-name{
				width: 95%;
				font-size: 26upx;
				color: #E5E5E5;
				line-height: 50rpx;
				// margin-bottom: 14upx;
				white-space: nowrap; 
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.hotel-price{
				font-size: 26upx;
				color: #E5E5E5;
				.qi{
					color: #5BB725;
					font-weight: bold;
				}
			}
			.introduction{
				width: 80%;
				font-size: 20upx;
				color: #808080;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
	::-webkit-scrollbar{
		display: none;
	}
</style>
