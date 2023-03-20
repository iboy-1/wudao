<template>
	<view class="page">
		<view class="item_box">
			<view class="item">
				<view class="tx">头像</view>
				<view class="tx_img" @click="choice">
					<image :src="avatar" class="head_bottom"></image>
					<view class="mask">
						<image src="../../../static/camera.png" class="head_top"></image>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="tx">昵称</view>
				<!-- <view class="right">iboy</view> -->
				<input  class="input_box" v-model="name" />
			</view>
			<view class="item">
				<view class="tx">电话</view>
				<!-- <view class="right">17687542762</view> -->
				<input  class="input_box" v-model="phone" />
			</view>
			<view class="item">
				<view class="tx">性别</view>
				<view class="right">
					<radio-group @change="radioChange"  class="label">
					    <label v-for="(item, index) in sex" :key="index">
					        <view>
					            <radio :value="item.value" :checked="index === current" :style="index==1?'margin-left: 20rpx;':''"></radio>
					        </view>
					        <view>{{item.name}}</view>
					    </label>
					</radio-group>
				</view>
			</view>
			<view class="item">
				<view class="tx">生日</view>
				<view class="right1" @click="isOpen = true" v-if="birthday=='-1'">请选择</view>
				<view class="right1" @click="isOpen = true" v-else>{{birthday}}</view>
			</view>
			<view class="item">
				<view class="tx">身高</view>
				<view class="input_box">
					<input type="text" v-model="height"/>cm
				</view>
			</view>
			<view class="item">
				<view class="tx">体重</view>
				<view class="input_box">
					<input type="text" v-model="weight"/>kg
				</view>
			</view>
			<view class="item">
				<view class="tx">BMI</view>
				<view class="right" v-if="bmi==0">自动计算</view>
				<view class="right" v-else>{{bmi}}</view>
			</view>
			<view class="item">
				<view class="tx">健身目标</view>
				<view class="right">
					<ccPicker :range="list_country" v-model="person.country" @picker_change="country_change"></ccPicker>
				</view>
			</view>
			<view class="item">
				<view class="tx">健身经验</view>
				<view class="right">
					<ccPicker :range="list_country1" v-model="person1.country" @picker_change="country_change1"></ccPicker>
				</view>
			</view>
			<view class="item"  style="align-items: flex-start;border-bottom: none;">
				<view class="tx">体型</view>
				<view class="right">
					<view class="male_box" v-if="value==2">
						<view class="male_item" @click="dl(index)" v-for="(item,index) in shapeImg1" :key="index">
							<image :src="'../../../static/'+item" class="img"></image>
							<image src="../../../static/icon.png" class="select" v-if="select==index"></image>
						</view>
					</view>
					<view class="male_box" v-else>
						<view class="male_item" @click="dl(index)" v-for="(item,index) in shapeImg" :key="index">
							<image :src="'../../../static/'+item" class="img"></image>
							<image src="../../../static/icon.png" class="select" v-if="select==index"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="button_box">
			<view class="button" @click="submit">保存</view>
		</view>
		<view class="masks" v-if="isOpen" @click="isOpen = false"></view>
		<view class="calendar" v-if="isOpen">
			<view class="header1">
				<view class="year">{{year}}</view>
				<view class="date">{{date}} {{week}}</view>
			</view>
			<view class="content">
				<ren-calendar ref='ren' :oneDay="true" :headerBar='true' :collapsible="false" @onDayClick='onDayClick'></ren-calendar>
			</view>
		</view>
	</view>
</template>

<script>
	import { apiUserDetailEdit } from '@/api/user.js'
	import ccPicker from "@/components/cc-picker/cc-picker.vue"
	import RenCalendar from '@/components/ren-calendar/ren-calendar.vue'
	export default{
		components: {
		    ccPicker,
			RenCalendar
		},
		data(){
			return{
				select:null,
				current:1,
				
				avatar:'',
				sex:[
					{value: '1',name: '男'},
					{value: '2',name: '女'},
				],
				name:'',
				phone:'',
				height:'',
				weight:'',
				bmi:'',
				target:'',
				experience:'',
				shape:'',
				userInfo:'',
				value:null,
				shapeImg:[
					'male1.jpg',
					'male2.jpg',
					'male3.jpg',
					'male4.jpg',
					'male5.jpg',
					'male6.jpg',
				],
				shapeImg1:[
					'male7.jpg',
					'male8.jpg',
					'male9.jpg',
					'male10.jpg',
					'male11.jpg',
					'male12.jpg',
				],
				person: {
				    country: '0',
				},
				person1: {
				    country: '0',
				},
				list_country: [
				    { V: '0', K: '请选择' },
					{ V: '1', K: '减脂' },
					{ V: '2', K: '塑形' },
					{ V: '3', K: '增肌' },
					{ V: '4', K: '康复' },
				],
				list_country1: [
				    { V: '0', K: '请选择' },
					{ V: '1', K: '小白' },
					{ V: '2', K: '进阶者' },
					{ V: '3', K: '健身达人' },
				],
				year:'',
				date:'',
				week:'',
				birthday:'',
				isOpen:false
			}
		},
		watch:{
			height(val){
				if(this.weight!=''){
					this.bmi = (this.weight / ((val/100)*(val/100))).toFixed(2);
				}else{
					this.bmi = 0
				}
			},
			weight(val){
				if(this.height!=''){
					this.bmi = (val / ((this.height/100)*(this.height/100))).toFixed(2);
				}else{
					this.bmi = 0
				}
			}
		},
		onShow() {
			// this.render()
			let userInfo = uni.getStorageSync('info')
			console.log(userInfo)
			this.userInfo = userInfo
			this.name = userInfo.user_info.nikanme
			this.phone = userInfo.user_info.phone
			this.current = userInfo.user_detail.sex - 1
			this.value = userInfo.user_detail.sex
			this.avatar = userInfo.user_info.avatar
			this.birthday = userInfo.user_detail.birthday
			this.height = userInfo.user_detail.height=='-1'?'':userInfo.user_detail.height
			this.weight = userInfo.user_detail.weight=='-1'?'':userInfo.user_detail.weight
			this.person.country = userInfo.user_detail.target=='-1'?'0':userInfo.user_detail.target
			this.person1.country = userInfo.user_detail.experience=='-1'?'0':userInfo.user_detail.experience
			this.select = userInfo.user_detail.shape-1
			this.shape = userInfo.user_detail.shape
		},
		onReady() {
			let date = new Date()
			console.log(date)
			this.year = date.getFullYear() + '年'
			this.date = (date.getMonth() + 1) + '月' + date.getDate() + '日'
			this.week = this.render()
		    // this.curDate = today;
		},
		methods:{
			render(){
				let date = new Date()
				let week = date.getDay()
				let now_week
				if(week=='0'){
					now_week = '周日'
				}else if(week=='1'){
					now_week = '周一'
				}else if(week=='2'){
					now_week = '周二'
				}else if(week=='3'){
					now_week = '周三'
				}else if(week=='4'){
					now_week = '周四'
				}else if(week=='5'){
					now_week = '周五'
				}else if(week=='6'){
					now_week = '周六'
				}
				return now_week
			},
			dl(index){
				this.select = index
				this.shape = index+1
				console.log(this.shape)
			},
			onDayClick(dates1){//选择时间
				console.log(dates1)
				this.year = dates1[0].date.split('-')[0] + '年'
				this.date = dates1[0].date.split('-')[1] + '月' + dates1[0].date.split('-')[2] + '日'
				this.week = '周' + dates1[0].week
				this.birthday = dates1[0].date
				this.isOpen = false
			},
			radioChange(e){
				console.log(e)
				this.value = e.detail.value
			},
			country_change(e){//健身目标
				this.target = e.new_v
			},
			country_change1(e){//健身经验
				this.experience = e.new_v
			},
			choice(){
				let _this = this
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        console.log(res);
						if(res.tempFiles[0].size<=2097152){
							_this.avatar = res.tempFilePaths[0]
							uni.uploadFile({
							    // url: 'https://wudao.gxhxinfo.com/feedback/v1/Home/upfile', //仅为示例，非真实的接口地址
							    url: 'https://keep.gxhxinfo.com/feedback/v1/Home/upfile', //仅为示例，非真实的接口地址
							    filePath: _this.avatar,
							    name: 'file',
								// formData: obj,
							    success: (uploadFileRes) => {
									console.log(uploadFileRes)
							       let res1 = JSON.parse(uploadFileRes.data);
							       _this.avatar = res1.url;
							       // console.log(_this.choiceImg1)
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
				let userid = uni.getStorageSync('userid')
				let obj = {
					avatar:this.avatar,
					user_id:userid,
					sex:this.value,
					nikanme:this.name,
					phone:this.phone==''?'-1':this.phone,
					bmi:this.bmi==''?'-1':this.bmi,
					birthday:this.birthday==''?'-1':this.birthday,
					height:this.height==''?'-1':this.height,
					weight:this.weight==''?'-1':this.weight,
					target:this.target==''?'-1':this.target,
					experience:this.experience==''?'-1':this.experience,
					shape:this.shape==''?'-1':this.shape
				}
				console.log(obj)
				apiUserDetailEdit(obj).success(res=>{
					console.log(res)
					uni.showToast({
						icon:'success',
						title:res.data
					})
					setTimeout(function(){
						uni.navigateBack({
							delta:1
						})
					},800)
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		width: 750rpx;
		background-color: #F2F2F2;
	}
	.page{
		width: 750rpx;
		margin: 0 auto;
		padding-bottom: 100rpx;
	}
	.item_box{
		padding: 0 30rpx;
		background-color: #FFFFFF;
		
		.item{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding: 30rpx 0;
			border-bottom: 2rpx solid #cccccc;
			
			.tx{
				font-size: 32rpx;
				color: #555555;
			}
			.tx_img{
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				position: relative;
				.head_bottom{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
				.mask{
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					width: 100%;
					height: 100%;
					border-radius: 50%;
					position: absolute;
					top: 0;
					left: 0;
					background: rgba(0,0,0,0.5);
					
					.head_top{
						width: 80%;
						height: 70%;
						border-radius: 50%;
					}
				}
			}
			.right1{
				flex: 1;
				text-align: right;
				height: 48rpx;
				font-size: 32rpx;
				color: #555555;
			}
			.right{
				font-size: 32rpx;
				color: #555555;
				
				.label{
					display: flex;
					flex-direction: row;
				}
				label{
					display: flex;
					flex-direction: row;
					align-items: center;
				}
				radio{
					transform:scale(0.7);
				}
				.male_box{
					width: 450rpx;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					.male_item{
						position: relative;
						.img{
							width: 140rpx;
							height: 140rpx;
							margin: 5rpx;
						}
						.select{
							position: absolute;
							top: 0;
							right: 0;
							width: 40rpx;
							height: 40rpx;
						}
					}
					
				}
			}
			.input_box{
				display: flex;
				flex-direction: row;
				align-items: center;
				text-align: right;
				font-size: 32rpx;
				color: #555555;
			}
		}
	}
	.button_box{
		padding: 30rpx;
		.button{
			width: 100%;
			height: 88rpx;
			border-radius: 8rpx;
			background-color: #3091F2;
			text-align: center;
			line-height: 88rpx;
			color: #FFFFFF;
		}
	}
	.masks{
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 100vh;
		background: rgba(0,0,0,0.5);
		z-index: 100;
	}
	.calendar{
		position: absolute;
		z-index: 101;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 70%;
		background-color: #FFFFFF;
		.header1{
			// width: 100%;
			padding: 30rpx 40rpx;
			height: 110rpx;
			background-color: #02968a;
			.year{
				font-size: 28rpx;
				color: #FFFFFF;
			}
			.date{
				margin-top: 10rpx;
				font-size: 46rpx;
				color: #FFFFFF;
			}
		}
	}
</style>
