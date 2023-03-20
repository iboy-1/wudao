<template>
    <div class="whole">
        <div class="fanhui_box">
            <el-button class="fanhui" @click="render1">返回</el-button>
            <h2>当前用户：{{user_name}}</h2>
        </div>
        <!-- <div class="search">
            <el-input v-model="search.card_name" placeholder="请输入会员名"></el-input>
            <el-select v-model="search.venue_id" :clearable='true' placeholder="请选择场馆">
                <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.venue_name"
                :value="item.id">
                </el-option>
            </el-select>
            <div class="Reset" @click="Reset">重置</div>
            <div class="query" @click="searchOrder"><img src="@/assets/查询.png" alt="">查询</div>
        </div>
        按钮
        <div class="btn">
            <div class="refresh" @click="Refresh" ><img src="@/assets/刷新@2x.png" alt="">刷新</div>
            <div class="refresh" @click="add_teacher" ><img src="@/assets/添加@2x.png" alt="">添加</div>
        </div> -->
        <!-- 表格 -->
        <div class="form_head">
            <ul>
                <li class="adminid">ID</li>
                <li class="remarks">会员卡号</li>
                <li class="name">用户名</li>
                <li class="name">会员卡封面</li>
                <li class="name">会员名</li>
                <li class="name">次数/余额</li>
                <li class="name">会员卡类型</li>
                <li class="name">是否换新卡</li>
                <li class="name">过期时间</li>
                <li class="operation">操作</li>
            </ul>
        </div>
        <div class="form_information">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <div class="blue"></div>
                    <!-- <div></div>
                    <div></div> -->
                    <div class="adminid">
                        <span v-if="item.id == -1">无</span>
                        <span v-else>{{item.id}}</span>
                    </div>
                    <div class="remarks">
                        <p v-if="item.card_number == null">无</p>
                        <p v-else>{{item.card_number}}</p>
                    </div>
                    <div class="name">
                        <span v-if="item.user.nikanme == -1">未填写</span>
                        <span v-else>{{item.user.nikanme}}</span>
                    </div>
                    <div class="name">
                        <span v-if="item.card_manage == null ">无</span>
                        <img :src="item.card_manage.card_image" alt="" v-else>
                    </div>
                    <div class="name">
                        <span v-if="item.card_manage == null ">无</span>
                        <span v-else>{{item.card_manage.card_name}}</span>
                    </div>
                    <div class="name">
                        <span v-if="item.member_card_amount == -1">无</span>
                        <span v-else>{{item.member_card_amount}}</span>
                    </div>
                    <div class="name">
                        <span v-if="item.member_card_type == 1">次卡</span>
                        <span v-else-if="item.member_card_type == 2">储值卡</span>
                    </div>
                    <div class="name">
                        <span v-if="item.is_change == 1">是</span>
                        <span v-else-if="item.is_change == 0">否</span>
                    </div>
                    <div class="name">
                        <span v-if="item.expiration_time == -1">无</span>
                        <span v-else>{{item.expiration_time}}</span>
                    </div>
                    <div class="operation">
                        <!-- <el-button size="medium" @click="see_btn(item)" >支持课程</el-button> -->
                        <el-button size="medium" @click="contact1(item)" disabled v-if="item.is_change == 1">转卡</el-button>
                        <el-button size="medium" @click="contact1(item)" v-else>转卡</el-button>
                        <!-- <el-button size="medium" type="danger" @click="delete_btn(item)">删除</el-button> -->
                    </div>
                </li>
            </ul>
        </div>
        <!-- 分页 -->
        <div class="Paging" v-if="searchRender">
            <el-pagination @current-change = "changePage" background layout="prev, pager, next" :total="count"></el-pagination>
        </div>

        <div class="mask" v-if="add_isShow" @click="add_isShow = false"></div>
        <div class="pop" v-if="add_isShow">
            <img src="@/assets/关闭@2x.png" alt="" @click="add_isShow=false">
            <h2>{{dialogTitle}}</h2>
            <div class="transverse"></div>
            <div class="content">
                <div class="memu">
                    <div class="box">
                        <el-form ref="form" :model="form" label-width="100px">
                            <div class="line">
                                <el-form-item label="转入会员卡卡号">
                                    <el-input v-model="form.new_card_number" placeholder="请输入会员卡号"></el-input>
                                </el-form-item>
                            </div>
                            <div class="line" v-if="member_card_type == 2">
                                <el-form-item label="转入多少钱">
                                    <el-input v-model="form.out_card_amount" placeholder="请输入转入多少钱">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="line" v-if="member_card_type == 1">
                                <el-form-item label="转入多少次">
                                    <el-input v-model="form.out_card_amount" placeholder="请输入转入多少次">
                                        <template slot="append">次</template>
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="备注">
                                    <div class="textarea">
                                        <textarea class="bottominput" name="" id="" cols="30" rows="10" v-model="form.remarks" placeholder="请输入备注"></textarea>
                                    </div>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="btnMessage">
                <div class="cancel" @click="add_isShow = false">取 消</div>
                <div class="determine" @click="commitArticle(2)">确 定</div>
            </div>
        </div>

    </div>
</template>

<script>
import api from"@/api/card.js";
import api1 from"@/api/studis.js";
import api2 from"@/api/curriculum.js";
import uploadImg from '@/components/uploadImg/uploadImg.vue';
import VueUeditorWrap from "vue-ueditor-wrap";
export default {
    components: {
        uploadImg,
        VueUeditorWrap,
    },
    data(){
        return{
            page:1,
            count:0,
            limit:10,
            list:[],//列表
            searchRender:false,//分页是否显示
            searchData:false,//是否为搜索
            search:{
                card_name:"",
                venue_id:"",
            },
            options:[],
            time:'',
            form: {
                new_card_number:"",
                primary_card_number:'',
                out_card_amount:"",
                remarks:'',
                operator: '会员卡',      //操作人
            },
            dialogTitle:'转会员卡',
            add_isShow:false,
            see_isShow:false,
            del_isShow:false,
            del_id:'',
            dialogTitle1:'是否删除该会员卡',
            dialogTitle2:"课程信息",
            member:[],
            hotel1FileList:[],
            hotel1ImageUrl:'',
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
                // UEDITOR_HOME_URL:'/ueditor/'
            },
            course_id:[],
            forms:{
                course_id:''
            },
            creator:JSON.parse(localStorage.getItem('WuDaoeducation')),
            judata:{},//权限
            course_list:[],
            user_id:'',
            user_name:'',
            member_card_type:"",
        }
    },
    created:function(){
        this.user_id = this.$route.query.user_id
        this.user_name = this.$route.query.user_name
    },
    watch: {
        "time"(newVal) {
			if (newVal == null) {
				this.time = [];
	        }
	    }
	},
    beforeDestroy() { 
        clearTimeout();
    },
    mounted(){
        this.render()
        this.changePower1()
    },
    methods:{
        render1(){
            this.$router.push({
                name:'distribution1'
            })
        },
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
        searchOrder(){
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
			// if(this.search.state == ""){
			// 	obj.state = 0 
			// }
            this.page = 1
            let page = (this.page - 1)*this.limit
            obj.limit = page+','+this.limit
            this.searchRender = false
            const loading = this.$loading({
                lock: true,
                text: '正在查询',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            api.query(obj).then(res=>{
                // console.log(res.data.data);
                setTimeout(function(){
					loading.close();
				},100)
                _this.list = res.data.data.data
                _this.count = res.data.data.count
                _this.searchRender = true
                _this.searchData = true
            })
        },
        Reset(){
            this.search = {
                card_name:"",
                venue_id:"",
            }
            this.render()
        },
        change(url){
            // console.log(url);
            this.hotel1ImageUrl = url
            this.form.card_image = url
        },
        handleChange(val){
            // console.log(val);
        },
        //主列表
        render(){
            let _this=this
            this.page = 1
            let page = (this.page - 1)*this.limit
            this.searchRender = false
            api.cardListTransfer({
                user_id:this.user_id,
                limit:page+','+this.limit,
            }).then(res=>{
                // console.log(res);
                _this.list = res.data.data
                _this.count = res.data.count
                // _this.member = res.data.data
                res.data.data.forEach(val => {
                    if (val.is_change == 1) {
                        
                    } else {
                        _this.member.push(val.id)
                    }
                });
                // console.log(_this.member);
                _this.searchRender = true
            })
        },
        commitdel1(){
            // console.log(this.forms);
            // let obj = JSON.stringify(this.forms.course_id)
            // this.forms.course_id = obj
            // console.log(this.forms.course_id);
            // return
            api.addCardCrouse(this.forms).then(res=>{
                // console.log(res);
                if (res.data.code == 200) {
                    this.$message({
                        type:'success',
                        message:res.data.data
                    })
                    this.render()
                    this.see_isShow = false
                } else {
                    this.$message({
                        type:'error',
                        message:res.data.data
                    })
                }
            })
            
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
        //刷新
        Refresh(){
            this.render()
        },
        //添加
        add_teacher(){
            this.add_isShow = true
            this.dialogTitle = "添加会员卡"
            this.hotel1FileList = []
            this.form = {
                venue_id:'',     //场馆ID
                discount: '',      //课程名称
                price: '',      // 价格
                expire: '',      //过期时间
                card_value_type: '',      //1次卡类型,2储值类型
                count: '',      //次数
                card_tag: '',      //标签（自定义标签，逗号分隔 例：瘦身,减肥
                card_explain: '',      //说明
                card_name: '',      //名称
                card_image: '',      //封面
                use_venue:'',      //会员卡支持的场馆(0表示全部，多场馆json格式
                remarks:'',      //备注
                is_many_venue:'',
                operator: this.creator.data[0].name,      //操作人
            }
        },
        // 导出
        exportExcel(){

        },
        // 点击分页获取数据
        changePage(currentPage){
            this.page = currentPage
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
                    _this.count = res.data.data.count
                })
            }else{
                api.query({
                    limit:page+','+this.limit,
                }).then(res=>{
                    // console.log(res.data.data);
                    _this.list = res.data.data.data
                    _this.count = res.data.data.count
                })
            }
        },
        commitArticle(val){
            api.transferCard(this.form).then(res=>{
                // console.log(res);
                if (res.data.code == 200) {
                    this.$message({
                        type:'success',
                        message:res.data.data
                    })
                    this.render()
                    this.add_isShow = false
                } else {
                    this.$message({
                        type:'error',
                        message:res.data.data
                    })
                }
            })
        },
        contact1(arr){
            this.dialogTitle = "转会员卡"
            this.member_card_type = arr.member_card_type
            this.form = {
                user_id:this.user_id,
                new_card_number:'',
                primary_card_number:arr.card_number,
                out_card_amount:"",
                remarks:'',
                operator: this.creator.data[0].name,      //操作人
            },
            this.add_isShow = true
        },
        add_btn(val){
            this.$router.push({
                name:'curriculum',
                query:{
                    member_id:val.id,
                    member_name:val.venue_name
                }
            })
        },
        delete_btn(arr){
            this.del_isShow = true
            this.del_id = arr.id
        },
        see_btn(arr){
            this.teacher_info = arr
            this.course_list = []
            // console.log(arr.card_course);
            let obj = []
            api2.query({
                organization_id:arr.venue_id,
                limit:'0,1000000000000'
            }).then(res=>{
                // console.log(res);
                this.course_id = res.data.data.data
                if (arr.card_course != '') {
                    arr.card_course.forEach(val => {
                        obj.push(val.course_id)
                    });
                    for (let i = 0; i < arr.card_course.length; i++) {
                        for (let j = 0; j < res.data.data.data.length; j++) {
                            if (arr.card_course[i].course_id == res.data.data.data[j].id) {
                                // this.course_list.course_name = res.data.data.data[j].course_name
                                this.course_list.push(res.data.data.data[j].course_name)
                                // console.log(res.data.data.data[j].course_name);
                            }
                        }
                    }
                }
                this.see_isShow = true
            })
            // console.log(obj);
            // console.log(this.course_list);
            this.forms = {
                member_card_id:arr.id,
                course_id:obj
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.fanhui_box{
      display: flex;
      align-items: center;
      .fanhui{
          width: 100px;
          height: 50px;
      }
  }
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
        align-items: center;
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
            width: 150px;
            height: 80px;
            border-radius: 10px;
        }
    }
    .phone{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .pattern{width: 100px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .intention{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .time{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .operation{width: 250px;word-break: normal;word-wrap: break-word;margin: 10px 0;display: flex;}
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
    .see_pop{
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%,-50%);
        width: 880px;
        padding-bottom: 20px;
        z-index: 2;
        border-radius: 10px;
        .btnMessage{
            width: 100%;
            margin-top: 20px;
            display:flex;
            justify-content: flex-end;
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
            padding-left: 20px;
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
            padding: 30px 0px;
            height: 350px;
            max-height: 450px;
            overflow: auto;
            .box_tab{
                width: 100%;
                // height: 300px;
                overflow: auto;
                padding: 0 20px 0 30px;
                display: flex;
                // justify-content: space-between;
                flex-wrap:wrap;
                .tab{
                    margin-top: 10px;
                }
            }
        }
        .bottominput{
            // margin-top: 50px;
            width: 100%;
            height: 250px;
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
    .pop {
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%,-50%);
        // width: 620px;
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
        .content1{
            height: 50px;
            width: 620px;
        }
        .content{
            width: 700px;
            // height: 60vh;
            // overflow: auto;
            padding: 20px;
        }
        .bottominput{
            // margin-top: 50px;
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
                width:690px;
            }
            .textarea{
                //   padding: 20px 0;
                .bottominput{
                    width: 350px;
                    height: 80px;
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
  height: 75vh;
  overflow: auto;
}
</style>