<template>
	<view class="page">
		<ls-skeleton :animate="animate" :skeleton="skeleton" :loading="loading" ref="skeleton">
		<view class="header">
			<view class="time">{{info.time}}</view>
			<view class="venue">广州吾导教育科技</view>
		</view>
		<view class="centent" v-html="info.contents"></view>
		</ls-skeleton>
		<aui-loading ref="auiLoading" :show="true" :type="3" :mask="true"></aui-loading>
	</view>
</template>

<script>
	import auiLoading from '@/components/aui-loading/aui-loading.vue';
	import lsSkeleton from '@/components/ls-skeleton/ls-skeleton.nvue';
	export default{
		components:{
			auiLoading,
			lsSkeleton
		},
		data(){
			return{
				animate: true,
				loading: true,
				skeleton: [
					'card-sm*2',
					'line-sm*8',
					'card-lg',
					'line-sm*5',
				],
				info:''
			}
		},
		onLoad(option) {
			this.loading = true
			this.$refs.auiLoading.show();
			let _this = this
			let id = option.id
			console.log(option.id)
			uni.setNavigationBarTitle({
			    title: option.title
			});
			uni.request({//获取场馆
				// url: 'https://wudao.gxhxinfo.com/article/v1/Home/articleContents',
				url: 'https://keep.gxhxinfo.com/article/v1/Home/articleContents',
				method: 'GET',
				header: {
					'content-type': 'application/x-www-form-urlencoded',
				},
				data:{
					id:id
				},
				success: (res) => {
					console.log(res.data.data)
					_this.info = res.data.data
					_this.info.time = _this.info.time.split(' ')[0]
					
					let richtext = _this.info.contents;
					const regex = new RegExp('<img', 'gi');
					richtext = richtext.replace(regex,'<img style="max-width: 100%;"');
					
					const regex1 = new RegExp('data-fail="0" style="', 'gi');
					richtext = richtext.replace(regex1,'data-fail="0" style="max-width: 100%;');
					_this.info.contents = richtext
					this.loading = false
					this.$refs.auiLoading.hide();
				}
			})
		},
	}
</script>

<style>
	.page{
		padding: 30rpx 30rpx 0;
	}
	.header{
		margin-bottom: 30rpx;
		display: flex;
		flex-direction: row;
		font-size: 28rpx;
		color: #999999;
	}
	.time{
		margin-right: 24rpx;
		font-size: 28rpx;
		color: #999999;
	}
</style>
