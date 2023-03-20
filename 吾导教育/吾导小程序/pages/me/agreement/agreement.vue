<template>
	<view class="page">
		<view class="title">{{content.title}}</view>
		<view class="centent_box">
			<rich-text :nodes="content.contents"></rich-text>
		</view>
	</view>
</template>

<script>
	import { apiAgreement } from '@/api/user.js'
	export default{
		data(){
			return{
				content:''
			}
		},
		onShow() {
			let _this = this
			uni.request({//获取场馆
				// url: 'https://wudao.gxhxinfo.com/article/v1/Home/agreement',
				url: 'https://keep.gxhxinfo.com/article/v1/Home/agreement',
				method: 'GET',
				header: {
					'content-type': 'application/x-www-form-urlencoded',
				},
				success: (res) => {
					_this.content = res.data.data
					//设置富文本图片宽度
					let richtext = _this.content.contents;
					const regex = new RegExp('<img', 'gi');
					richtext = richtext.replace(regex,'<img style="max-width: 100%;"');
					const regex1 = new RegExp('data-fail="0" style="', 'gi');
					richtext = richtext.replace(regex1,'data-fail="0" style="max-width: 100%;');
					_this.content.contents = richtext
					
					uni.setNavigationBarTitle({
					    title: res.data.data.title
					});
				}
			})
		}
	}
</script>

<style>
	.title{
		width: 750rpx;
		height: 88rpx;
		font-size: 34rpx;
		color: #333333;
		background-color: #f5f5f5;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.centent_box{
		padding: 30rpx;
	}
</style>
