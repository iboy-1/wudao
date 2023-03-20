<template>
	<view class="page">
		<ls-skeleton :animate="animate" :skeleton="skeleton" :loading="loading" ref="skeleton">
		<view class="my_card" v-if="myCardList.length>0">
			<view class="myCard_list" v-for="(item,index) in myCardList" :key="index">
				<view class="top">
					<view class="model"></view>
					<view class="border"></view>
					<image :src="item.card_manage.card_image"></image>
					<view class="card_name">
						<view class="name">{{item.card_manage.card_name}}</view>
						<view class="rule" v-if="item.venue">支持场馆：{{item.venue.venue_name}}</view>
						<view class="rule" v-else>支持场馆：无</view>
						<!-- <view class="rule" v-if="item.card_manage.use_venue=='0'">支持场馆：全部场馆</view>
						<view class="rule" v-else>支持场馆：全部场馆</view>多场馆多场馆json格式：[{"id":"1","msg":"场馆1"},{"id":"2","msg":"场馆2"}]) -->
					</view>
					<view class="card_name1">
						<view class="type" v-if="item.card_manage.card_value_type=='1'">次卡类型</view>
						<view class="type" v-else>储值类型</view>
						<view class="hr"></view>
						<view class="explain" v-if="item.venue">支持场馆：{{item.venue.venue_name}}</view>
						<view class="explain" v-else>支持场馆：无</view>
						<!-- <view class="explain" v-if="item.card_manage.use_venue=='0'">支持场馆：全部场馆</view>
						<view class="explain" v-else>支持场馆：全部场馆</view>多场馆多场馆json格式：[{"id":"1","msg":"场馆1"},{"id":"2","msg":"场馆2"}]) -->
					</view>
				</view>
				<view class="num" v-if="item.card_manage.card_value_type=='1'">剩余次数：{{item.member_card_amount}}次</view>
				<view class="num" v-else>余额：{{item.member_card_amount}}元</view>
				<view class="byDate">截止时间：{{item.expiration_time}}</view>
				<view class="bottom" @click="go(item)">
					<view class="look">查看支持的课程</view>
					<image src="../../../static/left.png"></image>
				</view>
			</view>
		</view>
		<view class="button_box" v-else>
			<view class="button" @click="purchase">购买会员卡</view>
		</view>
		</ls-skeleton>
		<aui-loading ref="auiLoading" :show="true" :type="3" :mask="true"></aui-loading>
	</view>
</template>

<script>
	import { apiGetCard } from '@/api/card.js'
	import auiLoading from '@/components/aui-loading/aui-loading.vue';
	import lsSkeleton from '@/components/ls-skeleton/ls-skeleton.nvue';
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
					'card-lg',
					'card-sm*3',
					'card-lg',
					'card-sm*3',
					'card-lg',
					'card-sm*3',
				],
				myCardList:[]
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
				apiGetCard({user_id:userid}).success(res=>{
					this.myCardList = res.data.data
					this.render()
				})
				uni.stopPullDownRefresh();
			}
		},
		onLoad() {
			this.$refs.auiLoading.show();
			this.loading = true
		},
		onShow() {
			let userid = uni.getStorageSync('userid')
			apiGetCard({user_id:userid}).success(res=>{
				console.log(res)
				this.myCardList = res.data.data
				// let _this = this
				// res.data.data.forEach(function(value){
				// 	let nowTime = Date.parse(new Date())
				// 	let time = Date.parse(new Date(value.card_manage.expire.replace(/-/g,"/")))
				// 	console.log(value.card_manage.expire)
				// 	if(nowTime<time){
				// 		_this.myCardList.push(value)
				// 	}
				// })
				this.render()
			})
		},
		methods:{
			render(){
				// this.myCardList.forEach(function(value){
				// 	let date = value.card_manage.expire.split(' ')[0]
				// 	value.card_manage.expire = date.split('-')[0]+'年'+date.split('-')[1]+'月'+date.split('-')[2]+'日'
				// })
				this.$refs.auiLoading.hide();
				this.loading = false
			},
			purchase(){
				uni.switchTab({
					url:'../../card/index'
				})
			},
			go(item){
				console.log(item)
				uni.navigateTo({
					url:'../../supCourses/supCourses?id='+item.member_card_id
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
	.my_card{
		width: 100%;
		margin-top: 20rpx;
		padding-bottom: 60rpx;
		
		.no_card{
			font-size: 28rpx;
			text-align: center;
		}
		
		.myCard_list{
			width: 100%;
			padding-top: 40rpx;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			
			.top{
				padding: 0rpx 46rpx;
				position: relative;
				
				.model{
					position: absolute;
					top: 0rpx;
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
					opacity: 0.5;
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
					top: 48rpx;
					
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
					bottom: 34rpx;
					
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
			.num{
				padding: 20rpx 46rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}
			.byDate{
				padding: 0rpx 46rpx 20rpx 46rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}
			.bottom{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 24rpx 46rpx;
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
	.button_box{
		padding: 30rpx;
		
		.button{
			width: 100%;
			height: 88rpx;
			background-color: #3a3c48;
			text-align: center;
			line-height: 88rpx;
			color: #FFFFFF;
			border-radius: 8rpx;
		}
	}
</style>
