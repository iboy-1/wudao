<template>
	<view class="page">
		<view class="header">
			<image :src="courseInfo.images"></image>
			<view class="right">
				<view class="course">
					<view class="type" v-if="courseInfo.course_type=='2'">团课</view>
					<view class="type" v-else>私教</view>
					<view class="course_name">{{courseInfo.course_name}}</view>
				</view>
				<view class="date">日期：{{courseInfo.start_date}}（周一）</view>
				<view class="date">时间：{{courseInfo.start_time}} ~ {{courseInfo.end_time}}</view>
				<view class="date">场馆：广西谷舞点典舞蹈中心/身体工作室</view>
				<view class="date">场地：广西谷舞点典舞蹈中心/身体工作室</view>
				<view class="date">成团人数：5人</view>
				<view class="date">老师：{{courseInfo.teacher.nickname}}</view>
			</view>
		</view>
		<view class="introduce" @click="dl">
			<text>课程介绍</text>
			<image src="../../static/bottom.png"></image>
		</view>
		<view :class="isOpen?'introduce_info':'introduce_info1'">
			<view class="text" v-if="isOpen">
				<rich-text :nodes="courseInfo.introduce"></rich-text>
			</view>
		</view>
		<view class="hr"></view>
		<view class="myCard">
			<block v-if="myCardList.length>0">
				<view class="myCard_list" v-for="(item,index) in myCardList" :key="index">
					<view class="top">
						<image src="../../static/card.jpg"></image>
						<view class="card_name">
							<view class="name">新人体验卡</view>
							<view class="rule">支持场馆：全部场馆</view>
						</view>
						<view class="card_name1">
							<view class="type">次卡类型</view>
							<view class="hr"></view>
							<view class="explain">支持场馆：全部场馆</view>
						</view>
					</view>
				</view>
			</block>
			<block v-else>
				<view class="no_card">您没有可预约这节课程的会员卡</view>
			</block> 
		</view>
		<view class="buyCard">
			<view class="text">以下会员卡支持预约这节课程，点击购买</view>
			<!-- <view class="myCard_list" v-for="(item,index) in buyCardList" :key="index" @click="go">
				<view class="top">
					<image src="../../static/card.jpg"></image>
					<view class="card_name">
						<view class="name">新人体验卡</view>
						<view class="rule">支持场馆：全部场馆</view>
					</view>
					<view class="card_name1">
						<view class="type">次卡类型</view>
						<view class="hr"></view>
						<view class="explain">支持场馆：全部场馆</view>
					</view>
				</view>
			</view> -->
			<view class="myCard_list" v-for="(item,index) in buyCardList" :key="index" @click="go(item)">
				<view class="top">
					<image :src="item.card_image"></image>
					<view class="card_name">
						<view class="name">{{item.card_name}}</view>
						<view class="rule" v-if="item.use_venue=='0'">支持场馆：全部场馆</view>
						<view class="rule" v-else>支持场馆：全部场馆</view><!-- 多场馆多场馆json格式：[{"id":"1","msg":"场馆1"},{"id":"2","msg":"场馆2"}]) -->
					</view>
					<view class="card_name1">
						<view class="type" v-if="item.card_value_type=='1'">次卡类型</view>
						<view class="type" v-else>储值类型</view>
						<view class="hr"></view>
						<view class="explain" v-if="item.use_venue=='0'">支持场馆：全部场馆</view>
						<view class="explain" v-else>支持场馆：全部场馆</view><!-- 多场馆多场馆json格式：[{"id":"1","msg":"场馆1"},{"id":"2","msg":"场馆2"}]) -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				courseInfo:{},
				myCardList:[],
				buyCardList:[],
				isOpen:true,
			}
		},
		onShow() {
			this.courseInfo = uni.getStorageSync('courseInfo')
			console.log(this.courseInfo)
			this.render()
		},
		methods:{
			render(){
				let _this = this
				uni.request({
					// url: 'https://wudao.gxhxinfo.com/member/v1/Home/cardList',
					url: 'https://keep.gxhxinfo.com/member/v1/Home/cardList',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					success: (res) => {
						_this.buyCardList = res.data.data.data
					}
				})
			},
			go(item){
				uni.setStorageSync('cardInfo',item)
				uni.navigateTo({
					url:'../card/buyCard/buyCard'
				})
			},
			dl(){
				this.isOpen = !this.isOpen
			}
		}
	}
</script>

<style lang="scss">
	.page{
		width: 750rpx;
		margin: 0 auto;
	}
	.header{
		// width: 100%;
		padding: 30rpx;
		background: linear-gradient(left,#3a3c48 0,#3a3c48 100%);
		display: flex;
		flex-direction: row;
		align-items: center;
		
		image{
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}
		
		.right{
			margin-left: 30rpx;
			
			.course{
				display: flex;
				flex-direction: row;
				align-items: center;
				
				.type{
					padding: 5rpx 10rpx;
					background-color: #fd9f45;
					font-size: 24rpx;
					color: #FFFFFF;
				}
				.course_name{
					margin-left: 20rpx;
					font-size: 30rpx;
					font-weight: 600;
					color: #FFFFFF;
				}
			}
			.date{
				line-height: 36rpx;
				font-size: 22rpx;
				color: #FFFFFF;
			}
		}
	}
	.introduce{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 10rpx 0;
		font-size: 30rpx;
		font-weight: 600;
		color: #555555;
		
		image{
			width: 16rpx;
			height: 12rpx;
			margin-left: 8rpx;
		}
	}
	.introduce_info{
		height: 80rpx;
		padding: 0 30rpx;
		background-color: #f5f5f5;
		font-size: 24rpx;
		color: grey;
		transition: all 0.4s cubic-bezier(0.25, 1.0, 0.25, 1.0);
		
		.text{
			padding-top: 20rpx;
		}
	}
	.introduce_info1{
		height: 0rpx;
		padding: 0 30rpx;
		background-color: #f5f5f5;
		font-size: 24rpx;
		color: grey;
		transition: all 0.4s cubic-bezier(0.25, 1.0, 0.25, 1.0);
	}
	.hr{
		width: 100%;
		height: 2rpx;
		background-color: #cccccc;
	}
	.myCard{
		width: 100%;
		margin-top: 20rpx;
		padding-bottom: 60rpx;
		border-bottom: 2rpx solid #cccccc;
		
		.no_card{
			font-size: 28rpx;
			text-align: center;
		}
		
		.myCard_list{
			width: 100%;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			
			.top{
				padding: 0rpx 50rpx;
				position: relative;
				
				image{
					width: 100%;
					height: 360rpx;
					border-radius: 8rpx;
				}
				
				.card_name{
					position: absolute;
					left: 100rpx;
					top: 50rpx;
					
					.name{
						font-weight: 600;
						color: #555555;
					}
					.rule{
						font-size: 24rpx;
						font-weight: 600;
						color: #555555;
					}
				}
				.card_name1{
					width: 550rpx;
					position: absolute;
					left: 100rpx;
					bottom: 30rpx;
					
					.type{
						display: flex;
						flex-direction: row-reverse;
						font-size: 28rpx;
						color: #555555;
					}
					
					.hr{
						width: 100%;
						height: 4rpx;
						background-color: #555555;
					}
					
					.explain{
						margin-top: 10rpx;
						font-size: 20rpx;
						color: #555555;
					}
				}
			}
		}
	}
	.buyCard{
		width: 100%;
		margin-top: 40rpx;
		
		.text{
			padding: 20rpx;
			font-size: 24rpx;
			color: grey;
		}
		
		.myCard_list{
			width: 100%;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			
			.top{
				padding: 0rpx 50rpx;
				position: relative;
				
				image{
					width: 100%;
					height: 360rpx;
					border-radius: 8rpx;
				}
				
				.card_name{
					position: absolute;
					left: 100rpx;
					top: 50rpx;
					
					.name{
						font-weight: 600;
						color: #555555;
					}
					.rule{
						font-size: 24rpx;
						font-weight: 600;
						color: #555555;
					}
				}
				.card_name1{
					width: 550rpx;
					position: absolute;
					left: 100rpx;
					bottom: 30rpx;
					
					.type{
						display: flex;
						flex-direction: row-reverse;
						font-size: 28rpx;
						color: #555555;
					}
					
					.hr{
						width: 100%;
						height: 4rpx;
						background-color: #555555;
					}
					
					.explain{
						margin-top: 10rpx;
						font-size: 20rpx;
						color: #555555;
					}
				}
			}
		}
	}
</style>
