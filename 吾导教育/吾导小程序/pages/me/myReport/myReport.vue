<template>
	<view class="page" :duration="300">
		<block v-if="isReport">
			<swiper :vertical="true">
				<block>
					<swiper-item class="item">
						<!-- #ifdef H5 -->
						<view class="item_box" style="background: url(../../../static/report_page1.jpg) no-repeat;"></view>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN || H5 -->
						<image src="../../../static/report_page1.jpg" class="bg"></image>
						<image src="../../../static/report_page1a.png" class="img"></image>
						<!-- #endif -->
						<view class="bottom"></view>
					</swiper-item>
				</block>
				<block>
					<swiper-item class="item">
						<!-- #ifdef H5 -->
						<view class="item_box" style="background: url(../../../static/report_page4.jpg) no-repeat;"></view>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN || H5 -->
						<image src="../../../static/report_page4.jpg" class="bg"></image>
						<!-- #endif -->
						<view class="bottom"></view>
						<view class="info">
							<view class="item-one">
								<image src="../../../static/card.jpg"></image>
								<view class="right">
									<view class="name">iboy♂</view>
									<view class="me">身高<text>--</text><text>|</text>体重<text>--</text></view>
								</view>
							</view>
							<view class="item-two">
								<view class="intake">建议摄入量</view>
								<view class="num">--</view>
							</view>
							<view class="item-three">
								<view class="son" v-for="(item,index) in twoData" :key="index" @click="dl(index)">
									<view class="garden" :style="tabIndex==index?'background: rgba(255,255,0,.6);':''">
										<view class="title" v-if="index==0||index==2" :class="index==0||index==2?'title':''">{{item.title}}</view>
										<view class="content">{{item.num}}</view>
										<view class="title" v-if="index==1||index==3" :class="index==1||index==3?'title1':''">{{item.title}}</view>
									</view>
								</view>
							</view>
							<view class="data">
								
							</view>
							<view class="body">
								<view class="top">
									胸围<text>--</text><text>|</text>腰围<text>--</text><text>|</text>臀围<text>--</text>
								</view>
								<view class="hipline">
									臀围比<text>--</text>
								</view>
							</view>
						</view>
					</swiper-item>
				</block>
				<block>
					<swiper-item class="item">
						<!-- #ifdef H5 -->
						<view class="item_box" style="background: url(../../../static/report_page2.jpg) no-repeat;"></view>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<image src="../../../static/report_page2.jpg" class="bg"></image>
						<!-- #endif -->
						<view class="bottom"></view>
						<view class="info">
							<view class="top">
								<view class="sec_title">约课训练</view>
							</view>
						</view>
					</swiper-item>
				</block>
				<block>
					<swiper-item class="item">
						<!-- #ifdef H5 -->
						<view class="item_box" style="background: url(../../../static/report_page3.jpg) no-repeat;"></view>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<image src="../../../static/report_page3.jpg" class="bg"></image>
						<!-- #endif -->
						<view class="bottom"></view>
					</swiper-item>
				</block>
				<block>
					<swiper-item class="item">
						<!-- #ifdef H5 -->
						<view class="item_box" style="background: url(../../../static/report_page5.jpg) no-repeat;"></view>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<image src="../../../static/report_page5.jpg" class="bg"></image>
						<!-- #endif -->
						<view class="bottom"></view>
					</swiper-item>
				</block>
				<block>
					<swiper-item class="item">
						<!-- #ifdef H5 -->
						<view class="item_box" style="background: url(../../../static/report_page5.jpg) no-repeat;"></view>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<image src="../../../static/report_page5.jpg" class="bg"></image>
						<!-- #endif -->
						<view class="bottom"></view>
					</swiper-item>
				</block>
				<block>
					<swiper-item class="item">
						<!-- #ifdef H5 -->
						<view class="item_box" style="background: url(../../../static/report_page7.jpg) no-repeat;"></view>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<image src="../../../static/report_page7.jpg" class="bg"></image>
						<image src="../../../static/qrcode_GOOD-dance-centre_1.jpg" class="img1"></image>
						<!-- #endif -->
					</swiper-item>
				</block>
			</swiper>
		</block>
		<block v-else>
			<view class="no_video">
				<image src="../../../static/no_data.png"></image>
				<view>没有健身报告～ o(︶︿︶)o</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				current:0,
				twoData:[
					{title:'体脂率',num:'--'},
					{title:'基础代谢',num:'--'},
					{title:'脂肪重量',num:'--'},
					{title:'骨骼肌重量',num:'--'}
				],
				tabIndex:0,
				isReport:false
			}
		},
		
		methods: {
			dl(index){
				this.tabIndex = index
			}
		}
	}
</script>

<style lang="scss">
	.page{
		width: 750rpx;
		margin: 0 auto;
	}
	swiper{
		width: 100%;
		height: 100vh;
		
		.item{
			width: 100%;
			height: 100vh;
			position: relative;
			
			.item_box{
				width: 100%;
				height: 100%;
				background-size: cover;
			}
			
			.bg{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
			.img{
				width: 400rpx;
				height: 580rpx;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
			.img1{
				width: 400rpx;
				height: 400rpx;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
			.bottom{
				position: absolute;
				z-index: 9;
				width: 100%;
				height: 40rpx;
				bottom: 20rpx;
				animation: animationup 1.5s infinite ease-in-out;
			}
			.bottom:before{
				content: '';
				display: block;
				position: absolute;
				left: 50%;
				/* #ifdef MP-WEIXIN */
				margin-left: -12rpx;
				/*  #endif  */
				/* #ifdef H5 */
				margin-left: -55rpx;
				/*  #endif  */
				width: 28rpx;
				height: 28rpx;
				border-left: 6rpx solid #09aeef;
				border-top: 6rpx solid #09aeef;
				transform: rotate(45deg);
			}
			.bottom:after{
				content: '';
				display: block;
				position: absolute;
				top: 18rpx;
				left: 50%;
				/* #ifdef MP-WEIXIN */
				margin-left: -12rpx;
				/*  #endif  */
				/* #ifdef H5 */
				margin-left: -55rpx;
				/*  #endif  */
				width: 28rpx;
				height: 28rpx;
				border-left: 6rpx solid #09aeef;
				border-top: 6rpx solid #09aeef;
				transform: rotate(45deg);
			}
			.info{
				width: 670rpx;
				padding: 40rpx;
				position: absolute;
				z-index: 100;
				
				.item-one{
					display: flex;
					flex-direction: row;
					width: 100%;
					padding: 20rpx 0;
					background-color: rgba(0,0,0,0.6);
					
					image{
						box-sizing: border-box;
						width: 80rpx;
						height: 80rpx;
						margin: 0 20rpx;
						border-radius: 40rpx;
						border: 4rpx solid #0088c6;
					}
					view{
						line-height: 35rpx;
						font-size: 22rpx;
						color: #0b92c7;
						text{
							margin: 0 10rpx;
						}
					}
				}
				.item-two{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 100%;
					padding: 20rpx 0;
					margin-top: 40rpx;
					background-color: rgba(0,0,0,0.6);
					font-size: 22rpx;
					.intake{
						color: #b9b9b9;
					}
					.num{
						color: #ff0;
					}
				}
				.item-three{
					margin-top: 100rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					.son{
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						
						.garden{
							position: relative;
							width: 132rpx;
							height: 132rpx;
							border: 4rpx solid #ff0;
							box-sizing: border-box;
							border-radius: 50%;
							margin-top: -20rpx;
							// background: rgba(255,255,0,.6);
							.title{
								width: 152rpx;
								position: absolute;
								top: -60rpx;
								left: 20rpx;
								font-size: 28rpx;
								color: #b0b0ae;
							}
							.title1{
								width: 152rpx;
								position: absolute;
								top: 150rpx;
								left: 0rpx;
								font-size: 28rpx;
								color: #b0b0ae;
							}
							.content{
								text-align: center;
								line-height: 132rpx;
								color: #FFFFFF;
							}
						}
					}
				}
				.data{
					width: 100%;
					height: 386rpx;
					margin-top: 90rpx;
					background-color: rgba(0,0,0,0.6);
				}
				.body{
					width: 100%;
					margin-top: 20rpx;
					background-color: rgba(0,0,0,0.6);
					display: flex;
					flex-direction: column;
					padding: 20rpx 0;
					view{
						margin-left: 30rpx;
						font-size: 22rpx;
						color: #0b92c7;
						text{
							margin: 0 10rpx;
						}
					}
				}
			}
		}
		
		@keyframes animationup{
			0%{
				opacity: 0;
				transform: translate(0,20rpx);
			}
			30%{
				opacity: 0;
				transform: translate(0,20rpx);
			}
			60%{
				opacity: 1;
				transform: translate(0,0);
			}
			100%{
				opacity: 0;
				transform: translate(0,-16rpx);
			}
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
