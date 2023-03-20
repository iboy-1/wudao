<template>
    <div class="whole">
        <div class="search" v-if="judata.Jslb_search">
            <el-input v-model="search.real_name" placeholder="请输入老师真实姓名" ></el-input>
            <el-input v-model="search.nickname" placeholder="请输入老师昵称"></el-input>
            <div class="Reset" @click="Reset">重置</div>
            <div class="query" @click="searchOrder"><img src="@/assets/查询.png" alt="">查询</div>
        </div>
        <!-- 按钮 -->
        <div class="btn">
            <div class="refresh" @click="render" v-if="judata.Jslb_sx"><img src="@/assets/刷新@2x.png" alt="">刷新</div>
            <div class="refresh" @click="add_teacher" v-if="judata.Jslb_add"><img src="@/assets/添加@2x.png" alt="">添加</div>
        </div>
        <!-- 表格 -->
        <div class="form_head" v-if="judata.Jslb_table">
            <ul>
                <li class="adminid">ID</li>
                <li class="name">头像</li>
                <li class="name">真实姓名</li>
                <li class="name">昵称</li>
                <li class="phone">年龄</li>
                <li class="pattern">性别</li>
                <li class="time">提交时间</li>
                <!-- <li class="time">操作人</li> -->
                <li class="remarks">备注</li>
                <li class="operation">操作</li>
            </ul>
        </div>
        <div class="form_information" v-if="judata.Jslb_table">
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
                        <img :src="item.avatar" alt="">
                    </div>
                    <div class="name">
                        <span v-if="item.real_name == -1">未填写</span>
                        <span v-else>{{item.real_name}}</span>
                    </div>
                    <div class="name">
                        <span v-if="item.nickname == -1">无</span>
                        <span v-else>{{item.nickname}}</span>
                    </div>
                    <div class="phone">
                        <span v-if="item.age == -1">无</span>
                        <span v-else>{{item.age}}</span>
                    </div>
                    <div class="pattern">
                        <span v-if="item.sex == 0">女</span>
                        <span v-else-if="item.sex == 1">男</span>
                        <span v-else>未知</span>
                    </div>
                    <div class="time">
                        <span v-if="item.add_date == 0 ">无</span>
                        <span v-else>{{item.add_date}}</span>
                    </div>
                    <!-- <div class="time">
                        {{item.operator}}
                    </div> -->
                    <div class="remarks">
                        <span v-if="item.remarks == ''">无</span>
                        <span v-else>{{item.remarks}}</span>
                        
                    </div>
                    <div class="operation">
                        <el-button size="medium" @click="add_btn(item)" v-if="judata.Jslb_jsfc">教师风采</el-button>
                        <el-button size="medium" @click="contact1(item)" v-if="judata.Jslb_edit">修改</el-button>
                        <el-button size="medium" @click="delete_btn(item)" v-if="judata.Jslb_del" type="danger">删除</el-button>
                        <!-- <div class="see" @click="add_btn(item)">教师风采</div>
                        <div class="see" @click="contact1(item)">修改</div>
                        <div class="see" @click="delete_btn(item)">删除</div> -->
                    </div>
                </li>
            </ul>
        </div>
        <!-- 分页 -->
        <div class="Paging" v-if="searchRender  && judata.Jslb_table">
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
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="老师头像">
                                <upload-img :fileList="hotel1FileList" :imgs="hotel1ImageUrl" :imgs_size="imageSize" @change="change" />
                            </el-form-item>
                            <div class="line">
                                <el-form-item label="真实姓名">
                                    <el-input v-model="form.real_name" placeholder="请输入真实姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="场馆">
                                    <el-select v-model="form.venue_id" placeholder="请选择" style="margin-left:0;">
                                        <el-option
                                        v-for="item in member"
                                        :key="item.id"
                                        :label="item.venue_name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="老师名称">
                                    <el-input v-model="form.nickname" placeholder="请输入老师名称"></el-input>
                                </el-form-item>
                                <el-form-item label="年龄">
                                    <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="性别">
                                    <el-radio-group v-model="form.sex">
                                        <el-radio :label="1">男</el-radio>
                                        <el-radio :label="0">女</el-radio>
                                        <el-radio :label="2">未知</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="提成" v-if="form.commission_type == 1">
                                    <el-input v-model="form.commission" placeholder="例：20">
                                        <template slot="append">元</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="提成" v-else-if="form.commission_type == 2">
                                    <el-input v-model="form.commission" placeholder="例：20">
                                        <template slot="append">%</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="添加标签">
                                    <el-input v-model="form.tag" placeholder="例:现代舞,古典舞"></el-input>
                                </el-form-item>
                                <span>*  输入的，必须是英文,</span>
                            </div>
                            <div class="line">
                                <el-form-item label="提成类型">
                                    <el-radio-group v-model="form.commission_type">
                                        <el-radio :label="1">固定</el-radio>
                                        <el-radio :label="2">百分比</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="备注">
                                    <el-input v-model="form.remarks" placeholder="请输入备注"></el-input>
                                </el-form-item>
                                <el-form-item label="个性签名">
                                    <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 1, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="form.subtitle" class="textarea">
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="个人简介">
                                    <div class="">
                                        <vue-ueditor-wrap v-model="form.profile" :config="myConfig"></vue-ueditor-wrap>
                                    </div>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="btnMessage">
                <div class="cancel" @click="add_isShow = false">取 消</div>
                <div class="determine" @click="commitArticle(1)" v-if="dialogTitle == '添加导师信息'">确 定</div>
                <div class="determine" @click="commitArticle(2)" v-else-if="dialogTitle == '修改导师信息'">确 定</div>
                <!-- <div class="cancel" @click="del_isShow = false">取消</div>
                <div class="determine" @click="commitdel()">确定</div> -->
            </div>
        </div>

        <div class="mask" v-if="del_isShow" @click="del_isShow = false"></div>
        <div class="pop" v-if="del_isShow">
            <img src="@/assets/关闭@2x.png" alt="" @click="del_isShow=false">
            <h2>{{dialogTitle1}}</h2>
            <div class="transverse"></div>
            <div class="content1">
                <span>
                    温馨提示：删除老师会影响与该老师有关的课程
                </span>
            </div>
            <div class="btnMessage">
                <div class="cancel" @click="del_isShow = false">取消</div>
                <div class="determine" @click="commitdel()">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
// import FileSaver from "file-saver";
// import XLSX from "xlsx";
import $ from 'jquery'
import api from"@/api/teacher.js";
import api1 from"@/api/studis.js";
import uploadImg from '@/components/uploadImg/uploadImg.vue';
import VueUeditorWrap from "vue-ueditor-wrap";
import { Carousel } from 'element-ui';
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
            ExcelList:[],//导出列表
            add_isShow:false, //添加导师信息
            dialogTitle:"添加导师信息",
            dialogTitle1:'是否删除该老师',
            userInfo:[],
            searchRender:false,//分页是否显示
            searchData:false,//是否为搜索
            search:{
                real_name:'',
                nickname:'',
            },//搜索的参数
            content:"",//
            contents:'',//富文本
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
            },
            disabled:false,
            remarks:"",//备注信息
            Message:false,
            time:[],
            info:[],
            judata:{},//权限
            form: {
                nickname: '',
                venue_id:'',
                real_name:'',
                subtitle:'',
                avatar:'',
                sex: 1,
                age: '',
                commission_type:1,
                operator:'操作人',
                commission:'',
                remarks:'',
                profile:'',
                tag:'',
            },
            member:[],
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',
            hotel1FileList:[],
            hotel1ImageUrl:'',
            del_isShow:false,
            see_isShow:false,
            del_id:'',
            teacher_info:[],
            dialogTitle2:"查看老师信息",
            hideUpload:false,
            dialogad:false,
            imageUrl:'',
            fileList: [],
            creator:JSON.parse(localStorage.getItem('WuDaoeducation')),
            teacher_id:'',
            imageSize:0.5,
            timer:null,
        }
    },
    created:function(){
        if (this.creator.data[0].teacher_id != '') {
            this.teacher_id = this.creator.data[0].teacher_id
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
        change(url){
            // console.log(url);
            this.hotel1ImageUrl = url
            this.form.avatar = url
        },
        upload_btn(param){
            // console.log(param);
            let _this = this
            let formData = new FormData()
                formData.append("file",param.file)
            $.ajax({
                url:'https://keep.gxhxinfo.com/feedback/v1/Home/upfile',
                data: formData,
                header:{"Access-Control-Allow-Origin": "*"},
                type: "POST",
                dataType: "json",
                processData: false,
                contentType: false,
                success: function(res) {
                    // console.log(res);
                    _this.imageUrl = res.url
                    _this.form.avatar = "https://keep.gxhxinfo.com/upload/" + res.file
                }
            })
        },
        Preview(file){
            // console.log(file);
            this.imageUrl = file.url;
            this.dialogad = true;
        },
        removeadPho(file,fileList){
            // console.log(file,fileList);
        },
        uploadChange(file,fileList){
            // console.log(file,fileList);
            this.hideUpload = fileList.length >= 1
            // console.log(this.hideUpload)
        },
        Max(file){
            this.$message.error("最多上传一张照片");
            return false
        },
        //添加
        add_teacher(){
            this.dialogTitle = '添加导师信息'
            // this.fileList = []
            this.hotel1FileList = []
            this.form = {
                id:'',
                nickname: '',
                venue_id:'',
                real_name:'',
                subtitle:'',
                avatar:'',
                sex:1,
                age:'',
                commission_type:1,
                operator:this.creator.data[0].name,
                commission:'',
                remarks:'',
                profile:''
            }
            api1.query({
                limit:'0'+','+'10000000',
            }).then(res=>{
                // console.log(res);
                this.member = res.data.data.data
            })
            this.add_isShow = true
        },
        commitArticle(val){
            // console.log(this.form);
            var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
            
            if (this.form.avatar == '') {
                this.$message({
                    type:'error',
                    message:'请选择头像'
                })
                return
            } else if (this.form.real_name == '') {
                this.$message({
                    type:'error',
                    message:'请填写真实姓名'
                })
                return
            } else if (this.form.nickname == '') {
                this.$message({
                    type:'error',
                    message:'请填写老师名称'
                })
                return
            } else if (this.form.venue_id == '') {
                this.$message({
                    type:'error',
                    message:'请选择场馆'
                })
                return
            } else if (this.form.tag == '') {
                this.$message({
                    type:'error',
                    message:'请填写标签'
                })
                return
            } else if(reg.test(this.form.tag)){
                this.$message({
                    type:'error',
                    message:'标签当中的符号是中文符号,请更改为英文符号'
                })
                return   
            } else if (this.form.commission == '') {
                this.$message({
                    type:'error',
                    message:'请输入提成'
                })
                return
            } else if(this.form.age == ''){
                this.$message({
                    type:'error',
                    message:'请输入年龄'
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
                        this.render()
                        this.add_isShow = false
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
                        this.render()
                        this.add_isShow = false
                    } else {
                        this.$message({
                            type:'error',
                            message:res.data.data
                        })
                    }
                })
            }
            
        },
        delete_btn(arr){
            this.del_isShow = true
            this.del_id = arr.id
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
                teacher_id:this.teacher_id,
                limit:page+','+this.limit,
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
        //刷新
        Refresh(){
            this.render()
        },
        //备注
        contact(){

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
        see_btn(arr){
            this.teacher_info = arr
            this.see_isShow = true
        },
        add_btn(arr){
            this.$router.push({
                name:'Carousel',
                query:{
                    id:arr.id,
                    name:arr.nickname
                }
            })
        },
        //
        contact1(arr){
            this.dialogTitle = "修改导师信息"
            // console.log(arr);
            api1.query({
                limit:'0'+','+'10000000',
            }).then(res=>{
                // console.log(res);
                this.member = res.data.data.data

            })
            // this.fileList = []
            this.hotel1FileList = []
            this.form = {
                id:arr.id,
                nickname: arr.nickname,
                venue_id:Number(arr.venue_id),
                real_name:arr.real_name,
                subtitle:arr.subtitle,
                avatar:arr.avatar,
                sex:Number(arr.sex),
                age:arr.age,
                commission_type:Number(arr.commission_type),
                operator:this.creator.data[0].name,
                commission:arr.commission,
                remarks:arr.remarks,
                profile:arr.profile,
                tag:arr.tag,
            }
            // this.imageUrl = arr.avatar
            if (arr.avatar != '' && arr.avatar!= '-1') {
                this.imageUrl = arr.avatar
                this.hotel1FileList.push({
                  name:'avatar.png',
                  url:arr.avatar
                })
            }
            // console.log(this.hotel1FileList);
            this.add_isShow = true
        },
        //重置按钮
        Reset(){
            this.search = {
			    real_name:'',
                nickname:'',
			},
            this.render()
        },
        // //搜索
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
            obj.teacher_id = this.teacher_id,
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
        // 点击分页
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
                obj.teacher_id = this.teacher_id,
                // this.searchRender = false
                api.query(obj).then(res=>{
                    // console.log(res.data.data);
                    _this.list = res.data.data.data
                    // _this.count = res.data.data.count
                })
            }else{
                api.query({
                    teacher_id:this.teacher_id,
                    limit:page+','+this.limit,
                }).then(res=>{
                    // console.log(res.data.data);
                    this.list = res.data.data.data
                })
            }
        },
        changePower(){},
        //导出
        exportExcel() {
            
        },
        Excel(){
            let _this = this
            if(_this.ExcelList.length == '0'){
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
                if (typeof console !== "undefined") console.log(e, wbout);
            }
            return wbout;
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
            border-radius: 50%;
        }
    }
    .phone{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .pattern{width: 100px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
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
        z-index: 1;
    }
    .pop {
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%,-50%);
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
            width: 620px;
            // height:50px ;
            color: #FF3333;
            text-align: center;
            line-height: 50px;
        }
        .content{
            width: 1700px;
            height:80vh;
            overflow: auto;
            padding:20px;
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
<style scoped>
/deep/.el-dialog {
  margin: 5vh auto !important;
}

/deep/ .el-dialog__body {
  height: 80vh;
  overflow: auto;
}
</style>