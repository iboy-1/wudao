<template>
	<view class="page">
		<view class="container">
			<view class="myInfo" v-if="info.is_join==1">
				<view class="nowHlpe">当前助力人数：{{myInfo.number}}</view>
				<view class="num">总人数：{{myInfo.total_number}}</view>
			</view>
			<view class="help_list" v-if="info.is_join==1">
				<view class="text">助力人员</view>
				<view class="item_box">
					<view v-for="(item,index) in helpList" :key="index" class="item">
						<image :src="item.user.avatar"></image>
						<view class="name">{{item.user.nikanme}}</view>
					</view>
				</view>
			</view>
			<view class="button" @click="signUp" v-if="info.is_join==0">我要参与</view>
			<button open-type="share"   v-bind:data-student="item" class="button" v-else>邀请好友助力</button>
		</view>
	</view>
</template>

<script>
	import { apiGatActivityDetailHaggle,apiActivityRegistrationHaggle,apiGatHaggleJoin } from '@/api/user.js'
	export default{
		data(){
			return{
				id:'',
				info:{},
				helpList:[],
				myInfo:{}
			}
		},
		onShareAppMessage(event) {
			let userid = uni.getStorageSync('userid')
		    return {
		        title:'吾导教育',
		        path:'/pages/Activity/helpBargain?id='+userid+'&activity_id='+this.id+'&ismodel=1',
				// imageUrl:'/static/map_share.png',
		        success(res){
		            uni.showToast({
						icon:'success',
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
		onLoad(option) {
			let _this = this
			this.id = option.id
			apiGatActivityDetailHaggle({id:option.id}).success(res=>{
				this.info = res.data
				let userid = uni.getStorageSync('userid')
				apiGatHaggleJoin({
					user_id:userid,
					haggle_id:this.id
				}).success(res1=>{
					this.helpList = res1.haggle_list
					this.myInfo = res1.get_haggle
				})
			})
			console.log(this.helpList)
		},
		onShow() {
			
		},
		methods:{
			signUp(){
				let userid = uni.getStorageSync('userid')
				apiActivityRegistrationHaggle({
					user_id:userid,
					haggle_id:this.id
				}).success(res=>{
					if(res.code==200){
						uni.showToast({
							icon:'success',
							title:res.data
						})
						apiGatActivityDetailHaggle({id:this.id}).success(res=>{
							this.info = res.data
						})
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
	.page{
		width: 750rpx;
	}
	.bg{
		position: fixed;
		top: 0;
		left: 0;
			width: 750rpx;
			height: 100%;
	}
	.container{
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.myInfo{
		width: 678rpx;
		margin: 36rpx auto;
		padding: 24rpx 0;
		background: rgba(0,0,0,0.5);
		border-radius: 12rpx;
		.nowHlpe{
			margin-left: 24rpx;
			font-size: 32rpx;
			color: #FFFFFF;
		}
		.num{
			margin-left: 24rpx;
			font-size: 32rpx;
			color: #FFFFFF;
		}
	}
	.help_list{
		display: flex;
		flex-direction: column;
		width: 678rpx;
		height: 576rpx;
		padding-bottom: 24rpx;
		margin: 24rpx auto;
		background: rgba(0,0,0,0.5);
		border-radius: 12rpx;
		.item_box{
			width: 100%;
			height: 0rpx;
			flex-grow: 1;
			overflow: hidden;
			overflow-y: auto;
			.item{
				display: flex;
				flex-direction: row;
				padding: 20rpx 24rpx;
				image{
					width: 48rpx;
					height: 48rpx;
					margin-right: 16rpx;
					border-radius: 50%;
				}
				.name{
					font-size: 32rpx;
					color: #FFFFFF;
				}
			}
		}
		.text{
			padding: 18rpx 0;
			margin-left: 24rpx;
			font-size: 34rpx;
			color: #FFFFFF;
		}
		
	}
	.button{
		width: 702rpx;
		margin: 24rpx;
		height: 88rpx;
		background: #3091F2;
		border-radius: 10rpx;
		text-align: center;
		line-height: 88rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>
