<template>
    <div class="whole">
        <div class="note" v-if="note == true">
            <h1>当前账号不是老师</h1>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick" v-if="note == false">
            <el-tab-pane label="教师钱包" name="first">
                <el-button type="success" round @click="showModal = true" icon="el-icon-goods" v-if="judata.Jszx_sqtx">申请提现</el-button>
                <div class="wallet">
                    <div class="">
                        <div class="total" v-if="judata.Jszx_zsy">
                            <p>总收益：</p>
                            {{wallet.total_revenue}}
                        </div>
                        <div class="total1">
                            <div class="today" v-if="judata.Jszx_ye">
                                <p>余额：</p>
                                {{wallet.balance}}
                            </div>
                            <!-- <div class="total" v-if="judata.Jszx_dj">
                                <p>冻结资金：</p>
                                {{wallet.frozen_capital}}
                            </div> -->
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="佣金" name="second" v-if="judata.Jszx_yj">
                <div class="table">
                    <div class="form_head" v-if="judata.Jszx_yjtable">
                        <ul>
                            <li class="adminid">ID</li>
                            <li class="name">工作室封面</li>
                            <li class="name">工作室</li>
                            <li class="name">课程名称</li>
                            <li class="name">会员卡名称</li>
                            <li class="name">提成金额</li>
                            <li class="time">提交时间</li>
                            <li class="name">佣金类型</li>
                        </ul>
                    </div>
                    <div class="form_information" v-if="judata.Jszx_yjtable">
                        <null-state :description="description1" v-if="yjtable" />
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
                                    <img v-else :src="item.venue.image_url" alt="">
                                </div>
                                <div class="name">
                                    <span v-if="item.venue == null">无</span>
                                    <span v-else>{{item.venue.venue_name}}</span>
                                </div>
                                <div class="name">
                                    <span v-if="item.type == 2 || item.course == null">无</span>
                                    <span v-else>{{item.course.course_name}}</span>
                                </div>
                                <div class="name">
                                    <span v-if="item.type == 1 || item.member_card == null">无</span>
                                    <span v-else>{{item.member_card.card_name}}</span>
                                </div>
                                <div class="name">
                                    <span>{{item.amount}}</span>
                                </div>
                                <div class="time">
                                    <span v-if="item.add_date == 0 ">无</span>
                                    <span v-else>{{item.add_date}}</span>
                                </div>
                                <div class="name">
                                    <span v-if="item.type == 1">课程</span>
                                    <span v-else-if="item.type == 2">会员卡</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 分页 -->
                    <div class="Paging" v-if="judata.Jszx_yjtable">
                        <el-pagination @current-change = "changePage" background layout="prev, pager, next" :total="count"></el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="提现记录" name="third" v-if="judata.Jszx_tx">
                <div class="table">
                    <div class="form_head" v-if="judata.Jszx_txtable">
                        <ul>
                            <li class="adminid">ID</li>
                            <!-- <li class="name">订单号</li> -->
                            <!-- <li class="name">提现订单</li> -->
                            <li class="name">提现金额</li>
                            <li class="phone">提现方式</li>
                            <li class="pattern">银行</li>
                            <li class="time">开户行</li>
                            <li class="pattern">开户人姓名</li>
                            <!-- <li class="pattern">状态</li> -->
                            <li class="time">提现时间</li>
                        </ul>
                    </div>
                    <div class="form_information" v-if="judata.Jszx_txtable">
                        <null-state :description="description1" v-if="txtable" />
                        <ul>
                            <li v-for="(item,index) in list1" :key="index">
                                <div class="blue"></div>
                                <!-- <div></div>
                                <div></div> -->
                                <div class="adminid">
                                    <span v-if="item.id == -1">无</span>
                                    <span v-else>{{item.id}}</span>
                                </div>
                                <!-- <div class="name">
                                    <span >{{item.order}}</span>
                                </div> -->
                                <!-- <div class="name">
                                    <span v-if="item.txorder == -1">无</span>
                                    <span v-else>{{item.txorder}}</span>
                                </div> -->
                                <div class="name">
                                    <span v-if="item.amounts == -1">无</span>
                                    <span v-else>{{item.amounts}}</span>
                                </div>
                                <div class="phone">
                                    <span v-if="item.invest_type == 1 ">微信</span>
                                    <span v-else-if="item.invest_type == 2 ">支付宝</span>
                                    <span v-else-if="item.invest_type == 3 ">银行卡</span>
                                </div>
                                <div class="pattern">
                                    <span v-if="item.bank == '' ">无</span>
                                    <span v-else>{{item.bank}}</span>
                                </div>
                                <div class="time">
                                    <span v-if="item.kai_hu_hang == '' ">无</span>
                                    <span v-else>{{item.kai_hu_hang}}</span>
                                </div>
                                <div class="pattern">
                                    <span v-if="item.kai_hu_name == '' ">无</span>
                                    <span v-else>{{item.kai_hu_name}}</span>
                                </div>
                                <!-- <div class="pattern">
                                    <span v-if="item.state == 1 ">等待审核</span>
                                    <span v-else-if="item.state == 2 ">审核成功</span>
                                    <span v-else-if="item.state == 3 ">审核失败</span>
                                    <span v-else-if="item.state == 4 ">提现成功</span>
                                </div> -->
                                <div class="time">
                                    <span v-if="item.time == 0 ">无</span>
                                    <span v-else>{{item.time}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 分页 -->
                    <div class="Paging" v-if="judata.Jszx_txtable">
                        <el-pagination @current-change = "changePage1" background layout="prev, pager, next" :total="count1"></el-pagination>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="mask" v-if="showModal" @click="showModal = false"></div>
        <div class="pop" v-if="showModal">
            <img src="@/assets/关闭@2x.png" alt="" @click="showModal = false">
            <h2>{{dialogTitle1}}</h2>
            <div class="transverse"></div>
            <div class="content">
                <div class="box">
                    <div class="head">提现金额：</div>
                    <div class="cen">
                        <el-input v-model="form.amounts" placeholder="请输入提现金额"></el-input>
                    </div>
                    <div class="head">提现方式：</div>
                    <div class="cen">
                        <el-select v-model="form.invest_type" placeholder="请选择" @change="option_btn" style="margin-left:0 ;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="box" v-if="btn_isShow">
                    <div class="head">银行：</div>
                    <div class="cen">
                        <el-input v-model="form.bank" placeholder="请输入银行"></el-input>
                    </div>
                    <div class="head">银行卡号：</div>
                    <div class="cen">
                        <el-input v-model="form.bank_number" placeholder="请输入银行卡号"></el-input>
                    </div>
                </div>
                <div class="box" v-if="btn_isShow">
                    <div class="head">开户行：</div>
                    <div class="cen">
                        <el-input v-model="form.kai_hu_hang" placeholder="请输入开户行"></el-input>
                    </div>
                    <div class="head">开户人姓名：</div>
                    <div class="cen">
                        <el-input v-model="form.kai_hu_name" placeholder="请输入开户人姓名"></el-input>
                    </div>
                </div>
            </div>
            <div class="btnMessage">
                <div class="cancel" @click="showModal = false">取消</div>
                <div class="determine" @click="commit()">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
import api from"@/api/teacher.js";
import nullState from '@/components/nullState/nullState.vue';
export default {
    components: { nullState },
    data(){
        return{
            page:1,
            count:0,
            limit:10,
            activeName: 'first',
            creator:JSON.parse(localStorage.getItem('WuDaoeducation')),
			judata:{},//权限
            wallet:"",
            showModal:false,
            dialogTitle1:'申请提现',
            description1:"暂无数据",
            input: '',
            list:[],
            list1:[],
            count:0,
            count1:0,
            form:{
                bank:"",
                bank_number:"",
                kai_hu_hang:"",
                kai_hu_name:"",
                invest_type:"",
                amounts:""
            },
            options: [
                {
                    value: '1',
                    label: '微信'
                }, {
                    value: '2',
                    label: '支付宝'
                }, {
                    value: '3',
                    label: '银行卡'
                }
            ],
            value: '',
            btn_isShow:false,
            note:false,
            yjtable:false,
            txtable:false,
        }
    },
    created(){
        if (this.creator.data[0].teacher_id == '-1') {
            this.note = true
        }
        this.render()
        this.render1()
        this.render2()
    },
    mounted(){
        
        
        this.changePower1()
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
        option_btn(val){
            // console.log(val);
            if (val == 3) {
                this.btn_isShow = true
            }else{
                this.btn_isShow = false
            }
        },
        handleClick(tab, event) {
            // console.log(tab.label);
            // if (tab.label == '佣金') {
            //     this.render1()
            // } 
            // else if (tab.label == '提现记录'){
            //     this.render2()
            // }
        },
        //主列表
        render(){
            api.wallet({
                teacher_id:this.creator.data[0].teacher_id,
                // limit:page+','+this.limit,
            }).then(res=>{
                // console.log(res);
                this.wallet = res.data
            })
        },
        commit(){
            if (this.form.amounts == '') {
                this.$message({
                    type:"error",
                    message:'请输入金额'
                })
                return
            } else if (this.form.amounts.toString().includes('-')) {
                this.$message({
                    type:"error",
                    message:'金额不能是负数'
                })
                return
            } 
            // console.log(this.form);
            this.form.teacher_id = this.creator.data[0].teacher_id
            // return
            api.withdraw({
                teacher_id:this.creator.data[0].teacher_id,
                bank:this.form.bank,
                bank_number:this.form.bank_number,
                kai_hu_hang:this.form.kai_hu_hang,
                kai_hu_name:this.form.kai_hu_name,
                invest_type:this.form.invest_type,
                amounts:this.form.amounts
            }).then(res=>{
                // console.log(res);
                if (res.data.code == 200) {
                    this.$message({
                        type:'success',
                        message:res.data.data
                    })
                    this.render()
                    this.render1()
                    this.render2()
                    this.showModal = false
                } else {
                    this.$message({
                        type:'error',
                        message:res.data.data
                    })
                }
            })
        },
        render1(){
            let _this=this
            this.page = 1
            let page = (this.page - 1)*this.limit
            // this.searchRender = false
            api.walletRecord({
                teacher_id:this.creator.data[0].teacher_id,
                limit:page+','+this.limit,
            }).then(res=>{
                // console.log(res);
                this.list = res.data.data
                _this.count = res.data.count
                if (res.data.count == 0) {
                    this.yjtable = true
                }
                // _this.searchRender = true
                // console.log(this.list);
            })
        },
        render2(){
            let _this=this
            this.page = 1
            let page = (this.page - 1)*this.limit
            // this.searchRender = false
            api.withdrawList({
                teacher_id:this.creator.data[0].teacher_id,
                limit:page+','+this.limit,
            }).then(res=>{
                // console.log(res);
                _this.list1 = res.data.data
                _this.count1 = res.data.count
                if (res.data.data.length == 0) {
                    _this.txtable = true
                    // console.log(123);
                }
                // _this.searchRender = true
            })
        },
        changePage(val){
            this.page = val
            let page = (this.page - 1)*this.limit
            // this.searchRender = false
            api.walletRecord({
                teacher_id:this.creator.data[0].teacher_id,
                limit:page+','+this.limit,
            }).then(res=>{
                // console.log(res.data.data);
                this.list = res.data.data
                // _this.searchRender = true
                // console.log(this.list);
            })
        },
        changePage1(val){
            this.page = val
            let page = (this.page - 1)*this.limit
            api.withdrawList({
                teacher_id:this.creator.data[0].teacher_id,
                limit:page+','+this.limit,
            }).then(res=>{
                // console.log(res);
                this.list1 = res.data.data
                // _this.searchRender = true
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
    justify-content: center;    
    // align-items: center;
    .note{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .table{
        height: 90vh;
        display:flex;
        flex-direction: column;
    }
    .white{
        width: 90%;
        background: #ffffff;
        height: 900px;
        margin: 10px auto;
        border-radius: 5px;
        padding: 10px;
        overflow: auto;
        
    }
    .wallet{
        width: 100%;
        height: 86vh;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: 600;
        font-size: 20px;
        .total{
            display: flex;
            flex-direction:column;
            width: 650px;
            height: 140px;
            background: #00D296;
            border-radius: 20px;
            justify-content: center;
            text-align: center;
            align-items: center;
        }
        .total1{
            display: flex;
            margin-top: 20px;
            width: 650px;
            .today{
                display: flex;
                flex-direction:column;
                border-radius: 20px;
                justify-content: center;
                text-align: center;
                align-items: center;
                width: 100%;
                height: 140px;
                background: #FFB900;
                // margin-right: 20px;
            }
            .total{
                width: 320px;
                height: 140px;
                background: #5D43FF;
                display: flex;
                flex-direction:column;
                border-radius: 20px;
                justify-content: center;
                text-align: center;
                align-items: center;      
            }
        }
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
        align-items: center;
    }
    .form_head ul li{
        list-style: none;
    }
    .adminid{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;margin: 20px 0;padding: 20px 0;}
    .name{
        width: 120px;
        word-break: normal;
        word-wrap: break-word;
        margin: 10px 0;
        img{
            width: 150px;
            height: 80px;
            border-radius: 10px;
        }
    }
    .phone{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .pattern{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .intention{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .time{width: 220px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
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
        z-index: 9;
    }
    .pop {
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%,-50%);
        // width: 620px;
        // height:600px;
        padding-bottom: 20px;
        z-index: 12;
        border-radius: 10px;
        .btnMessage{
            width: 100%;
            margin-top: 20px;
            display:flex;
            justify-content: flex-end;
            // margin-right: 20px;
            padding-right: 20px;
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
            text-align: left;
            margin-left: 20px;
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
            padding:20px;
            // width: 1200px;
            height: 350px;
            .box{
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                .head{
                    width: 135px;
                }
                .cen{
                    width: 350px;
                }
            }
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