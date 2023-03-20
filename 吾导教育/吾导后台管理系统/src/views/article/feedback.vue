<template>
    <div class="whole">
        <!-- 按钮 -->
        <div class="btn" v-if="judata.nr_add">
            <div class="problem"  @click="addProblem"><img  class="btn-img" src="@/assets/添加.png" alt=""></div>
            <div class="problem_text">添加内容</div>
        </div>
        <!-- 添加问题 -->
        <div class="add_mask" v-if="addMemu" @click="addMemu=false"></div>
        <div class="add_pop" v-if="addMemu">
            <div class="add_head">
                <div class="text"><span>添加内容</span></div>
                <div class="img" @click="addMemu=false"><img  class="btn-img" src="@/assets/关闭.png" alt=""></div>
            </div>
            <div class="transverse"></div>
            <div class="add_content">
                <div class="input1">
                    <div class="text"><span>标题</span></div>
                    <div class=""><el-input v-model="problem" placeholder="输入内容标题"></el-input></div>
                </div>
                <div class="input2">
                    <div class="text"><span>选择分组</span></div>
                    <div class="">
                        <el-select v-model="value" placeholder="选择所属分组">
                            <el-option
                                v-for="item in options"
                                :key="item.poblem_group_name"
                                :label="item.poblem_group_name"
                                :value="item.poblem_group_name">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <!-- <div class="radio">
                    <el-radio v-model="radio" label="-1">所有人</el-radio>
                    <el-radio v-model="radio" label="1">普通用户</el-radio>
                    <el-radio v-model="radio" label="3">机场职工</el-radio>
                    <el-radio v-model="radio" label="2">北部湾员工</el-radio>
                </div> -->
                <div class="input1" style="width: 300px;">
                    <div class="text"><span>排序</span></div>
                    <div class=""><el-input v-model="sort" type="number" placeholder="输入内容排序"></el-input></div>
                </div>
                <div class="input3">
                    <div class="text"><span>内容</span></div>
                    <div class="">
                        <vue-ueditor-wrap v-model="contents" :config="myConfig" ></vue-ueditor-wrap>
                    </div>
                </div>
            </div>
            <div class="add_pop_bottom">
                <div class="pop_bottom">
                    <div class="cancel" @click="addMemu = false">取消</div>
                    <div class="determine" @click="commit">确定</div>
                </div>
            </div>
        </div>
        <!-- 表格 -->
        <div class="form_head" v-if="judata.nr_table">
            <ul>
                <li class="problem">标题</li>
                <li class="answer"><span>回答</span></li>
                <!-- <li class="problem">类型</li> -->
                <li class="_operation">排序</li>
                <li class="operation">操作</li>
            </ul>
        </div>
        <!-- 列表 -->
        <div class="form_information" v-if="judata.nr_table">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <div class="blue"></div>
                    <div class="problem">
                        <p>{{item.title}}</p>
                    </div>
                    <div class="answer">
                        <p class="_descBox" v-html="item.contents"></p>
                    </div>
                    <!-- <div class="problem">
                        <p v-if="item.type == -1">所有人</p>
                        <p v-if="item.type == 1">普通用户</p>
                        <p v-if="item.type == 2">北部湾员工</p>
                        <p v-if="item.type == 3">机场职工</p>
                    </div> -->
                    <div class="_operation">
                        <!-- <p>{{item.sort}}</p> -->
                        <el-input  v-model="item.sort" type="number" @blur="changeSort(item,index)" v-if="judata.nr_px"></el-input>
                    </div>
                    <div class="operation">
                        <el-button @click="changeProblem(item)" v-if="judata.nr_edit">编辑</el-button>
                        <el-button @click="Delete(item.id)" v-if="judata.nr_del">删除</el-button>
                        <!-- <div class="edit" @click="changeProblem(item)" v-if="judata.nr_edit">编辑</div>
                        <div class="del" @click="Delete(item.id)" v-if="judata.nr_del">删除</div> -->
                    </div>
                </li>
            </ul>
        </div>
        <!-- 分页 -->
        <div class="Paging" v-if="judata.nr_table">
            <el-pagination background layout="prev, pager, next" @current-change="changePage" :total="count"></el-pagination>
        </div>
    </div>
</template>

<script>
    import api from '@/api/articles'
    import VueUeditorWrap from "vue-ueditor-wrap";
    export default {
        name: 'Dashboard',
        components:{
            VueUeditorWrap,
        },
        data(){
            return {
                addMemu:false,
                count:0,
                list:[],
                problem:'',
                contents:'',
                sort:'',
                radio: '-1',
                id:'',
                searchRender:false,
                memuTitle:'添加内容',
                value:'',
                options:[],
                myConfig:{
                    serverUrl:'https://keep.gxhxinfo.com/static/ueditor/php/controller.php',
                    autoHeightEnabled:false,
                    autoFloatEnabled:false,
                    initialFrameHeight:340,
                    initialFrameWidth:'100%',
                    enableAutoSave:true,
                    //线上富文本框的地址
                    UEDITOR_HOME_URL:'/wudao/admin/ueditor/',
                    //本地富文本框的地址
                    // UEDITOR_HOME_URL:'/ueditor/',
                    imageUrlPrefix:'http://keep.gxhxinfo.com/'
                },
                judata:{},//权限
                timer:null,
            }
        },
        mounted(){
            this.render()
            this.changePower()
        },
        beforeDestroy() { 
            clearTimeout();
            clearTimeout(this.timer);
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
                api.updateCommonProblemContents({
                    id:item.id,
                    poblem_group_id:item.poblem_group_id,
                    title:item.title,
                    sort:item.sort,
                    contents:item.contents,
                }).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message: '编辑成功',
                            type:'success'
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
            async render(){
                let _this = this
                this.searchRender = false
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                await api.queryCommonProblemGroup({
                    page:1,
                    listrows:1000
                }).then(res=>{
                    this.options = res.data.data.data
                })
                await api.queryCommonProblemContents({
                    page:1,
                    listrows:10
                }).then(res=>{
                    res.data.data.data.forEach(function(value){
                        for(let i=0 ; i<_this.options.length ; i++){
                            if(_this.options[i].id == value.poblem_group_id){
                                value.poblem_group_name = _this.options[i].poblem_group_name
                            }
                        }
                    })
                    this.searchRender = true
                    this.count = res.data.data.count
                    this.list = res.data.data.data
                    this.timer = setTimeout(() => {
                        loading.close();
                    }, );
                })
            },
            changePage(val){
                let _this = this
                this.page = val
                api.queryCommonProblemContents({
                    page:val,
                    listrows:10,
                }).then(res=>{
                    // console.log(res);
                    res.data.data.data.forEach(function(value){
                        for(let i=0 ; i<_this.options.length ; i++){
                            if(_this.options[i].id == value.poblem_group_id){
                                value.poblem_group_name = _this.options[i].poblem_group_name
                            }
                        }
                    })
                    this.count = res.data.data.count
                    this.list = res.data.data.data
                })
            },
            addProblem(){
                this.memuTitle = '添加内容'
                this.problem = ''
                this.contents = ''
                this.sort = ''
                this.addMemu = true
            },
            changeProblem(item){
                this.memuTitle = '编辑内容'
                for(let i=0 ; i<this.options.length ; i++){
                    if(this.options[i].id == item.poblem_group_id){
                        this.value = this.options[i].poblem_group_name
                    }
                }
                this.problem = item.title
                this.contents = item.contents
                this.sort = item.sort
                this.id = item.id
                this.radio = item.type
                this.addMemu = true
            },
            commit(){
                let _this = this
                if(this.value == ''){
                    this.$message({
                        message: '请选择内容分组'
                    });
                    return false
                }
                if(this.problem == ''){
                    this.$message({
                        message: '请输入内容问题'
                    });
                    return false
                }
                if(this.sort == ''){
                    this.$message({
                        message: '请输入内容排序'
                    });
                    return false
                }
                if (this.sort.toString().includes('-')) {
                    this.$message({
                        type:"error",
                        message:'排序不能是负数'
                    })
                    return
                } 
                if(this.contents == ''){
                    this.$message({
                        message: '请输入内容答案'
                    });
                    return false
                }
                let id = ''
                this.options.forEach(function(value){
                    if(value.poblem_group_name == _this.value){
                        id = value.id
                    }
                })
                if(this.memuTitle == '添加内容'){ 
                    api.addCommonProblemContents({
                        poblem_group_id:id,
                        title:this.problem,
                        contents:this.contents,
                        sort:this.sort,
                        // type:this.radio
                    }).then(res=>{
                        if(res.data.code == 200){
                            this.$message({
                                message: '添加成功',
                                type:'success'
                            });
                            this.problem = ''
                            this.contents = ''
                            this.sort = ''
                            this.addMemu = false
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
                    api.updateCommonProblemContents({
                        id:this.id,
                        poblem_group_id:id,
                        title:this.problem,
                        sort:this.sort,
                        contents:this.contents,
                        type:this.radio
                    }).then(res=>{
                        if(res.data.code == 200){
                            this.$message({
                                message: '编辑成功',
                                type:'success'
                            });
                            this.id = ''
                            this.problem = ''
                            this.contents = ''
                            this.sort = ''
                            this.addMemu = false
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
                if(confirm('确定删除此内容吗？')){
                    api.deleteCommonProblemContents({
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
            }
        }
    }
</script>

<style lang="scss" scoped>
.whole{
    padding:10px 5px  0 20px;
    background-color: #EDF1F5;
    flex-grow: 1;
    display:flex;
    flex-direction: column;
}
//按钮

.btn{
    margin-left: 5px;
    .problem:hover{
        cursor: pointer;
    }
  .problem{
        width: 52px;
        height: 52px;
        background: #FFFFFF;
        border: 1px solid #66B3FF;
        box-shadow: 0px 5px 10px 0px rgba(102, 179, 255, 0.2);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        // text-align: center;
        align-items: center;
        margin-left: 20px ;
  }
  .problem_text{
      color: #66B3FF;
      margin-top: 4px;
      font-size: 14px;
  }
  .btn-img{
      width: 20px;
      height: 20px;
  }
}
// 添加问题
.transverse{
    width: 100%;
    height: 1px;
    background-color: #E6E6E6;
}
.add_mask {
    background-color: #000000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1
}
.add_pop{
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    width: 1448px;
    height:80vh;
    overflow: auto;
    padding-bottom:15px;
    border-radius: 10px;
    z-index: 2;
    display:flex;
    box-sizing: border-box;
    flex-direction: column;
    .add_head{
        width: 100%;
        // background: chocolate;
        display: flex;
        position: relative;
        margin-bottom: 16px;
        .text{
            font-size: 20px;
            font-weight: 600;
            color: #4D4D4D;
            margin:23px 0 0 32px;
        }
        img{
            width: 16px;
            height: 17px;
            position: absolute;
            top: 23px;
            right: 32px;
        }
        .img:hover{
            cursor: pointer;
        }
    }
    .add_content{
        width: 100%;
        // background: aqua;
        margin-top: 37px;
        padding:0 80px ;
        .text{
            font-size: 16px;
            font-weight: 400;
            color: #4D4D4D;
            margin-bottom: 11px;
        }
        .input1{
            width: 100%;
            margin-bottom: 32px;
            input{
                outline: none;
                border: none;
                border-radius: 5px;
                border: 1px solid rgb(220, 223, 230);
                width: 100%;
                padding: 10px;
                height: 40px;
            }
        }
        .radio{
            width: 100%;
            margin-bottom: 32px;
        }
        .input2{
            width: 100%;
            margin-bottom: 32px;
        }
    }
    .add_pop_bottom{
        width: 100%;
        padding: 40px 0;
        // padding: 0 32px;
        .pop_bottom{
            display: flex;
            justify-content: center;
            // float: right;
        }
        .cancel{
            width: 148px;
            height: 40px;
            background: #FFFFFF;
            border: 1px solid #CCCCCC;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .cancel:hover{
            cursor: pointer;
        }
        .determine:hover{
            cursor: pointer;
        }
        .determine{
            width: 148px;
            height: 40px;
            background: #3377FF;
            border-radius: 5px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 10px;
        }
    }
}
// 表格
.form_head{
    width: 100%;
    /* background-color: #66B3FF; */
}
.form_head ul{
    // padding: 0;
    margin: 20px 20px 18px 0;
    display: flex;
    justify-content: space-between;
    padding: 0 64px 0 18px;
}
.form_head ul li{
    list-style: none;
}
.problem{
    width: 280px;
    word-break: normal;
    word-wrap: break-word;
    display: flex;
    align-items: center;
    // margin-left: 106px;
}
.answer{
    width: 500px;
    word-break: normal;
    word-wrap: break-word;
    text-align: center;
    display: flex;
    justify-content: center;
    // align-items: center;
}
.answer p{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    // font-size: 5px;
    -webkit-box-orient: vertical;
    max-height: 150px;
}
.operation{
    width: 140px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    // margin-right: 92px;
}
._operation{
    width: 140px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // justify-content: center;
}
/* 数据 */
.form_information::-webkit-scrollbar{
    width: 15px;
    // background: #cccccc;
}
.form_information::-webkit-scrollbar-thumb{
    width: 8px;
    background: #ffffff;
    border-radius: 10px;
    // box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,.3);
}
.form_information{
    width: 100%;
    height: 0;
    overflow: hidden;
    overflow-y: auto;
    overflow-y: overlay;
    flex-grow: 1;
}
.form_information ul{
    padding: 0;
    margin: 0 20px 0 0;
}
.form_information ul li{
    list-style:none;
    display: flex;
    justify-content: space-between;
    position: relative;
    margin: 0 0 10px 0;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 0 64px 0 18px;
}
.form_information ul li p{
    /* height: 55px; */
    padding: 0;
    margin: 21px 0 21px 0;
}
.form_information ul li:hover{
    background-color: #F2F9FF;
}
.form_information ul li:hover .blue{
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
.edit{
    width: 66px;
    height: 28px;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    color: #4D4D4D;
    line-height: 24px;
    text-align: center;
    margin:12px 0;
}
.edit:hover{
    cursor: pointer;
}
.del{
    width: 66px;
    height: 28px;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    // color: #CCCCCC;
    color: #4D4D4D;
    line-height: 24px;
    text-align: center;
    margin:12px 0 12px 10px;
}
.del:hover{
    cursor: pointer;
}
/* 分页 */
.Paging{
    padding:23px 0;
    text-align: center;
}
</style>
<style>
._descBox p span{
    font-size: 28px !important;
}

._descBox img{
    width: 100%;
    height: 100px;
    border-radius: 10px;
}
</style>