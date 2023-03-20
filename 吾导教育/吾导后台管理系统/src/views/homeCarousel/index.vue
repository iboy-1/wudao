<template>
    <div class="whole">
        <!-- 按钮 -->
        <div class="btn" v-if="judata.sylbt_add">
            <div class="refresh" @click="add_teacher"><img src="@/assets/添加@2x.png" alt="">添加</div>
        </div>
        <!-- 表格 -->
        <div class="form_head" v-if="judata.sylbt_table">
            <ul>
                <!-- <li class="adminid">id</li> -->
                <li class="name">图片</li>
                <li class="name">状态</li>
                <li class="name">是否跳转</li>
                <li class="remarks">跳转地址</li>
                <li class="name">排序</li>
                <li class="name">创建时间</li>
                <li class="operation">操作</li>
            </ul>
        </div>
        <div class="form_information" v-if="judata.sylbt_table">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <div class="blue"></div>
                    <!-- <div class="adminid">
                        <span v-if="item.id == -1">无</span>
                        <span v-else>{{item.id}}</span>
                    </div> -->
                    <div class="name">
                        <img :src="item.url" alt="">
                    </div>
                    <div class="name">
                        <span v-if="item.status == 1">显示</span>
                        <span v-else>隐藏</span>
                    </div>
                    <div class="name">
                        <span v-if="item.is_skip == 1">是</span>
                        <span v-else>否</span>
                    </div>
                    <div class="remarks">
                        <span v-if="item.skip_url == ''">无</span>
                        <span v-else>{{item.skip_url}}</span>
                    </div>
                    <div class="name">
                        <span v-if="item.sort == -1">无</span>
                        <span v-else>{{item.sort}}</span>
                    </div>
                    <div class="name">
                        <span v-if="item.create_time == -1">无</span>
                        <span v-else>{{item.create_time}}</span>
                    </div>
                    <div class="operation">
                        <!-- <div class="see" @click="see_btn(item)">查看</div> -->
                        <el-button @click="contact1(item)" v-if="judata.sylbt_edit">修改</el-button>
                        <el-button @click="delete_btn(item)" v-if="judata.sylbt_del">删除</el-button>
                        <!-- <div class="see" @click="contact1(item)">修改</div>
                        <div class="see" @click="delete_btn(item)">删除</div> -->
                    </div>
                </li>
            </ul>
        </div>
        <!-- 分页 -->
        <div class="Paging" v-if="searchRender && judata.sylbt_table">
            <el-pagination @current-change = "changePage" background layout="prev, pager, next" :total="count"></el-pagination>
        </div>
        <div class="mask" v-if="add_isShow" @click="add_isShow = false"></div>
        <div class="pop" v-if="add_isShow">
            <img src="@/assets/关闭@2x.png" alt="" @click="add_isShow=false">
            <h2>{{dialogTitle}}</h2>
            <div class="transverse"></div>
            <div class="content">
                <div class="box">
                    <el-form ref="form" :model="form" label-width="80px">
                        <div class="line">
                            <el-form-item label="图片">
                                <upload-img :fileList="hotel1FileList" :imgs="hotel1ImageUrl" @change="change" />
                            </el-form-item>
                        </div>
                        <div class="line">
                            <el-form-item label="状态">
                                <el-radio-group v-model="form.status">
                                    <el-radio :label="1">显示</el-radio>
                                    <el-radio :label="0">隐藏</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                        <div class="line">
                            <el-form-item label="跳转">
                                <el-radio-group v-model="form.is_skip">
                                    <el-radio :label="0">否</el-radio>
                                    <el-radio :label="1">是</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                        <div class="line" v-if="form.is_skip == 1">
                            <el-form-item label="跳转地址">
                                <el-input v-model="form.skip_url" placeholder="请输入跳转地址"></el-input>
                            </el-form-item>
                        </div>
                        <div class="line">
                            <el-form-item label="排序">
                                <el-input-number v-model="form.sort" :min="1" label="描述文字"></el-input-number>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
            <div class="btnMessage">
                <div class="cancel" @click="add_isShow = false">取消</div>
                <div class="determine" type="primary" @click="commitArticle(1)" v-if="dialogTitle == '添加轮播图'">确 定</div>
                <div class="determine" type="primary" @click="commitArticle(2)" v-else-if="dialogTitle == '修改轮播图'">确 定</div>
            </div>
        </div>
        <!-- <el-dialog :title="dialogTitle" :visible.sync="add_isShow" center width="500px">
            <div class="memu">
                <div class="box">
                    <el-form ref="form" :model="form" label-width="80px">
                        <div class="line">
                            <el-form-item label="图片">
                                <upload-img :fileList="hotel1FileList" :imgs="hotel1ImageUrl" @change="change" />
                            </el-form-item>
                        </div>
                        <div class="line">
                            <el-form-item label="状态">
                                <el-radio-group v-model="form.status">
                                    <el-radio :label="1">显示</el-radio>
                                    <el-radio :label="0">隐藏</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                        <div class="line">
                            <el-form-item label="跳转">
                                <el-radio-group v-model="form.is_skip">
                                    <el-radio :label="0">否</el-radio>
                                    <el-radio :label="1">是</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                        <div class="line" v-if="form.is_skip == 1">
                            <el-form-item label="跳转地址">
                                <el-input v-model="form.skip_url" placeholder="请输入跳转地址"></el-input>
                            </el-form-item>
                        </div>
                        <div class="line">
                            <el-form-item label="排序">
                                <el-input-number v-model="form.sort" :min="1" label="描述文字"></el-input-number>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="add_isShow = false">取 消</el-button>
                    <el-button type="primary" @click="commitArticle(1)" v-if="dialogTitle == '添加轮播图'">确 定</el-button>
                    <el-button type="primary" @click="commitArticle(2)" v-else-if="dialogTitle == '修改轮播图'">确 定</el-button>
                </div>
            </div>
        </el-dialog> -->

        <div class="mask" v-if="del_isShow" @click="del_isShow = false"></div>
        <div class="pop" v-if="del_isShow">
            <img src="@/assets/关闭@2x.png" alt="" @click="del_isShow=false">
            <h2>{{dialogTitle1}}</h2>
            <div class="transverse"></div>
            <div class="content1"></div>
            <div class="btnMessage">
                <div class="cancel" @click="del_isShow = false">取消</div>
                <div class="determine" @click="commitdel()">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
import api from"@/api/carouselImg.js";
import uploadImg from '@/components/uploadImg/uploadImg.vue';
export default {
    components: {
        uploadImg,
    },
    data(){
        return{
            page:1,
            count:0,
            limit:10,
            list:[],
            add_isShow:false,
            del_isShow:false,
            searchRender:false,//分页是否显示
            searchData:false,//是否为搜索
            dialogTitle1:'是否删除该图',
            dialogTitle:'添加轮播图',
            del_id:"",
            hotel1FileList:[],
            hotel1ImageUrl:'',
            form:{
                status:1,      //状态
                url:'',         //图片路径
                sort:'',         //排序
                skip_url:'',     //跳转地址
                is_skip:0,      //是否跳转
            },
            creator:JSON.parse(localStorage.getItem('WuDaoeducation')),
			judata:{},//权限
            timer:null,
        }
    },
    created(){

    },
    mounted(){
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
        change(url){
            // console.log(url);
            this.hotel1ImageUrl = url
            this.form.url = url
        },
        changePage(){

        },
        //主列表
        render(){
            let _this=this
            this.page = 1
            let page = (this.page - 1)*this.limit
            this.searchRender = false
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            api.query({
                page:page,
                listrows:this.limit,
            }).then(res=>{
                // console.log(res.data.data);
                _this.list = res.data.data.data
                _this.count = res.data.data.count
                _this.searchRender = true
                this.timer = setTimeout(() => {
                    loading.close();
                },);
            }).catch(res=>{
                this.$message({
                    message: '网络错误请稍后再试',
                    type:'error'
                });
            })
        },
        //添加
        add_teacher(){
            this.add_isShow = true
            this.hotel1FileList=[]
            this.dialogTitle='添加轮播图',
            this.form = {
                status:1,      //状态
                url:'',         //图片路径
                sort:'',         //排序
                skip_url:'',     //跳转地址
                is_skip:0,      //是否跳转
            }
        },
        commitdel(){
            api.delete({
                id:this.del_id
            }).then(res=>{
                if (res.data.code == 200) {
                    this.$message({
                        type:'success',
                        message:res.data.data
                    })
                    this.render()
                    this.del_isShow = false
                } else {
                    this.$message({
                        type:'error',
                        message:res.data.data
                    })
                }
            })
        },
        contact1(arr){
            this.dialogTitle = "修改轮播图"
            this.hotel1FileList = []
            this.form = {
                id:arr.id,
                status:Number(arr.status),      //状态
                url:arr.url,         //图片路径
                sort:arr.sort,        //排序
                skip_url:arr.skip_url,     //跳转地址
                is_skip:Number(arr.is_skip),      //是否跳转
            }
            if (arr.url != '' && arr.url!= '-1') {
                this.hotel1ImageUrl = arr.url
                this.hotel1FileList.push({
                  name:'avatar.png',
                  url:arr.url
                })
            }
            this.add_isShow = true
        },
        delete_btn(arr){
            this.del_isShow = true
            this.del_id = arr.id
        },
        commitArticle(val){
            // console.log(this.form); 
            // return
            if (this.form.url == '') {
                this.$message({
                    type:'error',
                    message:"请选择图片",
                })
                return
            }
            if (val == 1) {
                api.add(this.form).then(res=>{
                    // console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            type:'success',
                            message:res.data.data
                        })
                        this.add_isShow = false
                        this.render()
                    } else {
                        this.$message({
                            type:'error',
                            message:res.data.data
                        })
                    }
                    
                })
            } else {
                api.update(this.form).then(res=>{
                    // console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            type:'success',
                            message:res.data.data
                        })
                         this.add_isShow = false
                         this.render()
                    } else {
                        this.$message({
                            type:'error',
                            message:res.data.data
                        })
                    }
                    
                })
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.whole{
    padding: 0 10px;
    background-color: #EDF1F5;
    flex-grow: 1;
    display:flex;
    flex-direction: column;
    /* 搜索框 */
    .search{
        position: relative;
        padding-top: 10px;
        // width: 1755px;
        display: flex;
        // justify-content: space-between;
    }
    .el-input{
        width: 256px;
        height: 36px;
        box-shadow: 0px 8px 10px 0px rgba(4, 0, 0, 0.05);
		margin-right: 10px;
    }
	.el-date-picker{
		// margin-right: 10px;
	}
	.el-select{
		margin: 0 10px;
	}
    .search .Reset{
        background-color: #3377FF;
        width: 123px;
        height: 36px;
        color: white;
        border-radius: 5px;
        text-align: center;
        line-height: 36px;
        box-shadow: 2px 2px 5px #d9dadb;
		margin-right: 10px;
    }
    .search .query{
        width: 202px;
        height: 36px;
        background-color: #3377FF;
        color: white;
        border-radius: 5px;
        text-align: center;
        line-height: 36px;
        box-shadow: 2px 2px 5px #d9dadb;
    }
    .Reset:hover{
        cursor: pointer;
    }
    .query:hover{
        cursor: pointer;
    }
    .query img{
        width: 16px;
        height: 16px;
        margin: 0px 5px 0 0;
    }
    /* 按钮 */
    .btn{
      /* width: 126px; */
      display: flex;
      /* justify-content: space-between; */
      margin-top: 14px;
      text-align-last: center;
    }
    .export{
      width: 58px;
      height: 58px;
      border-radius: 50%;
      border-style: none;
      border: 1px #66B3FF solid;
      background-color: white;
      color: #66B3FF;
      box-shadow: 0 5px 10px 0 rgba(112, 145, 212, 0.2);
      line-height: 68px;
      display: inline-block;
      position: relative;
    }
    .export:hover{
      cursor: pointer;
    }
    .refresh:hover{
      cursor: pointer;
    }
    .refresh{
      width: 58px;
      height: 58px;
      border-radius: 50%;
      border-style: none;
      border: 1px #66B3FF solid;
      background-color: white;
      color: #66B3FF;
      box-shadow: 0 5px 10px 0 rgba(112, 145, 212, 0.2);
      line-height: 68px;
      display: inline-block;
      position: relative;
      margin-left: 10px;
    }
    .btn img{
      width: 16px;
      height: 16px;
      position: absolute;
      left: 18px;
      top: 5px;
    }
    /* 表格 */
    .form_head{
        width: 100%;
        /* background-color: #66B3FF; */
    }
    .form_head ul{
        padding: 0 50px;
        margin: 5px 0 18px 0;
        display: flex;
        justify-content: space-between;
    }
    .form_head ul li{
        list-style: none;
    }
    .adminid{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .name{
        width: 120px;
        word-break: normal;
        word-wrap: break-word;
        margin: 10px 0;
        img{
            width: 225px;
            height: 100px;
            // height: 250px;
            border-radius: 10px;
        }
    }
    .phone{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .pattern{width: 100px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .intention{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .time{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .operation{width: 450px;word-break: normal;word-wrap: break-word;margin: 10px 0;display: flex;}
    .remarks{width: 150px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    /* 数据 */
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
        margin: 0;
    }
    .form_information ul li{
        list-style:none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        margin: 0 0 10px 0;
        background: #FFFFFF;
        border-radius: 5px;
        padding: 0 50px;
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
    .see{
        // width: 76px;
        height: 30px;
        padding: 0 10px;
        border-radius: 5px;
        background: #ffffff;
        border: 1px solid #CCCCCC;
        text-align: center;
        line-height: 28px;
        color: #4D4D4D;
        margin-right: 10px;
        cursor: pointer;
    }
    .red{
        color: #FF3333;
    }
    .green{
        color: #0D8046;
    }
    //蒙版
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0,0,0,0.5);
        z-index: 1;
    }
    .pop {
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%,-50%);
        width: 620px;
        // height:600px;
        padding-bottom: 20px;
        z-index: 2;
        border-radius: 10px;
        .btnMessage{
            width: 100%;
            margin-top: 20px;
            display:flex;
            justify-content: center;
        }
        img{
            width: 19px;
            height: 19px;
            // margin: 20px 30px 0 0;
            position: absolute;
            right: 20px;
            top: 20px;
            cursor: pointer;
        }
        h2{
            width: 100%;
            text-align: center;
        }
        .determine:hover{
            cursor: pointer;
        }
        .transverse{
            width: 100%;
            height: 1px;
            background-color: #E6E6E6;
        }
        .content{
            padding: 20px;
        }
        .content1{
            height: 50px;
        }
        .bottominput{
            margin-top: 50px;
            width: 100%;
            height: 350px;
            background: #F6F6F6;
            border-radius: 10px;
            line-height: 25px;
            padding: 20px;
            box-sizing: border-box;
            resize: none;
            outline: none;
            border: none;
        }
        .determine{
            width: 200px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #3377FF;
            color: #ffffff;
            border-radius: 5px;
            margin-left: 20px;
        }
        .cancel{
            width: 200px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: 1px solid #CCCCCC;
            border-radius: 5px;
        }
        .cancel:hover{
            cursor: pointer;
        }
    }
}
/* 分页 */
.Paging{
    padding:23px 0;
    text-align: center;
}
.memu{
    .box{
        .line{
            display: flex;
            .textarea{
                width: 450px;
            }
        }
    }
    .dialog-footer{
        display: flex;
        justify-content: flex-end;
    }
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 50px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>