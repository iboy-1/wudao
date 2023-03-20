<template>
	<view class="page">
		<ls-skeleton :animate="animate" :skeleton="skeleton" :loading="loading" ref="skeleton">
		<view class="add">
			<view class="title">选择场馆：</view>
			<view class="add_box">
				<ccPicker class="item" :range="list_country" v-model="person.country" @picker_change="country_change"></ccPicker>
				<image src="../../static/bottom1.png"></image>
			</view>
		</view>
		<view class="content">
			<view class="card" v-for="(item,index) in list" :key="index">
				<view class="top" @click="goPush('./buyCard/buyCard',0,item)">
					<view class="model"></view>
					<view class="border"></view>
					<image :src="item.card_image"></image>
					<view class="card_name">
						<view class="name">{{item.card_name}}</view>
						<view class="rule">支持场馆：{{item.venue.venue_name}}</view>
						<!-- <view class="rule" v-if="item.use_venue=='0'">支持场馆：全部场馆</view>
						<view class="rule" v-else>支持场馆：全部场馆</view>多场馆多场馆json格式：[{"id":"1","msg":"场馆1"},{"id":"2","msg":"场馆2"}]) -->
					</view>
					<view class="card_name1">
						<view class="type" v-if="item.card_value_type=='1'">次卡类型</view>
						<view class="type" v-else>储值类型</view>
						<view class="hr"></view>
						<view class="explain">支持场馆：{{item.venue.venue_name}}</view>
						<!-- <view class="explain" v-if="item.use_venue=='0'">支持场馆：全部场馆</view>
						<view class="explain" v-else>支持场馆：全部场馆</view>多场馆多场馆json格式：[{"id":"1","msg":"场馆1"},{"id":"2","msg":"场馆2"}]) -->
					</view>
				</view>
				<view class="bottom" @click="goPush('../supCourses/supCourses?id='+item.id,1)">
					<view class="look">查看支持的课程</view>
					<image src="../../static/left.png"></image>
				</view>
			</view>
		</view>
		</ls-skeleton>
		<aui-loading ref="auiLoading" :show="true" :type="3" :mask="true"></aui-loading>
	</view>
</template>

<script>
	import ccPicker from "@/components/cc-picker/cc-picker.vue"
	import lsSkeleton from '@/components/ls-skeleton/ls-skeleton.nvue';
	import auiLoading from '@/components/aui-loading/aui-loading.vue';
	import { apiCardList } from '@/api/card.js'
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
					'card-sm',
					'card-lg',
					'line-lg*3',
					'card-lg',
					'line-lg*3',
					'card-lg',
					'line-lg*3',
				],
				list:[],
				isChoice:false,
				address:[],
				venue_name:'',
				venue_id:'-1',
				tabVenue:0,
				person: {
				    country: '-1',
				},
				list_country: [
				    { V: '-1', K: '所有场馆' },
				],
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
			let _this = this
			if (userid) {
				uni.request({
					// url: 'https://wudao.gxhxinfo.com/member/v1/Home/cardList',
					url: 'https://keep.gxhxinfo.com/member/v1/Home/cardList',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data:{
						venue_id:_this.venue_id
					},
					success: (res) => {
						_this.list = res.data.data.data
					}
				})
				uni.stopPullDownRefresh();
			}
		},
		onShow() {
			this.$refs.auiLoading.show();
			this.loading = true
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
				this.list_country = [{ V: '-1', K: '所有场馆' }]
				uni.request({//获取场馆
					// url: 'https://wudao.gxhxinfo.com/member/v1/Home/venueList',
					url: 'https://keep.gxhxinfo.com/member/v1/Home/venueList',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					success: (res) => {
						res.data.data.data.forEach(function(value){
							let obj = {}
							console.log(value)
							obj.V = value.id
							obj.K = value.venue_name
							_this.list_country.push(obj)
							_this.person.country = _this.list_country[0].V
						})
						_this.address = res.data.data.data
						_this.venue_name = _this.address[0].venue_name
						// _this.venue_id = _this.address[0].id
						uni.request({
							// url: 'https://wudao.gxhxinfo.com/member/v1/Home/cardList',
							url: 'https://keep.gxhxinfo.com/member/v1/Home/cardList',
							method: 'GET',
							header: {
								'content-type': 'application/x-www-form-urlencoded',
							},
							data:{
								venue_id:_this.list_country[0].V
							},
							success: (res) => {
								this.$refs.auiLoading.hide();
								_this.loading = false
								_this.list = res.data.data.data
								// console.log(_this.list[0].card_name)
							}
						})
					}
				})
				
			},
			show(){
				this.isChoice = !this.isChoice
			},
			choice(item,index){//选择场馆
				let _this = this
				this.tabVenue = index
				this.venue_name = item.venue_name
				this.venue_id = item.id
				uni.request({
					// url: 'https://wudao.gxhxinfo.com/member/v1/Home/cardList',
					url: 'https://keep.gxhxinfo.com/member/v1/Home/cardList',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data:{
						venue_id:_this.venue_id
					},
					success: (res) => {
						_this.list = res.data.data.data
						console.log(_this.list[0].card_name)
					}
				})
			},
			country_change(e){
				this.$refs.auiLoading.show();
				let _this = this
				let userid = uni.getStorageSync('userid')
				this.venue_id = e.new_v
				uni.request({
					// url: 'https://wudao.gxhxinfo.com/member/v1/Home/cardList',
					url: 'https://keep.gxhxinfo.com/member/v1/Home/cardList',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data:{
						venue_id:_this.venue_id
					},
					success: (res) => {
						_this.list = res.data.data.data
						this.$refs.auiLoading.hide();
					}
				})
			},
			goPush(url,index,item){
				if(index==0){
					uni.setStorageSync('cardInfo',item)
				}
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #EDF2F7;
	}
	.page{
		width: 750rpx;
		margin: 0 auto;
		padding-bottom: 100rpx;
	}
	.add{
		position: relative;
		width: 100%;
		height: 80rpx;
		margin-bottom: 10rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		
		
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
		
		// image{
		// 	width: 40rpx;
		// 	height: 40rpx;
		// 	margin: 0 30rpx;
		// }
		.bottom{
			width: 28rpx;
			height: 18rpx;
			margin: 0 30rpx;
		}
		.address{
			flex: 1;
			font-size: 30rpx;
			color: #333333;
		}
		.choice{
			position: absolute;
			z-index: 8;
			top: 82rpx;
			width: 670rpx;
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
			}
		}
	}
	.content{
		display: flex;
		flex-direction: column;
		width: 100%;
		
		.card{
			width: 100%;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			
			.top{
				padding: 40rpx 46rpx;
				position: relative;
				
				.model{
					position: absolute;
					top: 40rpx;
					left: 46rpx;
					width: 658rpx;
					height: 400rpx;
					background: rgba(0,0,0,0.3);
					border-radius: 20rpx;
				}
				
				.border{
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
					width: 616rpx;
					height: 360rpx;
					border: 2rpx solid #FFFFFF;
					opacity: 0.3;
					border-radius: 20rpx;
				}
				
				image{
					width: 100%;
					height: 400rpx;
					border-radius: 20rpx;
				}
				
				.card_name{
					position: absolute;
					left: 100rpx;
					top: 66rpx;
					
					.name{
						font-size: 40rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
					}
					.rule{
						margin-top: 20rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
					}
				}
				.card_name1{
					width: 550rpx;
					position: absolute;
					left: 100rpx;
					bottom: 76rpx;
					
					.type{
						display: flex;
						flex-direction: row-reverse;
						margin-bottom: 10rpx;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
					}
					
					.hr{
						width: 100%;
						height: 4rpx;
						background-color: #FFFFFF;
					}
					
					.explain{
						margin-top: 10rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
					}
				}
			}
			.bottom{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 30rpx;
				border-top: 2rpx solid #E6E6E6;
				
				.look{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #4D4D4D;
				}
				image{
					width: 12rpx;
					height: 20rpx;
				}
			}
		}
	}
</style>
