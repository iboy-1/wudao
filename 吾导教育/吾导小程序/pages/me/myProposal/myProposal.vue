<template>
	<view class="page">
		<block v-if="myVideo"></block>
		<block v-else>
			<view class="no_video">
				<image src="../../../static/no_data.png"></image>
				<view>没有训练建议～ o(︶︿︶)o</view>
			</view>
		</block>
		<!-- <view id="panoDesk"></view> -->
	</view>
</template>

<script>
	// import UtoVR from '@/components/player/UtoVRPlayerGuide.js'
	
</script>

<style lang="scss">
	.page{
		width: 750rpx;
		margin: 0 auto;
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
