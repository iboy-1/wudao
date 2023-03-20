<template>
	<view class="page">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				url:null
			}
		},
		onLoad(option) {
			this.url = option.url
		}
	}
</script>

<style>
</style>
