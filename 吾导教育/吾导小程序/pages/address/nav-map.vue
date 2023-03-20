<template>
	<view :style="'width:'+screenWidth+'px;'+'height:'+screenHeight+'px;'">
		<map
			:latitude="latitude"
			:longitude="longitude"
			style="width: 750rpx;height: 100vh;"
			scale="11"
			:markers="markers"
			:polyline="polyline"
			:show-location="true"
		>
		<cover-image class="btn-back" src="../../static/daohang.png" @click="hideMap()"></cover-image>
		</map>
	</view>
</template>

<script>
export default {
	data() {
		return {
			key: 'b195e51a58b113ff5d97163a06f17bed',
			latitude: '22.83393',
			longitude: '108.31343',
			markers: [],
			distance: '',
			cost: '',
			polyline: [],
		};
	},
	onLoad(e) {
		this.star = Number(e.star)
		this.mapiDriverInfo = uni.getStorageSync('mapiDriverInfo')
		this.ordernumber = this.mapiDriverInfo.orders
	},
	methods: {
		hideMap(){
			uni.openLocation({
				latitude: 22.877868,
				longitude: 108.271469,
				scale: 18,
				name:'广西吾导教育'
			})
		}
	}
};
</script>

<style lang="scss">
	.btn-back{
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		position: fixed;
		right: 30rpx;
		bottom: 30rpx;
	}
// @import './style.scss';
</style>
