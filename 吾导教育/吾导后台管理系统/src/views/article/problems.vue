<template>
    <div class="allOrder">
        <div class="buttonbox" @click="tianjia" v-if="judata.bt_add">
            <div class="refresh">
                <img src="@/assets/添加.png" alt="">
            </div>
            <p>添加标题</p> 
        </div>  
        <div class="list" v-if="judata.bt_table">
            <div class="listname">
                <div class="number">一级分类名称</div>
                <div class="number">分组名称</div>
                <div class="number">排序</div>
                <div class="operation">操作</div>    
            </div>  
         <div class="orders-box">
            <div class="listdata" v-for="(item,index) in list">
                <div class="blue"></div>
                <div class="number">{{item.poblem_group_title}}</div>
                <div class="number">{{item.poblem_group_name}}</div>
                <div class="number">
                    <div style="width: 300px;">
                        <el-input v-model="item.sort" type="number" @blur="changeSort(item,index)" v-if="judata.bt_px"></el-input>
                    </div>
                </div>
                <div class="operation caozuo">
                    <el-button size="mini" @click="change(item.id,item)" v-if="judata.bt_edit">编辑</el-button>
                    <el-button size="mini" @click="Delete(item.id)" v-if="judata.bt_del">删除</el-button>
                </div>                      
            </div>
          </div>
        </div> 
		<div class="mask" v-if="firstbox"></div>
        <div class="firstbox" v-if="firstbox">
            <div class="secondbox">
                <p>分组设置</p>
                <img src="@/assets/关闭.png" alt="" @click="guanbi">
            </div>
           <div class="line"></div>
            <div class="tbox">
                <div class="box">
                    <div v-if="title == '添加分组'">
                        <p>一级分类</p>
                        <el-select v-model="value" placeholder="选择所属标题">
                            <el-option
                                v-for="item in options"
                                :key="item.poblem_group_title"
                                :label="item.poblem_group_title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <p>标题</p>
                    <!-- <input type="text" placeholder="输入分组标题" v-model="name"> -->
                    <el-input v-model="name" placeholder="输入分组标题"></el-input>
                    <p>排序</p>
                    <!-- <input type="number" placeholder="输入分组排序" v-model="sort"> -->
                    <el-input-number v-model="sort" :min="1" :max="10" label="输入分组排序"></el-input-number>
                </div>
                <div class="add-bottom">
                    <div class="add-bottom-cancel" @click="cancel">取消</div>
                    <div class="add-bottom-determine" @click="commit">确定</div>
                </div>
            </div>
        </div>
        <div id="app" >
            <el-pagination 
            v-if="judata.bt_table"
            background 
            @current-change="changePage"
            layout="prev, pager, next" :total="count"></el-pagination>
        </div> 
    </div>
</template>

<script>
    import api from '@/api/articles.js'
    export default {
        name: 'order',
        data(){
            return {
                list:[],
                name:'',
                sort:'',
                page:1,
                count:0,
                limit:10,
                firstbox: false,
                title:'添加分组',
                id:'',
                options:[],
                value:'',
                judata:{},//权限
            }
        },
        mounted(){
            api.queryblemTitle({
                limit:'0,100'
            }).then(res=>{
                this.options = res.data.data.data
            })
            this.render()
            this.changePower()
        },
        methods:{
            //权限
            changePower(data,index){
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
            changeSort(item,index){
                if (item.sort.toString().includes('-')) {
                    this.$message({
                        type:"error",
                        message:'排序不能是负数'
                    })
                    return  this.render()
                } 
                api.updateCommonProblemGroup({
                    id:item.id,
                    sort:item.sort,
                    poblem_group_name:item.poblem_group_name
                }).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                        this.render()
                    }else{
                        this.$message({
                            message: res.data.data.info
                        });
                    }
                }).catch(res=>{
                    this.$message({
                        message: '网络错误请稍后再试',
                        type:'error'
                    });
                })
            },
            render(){
                this.page = 1
                api.queryCommonProblemGroup({
                    page:this.page,
                    listrows:this.limit
                }).then(res=>{
                    this.count = res.data.data.count
                    this.list = res.data.data.data
                })
            },
            changePage(val){
                this.page = val
                api.queryCommonProblemGroup({
                    page:this.page,
                    listrows:this.limit
                }).then(res=>{
                    this.count = res.data.data.count
                    this.list = res.data.data.data
                })
            },
            change(id,item){
                this.id = id
                this.name = item.poblem_group_name
                this.sort = item.sort
                this.title = '编辑常见问题分组'
                this.firstbox = true
            },
            tianjia(){ //添加常见问题
                this.name = ''
                this.sort = ''
                this.title = '添加分组'
                this.firstbox = true
            },
            commit(){
                if (this.sort.toString().includes('-')) {
                    this.$message({
                        type:"error",
                        message:'排序不能是负数'
                    })
                    return
                } 
                if(this.title == '添加分组'){
                    api.addCommonProblemGroup({
                        poblem_group_name:this.name,
                        sort:this.sort,
                        title_id:this.value,
                    }).then(res=>{
                        if(res.data.code == 200){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.name = ''
                            this.sort = ''
                            this.firstbox = false
                            this.render()
                        }else{
                            this.$message({
                                message: res.data.data.info
                            });
                        }
                    }).catch(res=>{
                        this.$message({
                            message: '网络错误请稍后再试',
                            type:'error'
                        });
                    })
                }else{
                    api.updateCommonProblemGroup({
                        id:this.id,
                        sort:this.sort,
                        poblem_group_name:this.name
                    }).then(res=>{
                        if(res.data.code == 200){
                            this.$message({
                                message: '编辑成功',
                                type: 'success'
                            });
                            this.name = ''
                            this.sort = ''
                            this.firstbox = false
                            this.render()
                        }else{
                            this.$message({
                                message: res.data.data.info
                            });
                        }
                    }).catch(res=>{
                        this.$message({
                            message: '网络错误请稍后再试',
                            type:'error'
                        });
                    })
                }
            },
            Delete(id){
                if(confirm('确定删除此分组吗？')){
                    api.deleteCommonProblemGroup({
                        id:id
                    }).then(res=>{
                        if(res.data.code == 200){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.render()
                        }else{
                            this.$message({
                                message: res.data.data.info
                            });
                        }
                    }).catch(res=>{
                        this.$message({
                            message: '网络错误请稍后再试',
                            type:'error'
                        });
                    })
                }
            },
            guanbi(){  //分组设置关闭按钮
                this.firstbox = false
            },
            cancel(){  //取消
                this.firstbox = false
            }
        }
       
    }
 
    
</script>

<style scoped lang="scss">
      input {
       word-break: break-all;
       border: 0;  
       outline: none;  
       background-color: rgba(0, 0, 0, 0);
   }     
	.allOrder{
        width: 100%;
        height: calc(100vh - 50px);
        background:#EDF1F5; 
        display: flex;
        flex-direction: column;
    }
    .orders-box::-webkit-scrollbar{  
        width: 10px;  
        height: 5px;  
        /* background-color: #FFFFFF;   */
    }  
    /*定义滑块 内阴影+圆角*/  
    .orders-box::-webkit-scrollbar-thumb{  
        border-radius: 10px;  
        -webkit-box-shadow: inset 0 0 6px rgb(255, 254, 254);  
        background-color: #ffffff; 
    } 
    .buttonbox{
        width: 150px;
        display: flex;
        flex-direction: column;
        padding: 0 25px;
        box-sizing: border-box;
        margin-top:20px;
        margin-bottom: 10px;
        text-align: center;
        .refresh{
            width: 48px;
            height: 48px;
            background:#FFFFFF;                         
            border: 1px solid #66B3FF;
            box-shadow: 0px 5px 10px 0px rgba(111, 211, 199, 0.2);
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            margin-left:25px;
            img{
                height: 20px;
                width: 20px;
            }
        } 
        p{                                                                
            font-size: 10px; 
            font-family: Source Han Sans CN;
            color: #66B3FF;      
            }  
       } 
    .list{
        width: 100%;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        padding-left: 15px;
        padding-right: 5px;
        height: 240px;
        overflow: hidden;
        box-sizing: border-box;
        margin-right: 10px;
        .listname{              
            font-size: 18px;
            font-family: Source Han Sans CN;
            color: #454D4C;  
            display: flex;
            flex-direction: row;
            width: 100%; 
            margin-bottom:10px;                    
        }
        .orders-box {
            flex-grow: 1;
            width: 100%; 
            height: 0;     
            overflow: hidden;
            overflow-y: auto;
            .listdata{
                margin-right: 9px;
                display: flex;
                flex-direction: row;
                height: 60px;
                background:#FFFFFF;
                border-radius: 5px;            
                box-sizing: border-box;
                margin-bottom: 10px;
                position: relative;
                align-items:center;
                .blue{ 
                    position: absolute;
                    width: 5px;
                    height:60px;
                    top:0px;
                    background: #3377FF; 
                    display: none;
            }   
            .caozuo{
                display: flex;
                flex-direction: row;
                 .check{
                    width: 66px;
                    height: 28px;  
                    font-size: 18px;      
                    line-height: 26px; 
                    background: #FFFFFF;
                    border: 1px solid #CCCCCC;
                    border-radius: 5px;
                    text-align:center;
                    margin-right:10px;
                    cursor: pointer;
                    
                }
                .check3{
                    width: 66px;
                    height: 28px;  
                    font-size: 18px;
                    line-height: 26px; 
                    background: #FFFFFF;
                    border: 1px solid #CCCCCC;
                    font-family: Source Han Sans CN;
                    color: #CCCCCC; 
                    border-radius: 5px;
                    text-align:center;
                    cursor: pointer;
                }
            }
        }
    }  
        .number{
            width: 600px;
            padding-left: 18px;
            box-sizing: border-box;
            word-break: break-all;
        }
        .operation{
            flex-grow: 1;
            padding-left: 18px;
            box-sizing: border-box;
        }
    }  
    .list .orders-box .listdata:hover{
        background-color: #F2F9FF;     
    }   
    .list .orders-box .listdata:hover .blue{
        display: block;   
    }  
    #app{
        width: 100%;
        height: 100px;
        margin-top: 50px;
        text-align: center;
    }
    .mask {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 130;
	}
    .firstbox{
        display: flex;
		flex-direction: column;
		background: #FFFFFF;
		border-radius: 10px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 131;
		width: 750px;
		height: 550px;
		overflow: hidden;
        .secondbox{
            display: flex;
	       	flex-direction: column;
            position: relative;
            padding:0 30px;
            border-bottom:1px solid #E6E6E6;
            img{
                position: absolute;
                width: 13px;
                height: 12px;
                top:19px;
                right: 25px;
                cursor: pointer;
            }
            p{
                font-size: 25px;
                font-weight: 600;
            }
        }
        .line{
            width: 100%;
            height: 1px;
            background: #CCCCCC;
        }
        .tbox{
            display: flex;
		    flex-direction: row;
            height: 600px;
            .box{
                display: flex;
                flex-direction: column;
                border-left:1px solid #E6E6E6;
                padding:0 30px;
                p{
                    font-size: 20px;
                    font-family: Source Han Sans CN;
                    color: #4D4D4D;
                }
                input{
                    padding: 0 12px;
                    width: 686px;
                    height: 32px;
                    background: #FFFFFF;
                    border: 1px solid #CCCCCC;
                    border-radius: 5px;
                }
            }
            .add-bottom{
                width: 310px;
                display: flex;
                direction: column;
                position: absolute;
                bottom: 5%;
                right: 30%;
                .add-bottom-cancel{
                    width: 150px;
                    height: 40px;
                    border: 1px solid #CCCCCC;
                    text-align: center;
                    line-height: 40px;
                    color: #333333;
                    border-radius: 5px;
                    font-weight: 600;
                    margin-right:20px;
                    cursor: pointer;
                }
                .add-bottom-determine{
                    width: 150px;
                    height: 40px;
                    color: #ffffff;
                    text-align: center;
                    line-height: 40px;
                    background-color: #3377FF;
                    border-radius: 5px;
                    cursor: pointer;
                }
            }
        }
    } 
</style>

