<template>
	<div class="juisdiction">
		<!-- 按钮 -->
		<div class="btn">
		    <!-- <div class="export"  @click="exportExcel"><img src="@/assets/qurey.png" alt=""><div class="btn-text">导出</div></div> -->
		    <div class="refresh" @click="addPower" v-if="judata.jsgl_add">
				<div class="">
					<img src="@/assets/添加.png" alt="">
					<div class="btn-text">添加</div>
				</div>
			</div>
		</div>
		<!-- 表头 -->
		<div class="order-Text" v-if="judata.jsgl_table">
		    <ul>
		        <li class="name">部门名称</li>
		        <li class="time">部门描述</li>
				<li class="time">添加时间</li>
				<li class="time">修改时间</li>
				<li class="time">操作人</li>
		        <li class="operation">操作</li>
		    </ul>
		</div>
		<!-- 列表 -->
		<div class="lounge-Information" v-if="judata.jsgl_table">
		    <div class="Information" v-for="(item,index) of list" :key="index">
		        <div class="blue"></div>
		        <p class="name">{{item.branch}}</p> 
		        <p class="time">{{item.describe}}</p>
				<p class="time">{{item.creat_time}}</p>
				<p class="time">{{item.update_date}}</p>
				<p class="time">{{item.creator}}</p>
		        <div class="operation">
					<el-button size="mini" @click="seeUser(item,index)" v-if="judata.jsgl_see">查看人员</el-button>
					<el-button size="mini" @click="changePower(item)" v-if="judata.jsgl_edit">编辑</el-button>
					<el-button size="mini" @click="delbranch(item)" class="del" v-if="judata.jsgl_del">删除</el-button>
					<!-- <div class=""  @click="seeUser(item,index)" v-if="judata.jsgl_see">查看人员</div>
		            <div  @click="changePower(item)" v-if="judata.jsgl_edit">编辑</div>
		            <div  @click="delbranch(item)" class="del" v-if="judata.jsgl_del">删除</div> -->
		        </div>
		    </div>
		</div>
		<!-- 分页 -->
		<div class="Paging" v-if="judata.jsgl_table">
		    <el-pagination
		
		    background
		    @current-change="changePage"
		    layout="prev, pager, next"
		    :total="count">
		    </el-pagination>
		</div>
		
		<!-- 添加部门弹窗 -->
		<div class="mask" v-if="showModal" @click="showModal = false"></div>
		<div class="pop" v-if="showModal">
			<div class="head">
				<h1>添加部门</h1>
				<img src="@/assets/关闭@2x.png" alt="" @click="showModal = false">
			</div>
			<div class="transverse"></div>
			<div class="center">
				<div class="center_input">
					<p>部门名称：</p>
					<el-input v-model="input" placeholder="请输入部门名称"></el-input>
				</div>
				<div class="textarea">
					<textarea class="bottominput" name="" id="" cols="30" rows="10" v-model="remarks" placeholder="请输入部门描述"></textarea>
				</div>
			</div>
			<div class="footer">
				<div class="btn">
					<div class="cancel" @click="showModal=false">取消</div>
					<div class="determine" @click="addCommit(1)">确定</div>
				</div>
			</div>
		</div>
		<!-- 编辑部门弹窗 -->
		<div class="mask" v-if="editshowModal" @click="editshowModal = false"></div>
		<div class="pop" v-if="editshowModal">
			<div class="head">
				<h1>编辑部门</h1>
				<img src="@/assets/关闭@2x.png" alt="" @click="editshowModal = false">
			</div>
			<div class="transverse"></div>
			<div class="center">
				<div class="center_input">
					<p>部门名称：</p>
					<el-input v-model="input1" placeholder="请输入部门名称"></el-input>
				</div>
				<div class="textarea">
					<textarea class="bottominput" name="" id="" cols="30" rows="10" v-model="remarks1" placeholder="请输入部门描述"></textarea>
				</div>
			</div>
			<div class="footer">
				<div class="btn">
					<div class="cancel" @click="editshowModal=false">取消</div>
					<div class="determine" @click="addCommit(2)">确定</div>
				</div>
			</div>
		</div>
		<!-- 删除部门弹窗 -->
		<div class="mask" v-if="delshowModal" @click="delshowModal=false"></div>
		<div class="pop1" v-if="delshowModal">
			<div class="head">
				<h1>是否删除该部门</h1>
				<img src="@/assets/关闭@2x.png" alt="" @click="delshowModal=false">
			</div>
			<div class="transverse"></div>
			<div class="center"></div>
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
			id:'',
			list:[],
			showModal:false,
			editshowModal:false,
			delshowModal:false,
			count:0,
			input:'',
			input1:'',
			remarks:'',
			remarks1:"",
			page:1,
            limit:10,
			branch:'',//部门id
			branchinfo:'',
			creator:JSON.parse(localStorage.getItem('WuDaoeducation')),
			judata:{},//权限
			timer:null,
		}
	},
	created(){
        this.render()
		this.changePower1()
    },
	beforeDestroy() { 
        clearTimeout();
        clearTimeout(this.timer);
    },
	methods:{
		//权限
        changePower1(data,index){
            var data1 = JSON.parse(localStorage.getItem('WuDaoeducation'));
            // console.log(data1.data.jurisdiction);
            // console.log(data1.data.jurisdiction);
            if (data1.data.jurisdiction != "") {
                let checkTrueList1 = JSON.parse(data1.data.jurisdiction)
                // console.log(checkTrueList1);
                // console.log('当前路由'+this.$route.name);
                let route = this.$route.name
                let arrs =[] 
                let obj ={}
                for(let i=0 ; i<checkTrueList1.length ; i++){
                    for(let j=0 ; j<checkTrueList1[i].children.length ; j++){
                        for (let k = 0; k < checkTrueList1[i].children[j].children.length; k++) {
                            if(checkTrueList1[i].children[j].name == route){
                                arrs.push(checkTrueList1[i].children[j].children[k].path)
                                if (checkTrueList1[i].children[j].children[k].isShow == true) {
                                    obj[arrs[k]] = true
                                }else{
                                    obj[arrs[k]] = false
                                }
                            }
                        }
                    }
                }
                this.judata = obj
                // console.log(this.judata);
            }
            else{
                let checkTrueList1 = ''
            }
        },
		// 列表数据
		render(){
            let _this = this
            this.page = 1
			const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
			api.getBranch({
				page:this.page,
                listrows:this.limit
			}).then(res=>{
				// console.log(res);
                _this.list = res.data.data
                _this.count = res.data.count
				this.timer = setTimeout(() => {
                    loading.close();
                },);
			}).catch(res=>{
                this.$message({
                    message: '网络错误请稍后再试',
                    type:'error'
                });
            })
            // $.ajax({
            //     url:"http://192.168.3.4/ldy/public/index.php/ljairport/v1/YfnPower/getBranch",
            //     data:{
            //         page:this.page,
            //         listrows:this.limit
            //     },
            //     // dataType:"json",async: false,
            //     type:"get",
            //     success:function(res){
            //         console.log(res.data);
            //         _this.list = res.data
            //         _this.count = res.count
            //     }
            // })
        },
		// 打开添加
		addPower(){
			this.showModal = true
		},
		// 查看人员
		seeUser(arr,index){
			// console.log(arr);
			let _this = this
            this.$router.push({ 
                name:'jurisdictionuser',
				//发送数据
                query:{
					id:arr.id,
					branch:arr.branch
				}
            })
		},
		// 编辑
		changePower(val){
			// console.log(val.id);
			this.input1 = val.branch
			this.branch = val.id
			this.remarks1 = ''
			this.editshowModal = true
		},
		// 删除部门
		delbranch(val){
			this.branchinfo = val
			this.delshowModal = true
		},
		// 分页
		changePage(val){
            this.page = val
            api.getBranch({
				page:this.page,
                listrows:this.limit
			}).then(res=>{
				// console.log(res.data);
                _this.list = res.data.data
                _this.count = res.data.count
			})
        },
		// 添加&编辑
		addCommit(val){
			if(val == 1){//val=1添加
				// console.log(val);
				let _this = this
				api.addBranch({
					branch:_this.input,
					describe:_this.remarks,
					creator:_this.creator.data[0].name
				}).then(res=>{
					// console.log(res.data);
					if(res.data.code == 200){
                    this.$message({
							message: '添加成功',
							type: 'success'
						});
						_this.showModal = false
						this.render()
					}
				})
				// $.ajax({
				// 	url:"http://192.168.3.4/ldy/public/index.php/ljairport/v1/YfnPower/addBranch",
				// 	data:{
				// 		branch:_this.input,
				// 		describe:_this.remarks,
				// 		creator:_this.creator.data[0].name
				// 	},
				// 	// dataType:"json",async: false,
				// 	type:"post",
				// 	success:function(res){
				// 		_this.render()
				// 		_this.showModal = false
				// 	}
				// })
			}
			else if (val == 2) {//val=2编辑
				// console.log(val);
				let _this = this
				api.editBranch({
					id:_this.branch,
					branch:_this.input1,
					describe:_this.remarks1,
					creator:_this.creator.data[0].name
				}).then(res=>{
					// console.log(res.data);
					if(res.data.code == 200){
                    this.$message({
							message: '编辑成功',
							type: 'success'
						});
						_this.editshowModal = false
						this.render()
					}
				})
				// $.ajax({
				// 	url:"http://192.168.3.4/ldy/public/index.php/ljairport/v1/YfnPower/editBranch",
				// 	data:{
				// 		id:_this.branch,
				// 		branch:_this.input1,
				// 		describe:_this.remarks1,
				// 		creator:_this.creator.data[0].name
				// 	},
				// 	// dataType:"json",async: false,
				// 	type:"post",
				// 	success:function(res){
				// 		_this.render()
				// 		_this.editshowModal = false
				// 	}
				// })
			}
		},
		deldateCommit(){
			let _this = this
			// console.log(this.branchinfo.id);
			api.delBranch({
				id:this.branchinfo.id,
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
		padding: 0 10px;
	    height: 28px;
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
	    width: 258px;
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
		width: 600px;
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
		.center{
			height: 50px;

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
				align-items: center;
				p{
					width: 130px;
				}
			}
				.textarea{
					padding: 20px 0;
					.bottominput{
						width: 100%;
						height: 200px;
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
