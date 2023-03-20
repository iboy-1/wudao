<template>
	<view class="page">
		<ls-skeleton :animate="animate" :skeleton="skeleton" :loading="loading" ref="skeleton">
		<view class="item_box">
			<view class="items" @click="go">
				<view class="info">头像</view>
				<view class="right">
					<image :src="userInfo.user_info.avatar" class="head_bottom"></image>
				</view>
			</view>
			<view class="items" @click="go">
				<view class="info">昵称</view>
				<view class="right">
					<view class="text">{{userInfo.user_info.nikanme}}</view>
					<image src="../../../static/left.png" class="img"></image>
				</view>
			</view>
			<view class="items" @click="go">
				<view class="info">电话</view>
				<view class="right">
					<view class="text">{{userInfo.user_info.phone}}</view>
					<image src="../../../static/left.png" class="img"></image>
				</view>
			</view>
			<view class="items" @click="go">
				<view class="info">家庭地址</view>
				<view class="right" @click="go">
					<view class="text"></view>
					<image src="../../../static/left.png" class="img"></image>
				</view>
			</view>
			<view class="items">
				<view class="info" @click="go">工作地址</view>
				<view class="right">
					<view class="text"></view>
					<image src="../../../static/left.png" class="img"></image>
				</view>
			</view>
			<view class="items" @click="go">
				<view class="info">场馆</view>
				<view class="right">
					<view class="text" v-if="userInfo.user_detail.venue_id=='-1'||userInfo.user_detail.venue_id==''">尚未绑定</view>
					<view class="text" v-else-if="userInfo.user_detail.venue_id=='1'">广西谷舞点典舞蹈中心/身体工作室</view>
					<image src="../../../static/left.png" class="img"></image>
				</view>
			</view>
			<view class="items" @click="go">
				<view class="info">生日</view>
				<view class="right">
					<view class="text" v-if="userInfo.user_detail.birthday=='-1'||userInfo.user_detail.birthday==''">未填写</view>
					<view class="text" v-else>{{userInfo.user_detail.birthday}}</view>
					<image src="../../../static/left.png" class="img"></image>
				</view>
			</view>
			<view class="items" @click="go">
				<view class="info">身份证号</view>
				<view class="right">
					<view class="text"></view>
					<image src="../../../static/left.png" class="img"></image>
				</view>
			</view>
			<view class="items" @click="go">
				<view class="info">身高</view>
				<view class="right">
					<view class="text" v-if="userInfo.user_detail.height=='-1'||userInfo.user_detail.height==''">未设置</view>
					<view class="text" v-else>{{userInfo.user_detail.height}}</view>
					<image src="../../../static/left.png" class="img"></image>
				</view>
			</view>
			<view class="items" @click="go">
				<view class="info">体重</view>
				<view class="right">
					<view class="text" v-if="userInfo.user_detail.weight=='-1'||userInfo.user_detail.weight==''">未设置</view>
					<view class="text" v-else>{{userInfo.user_detail.weight}}</view>
					<image src="../../../static/left.png" class="img"></image>
				</view>
			</view>
			<view class="items" @click="go">
				<view class="info">BMI</view>
				<view class="right">
					<view class="text" v-if="userInfo.user_detail.bmi=='-1'||userInfo.user_detail.bmi==''">未设置</view>
					<view class="text" v-else>{{userInfo.user_detail.bmi}}</view>
					<image src="../../../static/left.png" class="img"></image>
				</view>
			</view>
			<view class="items" @click="go">
				<view class="info">健身目标</view>
				<view class="right">
					<view class="text" v-if="userInfo.user_detail.target=='-1'||userInfo.user_detail.target==''">未填写</view>
					<view class="text" v-else-if="userInfo.user_detail.target=='1'">减脂</view>
					<view class="text" v-else-if="userInfo.user_detail.target=='2'">塑形</view>
					<view class="text" v-else-if="userInfo.user_detail.target=='3'">增肌</view>
					<view class="text" v-else-if="userInfo.user_detail.target=='4'">康复</view>
					<image src="../../../static/left.png" class="img"></image>
				</view>
			</view>
			<view class="items" @click="go">
				<view class="info">健身经验</view>
				<view class="right">
					<view class="text" v-if="userInfo.user_detail.experience=='-1'||userInfo.user_detail.experience==''">未填写</view>
					<view class="text" v-else-if="userInfo.user_detail.experience=='1'">小白</view>
					<view class="text" v-else-if="userInfo.user_detail.experience=='2'">进阶者</view>
					<view class="text" v-else-if="userInfo.user_detail.experience=='3'">健身达人</view>
					<image src="../../../static/left.png" class="img"></image>
				</view>
			</view>
			<view class="items" style="border-bottom: none;" @click="go">
				<view class="info">体型</view>
				<view class="right" v-if="userInfo.user_detail.shape=='-1'||userInfo.user_detail.shape==''">
					<view class="text">未填写</view>
					<image src="../../../static/left.png" class="img"></image>
				</view>
				<view class="right" v-else>
					<image src="../../../static/male1.jpg" v-if="userInfo.user_detail.sex=='1'&&userInfo.user_detail.shape=='1'"></image>
					<image src="../../../static/male2.jpg" v-else-if="userInfo.user_detail.sex=='1'&&userInfo.user_detail.shape=='2'"></image>
					<image src="../../../static/male3.jpg" v-else-if="userInfo.user_detail.sex=='1'&&userInfo.user_detail.shape=='3'"></image>
					<image src="../../../static/male4.jpg" v-else-if="userInfo.user_detail.sex=='1'&&userInfo.user_detail.shape=='4'"></image>
					<image src="../../../static/male5.jpg" v-else-if="userInfo.user_detail.sex=='1'&&userInfo.user_detail.shape=='5'"></image>
					<image src="../../../static/male6.jpg" v-else-if="userInfo.user_detail.sex=='1'&&userInfo.user_detail.shape=='6'"></image>
					<image src="../../../static/male7.jpg" v-else-if="userInfo.user_detail.sex=='2'&&userInfo.user_detail.shape=='1'"></image>
					<image src="../../../static/male8.jpg" v-else-if="userInfo.user_detail.sex=='2'&&userInfo.user_detail.shape=='2'"></image>
					<image src="../../../static/male9.jpg" v-else-if="userInfo.user_detail.sex=='2'&&userInfo.user_detail.shape=='3'"></image>
					<image src="../../../static/male10.jpg" v-else-if="userInfo.user_detail.sex=='2'&&userInfo.user_detail.shape=='4'"></image>
					<image src="../../../static/male11.jpg" v-else-if="userInfo.user_detail.sex=='2'&&userInfo.user_detail.shape=='5'"></image>
					<image src="../../../static/male12.jpg" v-else-if="userInfo.user_detail.sex=='2'&&userInfo.user_detail.shape=='6'"></image>
				</view>
			</view>
		</view>
		</ls-skeleton>
		<aui-loading ref="auiLoading" :show="true" :type="3" :mask="true"></aui-loading>
	</view>
</template>

<script>
	import lsSkeleton from '@/components/ls-skeleton/ls-skeleton.nvue';
	import auiLoading from '@/components/aui-loading/aui-loading.vue';
	import { apiUserDetail } from '@/api/user.js'
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
					'card-lg',
					'card*5'
				],
				userInfo:null
			}
		},
		onShow() {
			this.$refs.auiLoading.show();
			this.loading = true
			this.render()
		},
		methods:{
			render(){
				let userid = uni.getStorageSync('userid')
				apiUserDetail({user_id:userid}).success(res=>{
					this.$refs.auiLoading.hide();
					this.loading = false
					this.userInfo = res.data
					this.userInfo.user_detail.add_date = this.userInfo.user_detail.add_date.split(' ')[0]
				})
			},
			go(){
				uni.setStorageSync('info',this.userInfo)
				uni.navigateTo({
					url:'./edit'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		width: 750rpx;
		background-color: #F5F7F7;
	}
	.page{
		width: 750rpx;
		margin: 0 auto;
		padding-bottom: 100rpx;
	}
	.item{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 2rpx solid #cccccc;
		background-color: #FFFFFF;
		image{
			width: 36rpx;
			height: 36rpx;
			margin: 0 10rpx 0 20rpx;
		}
		.info{
			flex: 1;
			font-size: 32rpx;
		}
		.right{
			// width: 80rpx;
			margin-right: 20rpx;
			font-size: 32rpx;
		}
	}
	.item_box{
		width: 710rpx;
		padding: 0 0 0 40rpx;
		background-color: #FFFFFF;
		
		.items{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding: 36rpx 0;
			border-bottom: 2rpx solid #cccccc;
			background-color: #FFFFFF;
			
			.info{
				flex: 1;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #45474D;
			}
			.right{
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-right: 40rpx;
				text-align: right;
				font-size: 32rpx;
				text{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #808080;
				}
				.img{
					width: 16rpx;
					height: 24rpx;
					margin-left: 32rpx;
				}
				.head_bottom{
					width: 88rpx;
					height: 88rpx;
					margin-right: 6rpx;
					border-radius: 50%;
				}
				image{
					width: 140rpx;
					height: 140rpx;
				}
			}
		}
	}
</style>
