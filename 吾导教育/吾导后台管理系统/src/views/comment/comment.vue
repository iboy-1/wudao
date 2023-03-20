<template>
    <div class="whole">
        <div class="note" v-if="note == true">
            <h1>当前账号不是老师</h1>
        </div>
        <!-- 搜索框 -->
        <!-- <div class="search" v-if="judata.Pllb_search">
            <el-input placeholder="输入用户ID" v-model="search.id"></el-input>
            <el-input placeholder="输入用户姓名" v-model="search.nikanme"></el-input>
            <div class="Reset" @click="Reset">重置</div>
            <div class="query" @click="searchOrder"><img src="@/assets/qurey.png" alt="">查询</div>
        </div> -->
        <!-- 按钮 -->
        <div class="btn" >
            <!-- <div class="export" @click="exportExcel"><img  class="btn-img" src="@/assets/导出@2x.png" alt=""><div class="btn-text">导出</div></div> -->
            <div class="refresh" @click="Reset()" v-if="judata.Pllb_sx && note == false"><img class="btn-img" src="@/assets/刷新@2x.png" alt=""><div class="btn-text">刷新</div></div>
        </div>
        <!-- 表头 -->
        <div class="order-Text" v-if="judata.Pllb_table && note == false">
            <ul>
                <!-- <li class="adminId">用户ID</li> -->
                <!-- <li class="adminName">订单号</li>
                <li class="adminName">支付单号</li>
                <li class="partner">会员卡</li>
                <li class="state">用户ID</li>
                <li class="balance">实收金额</li> -->
                <li class="withdrawal">课程封面</li>
                <li class="adminName">用户名称</li>
                <li class="adminName">课程名称</li>
                <li class="income">用户评论内容</li>
                <li class="income">老师回复内容</li>
                <li class="adminName">评论时间</li>
                <li class="withdrawal">操作人</li>
                <li class="operation">操作</li>
            </ul>
        </div>
        <!-- 列表 -->
        <div class="list-Information" v-if="judata.Pllb_table && note == false">
            <div class="Information" v-for="(item,index) of list" :key="index">
                <ul>
                    <div class="blue"></div>
                    <li class="withdrawal">
                        <span v-if="item.course == null">无</span>
                        <img :src="item.course.images" alt="" v-else>
                    </li>
                    <li class="adminName">
                        <p>{{item.user.nikanme}}</p>
                    </li>
                    <li class="adminName">
                        <p v-if="item.course == null">无</p>
                        <p v-else>{{item.course.course_name}}</p>
                    </li>
                    <li class="income">
                        <p v-if="item.content == null">无</p>
                        <p v-else>{{item.content}}</p>
                    </li>
                    <li class="income">
                        <p v-if="item.reply == null" style="color:red;">未回复</p>
                        <p v-else>{{item.reply.content}}</p>
                    </li>
                    <li class="adminName">
                        <p>{{item.add_date}}</p>
                    </li>
                     <li class="withdrawal">
                        <p v-if="item.operator == -1">无</p>
                        <p v-else>{{item.operator}}</p>
                    </li>
                    <li class="operation">
                        <div class="operation-btn">
                            <el-button @click="userDetail(item)" size="medium" v-if="judata.Pllb_see">查看</el-button>
                            <!-- <div v-if="item.reply == null" class="edit" @click="changeProblem(item)">回复</div> -->
                            <el-button v-if="item.reply == null && judata.Pllb_reply" @click="changeProblem(item)" size="medium">回复</el-button>
                            <!-- <div  class="edit">已回复</div> -->
                            <el-button disabled v-if="item.reply != null && judata.Pllb_reply" size="medium">已回复</el-button>
                            <!-- <div class="del">删除</div> -->
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="mask" v-if="add_isShow" @click="add_isShow =false"></div>
        <div class="pop" v-if="add_isShow">
            <div class="see_head">
                <p>{{dialogTitle}}</p>
                <img src="@/assets/hf2.png" alt="" @click="add_isShow =false">
                <div class="transverse"></div>
            </div>
            <div class="see_center">
                <div class="box">
                    <div class="head">
                        <!-- 回复内容 -->
                    </div>
                    <div class="textarea">
                        <textarea class="bottominput" name="" id="" cols="30" rows="10" v-model="form.content" placeholder="请输入回复内容"></textarea>
                    </div>
                </div>
            </div>
            <div class="see_bottom" >
                <div class="cancel" @click="add_isShow = false">取消</div>
                <div class="determine" @click="commitArticle()">确定</div>
            </div>
        </div>

        <!-- 点击查看 -->
        <div class="mask" v-if="see" @click="see =false"></div>
            <div class="pop" v-if="see">
               <div class="see_head">
                   <p>回复详细</p>
                   <img src="@/assets/hf2.png" alt="" @click="see =false">
                   <div class="transverse"></div>
               </div>
               <div class="see_center">
                   <div class="box">
                       <div class="head">
                           用户评论内容
                       </div>
                       <div class="centers">
                           {{userInfo.content}}
                       </div>
                   </div>
                   <div class="box">
                       <div class="head">
                           老师回复内容
                       </div>
                       <div class="centers">
                            <span v-if="userInfo.reply == null" style="color:red;">未回复</span>
                            <span v-else>{{userInfo.reply.content}}</span>
                       </div>
                   </div>
               </div>
               <div class="see_bottom" >
                   <div class="cancel" @click="see =false">取消</div>
                   <div class="determine" @click="see =false">确定</div>
               </div>
            </div>
        <!-- 分页 -->
        <div class="Paging" v-if="searchRender  && judata.Pllb_table && note == false">
            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="count"></el-pagination>
        </div>
    </div>
</template>

<script>
    import api from '@/api/teacher.js'
    // import FileSaver from "file-saver";
    // import XLSX from "xlsx";
    export default {
        data(){
            return{
                search:{
                    id:"",
                    nikanme:"",
                    phone:"",
                },
                see:false,
                open:false,
                list:[],
                page:1,
                count:0,
                limit:10,
                partner:[],
                userInfo:null,
                searchRender:false,
                searchData:false,//是否为搜索
                teacher_id:"",
                content:"",
                form:{
                    content:"",          //回复内容
                    teacher_id:"",       //老师id
                    type:"1",               
                    reply:'',
                    course_id:''
                },
                dialogTitle:'老师回复',
                add_isShow:false,
                creator:JSON.parse(localStorage.getItem('WuDaoeducation')),
			    judata:{},//权限
                note:false,
                timer:null,
            }
        },
        created(){
            if (this.creator.data[0].teacher_id != '') {
                this.teacher_id = this.creator.data[0].teacher_id
            }
            if (this.creator.data[0].account == 'gzwdjykjadmin') {
                this.teacher_id = -1
            }
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
            changeProblem(arr){
                this.form = {
                    content:'',          //回复内容
                    teacher_id:arr.teacher_id,       //老师id
                    type:"1",               
                    reply:arr.id,
                    course_id:arr.course_id,
                    operator:this.creator.data[0].name,
                }
                // if (arr.reply == null) {
                //     this.form.content =  ''
                // } else {
                //     this.form.content =  arr.reply.content
                // }
                this.add_isShow = true
            },
            commitArticle(){
                if (this.form.content == '') {
                    this.$message({
                        type:'error',
                        message:'请输入回复内容'
                    })
                    return
                }
                api.commentReply(this.form).then(res=>{
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
            },
            //搜索
            searchOrder(){
                let obj = {}//声明一个内部数组
                //遍历search，如果search的值不为空则把search的key赋值给obj
                for(let key in this.search){
                    if(this.search[key] != ''){
                        obj[key] = this.search[key]
                    }
                }
                this.page = 1 //页数
                let page = (this.page - 1)*this.limit 
                obj.limit = page + ',' + this.limit //从第page开始查10条数据
                this.searchRender = false//分页器不显示
                api.commentList(obj)
                .then(res=>{
                    // console.log(res)
                    this.count = res.data.data.count
                    this.list = res.data.data.data
                    this.searchData = true
                    this.searchRender = true//分页器显示
                })
            },
            render(){
                this.page = 1
                let page = (this.page-1)*this.limit
                this.searchRender = false
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                api.commentList({
                    teacher_id:this.teacher_id,
                    limit:page+','+this.limit
                }).then(res=>{
                    // console.log(res.data.data.data)
                    this.searchRender = true
                    this.list = res.data.data.data
                    this.count = res.data.data.count
                    this.timer = setTimeout(() => {
                        loading.close();
                    }, );
                }).catch(res=>{
                    this.$message({
                        message: '网络错误请稍后再试',
                        type:'error'
                    });
                })
            },
            handleCurrentChange(val){
                this.page = val
                let page = (this.page-1)*this.limit
                if(this.searchData){
                    let _this=this
                    let obj = {}//声明一个内部数组
                    //遍历search，如果search的值不为空则把search的key赋值给obj
                    for(let key in this.search){
                        if(this.search[key] != ""){
                            obj[key] = this.search[key]
                        }
                    }
                    // if(_this.time != ""){
                    // 	obj.start_time = _this.time[0]
                    // 	obj.end_time = _this.time[1]
                    // }
                    let page = (this.page - 1)*this.limit
                    obj.limit = page+','+this.limit
                    // this.searchRender = false
                    api.commentList(obj).then(res=>{
                        // console.log(res.data.data);
                        _this.list = res.data.data.data
                        _this.count = res.data.data.count
                    })
                }else{
                    api.commentList({
                        teacher_id:this.teacher_id,
                        limit:page+','+this.limit
                    }).then(res=>{
                        // console.log(res)
                        this.list = res.data.data.data
                        // this.count = res.data.data.count
                    })
                }
            },
            //重置
            Reset(){
                this.search = {
                    id:"",
                    nikanme:"",
                    phone:"",
                }
                this.render()
            },
            userDetail(item){
                this.userInfo = item
                // console.log(item);
                this.see = true
            },
            exportExcel() {
                if(this.list.length == '0'){
                    this.$message({
                        message: '没有数据',
                        type: 'error'
                    });
                    return false
                }
                /* 从表生成工作簿对象 */
                var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
                /* 获取二进制字符串作为输出 */
                var wbout = XLSX.write(wb, {
                    bookType: "xlsx",
                    bookSST: true,
                    type: "array"
                });
                try {
                    FileSaver.saveAs(
                    //Blob 对象表示一个不可变、原始数据的类文件对象。
                    //Blob 表示的不一定是JavaScript原生格式的数据。
                    //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
                    //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
                    new Blob([wbout], { type: "application/octet-stream" }),
                    //设置导出文件名称
                    "sheetjs.xlsx"
                    );
                } catch (e) {
                    if (typeof console !== "undefined") this.$console(e, wbout);
                }
                return wbout;
            }
        }
    }
</script>

<style lang="scss" scoped>
.note{
        display: flex;
        justify-content: center;
        align-items: center;
    }
.whole{
    padding: 0 10px;
    background-color: #EDF1F5;
    flex-grow: 1;
    display:flex;
    flex-direction: column;
}
/* 搜索框 */
.search{
    width: 903px;
    display: flex;
    justify-content: space-between;
    padding: 10px 0 0 0;
}
.el-input{
    width: 256px;
    height: 36px;
}
.Reset{
    background-color: #3377FF;
    width: 123px;
    height: 36px;
    color: white;
    border-radius: 5px;
    text-align: center;
    line-height: 36px;
    box-shadow: 2px 2px 5px #d9dadb;
}
.query{
    width: 202px;
    height: 36px;
    background-color: #3377FF;
    color: white;
    border-radius: 5px;
    text-align: center;
    line-height: 36px;
    box-shadow: 2px 2px 5px #d9dadb;
    display: flex;
    justify-content: center;
    align-items: center;
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
  width: 126px;
  display: flex;
  justify-content: space-between;
  margin: 14px 0;
}
.btn-img{
  width: 16px;
  height: 16px;
  position: absolute;
  left: 19px;
  top: 5px;
}
.btn-text{
  width: 55px;
  height: 13px;
  text-align: center;
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
}
/* 表头 */
.order-Text ul{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 16px 0 17px;
}
.order-Text ul li{
    list-style: none;
}
.adminId{
    width: 80px;
    word-wrap:break-word;
    word-break:normal; 
    display: flex;
    align-items: center;
}
.head_portrait{
    width: 80px;
    img{
        margin: 8px 0;
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
}
.adminName{
    width: 200px;
    display: flex;
    align-items: center;
    word-break: break-all;
}
.partner{
    width: 100px;
    display: flex;
    align-items: center;
}
.income{
    width: 350px;
    display: flex;
    align-items: center;
}
.income p{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    // font-size: 5px;
    -webkit-box-orient: vertical;
}
.withdrawal{
    width: 140px;
    display: flex;
    align-items: center;
    img{
        width: 140px;
        height: 80px;
        border-radius: 10px;
        margin: 10px 0;
    }
}
.balance{
    width: 140px;
    display: flex;
    align-items: center;
}
.state{
    width: 140px;
    display: flex;
    align-items: center;
}
.operation{
    width: 250px;
    display: flex;
    align-items: center;
}
/* 列表 */
.list-Information{
    height: 0;
    flex-grow: 1;
    overflow: hidden;
    overflow-y: auto;
    overflow-y: overlay;
}
.Information{
    width: 100%;
    // height: 70px;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 10px;
}
.Information ul li{
    list-style: none;
}
.Information ul{
    padding: 0;
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0 16px 0 17px;
}
.blue{
    position: absolute;
    width: 4px;
    height: 100%;
    background: #3377FF;
    left: 0;
    display: none;
}
.Information:hover{
    background-color: #F2F9FF;
}
.Information:hover .blue{
    display: block;
}
.stateRed{
    color: #FF3333;
}
.stateGreen{
    color: #0D8046;
}
.operation-btn{
    width: 150px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    // margin-top: 16px;
}
.see{
    width: 66px;
    height: 28px;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    line-height: 24px;
    color: #4D4D4D;
}
.edit{
    width: 66px;
    height: 28px;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    line-height: 24px;
    color: #4D4D4D;
}
.del{
    width: 66px;
    height: 28px;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    line-height: 24px;
    color: #CCCCCC;
}
.see:hover{
    cursor: pointer;
}
.edit:hover{
    cursor: pointer;
}
.del:hover{
    cursor: pointer;
}
/* 点击查看 */
.mask {
    background-color: #000000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1
}
.pop{
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    padding-bottom: 30px;
    border-radius: 10px;
    // width: 760px;
    // height: 555px;
    z-index: 2;
    display:flex;
    box-sizing: border-box;
    flex-direction: column;
}
.seeHead img{
    width: 19px;
    height: 19px;
    position: absolute;
    top: 21px;
    right: 25px;
    cursor: pointer;
}
.seeHead{
    width: 100%;
    height: 60px;
}
.seeHead p{
    width: 100px;
    height: 19px;
    margin: 19px 0 0 44px;
    font-size: 22px;
    font-family: Source Han Sans CN;
    font-weight: 600;
    color: #2E3033;
    line-height: 36px;
}
.seeCenter{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 41px 0 45px;
}
.seeOne{
    display: flex;
    width: 420px;
}
.seeTwo{
    display: flex;
    width: 320px;
}
.seeThree{
    display: flex;
    width: 300px;
}
.seeFour{
    display: flex;
    flex-grow: 1;
    /* width: 400px; */
}
.centerLeft{
    width: 120px;
}
.fourLeft{
    width: 120px;
}
.fourRight{
    width: 480px;
}
.twoLeft p{
    width: 120px;
}
.twoLeft p:nth-child(1){
    width: 150px;
}
.transverse{
    width: 100%;
    height: 1px;
    background-color: #E6E6E6;
}
.search_query img{
    width: 16px;
    height: 16px;
    margin: 0px 5px 0 0;
}
.search_query{
    color: white;
    border-radius: 5px;
    text-align: center;
    line-height: 36px;
    box-shadow: 2px 2px 5px #d9dadb;
    width: 202px;
    height: 38px;
    background: #3377FF;
    display: flex;
    align-items: center;
    justify-content: center;
}
.search_query:hover{
    cursor: pointer;
}
.bottom_search{
    display: flex;
    justify-content: space-between;
    width: 734px;
}
.bottom_head{
    display: flex;
    justify-content: space-between;
    padding: 21px 41px 0 45px;
}
.bottom_head p{
    width: 100px;
    height: 19px;
    font-size: 22px;
    font-family: Source Han Sans CN;
    font-weight: 600;
    color: #2E3033;
    line-height: 36px;
    margin: 0;
}
.formHead{
    background-color: #F2F2F2;
    margin: 21px 41px 0 45px;
}
.formHead ul li{
    list-style: none;
    line-height: 50px;
}
.formHead ul{
    width: 100%;
    height: 50px;
    margin: 0;
    display: flex;
    justify-content: space-between;
    padding:0 79px 0 150px;
    color: #808080;
}
.formHead .adminName{
    width: 412px;
    border-right: 1px solid #E6E6E6;
}
.formHead .grade{
    width: 194px;
    border-right: 1px solid #E6E6E6;
    padding:0 0 0 47px;
}
.formHead .phone{
    width: 219px;
    border-right: 1px solid #E6E6E6;
    padding:0 0 0 48px;
}
.formHead .time{
    width: 353px;
    border-right: 1px solid #E6E6E6;
    padding:0 0 0 47px;
}
.formHead .money{
    width: 186px;
    border-right: 1px solid #E6E6E6;
    padding:0 0 0 47px;
}
.formHead .contribution{
    width: 198px;
    padding:0 0 0 47px;
}
.formBottom{
    background-color: #FFFFFF;
    margin:0 41px 0 45px;
}
.formBottom ul li{
    list-style: none;
    line-height: 50px;
}
.formTwo{
    width: 100%;
    height: 50px;
    padding: 0;
    display: flex;
    justify-content: space-between;
    margin: 0;
    color: #4D4D4D;
}
.formThree{
    width: 100%;
    height: 50px;
    padding: 0;
    display: flex;
    justify-content: space-between;
    margin: 0;
    color: #4D4D4D;
    background: #FAFFFE;
}
.formThree .grade{
    width: 194px;
    border: 1px solid #e6e6e6;
    padding: 0 0 0 47px;
    box-sizing: border-box;
    color: #2e9999;
}
.formBottom .adminName{
    width: 562px;
    border: 1px solid #E6E6E6;
    padding:0 0 0 150px;
    position: relative;
}
.formTwo .grade{
    width: 194px;
    border: 1px solid #E6E6E6;
    padding:0 0 0 47px;
    color: #3377FF;
}
.formBottom .phone{
    width: 219px;
    border: 1px solid #E6E6E6;
    padding:0 0 0 48px;
}
.formBottom .time{
    width: 353px;
    border: 1px solid #E6E6E6;
    padding:0 0 0 47px;
}
.formBottom .money{
    width: 186px;
    border: 1px solid #E6E6E6;
    padding:0 0 0 47px;
}
.formBottom .contribution{
    width: 277px;
    padding:0 79px 0 47px;
    border: 1px solid #E6E6E6;
}
.seeBottom{
    height: 700px;
    overflow: hidden;
    overflow-y: scroll;
    overflow-y: overlay;
}
.gradeImg{
    position: absolute;
    left: 10px;
    top: 2px;
}
.gradeImg img{
    width: 20px;
    height: 20px;
}
.gradeImg img:hover{
    cursor: pointer;
}
.openimg2{
    display: none;
}
/* 分页 */
.Paging{
    padding:23px 0;
    text-align: center;
}
//查看
.see_head{
    // width: 760px;
    position: relative;
    img{
        position: absolute;
        right: 40px;
        top: 20px;
    }
    img:hover{
        cursor: pointer;
    }
    p{
        margin: 20px 0 20px 60px;
        font-size: 22px;
        font-weight: 800;
    }
}
.see_center{
    width: 800px;
    // height: 550px;
    // background: chartreuse;
    padding: 6px 46px 0 60px;
    // display: flex;
    .textarea{
	//   padding: 20px 0;
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
    .box{
        height: 200px;
        // overflow: auto;
        .head{
            margin: 10px 0;
        }
        .centers{
            height: 80%;
            background-color: #F6F6F6;
            border-radius: 10px;
            overflow: auto;
            padding: 10px;
            // margin-bottom: 20px;
        }
    }
    ul{
        margin: 0;
        padding: 0;
        // display: flex;
    }
    ul li{
        list-style: none;
        display: flex;
        margin-top: 20px;
    }
    ._head_portrait{
        // width: 68px;
        // height: 68px;
        // border-radius: 5px;
        img{
            width: 68px;
            height: 68px;
            border-radius: 5px;
        }
    }
    ._text_1{
        display: flex;
        align-items: center;
        // margin-right: 5px;
        width: 80px;
        color: #A1B2B0;
    }
    ._text{
        display: flex;
        // align-items: center;
        // margin-right: 5px;
        width: 80px;
        color: #A1B2B0;
    }
    ._left_box{
        display: flex;
        ._text1{
            width: 375px;
            word-wrap:break-word;
            word-break:normal; 
        }
    }
    ._right_box{
        display: flex;
        // margin-left: 225px;
        ._text1{
            width: 165px;
            word-wrap:break-word;
            word-break:normal; 
        }  
    }
}
.see_bottom{
    display: flex;
    // width: 760px;
    height: 100px;
    position: relative;
    .determine{
        width: 148px;
        height: 40px;
        background: #3377FF;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        margin-left: 12px;
        position: absolute;
        bottom: 0px;
        right: 60px;
    }
    .determine:hover{
        cursor: pointer;
    }
    .cancel:hover{
        cursor: pointer;
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
        color: #333333;
        position: absolute;
        bottom: 0px;
        right: 220px;
    }
}
.memu{
    .box{
        .line{
            display: flex;
            span{
                line-height: 45px;
                color: #FF3333;
            }
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
</style>