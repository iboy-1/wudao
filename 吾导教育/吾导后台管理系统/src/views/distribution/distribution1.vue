<template>
    <div class="whole">
        <!-- 搜索框 -->
        <div class="search" v-if="judata.Yhlb_search">
            <el-input placeholder="输入用户姓名" v-model="search.nikanme"></el-input>
            <el-input placeholder="输入电话号码" v-model="search.phone"></el-input>
            <div class="Reset" @click="Reset">重置</div>
            <div class="query" @click="searchOrder"><img src="@/assets/qurey.png" alt="">查询</div>
        </div>
        <!-- 按钮 -->
        <div class="btn" v-if="judata.Yhlb_sx">
            <div class="refresh" @click="Refresh"><img class="btn-img" src="@/assets/刷新@2x.png" alt=""><div class="btn-text">刷新</div></div>
        </div>
        <!-- 表头 -->
        <div class="order-Text" v-if="judata.Yhlb_table">
            <ul>
                <li class="adminId">用户ID</li>
                <li class="head_portrait">用户头像</li>
                <li class="adminName">用户名称</li>
                <!-- <li class="partner">性别</li> -->
                <li class="state">电话号码</li>
                <!-- <li class="balance">电子邮件</li> -->
                <!-- <li class="withdrawal">用户类型</li> -->
                <li class="income">注册时间</li>
                <li class="operation">操作</li>
            </ul>
        </div>
        <!-- 列表 -->
        <div class="list-Information" v-if="judata.Yhlb_table">
            <div class="Information" v-for="(item,index) of list" :key="index">
                <ul>
                    <div class="blue"></div>
                    <li class="adminId">
                        <p>{{item.id}}</p>
                    </li>
                    <li class="head_portrait">
                        <div class="imge"><img :src="item.avatar" alt=""></div>
                    </li>
                    <li class="adminName">
                        <p>{{item.nikanme}}</p>
                    </li>
                    <!-- <li class="partner">
                        <p v-if="item.sex == 1">男</p>
                        <p v-else-if="item.sex ==2">女</p>
                        <p v-else>未知</p>
                    </li> -->
                    <li class="state">
                        <p v-if="item.phone == -1">未绑定电话号码</p>
                        <p v-else>{{item.phone}}</p>
                    </li>
                    <!-- <li class="balance">
                        <p v-if="item.email == -1">未绑定电子邮件</p>
                        <p v-else>{{item.email}}</p>
                    </li> -->
                    <!-- <li class="withdrawal">
                        <p v-if="item.attribute == 1">普通</p>
                        <p v-else-if="item.attribute == 2">员工</p>
                    </li> -->
                    <li class="income">
                        <p>{{item.add_date}}</p>
                    </li>
                    <li class="operation">
                        <div class="operation-btn">
                            <el-button size="medium " @click="userDetail(item)" v-if="judata.Yhlb_see">查看</el-button>
                            <el-button size="medium " @click="userDetail1(item)" v-if="judata.Yhlb_seejl">购买记录</el-button>
                            <el-button size="medium " @click="userDetail2(item)" v-if="judata.Yhlb_zk">转卡</el-button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 点击查看 -->
        <div class="mask" v-if="see" @click="see =false"></div>
            <div class="pop" v-if="see">
               <div class="see_head">
                   <p>用户详细信息</p>
                   <img src="@/assets/hf2.png" alt="" @click="see =false">
                   <div class="transverse"></div>
               </div>
               <div class="see_center">
                    <div class="_left">
                        <ul>
                            <li>
                                <div class="_text_1">用户头像:</div>
                                <div class="_head_portrait">
                                    <img :src="userInfo.avatar" alt="">
                                </div>
                            </li>
                            <li>
                                <div class="_left_box">
                                    <div class="_text">用户名称：</div>
                                    <div class="_text1">{{userInfo.nikanme}}</div>
                                </div>
                                <div class="_right_box">
                                    <div class="_text">用户ID：</div>
                                    <div class="_text1">{{userInfo.id}}</div>
                                </div>
                            </li>
                            <li>
                                <div class="_left_box">
                                    <div class="_text">电话号码：</div>
                                    <div class="_text1" v-if="userInfo.phone == -1">未绑定电话号码</div>
                                    <div class="_text1" v-else>{{userInfo.phone}}</div>
                                </div>
                                <div class="_right_box">
                                    <div class="_text">注册时间：</div>
                                    <div class="_text1">{{userInfo.add_date}}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
               </div>
               <div class="see_bottom" >
                   <div class="cancel" @click="see =false">取消</div>
                   <div class="determine" @click="see =false">确定</div>
               </div>
            </div>
        <!-- 分页 -->
        <div class="Paging" v-if="searchRender  && judata.Yhlb_table">
            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="count"></el-pagination>
        </div>
        <div class="mask" v-if="see1" @click="see1 =false"></div>
        <div class="pop" v-if="see1">
            <div class="see_head">
                <p>购买详细信息</p>
                <img src="@/assets/hf2.png" alt="" @click="see1 =false">
                <div class="transverse"></div>
            </div>
            <div class="see_center">
                <div class="tabs_box">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="约课记录" name="first">
                            <div class="box">
                                <div class="table_head">
                                    <ul>
                                        <li class="column">课程封面</li>
                                        <li class="column">课程名称</li>
                                        <li class="column">工作室</li>
                                        <li class="column">预约时间</li>
                                        <li class="column">开课时间</li>
                                        <li class="column">结课时间</li>
                                        <li class="column">教师名称</li>
                                        <li class="column">状态</li>
                                    </ul>
                                </div>
                                <div class="table_center">
                                    <ul v-for="(item,index) in user_list" :key="index">
                                        <div class="blue"></div>
                                        <li class="column">
                                            <span v-if="item.course == null">无</span>
                                            <img :src="item.course.images" alt="" v-else>
                                        </li>
                                        <li class="column">
                                            <p v-if="item.course == null">无</p>
                                            <p v-else>{{item.course.course_name}}</p>
                                        </li>
                                        <li class="column">
                                            <p v-if="item.venue == null">无</p>
                                            <p v-else>{{item.venue.venue_name}}</p>
                                        </li>
                                        <li class="column">
                                            <p v-if="item.course == null">无</p>
                                            <p v-else>{{item.course.add_date}}</p>
                                        </li>
                                        <li class="column">
                                            <p v-if="item.course_manage == null">无</p>
                                            <p v-else>{{item.course_manage.start_time}}</p>
                                        </li>
                                        <li class="column">
                                            <p v-if="item.course_manage == null">无</p>
                                            <p v-else>{{item.course_manage.end_time}}</p>
                                        </li>
                                        <li class="column">
                                            <span v-if="item.teacher == null">无</span>
                                            <span v-else>{{item.teacher.nickname}}</span>
                                        </li>
                                        <li class="column">
                                            <p v-if="item.state == 1" style="color:#67C23A;">已签到</p>
                                            <p v-else style="color:red;">未签到</p>
                                        </li>
                                    </ul>
                                </div>
                                <div class="Paging">
                                    <el-pagination background @current-change="handleCurrentChange1" layout="prev, pager, next" :total="count1"></el-pagination>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="会员卡购买记录" name="second">
                            <div class="box">
                                <div class="table_head">
                                    <ul>
                                        <li class="column">会员卡号</li>
                                        <li class="column">会员卡封面</li>
                                        <li class="column">会员卡名</li>
                                        <li class="column">工作室</li>
                                        <li class="column">会员卡价格</li>
                                        <li class="column">到期时间</li>
                                        <li class="column">购买时间</li>
                                    </ul>
                                </div>
                                <div class="table_center">
                                    <ul v-for="(item,index) in vip_list" :key="index">
                                        <div class="blue"></div>
                                        <li class="column">
                                            <p class="text">{{item.card_number}}</p>
                                        </li>
                                        <li class="column">
                                            <p v-if="item.card == null">无</p>
                                            <img :src="item.card.card_image" alt="" class="card_img" v-else>
                                        </li>
                                        <li class="column">
                                            <p v-if="item.card == null">无</p>
                                            <p v-else>{{item.card.card_name}}</p>
                                        </li>
                                        <li class="column">
                                            <p v-if="item.venue == null">无</p>
                                            <p v-else>{{item.venue.venue_name}}</p>
                                        </li>
                                        <li class="column">
                                            <p v-if="item.card == null">无</p>
                                            <p v-else>{{item.card.price}}</p>
                                        </li>
                                        <li class="column">
                                            <p v-if="item.card == null">无</p>
                                            <p v-else>{{item.card.expire}}天</p>
                                        </li>
                                        <li class="column">
                                            <p>{{item.add_date}}</p>
                                        </li>
                                    </ul>
                                </div>
                                <div class="Paging">
                                    <el-pagination background @current-change="handleCurrentChange2" layout="prev, pager, next" :total="count2"></el-pagination>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="转卡记录" name="fourth">
                            <div class="box">
                                <div class="table_head">
                                    <ul>
                                        <li class="column">旧卡封面</li>
                                        <li class="column">旧卡卡号</li>
                                        <li class="column">新卡封面</li>
                                        <li class="column">新卡卡号</li>
                                        <li class="column">转卡时间</li>
                                        <li class="column">转出金额/次数</li>
                                        <li class="column">剩余金额/次数</li>
                                        <li class="column">新卡金额/次数</li>
                                    </ul>
                                </div>
                                <div class="table_center">
                                    <ul v-for="(item,index) in card_list" :key="index">
                                        <div class="blue"></div>
                                        <li class="column">
                                            <span v-if="item.primary_card == null">无</span>
                                            <img :src="item.primary_card.card_image" alt="" class="card_img" v-else>
                                        </li>
                                        <li class="column">
                                            <span v-if="item.primary_card == null">无</span>
                                            <p class="text" v-else>{{item.primary_card_number}}</p>
                                        </li>
                                        <li class="column">
                                            <span v-if="item.new_card == null">无</span>
                                            <img :src="item.new_card.card_image" alt="" class="card_img" v-else>
                                        </li>
                                        <li class="column">
                                            <p class="text">{{item.new_card_number}}</p>
                                        </li>
                                        <li class="column">
                                            <p>{{item.add_date}}</p>
                                        </li>
                                        <li class="column">
                                            <p v-if="item.member_card_type == 1">{{item.out_card_amount}}次</p>
                                            <p v-if="item.member_card_type == 2">{{item.out_card_amount}}元</p>
                                        </li>
                                        <li class="column">
                                            <p v-if="item.member_card_type == 1">{{item.surplus_card_amount}}次</p>
                                            <p v-if="item.member_card_type == 2">{{item.surplus_card_amount}}元</p>
                                        </li>
                                        <li class="column">
                                            <p v-if="item.member_card_type == 1">{{item.new_card_amount}}次</p>
                                            <p v-if="item.member_card_type == 2">{{item.new_card_amount}}元</p>
                                        </li>
                                    </ul>
                                </div>
                                <div class="Paging">
                                    <el-pagination background @current-change="handleCurrentChange3" layout="prev, pager, next" :total="count3"></el-pagination>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="see_bottom" >
                <div class="cancel" @click="see1 =false">取消</div>
                <div class="determine" @click="see1 =false">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/api/distribution.js'
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
                see1:false,
                open:false,
                list:[],
                page:1,
                count:0,
                count1:0,
                count2:0,
                count3:0,
                limit:10,
                partner:[],
                userInfo:null,
                userInfo1:null,
                searchRender:false,
                activeName: 'first',
                searchData:false,//是否为搜索
                user_list:[],
                vip_list:[],
                card_list:[],
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
            Refresh(){
                this.render()
            },
            handleClick(tab, event) {
                // console.log(tab, event);
                this.page = 1
                let page = (this.page-1)*this.limit
                if (tab.label == "会员卡购买记录") {
                    api.getUserCard({
                        user_id:this.userInfo1.id,
                        // page:page,
                        // listrows:this.limit
                        limit:page+','+this.limit
                    }).then(res=>{
                        // console.log(res);
                        this.vip_list = res.data.data.data
                        this.count2 = res.data.data.count
                    })
                } else if (tab.label == "约课记录") {
                    api.getUserMark({
                        user_id:this.userInfo1.id,
                        // page:page,
                        // listrows:this.limit
                        limit:page+','+this.limit
                    }).then(res=>{
                        // console.log(res.data.data.count);
                        this.user_list = res.data.data.data
                        this.count1 = res.data.data.count
                    })
                } else if (tab.label == "转卡记录") {
                    api.cardChangeListUser({
                        user_id:this.userInfo1.id,
                        limit:page+','+this.limit,
                    }).then(res=>{
                        // console.log(res);
                        this.card_list = res.data.data
                        this.count3 = res.data.count
                    })
                }
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
                api.query(obj)
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
                this.searchRender = false//分页器不显示
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                api.query({
                    limit:page+','+this.limit
                }).then(res=>{
                    // console.log(res)
                    this.searchRender = true
                    this.list = res.data.data.data
                    this.count = res.data.data.count
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
                    api.query(obj).then(res=>{
                        // console.log(res.data.data);
                        _this.list = res.data.data.data
                        // _this.count = res.data.data.count
                    })
                }else{
                    api.query({
                        limit:page+','+this.limit
                    }).then(res=>{
                        // console.log(res)
                        this.list = res.data.data.data
                        // this.count = res.data.data.count
                    })
                }
            },
            handleCurrentChange1(val){
                this.page = val
                let page = (this.page-1)*this.limit
                api.getUserMark({
                    user_id:this.userInfo1.id,
                    // page:page,
                    // listrows:this.limit
                    limit:page+','+this.limit
                }).then(res=>{
                    this.user_list = res.data.data.data
                })
            },
            handleCurrentChange2(val){
                this.page = val
                let page = (this.page-1)*this.limit
                api.getUserCard({
                    user_id:this.userInfo1.id,
                    // page:page,
                    // listrows:this.limit
                    limit:page+','+this.limit
                }).then(res=>{
                    this.vip_list = res.data.data.data
                })
            },
            handleCurrentChange3(val){
                this.page = val
                let page = (this.page-1)*this.limit
                api.cardChangeListUser({
                    user_id:this.userInfo1.id,
                    // page:page,
                    // listrows:this.limit
                    limit:page+','+this.limit
                }).then(res=>{
                    // console.log(res.data);
                    this.card_list = res.data.data
                    // console.log(this.card_list);
                })
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
            userDetail2(item){
                // console.log(item);
                this.$router.push({
                    name:'ransfercard',
                    query:{
                        user_id:item.id,
                        user_name:item.nikanme
                    }
                })
            },
            userDetail1(item){
                this.activeName = 'first'
                let page = (this.page-1)*this.limit
                api.getUserMark({
                    user_id:item.id,
                    // page:page,
                    // listrows:this.limit,
                    limit:page+','+this.limit
                }).then(res=>{
                    // console.log(res);
                    this.userInfo1 = item
                    // console.log(item);
                    this.see1 = true
                    this.user_list = res.data.data.data
                    this.count1 = res.data.data.count
                })
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
.whole{
    padding: 0 10px;
    background-color: #EDF1F5;
    flex-grow: 1;
    display:flex;
    flex-direction: column;
}
/* 搜索框 */
.search{
    width: 893px;
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
    width: 140px;
    display: flex;
    align-items: center;
}
.partner{
    width: 100px;
    display: flex;
    align-items: center;
}
.income{
    width: 240px;
    display: flex;
    align-items: center;
}
.withdrawal{
    width: 140px;
    display: flex;
    align-items: center;
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
    width: 450px;
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
    width: 450px;
    text-align: center;
    display: flex;
    // justify-content: space-between;
    // margin-top: 16px;
}
.see{
    // width: 66px;
    height: 28px;
    padding: 0 10px;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    line-height: 24px;
    color: #4D4D4D;
    margin-right: 10px;
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
    // width: 100%;
    // height: 100%;
    // background: chartreuse;
    padding: 0px 46px 0 60px;
    display: flex;
    .tabs_box{
        margin-top: 30px;
    }
    .box{
        width: 1500px;
        height: 650px;
        max-height: 650px;
        // overflow: auto;
        ul{
            margin: 0;
            padding: 0;
        }
        li{
            // margin: 0;
            padding: 0;
        }
        .column{
            width: 180px;
            padding: 10px;
            word-wrap:break-word; 
            .text{
                width: 150px;
                word-wrap:break-word; 
            }
            img{
                width: 80px;
                height: 80px;
                border-radius: 10px;
            }
            .card_img{
                width: 180px;
                height: 80px;
                border-radius: 10px;
            }
        }
        .table_head{
            width: 100%;
            ul{
                display: flex;
                justify-content: space-around;
            }
        }
        .table_center{
            width: 100%;
            height: 500px;
            // overflow: auto;
            overflow-y: auto;
            overflow-y: overlay;
            ul{
                display: flex;
                justify-content: space-around;
                align-items: center;
                position: relative;
            }
            ul:hover{
                background-color: #F2F9FF;
            }
            ul:hover .blue{
                display: block;
            }
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
        // margin-top: 20px;
        margin-bottom: 20px;
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
    ._left{
        padding-top: 20px;
    }
    ._text_1{
        display: flex;
        align-items: center;
        // margin-right: 5px;
        min-width: 100px;
        color: #A1B2B0;
        white-space: nowrap
    }
    ._text{
        display: flex;
        // align-items: center;
        // margin-right: 5px;
        min-width: 100px;
        color: #A1B2B0;
        white-space: nowrap
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
            width: 375px;
            word-wrap:break-word;
            word-break:normal; 
        }  
    }
}
.see_bottom{
    display: flex;
    // width: 760px;
    height: 60px;
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
</style>