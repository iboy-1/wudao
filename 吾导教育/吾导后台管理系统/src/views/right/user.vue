<template>
	<div class="juisdiction">
		<h1>部门：{{branch}}</h1>
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
		        <li class="name">人员名称</li>
		        <li class="time">人员描述</li>
				<li class="time">添加时间</li>
				<li class="time">修改时间</li>
				<li class="time">操作人</li>
		        <li class="operation">操作</li>
		    </ul>
		</div>
		<!-- 列表 --> 
		<div class="lounge-Information">
		    <div class="Information" v-for="(item,index) of list" :key="index">
		        <div class="blue"></div>
		        <p class="name">{{item.user_name}}</p>
		        <p class="time">{{item.describe}}</p>
				<p class="time">{{item.creat_time}}</p>
				<p class="time">{{item.update_date}}</p>
				<p class="time">{{item.creator}}</p>
		        <div class="operation">
					<!-- <div class="" @click="seeUser">查看人员</div> -->
		            <!-- <div @click="changePower(item,index)">编辑</div>
		            <div class="del" @click="deluser(item)">删除</div> -->
					<el-button size="mini" @click="changePower(item,index)">编辑</el-button>
					<el-button size="mini" @click="deluser(item)">删除</el-button>
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
		
		<!-- 添加人员弹窗 -->
		<div class="mask" v-if="showModal" @click="showModal = false"></div>
		<div class="pop" v-if="showModal">
			<div class="head">
				<h1>添加人员</h1>
				<img src="@/assets/关闭@2x.png" alt="" @click="showModal=false">
			</div>
			<div class="transverse"></div>
			<div class="center">
				<div class="center_input">
					<p>选择人员：</p>
					<el-select v-model="value" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.account"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					 </el-select>
				</div>
				<div class="textarea">
					<p>填写描述：</p>
					<textarea class="bottominput" name="" id="" cols="30" rows="10" v-model="remarks" placeholder="请输入人员描述"></textarea>
				</div>
				<div class="power">
					<div class="name">权限设置</div>
					<div class="content">
						<el-tree
						  :data="data1"
						  show-checkbox
						  node-key="path"
						  ref="tree"
						  :default-checked-keys="selectCheck"
						  :props="defaultProps">
						</el-tree>
					</div>
				</div>
			</div>
			<div class="footer">
				<div class="btn">
					<div class="cancel" @click="showModal=false">取消</div>
					<div class="determine" @click="addCommit">确定</div>
				</div>
			</div>
		</div>
		
		<!-- 编辑人员弹窗 -->
		<div class="mask" v-if="editshowModal" @click="editshowModal = false"></div>
		<div class="pop" v-if="editshowModal">
			<div class="head">
				<h1>编辑人员</h1>
				<img src="@/assets/关闭@2x.png" alt="" @click="editshowModal=false">
			</div>
			<div class="transverse"></div>
			<div class="center">
				<div class="center_input">
				</div>
				<div class="textarea">
					<p>编辑描述：</p>
					<textarea class="bottominput" name="" id="" cols="30" rows="10" v-model="remarks1" placeholder="请输入人员描述"></textarea>
				</div>
				<div class="power">
					<div class="name">权限设置</div>
					<div class="content">
						<el-tree
						  :data="data1"
						  show-checkbox
						  node-key="path"
						  ref="tree1"
						  :default-checked-keys="selectCheck1"
						  :props="defaultProps">
						</el-tree>
					</div>
				</div>
			</div>
			<div class="footer">
				<div class="btn">
					<div class="cancel" @click="editshowModal=false">取消</div>
					<div class="determine" @click="updateCommit">确定</div>
				</div>
			</div>
		</div>
		<!-- 删除人员弹窗 -->
		<div class="mask" v-if="delshowModal" @click="delshowModal=false"></div>
		<div class="pop1" v-if="delshowModal">
			<div class="head">
				<h1>是否删除该人员</h1>
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
			branch:'',
			list:[],
			showModal:false,
			editshowModal:false,
			delshowModal:false,
			count:0,
			page:1,
            limit:10,
			input:'',
			input1:'',
			remarks:'',
			remarks1:"",
			creator:JSON.parse(localStorage.getItem('WuDaoeducation')),
			options: [],
			value: '',
			data:[],
			data1:[],
			urseinfo:[],
			selectCheck:[],
			selectCheck1:[],
			defaultProps: {
                children: 'children',
                label: this.treeLabel
            },
		}
	},
	watch:{
        showModal(val){
            if(val == false){
				// console.log('showModal');
                this.$refs.tree.setCheckedKeys([])
            }
        },
        editshowModal(val){
            if(val == false){
				// console.log('editshowModal');
                this.$refs.tree1.setCheckedKeys([])
            }
        }
		
    },
	created(){
		this.id = this.$route.query.id
		this.branch = this.$route.query.branch
        this.render()
		this.get_data()
    },
	methods:{
		treeLabel(data, node){
            return data.meta.title
        },
		get_data(){
			let _this = this
			const loading = this.$loading({
                lock: true,
                text: '正在加载数据',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
			api.getAllMenu().then(res=>{
				// console.log(res);
				this.timer = setTimeout(function(){
                    loading.close();
                    _this.data = res.data
					_this.data1 = res.data
                },1000)
			})
			// $.ajax({
            //     url:"http://192.168.3.4/ldy/public/index.php/ljairport/v1/YfnPower/getAllMenu",
            //     data:{
                    
            //     },
            //     type:"get",
            //     success:function(res){
            //         // console.log(res);
			// 		this.timer = setTimeout(function(){
            //             loading.close();
            //             _this.data = res
			// 			_this.data1 = res
            //         },1000)
            //     }
            // })
		},
		// 点击添加传数据
		addPower(){
			let _this = this
            this.page = 1
            this.remarks = ""
			this.value = ''
			api.getAllUser({
				page:'1',
                listrows:'10000000000000',
			}).then(res=>{
				// console.log(res);
                _this.options = res.data.data
                // _this.showModal = true
				_this.showModal = true
			})
            // $.ajax({
            //     url:"http://192.168.3.4/ldy/public/index.php/ljairport/v1/YfnPower/getAllUser",
            //     data:{
            //         page:'1',
            //         listrows:'10000000000000',
            //     },
            //     type:"get",
            //     success:function(res){
            //         // console.log(res);
            //         _this.options = res.data
            //         // _this.list = res.data
            //         // _this.showModal = true
			// 		_this.showModal = true
            //     }
            // })
			// this.showModal = true
		},
		render(){
			// console.log(this.id);
			// console.log(this.branch);
            let _this = this
            this.page = 1
			api.getUserAdmin({
				page:this.page,
                listrows:this.limit,
                branch_id:this.id
			}).then(res=>{
				// console.log(res);
                _this.list = res.data.data
                _this.count = res.data.count
			})
            // $.ajax({
            //     url:"http://192.168.3.4/ldy/public/index.php/ljairport/v1/YfnPower/getUserAdmin",
            //     data:{
            //         page:this.page,
            //         listrows:this.limit,
            //         branch_id:this.id
            //     },
            //     // dataType:"json",async: false,
            //     type:"get",
            //     success:function(res){
            //         // console.log(res);
            //         _this.list = res.data
            //         _this.count = res.count
            //     }
            // })
        },
		//返回
		goBack(){
			this.$router.push({
			    name:'jurisdictionbranch',
			})
		},
		// 分页
		changePage(val){
            this.page = val
            api.getUserAdmin({
				page:this.page,
                listrows:this.limit,
                branch_id:this.id
			}).then(res=>{
				// console.log(res);
                this.list = res.data.data
                this.count = res.data.count
			})
        },
		// 点击编辑传数据
		changePower(val,index){
			// console.log(val);

			this.urseinfo = val
			let power = JSON.parse(val.jurisdiction)
            this.selectCheck1 = []
            for(let i=0;i<power.length;i++){
                for(let j=0;j<power[i].children.length;j++){
					for (let k = 0; k < power[i].children[j].children.length; k++) {
						if(power[i].children[j].children[k].isShow){
							this.selectCheck1.push(power[i].children[j].children[k].path)
						}
					}
                }
            }
			this.editshowModal = true
		},
		deluser(val){
			this.urseinfo = val
			this.delshowModal = true
		},
		// 编辑
		updateCommit(){
			let _this = this
			let data = this.data
			let checkList = []
            checkList = this.$refs.tree1.getCheckedNodes()
			// var ridsa = this.$refs.tree1.getCheckedKeys().join(',')
			// console.log(ridsa);
			// console.log(checkList);
            // let data = this.data
			// this.selectCheck1 = []
            for(let i=0 ; i<checkList.length ; i++){
				// console.log('aa');
                for(let j=0 ; j<data.length ; j++){
					// console.log('bb');
                    for(let k=0 ; k<data[j].children.length ; k++){
						// console.log('cc');
						for (let l = 0; l < data[j].children[k].children.length; l++) {
							// console.log('dd');
							if(checkList[i].path == data[j].children[k].children[l].path){
								// console.log('11'+data[j].children[k].children[l].path);
								data[j].children[k].children[l].isShow = true
							}
						}
                    }
                }
            }

			// console.log(data);
			// console.log(JSON.stringify(data));

			api.editUserAdmin({
				user_id:_this.urseinfo.user_id,
                jurisdiction:JSON.stringify(this.data),
                creator:this.creator.data[0].name,
                describe:this.remarks1
			}).then(res=>{
				// console.log(res);
				if(res.data.code == 200){
					this.get_data()
					this.$message({
						message: '编辑成功',
						type: 'success'
					});
					this.selectCheck1 = []
					_this.render()
                	this.editshowModal = false
				}
			})
			// $.ajax({
            //     url:"http://192.168.3.4/ldy/public/index.php/ljairport/v1/YfnPower/editUserAdmin",
            //     data:{
            //         user_id:_this.urseinfo.user_id,
            //         jurisdiction:JSON.stringify(data),
            //         creator:this.creator.data[0].name,
            //         describe:this.remarks1
            //     },
            //     // dataType:"json",async: false,
            //     type:"post",
            //     success:function(res){
            //         // console.log(res);
			// 		if(res.code == 200){
			// 			// this.$message({
			// 			// 	message: '添加成功',
			// 			// 	type: 'success'
			// 			// });
			// 			_this.selectCheck1 = []
			// 			_this.render()
            //         	_this.editshowModal = false
			// 		}
            //     }
            // })
		},
		// 添加
		addCommit(){
			let _this = this
			let checklist = []
			checklist = this.$refs.tree.getCheckedNodes()
			// console.log(checklist);
			for (let i = 0; i < checklist.length; i++) {
				// console.log('aa');
				for (let j = 0; j < this.data.length; j++) {
					// console.log('bb');
					for (let k = 0; k < this.data[j].children.length; k++) {
						// console.log('cc');
						for (let l = 0; l < this.data[j].children[k].children.length; l++) {
							// console.log('dd');
							if (checklist[i].path == this.data[j].children[k].children[l].path) {
								this.data[j].children[k].children[l].isShow = true
							}
						}
					}
				}
			}
			// console.log(this.data);
			// console.log(JSON.stringify(this.data));
			api.addUserAdmin({
				user_id:this.value,
                jurisdiction:JSON.stringify(this.data),
                creator:this.creator.data[0].name,
                branch_id:this.id,
                describe:this.remarks
			}).then(res=>{
				// console.log(res);
				if(res.data.code == 200){
					this.$message({
						message: '添加成功',
						type: 'success'
					});
					_this.selectCheck = []
					_this.render()
                	_this.showModal = false
				}else if (res.data.code == 400) {
					this.$message({
						message: res.data.data,
						type: 'error'
					});
					_this.selectCheck = []
					_this.render()
                	_this.showModal = false
				}
			})
			// $.ajax({
            //     url:"http://192.168.3.4/ldy/public/index.php/ljairport/v1/YfnPower/addUserAdmin",
            //     data:{
            //         user_id:this.value,
            //         jurisdiction:JSON.stringify(this.data),
            //         creator:this.creator.data[0].name,
            //         branch_id:this.id,
            //         describe:this.remarks
            //     },
            //     // dataType:"json",async: false,
            //     type:"post",
            //     success:function(res){
			// 		// console.log(res);
			// 		if(res.code == 200){
			// 			// this.$message({
			// 			// 	message: '添加成功',
			// 			// 	type: 'success'
			// 			// });
			// 			this.selectCheck = []
			// 			_this.showModal = false
			// 			_this.render() 
			// 		}
            //     }
            // })
		},
		deldateCommit(){
			let _this = this
			api.delUserAdmin({
				id:this.urseinfo.id,
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
            //     url:"http://192.168.3.4/ldy/public/index.php/ljairport/v1/YfnPower/delUserAdmin",
            //     data:{
			// 		id:this.urseinfo.id,
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

<style>
.el-tree-node__content{
	height: 35px;
}
.el-tree-node__label{
	/* font-size: 25px; */
}
.el-tree-node__expand-icon{
	font-size: 25px;
}
.el-checkbox__inner{
	width: 20px;
	height: 20px;
}
.el-checkbox__inner::after{
	top: 2px;
	left: 7px;
	height: 10px;
}
</style>
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
	    width: 76px;
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
	    width: 158px;
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
			  p{
				  width: 100px;
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
			  height: 400px;
			  display: flex;
			  .name{
				  width: 100px;
				  height: 100%;
				  display: flex;
				  align-items: center;
			  }
			  .content{
				  height: 100%;
				  width: 100%;
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
