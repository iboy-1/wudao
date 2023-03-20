<template>
	<view class="page">
		<view class="content">
			<view class="opinion">意见反馈</view>
			<view class="text">请留下您宝贵的意见，以便我们及时改进并提供更好的服务。</view>
			<textarea placeholder="请填写内容,最多不超过200字" placeholder-style="font-size:24rpx;" maxlength="200" v-model="textarea"></textarea>
			<view class="pushImg">上传图片：</view>
			<view class="choiceImg">
				<view class="upload" @click="choice">
					<image src="../../static/tj.png"></image>
				</view>
				<view class="img_box" @click="choiceImg = ''">
					<image :src="choiceImg" mode="aspectFill" v-if="choiceImg" class="img"></image>
					<image src="../../static/close.png" class="close" v-if="choiceImg"></image>
				</view>
			</view>
			<view class="text">大小不超过2M。支持格式jpg、jpeg、gif、png</view>
			<view class="opinion">*昵称</view>
			<input type="text" v-model="name"/>
			<view class="opinion">*联系方式</view>
			<input type="text" v-model="tell"/>
		</view>
		<view class="button_box">
			<view class="button" @click="submit">提交</view>
		</view>
	</view>
</template>

<script>
	import { apiFeedback } from '@/api/user.js'
	export default{
		data(){
			return{
				choiceImg:'',
				choiceImg1:'',
				textarea:'',
				name:'',
				tell:''
			}
		},
		onShow() {
			let userInfo = uni.getStorageSync('userInfo')
			console.log(userInfo)
			this.name = userInfo.nikanme
			this.tell = userInfo.phone
		},
		methods:{
			choice(){
				let _this = this
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						console.log(res)
						if(res.tempFiles[0].size<=2097152){
							_this.choiceImg = res.tempFilePaths[0]
							uni.uploadFile({
							    // url: 'https://wudao.gxhxinfo.com/feedback/v1/Home/upfile',
							    url: 'https://keep.gxhxinfo.com/feedback/v1/Home/upfile',
							    filePath: _this.choiceImg,
							    name: 'file',
							    success: (uploadFileRes) => {
									console.log(uploadFileRes)
							       let res1 = JSON.parse(uploadFileRes.data);
							       _this.choiceImg1 = res1.url;
							       console.log(_this.choiceImg1)
							    }
							});
						}else{
							uni.showToast({
								icon:'none',
								title:'请选择2M以内的图片'
							})
						}
				    }
				});
			},
			submit(){
				if(this.textarea==''){
					uni.showModal({
					    // title: '请输入意见内容！',
					    content: '请输入意见内容！',
						showCancel:false
					});
					return false
				}
				if(this.name==''){
					uni.showModal({
					    // title: '请输入昵称！',
					    content: '请输入昵称！',
						showCancel:false
					});
					return false
				}
				if(this.tell==''){
					uni.showModal({
					    // title: '请输入联系方式！',
					    content: '请输入联系方式！',
						showCancel:false
					});
					return false
				}
				apiFeedback({
					nickname:this.name,
					phone:this.tell,
					contents:this.textarea,
					images_url:this.choiceImg1
				}).success(res=>{
					console.log(res)
					if(res.code=='200'){
						uni.showToast({
							icon:'success',
							title:res.data
						})
						setTimeout(function(){
							uni.navigateBack({
								delta:'1',
							})
						},800)
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
	page{
		width: 750rpx;
		background-color: #EDF2F7;
	}
	.page{
		width: 750rpx;
		margin: 0 auto;
	}
	.header{
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 160rpx;
		background: linear-gradient(left,#3a3c48 0,#3a3c48 100%);
		
		image{
			width: 120rpx;
			height: 120rpx;
			margin: 20rpx 40rpx;
			border-radius: 50%;
			
		}
		.studio{
			font-size: 32rpx;
			color: #FFFFFF;
		}
	}
	.content{
		margin-top: 10rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		
		.opinion{
			padding: 40rpx 0 20rpx 0;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #4D4D4D;
		}
		.text{
			margin: 10rpx 0;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #808080;
		}
		textarea{
			margin: 20rpx auto;
			font-size: 28rpx;
			width: 622rpx;
			height: 312rpx;
			padding: 24rpx;
			background: #FFFFFF;
			border: 2rpx solid #CCCCCC;
			border-radius: 10rpx;
		}
		.pushImg{
			margin: 40rpx 0 20rpx 0;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #4D4D4D;
		}
		.choiceImg{
			display: flex;
			flex-direction: row;
			
			.upload{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 176rpx;
				height: 176rpx;
				background: #FFFFFF;
				border: 2rpx solid #CCCCCC;
				border-radius: 10rpx;
				image{
					width: 80rpx;
					height: 80rpx;
				}
			}
			.img_box{
				position: relative;
				.img{
					width: 176rpx;
					height: 176rpx;
					margin-left: 20rpx;
				}
				.close{
					position: absolute;
					top: 0;
					right: 0;
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
		
		input{
			font-size: 28rpx;
			border-radius: 10rpx;
			padding: 10rpx 20rpx;
			border: 2rpx solid #cccccc;
		}
	}
	.button_box{
		padding: 40rpx 30rpx;
		background-color: #FFFFFF;
		
		.button{
			width: 100%;
			height: 88rpx;
			background: #3091F2;
			border-radius: 8rpx;
			text-align: center;
			line-height: 88rpx;
			color: #FFFFFF;
		}
	}
</style>
