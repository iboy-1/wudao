<template>
	<view class="page">
		<ls-skeleton :animate="animate" :skeleton="skeleton" :loading="loading" ref="skeleton">
		<view class="content">
			<rich-text :nodes="info.contents.activity_content"></rich-text>
		</view>
		<view class="button" @click="signUp" v-if="info.is_join=='0'">我要报名</view>
		</ls-skeleton>
		<aui-loading ref="auiLoading" :show="true" :type="3" :mask="true"></aui-loading>
	</view>
</template>

<script>
	import { apiGatActivityDetail } from '@/api/user.js'
	import lsSkeleton from '@/components/ls-skeleton/ls-skeleton.nvue';
	import auiLoading from '@/components/aui-loading/aui-loading.vue';
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
					'line*30',
					40,
					'card'
				],
				id:'',
				info:{},
			}
		},
		onLoad(option) {
			this.id = option.id
			this.$refs.auiLoading.show();
			this.loading = true;
			let userid = uni.getStorageSync('userid')
			apiGatActivityDetail({
				id:option.id,
				user_id:userid
			}).success(res=>{
				this.info = res.data
				this.$refs.auiLoading.hide();
				this.loading = false;
				
				let richtext = this.info.contents.activity_content
				const regex = new RegExp('<img', 'gi');
				richtext = richtext.replace(regex,'<img style="max-width: 100%;"');
				
				const regex1 = new RegExp('data-fail="0" style="', 'gi');
				richtext = richtext.replace(regex1,'data-fail="0" style="max-width: 100%;');
				this.info.contents.activity_content = richtext
			})
			
		},
		methods:{
			signUp(){
				let _this = this
				let userid = uni.getStorageSync('userid')
				uni.request({//报名
					// url: 'https://wudao.gxhxinfo.com/activity/v1/Home/activityRegistration',
					url: 'https://keep.gxhxinfo.com/activity/v1/Home/activityRegistration',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data:{
						user_id:userid,
						activity_id:_this.id
					},
					success: res => {
						if(res.data.code){
							uni.showToast({
								icon:'success',
								title:res.data.data
							})
							setTimeout(function(){
								uni.navigateTo({
									url:'./myActivity/myActivity'
								},800)
							})
						}else{
							uni.showToast({
								icon:'none',
								title:res.data.data
							})
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
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
