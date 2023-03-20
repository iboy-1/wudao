<template>
	<view class="page">
		<ls-skeleton :animate="animate" :skeleton="skeleton" :loading="loading" ref="skeleton">
		<view class="content">
			<view class="card">
				<view class="top">
					<view class="model"></view>
					<view class="border"></view>
					<image :src="card.card_image"></image>
					<view class="card_name">
						<view class="name">{{card.card_name}}</view>
						<!-- <view class="rule1" v-if="card.is_many_venue==1">支持场馆：全部场馆</view>
						<view class="rule1" v-else>支持场馆：全部场馆</view> -->
						<view class="rule1">支持场馆：{{card.venue.venue_name}}</view>
					</view>
					<view class="card_name1">
						<view class="type" v-if="card.card_value_type=='1'">次卡类型</view>
						<view class="type" v-else>储值类型</view>
						<view class="hr"></view>
						<view class="explain">特别说明：{{card.remarks}}</view>
					</view>
				</view>
			</view>
			<view class="card_name">{{card.card_name}}</view>
			<view class="type" v-if="card.card_value_type=='1'">类型：次卡</view>
			<view class="type" v-else>类型：储值卡</view>
			<view class="rules">支持场馆：{{card.venue.venue_name}}</view>
			<!-- <view class="rules" v-if="card.is_many_venue==0">支持场馆：全部场馆</view>
			<view class="rules" v-else>支持场馆：广西谷舞点典舞蹈中心/身体工作室</view> -->
			<view class="bottom" @click="goPush">
				<view class="look">查看支持的课程</view>
				<image src="../../../static/left.png"></image>
			</view>
		</view>
		<view class="price">
			<view class="left" v-if="card.card_value_type=='1'">
				<view class="now_money"><text>￥</text>{{card.price}}</view>
				<view class="num">（可使用{{card.count}}次）</view>
				<view class="money">使用期限：{{card.expire}}天</view>
			</view>
			<view class="left" v-else>
				<view class="now_money"><text>￥</text>{{card.price}}</view>
				<view class="num">（储值{{card.count}}元）</view>
				<view class="money">使用期限：{{card.expire}}天</view>
			</view>
			<view class="left">
				<radio-group @change="radioChange"  class="label">
				    <label>
				        <view>
				            <radio></radio>
				        </view>
				    </label>
				</radio-group>
			</view>
		</view>
		<view class="title">
			<view class="hr"></view>
			<view class="text">特别说明</view>
		</view>
		<view class="rule" v-html="card.card_explain"></view>
		<view class="add">
			<view class="add_box">
				<view class="hr"></view>
				<view class="text">开卡场馆:*</view>
			</view>
			<view class="choice">
				<ccPicker class="item" :range="list_country" v-model="person.country" @picker_change="country_change"></ccPicker>
				<image src="../../../static/bottom.png" class="bottom"></image>
			</view>
		</view>
		<view class="add">
			<view class="add_box">
				<view class="hr"></view>
				<view class="text">销售人员：</view>
			</view>
			<view class="choice">
				<ccPicker class="item" :range="list_country1" v-model="person1.country" @picker_change="country_change1"></ccPicker>
				<image src="../../../static/bottom.png" class="bottom"></image>
			</view>
		</view>
		<view class="items">
			<radio-group @change="radioChange1"  class="label">
			    <label>
			        <view>
			            <radio></radio>
			        </view>
			    </label>
			</radio-group>
			<view class="agree">同意<text @click="go" style="color: #007AFF;">《会员协议》</text></view>
		</view>
		<view class="button_box">
			<!-- #ifdef MP-WEIXIN -->
			<view class="botton" @click="purchase">立即购买</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="botton" @click="wxpayments">立即购买</view>
			<!-- #endif -->
		</view>
		</ls-skeleton>
		<aui-loading ref="auiLoading" :show="true" :type="3" :mask="true"></aui-loading>
	</view>
</template>

<script>
	import { apiOrder } from '@/api/card.js'
	import { apiWXPay } from '@/api/pay.js'
	import { apiGetTeacher } from '@/api/teacher.js'
	import ccPicker from "@/components/cc-picker/cc-picker.vue"
	import lsSkeleton from '@/components/ls-skeleton/ls-skeleton.nvue';
	import auiLoading from '@/components/aui-loading/aui-loading.vue';
	import utilMd5 from '@/common/js/wechat-app/md5.js'
	export default{
		components: {
		    ccPicker,
			lsSkeleton,
			auiLoading
		},
		data(){
			return{
				animate: true,
				loading: true,
				skeleton: [
					'card-lg',
					'card*5'
					
				],
				person: {
				    country: '',
				},
				person1: {
				    country: '-1',
				},
				list_country: [],
				list_country1: [
				    { V: '-1', K: '请选择' },
				],
				card:{},
				isCommodity:false,
				isAgree:false,
				teacher_id:'-1',
				venue_id:null
			}
		},
		onLoad() {
			this.$refs.auiLoading.show();
			this.loading = true
		},
		onShow() {
			this.card = uni.getStorageSync('cardInfo')
			let richtext = this.card.card_explain;
			const regex = new RegExp('<img', 'gi');
			richtext = richtext.replace(regex,'<img style="max-width: 100%;"');
			
			const regex1 = new RegExp('data-fail="0" style="', 'gi');
			richtext = richtext.replace(regex1,'data-fail="0" style="max-width: 100%;');
			this.card.card_explain = richtext
			console.log(this.card)
			this.render()
			this.getTeacher()
		},
		methods:{
			render(){
				let _this = this
				this.list_country = []
				uni.request({//获取场馆
					// url: 'https://wudao.gxhxinfo.com/member/v1/Home/venueList',
					url: 'https://keep.gxhxinfo.com/member/v1/Home/venueList',
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					success: (res) => {
						console.log(res.data.data.data)
						_this.venue_id = res.data.data.data[0].id
						res.data.data.data.forEach(function(value){
							let obj = {}
							console.log(value)
							obj.V = value.id
							obj.K = value.venue_name
							_this.list_country.push(obj)
						})
						console.log(_this.list_country)
						_this.person.country = _this.list_country[0].V
						this.$refs.auiLoading.hide();
						_this.loading = false
					},
				})
			},
			getTeacher(){
				let _this = this
				this.list_country1 = [{ V: '-1', K: '请选择' }]
				apiGetTeacher({limit:100}).success(res => {
					console.log(res.data.data)
					res.data.data.forEach(function(value){
						let obj = {}
						console.log(value)
						obj.V = value.id
						obj.K = value.nickname
						_this.list_country1.push(obj)
					})
				})
				console.log(22222)
			},
			go(){
				uni.navigateTo({
					url:'../../me/agreement/agreement'
				})
			},
			goPush(){
				uni.navigateTo({
					url:'../../supCourses/supCourses?id='+this.card.id
				})
			},
			country_change(e){
				this.venue_id = e.new_v
			},
			country_change1(e){
				console.log(e)
				this.teacher_id = e.new_v
			},
			radioChange(e){
				this.isCommodity = true
			},
			radioChange1(e){
				this.isAgree = true
			},
			wxpayments() {
				var surl = window.location.href.split('#')[0];
				uni.request({
					// url: 'https://wudao.gxhxinfo.com/pay/v1/Payment/PayPortal',
					url: 'https://keep.gxhxinfo.com/pay/v1/Payment/PayPortal',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //post一定要带这个header，被这里坑了半天
					},
					data: {
						url: surl
					},
					success: res => {
						console.log(res.data.data)
						// this.getconfig(res.data.data);
					}
				});
			},
			getconfig(configdata) {
				let config = configdata;
				let wx = require('@/components/jweixin-module/index.js'); //引入微信JSDDK
				let authorization = uni.getStorageSync('token');
				var _this = this;
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: config.appId, // 必填，公众号的唯一标识
					timestamp: config.timestamp, // 必填，生成签名的时间戳
					nonceStr: config.nonceStr, // 必填，生成签名的随机串
					signature: config.signature, // 必填，签名，见附录1
					jsApiList: ['chooseWXPay']
				});
				wx.ready(function() {
					uni.request({
						url: '/api/pay/wx/wxPay',
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							authorization: authorization //token
						},
						data: {
							orderNo: _this.orderId,
							authorization: authorization
						},
						success: res => {
							console.log(JSON.stringify(res.data.data));
							wx.chooseWXPay({
								// appId: res.data.appId,
								timestamp: res.data.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
								nonceStr: res.data.data.nonceStr, // 支付签名随机串，不长于 32 位
								package: res.data.data.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
								signType: res.data.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
								paySign: res.data.data.paySign, // 支付签名
								success: function(res) {
									// 支付成功后的回调函数
									alert('支付成功');
									uni.navigateTo({
										url: `/order/order?status=0`
									});
								},
								fail: function(res) {
									console.log('支付失败');
									console.log(res);
								}
							});
						}
					});
				});
				wx.error(function(res) {
					// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
					console.log('验证失败');
					console.log(res);
				});
			},
			purchase(){
				if(!this.isCommodity){
					uni.showModal({
						// title: '提示',
						showCancel:false,
						content: '请选择商品！',
						// confirmText: '我知道了',
						success: function(res) {
							
						}
					});
					return false
				}
				if(!this.isAgree){
					uni.showModal({
						// title: '提示',
						showCancel:false,
						content: '同意会员协议之后方可购买~~',
						// confirmText: '我知道了',
						success: function(res) {
							
						}
					});
					return false
				}
				let _this = this
				let user_id = uni.getStorageSync('userid')
				apiOrder({
					card_id:this.card.id,
					user_id:user_id,
					teacher_id:this.teacher_id,
					venue_id:this.venue_id,
					remarks:'',
					order_amount:this.card.price
				}).success(ord=>{
					if(ord.code==200){
						// console.log(ord)
						let order_number = ord.data.order_number
						let amount = ord.data.actual_collection
						let openid = uni.getStorageSync('openid')
						apiWXPay({
							paySdk:'WeChaytPay',
							payType:'WeChatAPP',
							open_id:openid,
							order_number:order_number,
							amount:amount,
							body:'吾导教育服务',
							detail:'吾导教育服务',
						}).success(pay_res=>{
							console.log('pay_res',pay_res)
							_this.payForWechatApp(pay_res)
						}).fail(pay_err=>{
							console.log('pay_err',pay_err)
							_this.payForWechatApp(pay_err)
						})
					}else{
						uni.showToast({
							icon:'none',
							title:ord.data
						})
					}
				})
			},
			payForWechatApp(orderInfo){
				console.log(orderInfo)
				// console.log(orderInfo["paySign"])
				let _this = this
				let pkg = 'prepay_id=' + orderInfo["prepayid"];
				// let timeStamp = String(Date.now());
				let timeStamp = orderInfo["timestamp"]
				// let paySign = utilMd5.hexMD5('appId='+orderInfo.appid+'&nonceStr='+orderInfo.noncestr+'&package='+pkg+'&signType=MD5&timeStamp='+timeStamp+"&key=f4276ab987e11903649f02b1d688f77d").toUpperCase();
				let paySign = orderInfo["paySign"]
			
				uni.requestPayment({
				    provider: 'wxpay',
				    timeStamp: String(timeStamp),
				    nonceStr: String(orderInfo.noncestr),
				    package: String(pkg),
				    signType: 'MD5',
					// paySign: String(paySign),
					paySign: paySign,
				    success: function (res) {
				        // console.log('success:' + JSON.stringify(res));
						uni.hideLoading()
						uni.showToast({
							icon:'success',
							title:'支付成功'
						})
						setTimeout(function(){
							uni.redirectTo({
								url:'../../me/myCard/myCard'
							})
						},800)
				    },
				    fail: function (err) {
				        console.log('fail:' + JSON.stringify(err));
						uni.hideLoading()
						uni.showToast({
							icon:'none',
							title:'支付失败'
						})
						setTimeout(function(){
							uni.redirectTo({
								url:'../../me/myCard/myCard'
							})
						},800)
						uni.setStorageSync('orderState','0')
				    }
				});
			},
		}
	}
</script>

<style lang="scss">
	page{
		width: 750rpx;
		max-width: 750rpx;
		background-color: #EDF2F7;
	}
	.page{
		width: 750rpx;
		margin: 0 auto;
		padding-bottom: 100rpx;
	}
	.content{
		display: flex;
		flex-direction: column;
		width: 100%;
		padding-top: 40rpx;
		// border-bottom: 2rpx solid #cccccc;
		background-color: #FFFFFF;
		
		.card{
			// width: 100%;
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
					top: 36rpx;
					
					.name{
						margin-bottom: 20rpx;
						font-size: 40rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
					}
					.rule1{
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
					bottom: 36rpx;
					
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
						width: 500rpx;
						overflow:hidden;
						text-overflow:ellipsis;
						white-space:nowrap;
						margin-top: 10rpx;
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						.text{
							width: 500rpx;
							overflow:hidden;
							text-overflow:ellipsis;
							white-space:nowrap;
						}
					}
				}
			}
		}
		.card_name{
			padding: 15rpx 34rpx 20upx;
			font-size: 40rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #4D4D4D;
		}
		.type{
			padding: 15rpx 34rpx 20upx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #808080;
		}
		.rules{
			padding: 15rpx 34rpx 20upx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #808080;
		}
		.bottom{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 30rpx;
			border-top: 2rpx solid #F1F1F1;
			
			.look{
				font-size: 24rpx;
				color: #555555;
			}
			image{
				width: 12rpx;
				height: 20rpx;
			}
		}
	}
	.price{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		
		.left{
			display: flex;
			flex-direction: column;
			
			.now_money{
				font-size: 48rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FF6666;
				text{
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FF6666;
				}
			}
			.num{
				margin: 6rpx 0rpx 10rpx 0rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #4D4D4D;
			}
			.money{
				font-size: 24rpx;
				color: #999999;
				
				text{
					margin-left: 10rpx;
					text-decoration: line-through;
				}
			}
		}
	}
	.rule{
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		font-size: 24rpx;
		color: #808080;
	}
	.title{
		padding: 24rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		.hr{
			width: 8rpx;
			height: 32rpx;
			margin-right: 14rpx;
			background: #3091F2;
			border-radius: 4rpx;
		}
		.text{
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #4D4D4D;
		}
	}
	.add{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 36rpx 24rpx;
		border-top: 2rpx solid #E6E6E6;
		background-color: #FFFFFF;
		
		.add_box{
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 260rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #4D4D4D;
			.hr{
				width: 8rpx;
				height: 32rpx;
				margin-right: 14rpx;
				background: #3091F2;
				border-radius: 4rpx;
			}
		}
		.choice{
			flex-grow: 1;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
			
			image{
				width: 24rpx;
				height: 14rpx;
				margin: 0 6rpx;
			}
		}
	}
	.items{
		display: flex;
		flex-direction: row;
		align-items: center;
		// width: 100%;
		margin: 60rpx 30rpx 30rpx 30rpx;
		font-size: 24rpx;
		
		.agree{
			margin-left: 20rpx;
		}
	}
	.button_box{
		padding: 0 30rpx;
		.botton{
			width: 100%;
			height: 80rpx;
			border-radius: 10rpx;
			background-color: #3091F2;
			color: #FFFFFF;
			text-align: center;
			line-height: 80rpx;
		}
	}
</style>
