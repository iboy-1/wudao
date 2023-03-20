<template>
	<div class="juisdiction">
		<h1>{{submenu}}元素</h1>
		<!-- 按钮 -->
		<div class="btn">
		    <!-- <div class="export"  @click="exportExcel"><img src="@/assets/qurey.png" alt=""><div class="btn-text">导出</div></div> -->
			<div class="refresh" @click="goBack">
				<div class="">
					<!-- <img src="@/assets/添加.png" alt=""> -->
					<div class="btn-text">返回</div>
				</div>
			</div>
		    <div class="refresh" @click="addPower">
				<div class="">
					<img src="@/assets/添加.png" alt="">
					<div class="btn-text">添加</div>
				</div>
			</div>
		</div>
		<!-- 表头 -->
		<div class="order-Text">
		    <ul>
		        <li class="name">元素名称</li>
				<li class="name">元素唯一标识</li>
		        <li class="time">元素描述</li>
				<li class="time">元素路由</li>
				<li class="time">添加时间</li>
				<li class="time">修改时间</li>
		        <li class="operation">操作</li>
		    </ul>
		</div>
		<!-- 列表 -->
		<div class="lounge-Information">
		    <div class="Information" v-for="(item,index) of list" :key="index">
		        <div class="blue"></div>
		        <p class="name">{{item.name}}</p> 
				<p class="name">{{item.path}}</p>
		        <p class="time">{{item.describe}}</p>
				<p class="time">{{item.url}}</p>
				<p class="time">{{item.creat_time}}</p>
				<p class="time">{{item.update_date}}</p>
		        <div class="operation">
					<!-- <div class="" @click="seeUser">查看按钮</div> -->
		            <div @click="changePower(item,index)">编辑</div>
		            <div class="del" @click="delbutton(item)">删除</div>
		        </div>
		    </div>
		</div>
		<!-- 分页 -->
		<div class="Paging">
		    <el-pagination
		    background
		    @current-change="changePage"
		    layout="prev, pager, next"
		    :total="count">
		    </el-pagination>
		</div>
		
		<!-- 添加元素弹窗 -->
		<div class="mask" v-if="showModal" @click="showModal = false"></div>
		<div class="pop" v-if="showModal">
			<div class="head">
				<h1>添加元素</h1>
				<img src="@/assets/关闭@2x.png" alt="" @click="showModal=false">
			</div>
			<div class="transverse"></div>
			<div class="center">
				<div class="center_input">
					<p>元素名称：</p>
					<el-input v-model="input" placeholder="请输入元素名称"></el-input>
				</div>
				<div class="center_input">
					<p>元素路由：</p>
					<el-input v-model="input1" placeholder="请输入元素路由"></el-input>
				</div>
				<div class="center_input">
					<p>唯一标识：</p>
					<el-input v-model="input2" placeholder="请输入元素唯一标识"></el-input>
				</div>
				<div class="textarea">
					<p>填写描述：</p>
					<textarea class="bottominput" name="" id="" cols="30" rows="10" v-model="remarks" placeholder="请输入元素描述"></textarea>
				</div>
			</div>
			<div class="footer">
				<div class="btn">
					<div class="cancel" @click="showModal=false">取消</div>
					<div class="determine" @click="addCommit">确定</div>
				</div>
			</div>
		</div>
		
		<!-- 编辑元素弹窗 -->
		<div class="mask" v-if="editshowModal" @click="editshowModal = false"></div>
		<div class="pop" v-if="editshowModal">
			<div class="head">
				<h1>编辑元素</h1>
				<img src="@/assets/关闭@2x.png" alt="" @click="editshowModal=false">
			</div>
			<div class="transverse"></div>
			<div class="center">
				<div class="center_input">
					<p>元素名称：</p>
					<el-input v-model="input3" placeholder="请输入元素名称"></el-input>
				</div>
				<div class="center_input">
					<p>元素路由：</p>
					<el-input v-model="input4" placeholder="请输入元素路由"></el-input>
				</div>
				<div class="center_input">
					<p>唯一标识：</p>
					<el-input v-model="input5" placeholder="请输入元素唯一标识"></el-input>
				</div>
				<div class="textarea">
					<p>编辑描述：</p>
					<textarea class="bottominput" name="" id="" cols="30" rows="10" v-model="remarks1" placeholder="请输入元素描述"></textarea>
				</div>
			</div>
			<div class="footer">
				<div class="btn">
					<div class="cancel" @click="editshowModal=false">取消</div>
					<div class="determine" @click="updateCommit">确定</div>
				</div>
			</div>
		</div>
		<!-- 删除按钮弹窗 -->
		<div class="mask" v-if="delshowModal" @click="delshowModal=false"></div>
		<div class="pop1" v-if="delshowModal">
			<div class="head">
				<h1>是否删除该按钮</h1>
				<img src="@/assets/关闭@2x.png" alt="" @click="delshowModal=false">
			</div>
			<div class="transverse"></div>
			<div class="footer">
				<div class="btn">
					<div class="cancel" @click="delshowModal=false">取消</div>
					<div class="determine" @click="deldateCommit">确定</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import $ from "jquery"
import api from '@/api/power'
export default {
	data(){
		return {
			list:[],
			showModal:false,
			editshowModal:false,
			delshowModal:false,
			count:0,
			page:1,
            limit:10,
			input:'',
			input1:'',
			input2:'',
			input3:'',
			input4:'',
			input5:'',
			remarks:'',
			remarks1:'',
			id:'',
			menu_id:'',
			submenu:'',
			menuName:'',
			info:[],
			creator:JSON.parse(localStorage.getItem('WuDaoeducation')),
		}
	},
	created(){
		this.id = this.$route.query.id
		this.menu_id = this.$route.query.menu_id
		this.submenu = this.$route.query.title
		this.menuName = this.$route.query.menuName
		// console.log(this.menuName + this.submenu + this.menu_id + this.id);
        this.render()
    },
	methods:{
		// 列表数据
		render(){
            let _this = this
            this.page = 1
			api.getButton({
				element_id:this.id,
                page:this.page,
                listrows:this.limit
			}).then(res=>{
				// console.log(res);
				_this.list = res.data.data
                _this.count = res.data.count
			})
            // $.ajax({
            //     url:"http://192.168.3.4/ldy/public/index.php/ljairport/v1/YfnPower/getButton",
            //     data:{
			// 		element_id:this.id,
            //         page:this.page,
            //         listrows:this.limit
            //     },
            //     // dataType:"json",async: false,
            //     type:"get",
            //     success:function(res){
            //         console.log(res);
            //         _this.list = res.data
            //         _this.count = res.count
            //     }
            // })
        },
		// 添加
		addPower(){
			this.input = ''
			this.input1 = ''
			this.input2 = ''
			this.showModal = true
		},
		// 返回
		goBack(){
			// console.log(this.id);
			let id = this.menu_id
			this.$router.push({
			    name:'jurisdictionsubmenu',
			    query:{
					id:id,
					name:this.menuName
				}
			})
		},
		// 分页
		changePage(val){
            this.page = val
            api.getButton({
				element_id:this.id,
                page:this.page,
                listrows:this.limit
			}).then(res=>{
				// console.log(res);
				this.list = res.data.data
                this.count = res.data.count
			})
        },
		// 编辑
		changePower(val){
			this.info = val
			this.input3 = val.name
			this.input4 = val.url
			this.input5 = val.path
			this.editshowModal = true
		},
		delbutton(val){
			this.info = val
			this.delshowModal = true
		},
		addCommit(){
			let _this = this
			api.addButton({
				element_id:this.id,
				name:this.input,
				url:this.input1,
				path:this.input2,
				describe:this.remarks,
				creator:this.creator.data[0].name,
			}).then(res=>{
				// console.log(res);
				if(res.data.code == 200){
                this.$message({
						message: '添加成功',
						type: 'success'
					});
					_this.showModal = false
					_this.render()
				}else if (res.data.code == 400) {
					this.$message({
						message: res.data.data,
						type: 'error'
					});
					_this.showModal = false
				}
			})
			// $.ajax({
            //     url:"http://192.168.3.4/ldy/public/index.php/ljairport/v1/YfnPower/addButton",
            //     data:{
			// 		element_id:this.id,
			// 		name:this.input,
			// 		url:this.input1,
			// 		path:this.input2,
			// 		describe:this.remarks,
			// 		creator:this.creator.data[0].name,
            //     },
            //     // dataType:"json",async: false,
            //     type:"post",
            //     success:function(res){
            //         console.log(res);
			// 		_this.render()
			// 		_this.showModal = false
            //     }
            // })
		},
		updateCommit(){
			let _this = this
			api.editButton({
				id:this.info.id,
				name:this.input3,
				url:this.input4,
				path:this.input5,
				describe:this.remarks1,
				creator:this.creator.data[0].name,
			}).then(res=>{
				// console.log(res);
				if(res.data.code == 200){
                this.$message({
						message: '编辑成功',
						type: 'success'
					});
					_this.editshowModal = false
					_this.render()
				}
			})
			// $.ajax({
            //     url:"http://192.168.3.4/ldy/public/index.php/ljairport/v1/YfnPower/editButton",
            //     data:{
			// 		id:this.info.id,
			// 		name:this.input3,
			// 		url:this.input4,
			// 		path:this.input5,
			// 		describe:this.remarks1,
			// 		creator:this.creator.data[0].name,
            //     },
            //     // dataType:"json",async: false,
            //     type:"post",
            //     success:function(res){
            //         console.log(res);
			// 		_this.render()
			// 		_this.editshowModal = false
            //     }
            // })
		},
		deldateCommit(){
			let _this = this
			api.delButton({
				id:this.info.id,
				creator:this.creator.data[0].name,
			}).then(res=>{
				// console.log(res);
				if(res.data.code == 200){
                this.$message({
						message: '删除成功',
						type: 'success'
					});
					_this.delshowModal = false
					_this.render()
				}
			})
            // $.ajax({
            //     url:"http://192.168.3.4/ldy/public/index.php/ljairport/v1/YfnPower/delButton",
            //     data:{
			// 		id:this.info.id,
			// 		creator:this.creator.data[0].name,
            //     },
            //     // dataType:"json",async: false,
            //     type:"post",
            //     success:function(res){
            //         console.log(res);
			// 		_this.delshowModal = false
			// 		_this.render()
            //     }
            // })
		}
	}
}
</script>

<style scoped lang="scss">
	.juisdiction{
	  padding: 15px 20px;
	  background-color: #EDF1F5;
	  flex-grow: 1;
	  display:flex;
	  flex-direction: column;
	}
	.btn{
		display: flex;
		.refresh{
		  width: 58px;
		  height: 58px;
		  border-radius: 50%;
		  border-style: none;
		  border: 1px #66B3FF solid;
		  background-color: white;
		  color: #66B3FF;
		  box-shadow: 0 5px 10px 0 rgba(112, 145, 212, 0.2);
		  // line-height: 68px;
		  display: flex;
		  justify-content: center;
		  text-align: center;
		  align-items: center;
		  cursor: pointer;
		  margin:0 10px 0 0;
		  // position: relative;
		  img{
			  width: 16px;
			  height: 16px;
		  }
		  .btn-text{
			  font-size: 1rem;
			  color:#66b3ff;
		  }
		}
	}
	/* 表头 */
	.order-Text ul{
	    height: 53px;
	    width: 100%;
	    line-height: 26px;
	    display: flex;
	    justify-content: space-between;
	    line-height: 53px;
	    padding: 0 92px 0 242px;
	}
	.order-Text ul li{
	    list-style: none;
	}
	.name{
	    width: 136px;
	    display: flex;
	    align-items: center;
	}
	/* 列表 */
	.Information:hover{
	    background-color: #F2F9FF;
	}
	.Information:hover .blue{
	    display: block;
	}
	
	.blue{
	    position: absolute;
	    width: 4px;
	    height: 100%;
	    background: #3377FF;
	    left: 0;
	    display: none;
	}
	.lounge-Information{
	    overflow: hidden;
	    overflow-y: auto;
	    overflow-y: overlay;
	    flex-grow: 1;
	    height: 0;
	}
	.Information{
	    width: 100%;
	    // height: 80px;
	    background-color: #FFFFFF;
	    border-radius: 5px;
	    display: flex;
	    justify-content: space-between;
	    padding: 0 15px;
	    margin-bottom: 10px;
	    padding: 0 92px 0 242px;
	    position: relative;
	}
	p{
	    float: left;
	}
	.operation div{
	    // width: 76px;
	    // height: 28px;
		padding: 0 10px;
	    border-radius: 5px;
	    background: #ffffff;
	    border: 1px solid #CCCCCC;
	    text-align: center;
	    color: #4D4D4D;
	    line-height: 28px;
	}
	.operation div:hover{
	    cursor: pointer;
	}
	/* .del{
	    background-color: #ffffff;
	    color: #CCCCCC;
	} */
	.operation{
	    width: 128px;
	    // height: 28px;
	    // margin-top: 20px;
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	}
	.operation input:hover{
	    cursor: pointer;
	}
	.time{
	    width: 200px;
	    display: flex;
	    align-items: center;
	}
	/* 分页 */
	.Paging{
	    padding: 36px 0 40px 0;
	    text-align: center;
	}
	// 添加部门部分
	.mask {
	  background-color: #000;
	  opacity: 0.6;
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  z-index: 1
	}
	.pop1{
		background-color: #fff;
		position: absolute;
		top: 50%;
		left: 50%;
		transform:translate(-50%,-50%);
		width: 500px;
		// height:550px;
		z-index: 2;
		border-radius: 10px;
		.head{
			width: 100%;
			height: 60px;
			// background-color: red;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30px;
			h1{
				font-size: 22px;
				// height: 60px;
				width: 100%;
				text-align: center;
				font-weight: 600;
			}
			img{
				width: 19px;
				height: 19px;
				cursor: pointer;
			}
	  	}
		.footer{
			width: 100%;
			// height: 100px;
			// background-color: blue;
			padding: 20px 30px;
			// height: 40px;
			display: flex;
			justify-content: space-around;
			.cancel{
				width: 150px;
				height: 40px;
				border: 1px solid #CCCCCC;
				text-align: center;
				line-height: 40px;
				color: #333333;
				border-radius: 5px;
				font-weight: 600;
				cursor: pointer;
			}
			.determine{
				width: 150px;
				height: 40px;
				color: #ffffff;
				text-align: center;
				line-height: 40px;
				background-color: #3377FF;
				border-radius: 5px;
				margin-left: 20px;
				cursor: pointer;
			}
	 	}
		.transverse{
			width: 100%;
			height: 1px;
			background-color: #E6E6E6;
		}
	}
	.pop {
	  background-color: #fff;
	  position: absolute;
	  top: 50%;
	  left: 50%;
	  transform:translate(-50%,-50%);
	  width: 700px;
	  // height:550px;
	  z-index: 2;
	  border-radius: 10px;
	  .head{
		  width: 100%;
		  height: 60px;
		  // background-color: red;
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  padding: 0 30px;
		  h1{
			font-size: 22px;
			// height: 60px;
			font-weight: 600;
		  }
		  img{
			  width: 19px;
			  height: 19px;
			  cursor: pointer;
		  }
	  }
	  .center{
		  padding: 20px 30px;
		  .center_input{
			  // width: 100px;
			  display: flex;
			  p{
				  width: 120px;
				  height: 100%;
				  display: flex;
				  align-items: center;
			  }
		  }
		  .textarea{
			  padding: 20px 0;
			  display: flex;
			  p{
				  width: 120px;
				  display: flex;
				  align-items: center;
			  }
			  .bottominput{
			      width: 100%;
			      height: 100px;
			      background: #F6F6F6;
			      border-radius: 10px;
			      line-height: 25px;
			      padding: 20px;
			      box-sizing: border-box;
			      resize: none;
			      outline: none;
			      border: none;
			  }
		  }
		  .power{
			  width: 100%;
			  height: 500px;
			  display: flex;
			  .name{
				  width: 100px;
				  height: 100%;
				  display: flex;
				  align-items: center;
			  }
			  .content{
				  height: 100%;
				  overflow: auto;
				  // display: flex;
			  }
		  }
	  }
	  .footer{
		  width: 100%;
		  // height: 100px;
		  // background-color: blue;
		  padding: 0 30px 60px 30px;
		  // height: 40px;
		  display: flex;
		  .cancel{
			width: 150px;
			height: 40px;
			border: 1px solid #CCCCCC;
			text-align: center;
			line-height: 40px;
			color: #333333;
			border-radius: 5px;
			font-weight: 600;
			cursor: pointer;
		  }
		  .determine{
			width: 150px;
			height: 40px;
			color: #ffffff;
			text-align: center;
			line-height: 40px;
			background-color: #3377FF;
			border-radius: 5px;
			margin-left: 20px;
			cursor: pointer;
		  }
		  .btn{
			position: absolute;
			right: 30px;
		  }
	  }
	  .transverse{
	    width: 100%;
	    height: 1px;
	    background-color: #E6E6E6;
	  }
	}
</style>
