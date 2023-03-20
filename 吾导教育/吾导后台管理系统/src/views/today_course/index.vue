<template>
    <div class="whole">
        <!-- 表格 -->
        <div class="form_head" v-if="judata.Jrkc_table">
            <ul>
                <li class="adminid">ID</li>
                <li class="name">场馆</li>
                <li class="name">封面</li>
                <li class="name">课程名称</li>
                <li class="phone">开课时间</li>
                <li class="phone">结课时间</li>
                <li class="time">预约截止</li>
                <li class="name">教师名称</li>
                <li class="name">预约人数</li>
                <li class="remarks">备注</li>
                <li class="phone">是否开课</li>
                <li class="operation">操作</li>
            </ul>
        </div>
        <div class="form_information" v-if="judata.Jrkc_table">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <div class="blue"></div>
                    <!-- <div></div>
                    <div></div> -->
                    <div class="adminid">
                        <span v-if="item.id == -1">无</span>
                        <span v-else>{{item.id}}</span>
                    </div>
                    <div class="name">
                        <span v-if="item.venue == null">无</span>
                        <span v-else>{{item.venue.venue_name}}</span>
                    </div>
                    <div class="name">
                        <img :src="item.images" alt="">
                    </div>
                    <div class="name">
                        <span v-if="item.course_name == -1">无</span>
                        <span v-else>{{item.course_name}}</span>
                    </div>
                    <div class="phone">
                        <span v-if="item.start_time == -1">无</span>
                        <span v-else>{{item.start_time}}</span>
                    </div>
                    <div class="phone">
                        <span v-if="item.end_time == -1">无</span>
                        <span v-else>{{item.end_time}}</span>
                    </div>
                    <div class="time">
                        <span v-if="item.deadline == 0 ">无</span>
                        <span v-else>{{item.deadline}}</span>
                    </div>
                    <div class="name">
                        <span v-if="item.teacher == null">无</span>
                        <span v-else>{{item.teacher.nickname}}</span>
                    </div>
                    <div class="name">
                        <span v-if="item.mark_number == -1">无</span>
                        <span v-else>{{item.mark_number}}/{{item.number}}</span>
                    </div>
                    <div class="remarks">
                        {{item.remarks}}
                    </div>
                    <div class="phone">
                        <span v-if="item.time_isShow == 1" style="color:#67C23A;">已开课</span>
                        <span v-if="item.time_isShow == 2" style="color:red;">未开课</span>
                    </div>
                    <div class="operation">
                        <!-- <div class="see" @click="add_btn(item)">查看约课用户</div> -->
                        <el-button size="medium" @click="add_btn(item)" v-if="judata.Jrkc_see">查看</el-button>
                        <!-- <div class="see" @click="contact1(item)">修改</div>
                        <div class="see" @click="delete_btn(item)">删除</div> -->
                    </div>
                </li>
            </ul>
            <null-state :description="description1" v-if="nul_isShow" />
        </div>
        <!-- 分页 -->
        <div class="Paging" v-if="searchRender && judata.Jrkc_table">
            <el-pagination @current-change = "changePage" background layout="prev, pager, next" :total="count"></el-pagination>
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
            description1:"暂无数据",
            nul_isShow:false,
            creator:JSON.parse(localStorage.getItem('WuDaoeducation')),
			judata:{},//权限
        }
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
        //主列表
        render(){
            var nowTime = new Date();
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
                limit:page+','+this.limit,
            }).then(res=>{
                // console.log(res.data.data);
                _this.list = res.data.data.data
                _this.count = res.data.data.count
                _this.list.forEach(val => {
                    // console.log(val.course_manage.start_time);
                    var time1 = new Date(val.start_time).getTime();
                    var time2 = new Date(nowTime).getTime();
                    // console.log(time1,time2);
                    if (time1 < time2) {
                        val.time_isShow = 1
                    } else if (time1 > time2) {
                        val.time_isShow = 2
                    }
                });
                if (res.data.data.count == 0) {
                    this.nul_isShow = true
                } else {
                    this.nul_isShow = false
                }
                this.timer = setTimeout(() => {
                    loading.close();
                },);
                _this.searchRender = true
            }).catch(res=>{
                this.$message({
                    message: '网络错误请稍后再试',
                    type:'error'
                });
            })
        },
        changePage(val){
            let _this=this
            this.page = val
            let page = (this.page-1)*this.limit
            api.query({
                limit:page+','+this.limit,
            }).then(res=>{
                // console.log(res.data.data);
                _this.list = res.data.data.data
                _this.count = res.data.data.count
                _this.list.forEach(val => {
                    // console.log(val.course_manage.start_time);
                    var time1 = new Date(val.start_time).getTime();
                    var time2 = new Date(nowTime).getTime();
                    // console.log(time1,time2);
                    if (time1 < time2) {
                        val.time_isShow = 1
                    } else if (time1 > time2) {
                        val.time_isShow = 2
                    }
                });
                if (res.data.data.count == 0) {
                    this.nul_isShow = true
                } else {
                    this.nul_isShow = false
                }
            })
        },
        add_btn(arr){
            this.$router.push({
                name:'today_course1',
                query:{
                    course_id:arr.course_id,
                    course_name:arr.course_name
                }
            })
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
        margin-top: 30px;
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
        -webkit-user-select: text;
        margin: 10px 0;
        img{
            width: 80px;
            height: 80px;
            border-radius: 10px;
        }
    }
    .phone{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .pattern{width: 100px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .intention{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .time{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .operation{width: 150px;word-break: normal;word-wrap: break-word;margin: 10px 0;display: flex;}
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
            padding: 0 20px;
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