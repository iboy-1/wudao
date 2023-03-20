<template>
	<view class="page">
		<view class="list" v-for="(item,index) in list" :key="index">
			<view class="left">
				<image src="../../../static/card.jpg"></image>
				<view class="list_text">
					<view class="card_name">{{item.new_card}}</view>
					<view class="time1" v-if="item.member_card_type==1">次卡</view>
					<view class="time1" v-else>储值卡</view>
					<view class="time">{{item.add_date}}</view>
				</view>
			</view>
			<view class="right" v-if="item.member_card_type==1">{{item.out_card_amount}}次</view>
			<view class="right" v-else>{{item.out_card_amount}}元</view>
		</view>
	</view>
</template>

<script>
	import { apiTransferCardList } from '@/api/user.js'
	export default{
		data(){
			return{
				list:['','']
			}
		},
		onShow() {
			let userid = uni.getStorageSync('userid')
			apiTransferCardList({user_id:userid}).success(res=>{
				this.list = res.data
			})
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	page{
		width: 750rpx;
		background-color: #FFFFFF;
	}
	.page{
		// width: 750rpx;
		margin: 0 auto;
		padding: 0 24rpx;
	}
	.list{
		padding: 40rpx 0rpx 40rpx 0rpx;
		border-bottom: 2rpx solid #e6e6e6;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
		.left{
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			image{
				width: 136rpx;
				height: 136rpx;
				margin-right: 30rpx;
				border-radius: 50%;
			}
			.list_text{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.name{
					// margin-bottom: 32rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
				}
				.time{
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
				}
				.time1{
					margin: 16rpx 0;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}
		}
		.right{
			margin-right: 24rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
		}
	}
</style>
