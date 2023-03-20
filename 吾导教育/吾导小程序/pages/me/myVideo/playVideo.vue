<template>
	<view class="page">
		<view class="header"></view>
		<view class="centent_box">
			<video :muted="false" id="myVideo" class="video-container" :src="video_url" :autoplay="true"
			 :controls="true" :loop="false" :show-center-play-btn="true" :enable-progress-gesture="false" style="width: 100%;"></video>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				video_url:'',
				videoContext:null,
			}
		},
		mounted() {
			this.videoContext = uni.createVideoContext('myVideo')
			this.videoContext.requestFullScreen()
		},
		onLoad(option) {
			console.log(option.url)
			this.video_url = option.url
		}
	}
</script>

<style lang="scss">
	.page{
		width: 100%;
		height: 100vh;
		background-color: #000000;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
	}
	.header{
		width: 100%;
		height: 20vh;		
	}
	.content-box{
		position: relative;
		width: 100%;
		height: 0;
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		video{
			width: 100%;
			height: 100%;
		}
	}
</style>
