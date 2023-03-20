<template>
    <div class="personnel">
        <!-- 按钮 -->
        <div class="btn" v-if="judata.rygl_add">
            <div class="refresh"  @click="addPersonnel"><img class="btn-img" src="./添加@2x.png" alt=""><div class="btn-text">添加</div></div>
        </div>
        <!-- 表头 -->
        <div class="order-Text" v-if="judata.rygl_table">
            <ul>
                <li class="name">姓名</li>
                <li class="number">账号</li>
                <li class="pwd">密码</li>
                <!-- <li class="role">老师名称</li> -->
                <li class="operation">操作</li>
            </ul>
        </div>
        <!-- 列表 -->
        <div class="lounge-Information" v-if="judata.rygl_table">
            <div class="Information" v-for="(item,index) of list" :key="index">
                <div class="blue"></div>
                <p class="name">{{item.name}}</p>
                <p class="number">{{item.account}}</p>
                <p class="pwd">******</p>
                <!-- <p class="role">{{item.rotename}}</p> -->
                <div class="operation">
                    <el-button size="mini" @click="change(item,index)" v-if="judata.rygl_edit">编辑</el-button>
                    <el-button size="mini" @click="deleteUser(item,index)" v-if="judata.rygl_del">删除</el-button>
                    <!-- <div @click="change(item,index)" v-if="judata.rygl_edit">编辑</div>
                    <div class="del" @click="deleteUser(item,index)" v-if="judata.rygl_del">删除</div> -->
                </div>
            </div>
        </div>
        <!-- 分页 -->
        <div class="Paging" v-if="judata.rygl_table">
            <el-pagination
            background
            @current-change="changePage"
            layout="prev, pager, next"
            :total="count">
            </el-pagination>
        </div>

        <div class="mask" v-if="showModal"></div>
        <div class="pop" v-if="showModal">
            <div class="add-head">
                <span>{{title}}</span>
                <img src="./关闭@2x.png" alt="" @click="showModal=false">
            </div>
            <div class="transverse"></div>
            <div class="add-center">
                <div class="add-center-text js-item">
                    <span>人员名称</span>
                    <el-input v-model="name" placeholder="请输入人员名称"></el-input>
                </div>
                <div class="add-center-text-o js-item1">
                    <span>账号</span>
                    <el-input v-model="account" placeholder="请输入账号"></el-input>
                </div>
                <div class="add-center-text-o js-item1">
                    <span>密码</span>
                    <el-input v-model="password" placeholder="请输入密码"></el-input>
                </div>
                <div class="add-center-text-two js-item">
                    <span>所属角色</span>
                    <div class="add-center-text_two">
                        <el-select v-model="value" placeholder="请选择" >
                            <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.nickname"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="add-bottom">
                <div class="add-bottom-cancel" @click="showModal=false">取消</div>
                <div class="add-bottom-determine" @click="commit">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/power.js'
import api1 from"@/api/teacher.js";
// import FileSaver from "file-saver";
// import XLSX from "xlsx";
export default {
    data() {
        return {
            options: [],
            value: '-1',
            name:"",
            account:"",
            password:"",
            showModal: false,
            list:[],
            page:1,
            limit:10,
            count:0,
            title:'',
            id:'',
            timer:null,
            judata:{},//权限
        };
    },
    created(){
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
        async render(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            await api1.query({
                teacher_id:'-1',
                limit:'0,10000000'
            }).then(res=>{
                // console.log(res);
                this.options = res.data.data.data
                let obj = {
                    id:-1,
                    nickname:'管理员',
                }
                this.options.push(obj)
            })
            await api.getAllUser1({
                page:this.page,
                listrows:this.limit
            }).then(res=>{
                // console.log(res)
                this.count = res.data.data.count
                for(let i=0 ; i<res.data.data.data.length ; i++){
                    for(let j=0 ; j<this.options.length ; j++){
                        if(res.data.data.data[i].roteid == this.options[j].id){
                            res.data.data.data[i].rotename = this.options[j].account
                        }
                    }
                }
                this.list = res.data.data.data
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
        deleteUser(item,index){
            if(confirm('确定删除此用户吗？')){
                api.deleaccount({
                    id:item.id
                }).then(res=>{
                    if(res.data.code == '200'){
                        this.$message({
                            type:'success',
                            message:'删除成功'
                        })
                        this.render()
                    }else{
                        this.$message({
                            message:res.data.data
                        })
                    }
                })
            }
        },
        changePage(val){
            this.page = val
            api.getAllUser1({
                page:this.page,
                listrows:this.limit
            })
            .then(res=>{
                this.count = res.data.data.count
                for(let i=0 ; i<res.data.data.data.length ; i++){
                    for(let j=0 ; j<this.options.length ; j++){
                        if(res.data.data.data[i].roteid == this.options[j].id){
                            res.data.data.data[i].rotename = this.options[j].account
                        }
                    }
                }
                this.list = res.data.data.data
            })
        },
        addPersonnel(){
            this.title = '添加人员'
            this.value = ''
            this.name = ""
            this.account = ""
            this.password = ""
            this.showModal = true
        },
        change(item,index){
            let _this = this
            // this.options.forEach(function(value){
            //     if(item.teacher_id == value.id){
            //         _this.value = value.account
            //     }
            // })
            this.name = item.name
            this.account = item.account
            this.password = '******'
            this.id = item.id
            this.value = Number(item.teacher_id)
            this.title = '编辑人员'
            this.showModal = true
        },
        commit(){
            let id = ''
            let _this = this
            this.options.forEach(function(value){
                if(_this.value == value.account){
                    id = value.id
                }
            })
            if(this.title == '添加人员'){
                api.register({
                    account:this.account,
                    password:this.password,
                    name:this.name,
                    // roteid:id,
                    teacher_id:this.value
                }).then(res=>{
                    // console.log(res)
                    if(res.data.code == 200){
                      this.$message({
                        message: '添加成功',
                        type: 'success'
                      });
                      this.showModal = false
                      this.render()
                    }
                })
            }else{
                api.updateUser({
                    id:this.id,
                    account:this.account,
                    // password:this.password,
                    name:this.name,
                    teacher_id:this.value
                    // roteid:id,
                }).then(res=>{
                    // console.log(res)
                    if(res.data.code == 200){
                      this.$message({
                        message: '编辑成功',
                        type: 'success'
                      });
                      this.showModal = false
                      this.render()
                    }
                })
            }
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
    },
}
</script>

<style scoped>
.personnel{
  padding: 0 10px;
  background-color: #EDF1F5;
  flex-grow: 1;
  display:flex;
  flex-direction: column;
}
/* 按钮 */
.add-bottom-cancel{
    width: 150px;
    height: 40px;
    border: 1px solid #CCCCCC;
    text-align: center;
    line-height: 40px;
    color: #333333;
    border-radius: 5px;
    font-weight: 600;
}
.add-bottom-cancel:hover{
    cursor: pointer;
}
.add-bottom-determine:hover{
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
}
.add-bottom{
    width: 310px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 5%;
    right: 8%;
}
.add-center-text-two{
    width: 100%;
    padding: 40px 420px 0 60px;
    display: flex;
    justify-content: space-between;
}
.add-center-text_two{
    width: 230px;
}
.js-item>span{
    display: inline-block;
    width: 120px !important;
}
.js-item1>span{
    display: inline-block;
    width: 90px !important;
}
.add-center-text-two span{
    padding: 8px 0 0 0 ;
}
.add-center-text-o{
    width: 100%;
    padding: 40px 60px 0 90px;
    display: flex;
    justify-content: space-between;
}
.add-center-text-o span{
    padding: 8px 0 0 0 ;
    width: 80px;
}
.add-center-text{
    width: 100%;
    padding: 40px 60px 0 60px;
    display: flex;
    justify-content: space-between;
}
.add-center-text span{
    padding: 8px 13px 0 0 ;
    width: 120px;
}
.add-head{
    width: 100%;
    height: 60px;
    padding: 20px 31px 20px 60px;
    display: flex;
    justify-content: space-between;
    position: relative;
}
.add-head span{
    font-size: 22px;
    height: 60px;
    font-weight: 600;
}
.add-head img{
    width: 19px;
    height: 19px;
}
.add-head img:hover{
    cursor: pointer;
}
.transverse{
    width: 100%;
    height: 1px;
    background-color: #E6E6E6;
}
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
.pop {
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform:translate(-50%,-50%);
  width: 800px;
  height:529px;
  z-index: 2;
  border-radius: 10px;
}

.btn-text{
  width: 55px;
  height: 13px;
  text-align: center;
}
.btn{
  width: 126px;
  display: flex;
  justify-content: space-between;
  margin: 14px 0;
  
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
.btn-img{
  width: 16px;
  height: 16px;
  position: absolute;
  left: 19px;
  top: 5px;
}
/* 表头 */
.order-Text ul{
    height: 53px;
    width: 100%;
    line-height: 26px;
    display: flex;
    justify-content: space-between;
    line-height: 53px;
    padding: 0 92px 0 79px;
}
.order-Text ul li{
    list-style: none;
}
.operation{
    width: 158px;
}
.pwd{
    width: 131px;
}
.role{
    width: 119px;
}
.name{
    width: 136px;
}
.number{
    width: 200px;
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
    /* height: 80px; */
    background-color: #FFFFFF;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    margin-bottom: 10px;
    padding: 0 92px 0 79px;
    position: relative;
}
p{
    float: left;
}
.name{
    width: 136px;
    /* height: 36px; */
    display: flex;
    align-items: center;
    word-break: break-all;
}
.number{
    width: 200px;
    display: flex;
    align-items: center;
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
.operation{
    width: 158px;
    /* height: 28px; */
    /* margin-top: 20px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.operation input:hover{
    cursor: pointer;
}
.pwd{
    width: 131px;
    display: flex;
    align-items: center;
}
.role{
    width: 119px;
    display: flex;
    align-items: center;
}
/* 分页 */
.Paging{
    padding: 36px 0 40px 0;
    text-align: center;
}
</style>