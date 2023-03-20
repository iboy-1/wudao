<template>
    <div class="whole">
        <div class="fanhui">
            <el-button @click="render_btn">返回</el-button>
            <h2>当前是：{{course_name}}</h2>
        </div>
        <!-- 表格 -->
        <div class="form_head" >
            <ul>
                <li class="adminid">ID</li>
                <li class="name">头像</li>
                <li class="name">昵称</li>
                <li class="phone">电话号码</li>
                <li class="operation">操作</li>
            </ul>
        </div>
        <div class="form_information" >
            <ul v-if="nul_isShow == false">
                <li v-for="(item,index) in list" :key="index">
                    <div class="blue"></div>
                    <!-- <div></div>
                    <div></div> -->
                    <div class="adminid">
                        <span v-if="item.id == -1">无</span>
                        <span v-else>{{item.id}}</span>
                    </div>
                    <div class="name">
                        <div class="" v-if="item.user_info == null">无</div>
                        <img v-else :src="item.user_info.avatar" alt="">
                    </div>
                    <div class="name">
                        <span v-if="item.user_info.nikanme == -1 || item.user_info == null">无</span>
                        <span v-else>{{item.user_info.nikanme}}</span>
                    </div>
                    <div class="phone">
                        <span v-if="item.user_info.phone == -1 || item.user_info == null">无</span>
                        <span v-else>{{item.user_info.phone}}</span> -->
                    </div>
                    <div class="operation">
                        <!-- <div class="see" v-if="item.state == 1">已签到</div>
                        <div class="see" @click="add_btn(item)" v-else-if="item.state == 0">签到</div> -->
                        <el-button size="mini" v-if="item.state == 1" disabled>已签到</el-button>
                        <el-button size="mini" @click="add_btn(item)" v-else-if="item.state == 0">签到</el-button>
                        <!-- <div class="see" @click="contact1(item)">修改</div>
                        <div class="see" @click="delete_btn(item)">删除</div> -->
                    </div>
                </li>
            </ul>
            <null-state :description="description1" v-if="nul_isShow" />
        </div>
        <!-- 分页 -->
        <div class="Paging" v-if="searchRender">
            <el-pagination @current-change = "changePage" background layout="prev, pager, next" :total="count"></el-pagination>
        </div>

        <div class="mask" v-if="del_isShow" @click="del_isShow = false"></div>
        <div class="pop" v-if="del_isShow">
            <img src="@/assets/关闭@2x.png" alt="" @click="del_isShow=false">
            <h2>{{dialogTitle1}}</h2>
            <div class="transverse"></div>
            <div class="content"></div>
            <div class="btnMessage">
                <div class="cancel" @click="del_isShow = false">取消</div>
                <div class="determine" @click="commitdel()">确定</div>
            </div>
        </div>

    </div>
</template>

<script>
import api from"@/api/today_course.js";
import nullState from '@/components/nullState/nullState.vue';
export default {
    components: { nullState },
    data(){
        return{
            page:1,
            count:0,
            limit:10,
            list:[],//列表
            ExcelList:[],//导出列表
            searchRender:false,//分页是否显示
            searchData:false,//是否为搜索
            course_id:'',   //课程id
            course_name:'',     //课程名字
            del_isShow:false,
            del_id:'',
            dialogTitle1:'是否签到',
            description1:"暂无数据",
            nul_isShow:false,
            creator:JSON.parse(localStorage.getItem('WuDaoeducation')),
        }
    },
    created(){
        this.course_id = this.$route.query.course_id
        this.course_name = this.$route.query.course_name
    },
    mounted(){
        this.render()
    },
    methods:{
        //主列表
        render(){
            let _this=this
            this.page = 1
            let page = (this.page - 1)*this.limit
            this.searchRender = false
            api.markCourseUserList({
                id:this.course_id,
                limit:page+','+this.limit,
            }).then(res=>{
                // console.log(res.data.data);
                _this.list = res.data.data.data
                _this.count = res.data.data.count
                if (res.data.data.count == 0) {
                    this.nul_isShow = true
                } else {
                    this.nul_isShow = false
                }
                _this.searchRender = true
            }).catch(error=>{

            })
        },
        changePage(val){
            this.page = val
            let page = (this.page - 1)*this.limit
            api.markCourseUserList({
                id:this.course_id,
                limit:page+','+this.limit,
            }).then(res=>{
                // console.log(res.data.data);
                this.list = res.data.data.data
            })
        },
        add_btn(arr){
            this.del_isShow = true
            this.del_id = arr.id
        },
        commitdel(){
            api.markCourseSign({
                id:this.del_id
            }).then(res=>{
                // console.log(res);
                if (res.data.code == 200) {
                    this.$message({
                        type:'success',
                        message:res.data.data
                    })
                    this.del_isShow = false
                    this.render()
                } else {
                    this.$message({
                        type:'error',
                        message:res.data.data
                    })
                }
            })
        },
        render_btn(){
            this.$router.push({
                name:'today_course',
            })
        }
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
    .fanhui{
        display: flex;
        align-items: center;
    }
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
		margin:0 10px;
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
            width: 80px;
            height: 80px;
            border-radius: 10px;
        }
    }
    .phone{width: 150px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .pattern{width: 100px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .intention{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .time{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .operation{width: 350px;word-break: normal;word-wrap: break-word;margin: 10px 0;display: flex;}
    .remarks{width: 250px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
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
        padding: 0 10px;
        height: 28px;
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
            /* padding: 0 20px; */
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
        justify-content: center;
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
<style scoped>
/deep/.el-dialog {
  margin: 5vh auto !important;
}

/deep/ .el-dialog__body {
  height: 80vh;
  overflow: auto;
}
</style>