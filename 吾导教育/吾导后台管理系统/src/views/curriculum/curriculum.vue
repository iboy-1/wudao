<template>
    <div class="whole">
        <div class="fanhui">
            <el-button @click="render">返回</el-button>
            <h2>当前工作室：{{member_name}}</h2>
        </div>
        <!-- 按钮 -->
        <div class="btn">
            <!-- <div @click="render">返回</div> -->
            <div class="refresh" @click="add_teacher"><img src="@/assets/添加@2x.png" alt="">添加</div>
        </div>
        <!-- 表格 -->
        <div class="form_head" >
            <ul>
                <li class="adminid">ID</li>
                <li class="name">课程封面</li>
                <li class="name">课程名称</li>
                <li class="name">课程类型</li>
                <li class="name">人数</li>
                <li class="name">开课老师</li>
                <li class="time">开课日期</li>
                <li class="time">开课时间</li>
                <li class="time">结课时间</li>
                <li class="time">预约截至时间</li>
                <li class="operation">操作</li>
            </ul>
        </div>
        <div class="form_information" >
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
                        <img :src="item.images" alt="图片">
                    </div>
                    <div class="name">
                        <span v-if="item.course_name == -1">未填写</span>
                        <span v-else>{{item.course_name}}</span>
                    </div>
                    <div class="name">
                        <span v-if="item.course_type == 1">私教</span>
                        <span v-else>团课</span>
                    </div>
                    <div class="name">
                        <span v-if="item.number == -1">无</span>
                        <span v-else>{{item.number}}</span>
                    </div>
                    <div class="name">
                        <span v-if="item.teacher == null">无</span>
                        <span v-else>{{item.teacher.nickname}}</span>
                    </div>
                    <div class="time">
                        <span v-if="item.course_manage == '' || item.course_manage == null">无</span>
                        <span v-else>{{item.course_manage.start_date}}</span>
                    </div>
                    <div class="time">
                        <span v-if="item.course_manage == '' || item.course_manage == null">无</span>
                        <span v-else>{{item.course_manage.start_time}}</span>
                    </div>
                    <div class="time">
                        <span v-if="item.course_manage == '' || item.course_manage == null">无</span>
                        <span v-else>{{item.course_manage.end_time}}</span>
                    </div>
                    <div class="time">
                        <span v-if="item.course_manage == '' || item.course_manage == null">无</span>
                        <span v-else>{{item.course_manage.deadline}}</span>
                    </div>
                    <div class="operation">
                        <el-button size="medium" @click="see_btn(item)">课程视频</el-button>
                        <el-button size="medium" @click="contact1(item)">修改</el-button>
                        <el-button size="medium" @click="delete_btn(item)">删除</el-button>
                        <!-- <div class="see" @click="see_btn(item)">课程视频</div>
                        <div class="see" @click="contact1(item)">修改</div>
                        <div class="see" @click="delete_btn(item)">删除</div> -->
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
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="封面">
                                <upload-img :fileList="hotel1FileList" :imgs="hotel1ImageUrl" @change="change" />
                            </el-form-item>
                            <div class="line">
                                <el-form-item label="课程价格">
                                    <el-input v-model="form.price" placeholder="请输入课程价格"></el-input>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="课程名称">
                                    <el-input v-model="form.course_name" placeholder="请输入课程名称"></el-input>
                                </el-form-item>
                                <el-form-item label="开课老师">
                                    <el-select v-model="form.teacher_id" placeholder="请选择" style="margin-left: 0px;">
                                        <el-option
                                        v-for="item in teacher"
                                        :key="item.id"
                                        :label="item.nickname"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="备注">
                                    <el-input v-model="form.remarks " placeholder="请输入备注"></el-input>
                                </el-form-item>
                                <el-form-item label="课程介绍">
                                    <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 1, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model="form.introduce" class="textarea">
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="标签">
                                    <el-input v-model="form.tag" placeholder="例：瘦身,减肥"></el-input>
                                </el-form-item>
                                <el-form-item label="人数">
                                    <el-input v-model="form.number" placeholder="请输入人数"></el-input>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="开课日期">
                                    <el-date-picker style="width:155px"
                                    v-model="form.start_date"
                                    value-format="yyyy-MM-dd"
                                    type="date"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="开课时间">
                                    <el-date-picker style="width:155px"
                                    v-model="form.start_time"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="结课时间">
                                    <el-date-picker style="width:155px"
                                    v-model="form.end_time"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    type="datetime"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="预约截至时间">
                                    <el-date-picker style="width:155px"
                                    v-model="form.deadline"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="课程类型">
                                    <el-radio-group v-model="form.course_type">
                                        <el-radio :label="1">私教</el-radio>
                                        <el-radio :label="2">团课</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="btnMessage">
                <div class="cancel" @click="add_isShow = false">取 消</div>
                <div class="determine" @click="commitArticle(1)" v-if="dialogTitle == '添加课程'">确 定</div>
                <div class="determine" @click="commitArticle(2)" v-else-if="dialogTitle == '修改课程'">确 定</div>
                <!-- <div class="cancel" @click="add_isShow = false">取消</div>
                <div class="determine" @click="commitdel()">确定</div> -->
            </div>
        </div>

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

        <div class="mask" v-if="see_isShow" @click="see_isShow = false"></div>
        <div class="pop" v-if="see_isShow">
            <img src="@/assets/关闭@2x.png" alt="" @click="see_isShow=false">
            <h2>{{dialogTitle2}}</h2>
            <div class="transverse"></div>
            <div class="content">
                <div class="box">
                    <el-form ref="form" :model="form1" label-width="80px">
                        <el-form-item label="封面">
                            <upload-img :fileList="hotel1FileList1" :imgs="hotel1ImageUrl1" @change="change1" />
                        </el-form-item>
                        <div class="line">
                            <el-form-item label="选择视频">
                                <el-upload
                                    ref="upload"
                                    action="##"
                                    :http-request="upload_btn"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                    :before-remove="removevideo"
                                    :auto-upload="true"
                                    :file-list="fileList1"
                                    accept=".mp4"
                                    :limit="1"
                                    :data="form"
                                >
                                    <el-button slot="trigger" size="small" type="primary">选取视频</el-button>
                                </el-upload>
                            </el-form-item>
                        </div>
                        <video v-if="videoUrl != ''" :src="videoUrl" autoplay controls id="hotelVideo" class="hotelVideo"></video>
                    </el-form>
                </div>
            </div>
            <div class="btnMessage">
                <div class="cancel" @click="see_isShow = false">取消</div>
                <div class="determine" @click="add_video()">确定</div>
            </div>
        </div>

        <!-- <el-dialog :title="dialogTitle2" :visible.sync="see_isShow" center width="800px">
            <div class="memu">
                <div class="box">
                    <el-form ref="form" :model="form1" label-width="80px">
                        <el-form-item label="封面">
                            <upload-img :fileList="hotel1FileList1" :imgs="hotel1ImageUrl1" @change="change1" />
                        </el-form-item>
                        <div class="line">
                            <el-form-item label="选择视频">
                                <el-upload
                                    ref="upload"
                                    action="##"
                                    :http-request="upload_btn"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                    :before-remove="removevideo"
                                    :auto-upload="true"
                                    :file-list="fileList1"
                                    accept=".mp4"
                                    :limit="1"
                                    :data="form"
                                >
                                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                </el-upload>
                                <p v-if="videoUrl == ''">选择视频</p>
                            </el-form-item>
                        </div>
                        <video v-if="videoUrl != ''" :src="videoUrl" autoplay controls id="hotelVideo" class="hotelVideo"></video>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="see_isShow = false">取 消</el-button>
                    <el-button type="primary" @click="add_video()">确 定</el-button>
                </div>
            </div>
        </el-dialog> -->
    </div>
</template>

<script>
import $ from 'jquery'
import api from"@/api/curriculum.js";
import api1 from"@/api/teacher.js";
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
            list:[],//列表
            searchRender:false,//分页是否显示
            searchData:false,//是否为搜索
            form: {
                organization_id:'', //场馆ID
                course_name: '',                //课程名称
                price: '',                //价格
                course_type:2,                //课程类型（1私教，2团课
                images: '',                //图片
                introduce: '',                //介绍
                tag: '',                //标签（自定义标签，逗号分隔 例：瘦身,减肥
                teacher_id: '',                //开课老师id
                number: '',                //人数
                remarks: '',                //备注
                operator: '课程',                //操作人
                start_time:'',                  //开课时间 24小时制
                end_time:'',                    //结课时间
                start_date:'',                  //开课日期
                deadline:'',                    //预约截至时间 24小时制
            },
            dialogTitle:'添加课程',
            add_isShow:false,
            see_isShow:false,
            del_isShow:false,
            del_id:'',
            dialogTitle1:'是否删除该课程',
            dialogTitle2:"课程视频",
            member_name:'',
            member_id:'',
            teacher:[],
            hotel1FileList:[],
            hotel1ImageUrl:'',
            hotel1FileList1:[],
            hotel1ImageUrl1:'',
            imageUrl:'',
            fileList: [],
            fileList1: [],
            videoUrl:'',
            form1: {
                course_id:'',        //课程id
                images:'',           //视频封面
                video_url:'',        //视频地址
            },
            creator:JSON.parse(localStorage.getItem('WuDaoeducation')),
        }
    },
    watch:{
        see_isShow(val){
            if (val == false) {
                this.hotel1FileList1 = []
                this.videoUrl = ''
            } else {
                
            }
        }
    },
    created(){
        this.member_name = this.$route.query.member_name
        this.member_id = this.$route.query.member_id
    },
    mounted(){
        this.member()
    },
    methods:{
        handleAvatarSuccess(res,file){
          this.$console(res,file)
        //   console.log(res.key);
        //   console.log(res);
          this.videoUrl = 'http://video.lvdunyun.cn/' + res.key
        },
        beforeAvatarUpload(file){

        },
        removevideo(){

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
                    _this.videoUrl = res.url
                }
            })
        },
        change(url){
            // console.log(url);
            this.hotel1ImageUrl = url
            this.form.images = url
        },
        change1(url){
            // console.log(url);
            this.hotel1ImageUrl1 = url
            this.form1.images = url
        },
        add_video(){
            // console.log(this.teacher_info);
            this.form1 = {
                course_id:this.teacher_info.id,        //课程id
                images:this.hotel1ImageUrl1,           //视频封面
                video_url:this.videoUrl,        //视频地址
            },
            api.addCourseVideo(this.form1).then(res=>{
                // console.log(res);
                if (res.data.code == 200) {
                    this.$message({
                        type:'success',
                        message:res.data.data
                    })
                    this.member()
                    this.see_isShow = false
                } else {
                    this.$message({
                        type:'error',
                        message:res.data.data
                    })
                }
            })
        },
        //主列表
        member(){
            let _this=this
            this.page = 1
            let page = (this.page - 1)*this.limit
            this.searchRender = false
            api.query({
                organization_id:this.member_id,
                limit:page+','+this.limit,
            }).then(res=>{
                // console.log(res.data.data);
                _this.list = res.data.data.data
                _this.count = res.data.data.count
                _this.searchRender = true
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
                    this.member()
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
            this.member()
        },
        //添加
        add_teacher(){
            this.hotel1FileList = []
            this.dialogTitle = "添加课程"
            this.form = {
                organization_id:this.member_id, //场馆ID
                course_name: '',                //课程名称
                price: '',                //价格
                course_type:2,                //课程类型（1私教，2团课
                images: '',                //图片
                introduce: '',                //介绍
                tag: '',                //标签（自定义标签，逗号分隔 例：瘦身,减肥
                teacher_id: '',                //开课老师id
                number: '',                //人数
                remarks: '',                //备注
                operator:this.creator.data[0].name,               //操作人
                start_time:'',                  //开课时间
                end_time:'',                    //结课时间
                start_date:'',                  //开课日期
                deadline:'',                    //预约截至时间
            },
            api1.getTeacher({
                // venue_id:this.member_id,
                limit:'0,1000000000'
            }).then(res=>{
                // console.log(res);
                this.teacher = res.data.data
            })
            this.add_isShow = true
            // console.log(123);
        },
        // 导出
        exportExcel(){

        },
        // 刷新
        render(){
            this.$router.push({
                name:'studio'
            })
        },
        changePage(val){
            this.page = val
            let page = (this.page-1)*this.limit
            api.query({
                organization_id:this.member_id,
                limit:page+','+this.limit,
            }).then(res=>{
                // console.log(res.data.data);
                this.list = res.data.data.data
                // this.count = res.data.data.count
            })
        },
        commitArticle(val){
            // form: {
            //     organization_id:'', //场馆ID
            //     course_name: '',                //课程名称
            //     price: '',                //价格
            //     course_type:2,                //课程类型（1私教，2团课
            //     images: '',                //图片
            //     introduce: '',                //介绍
            //     tag: '',                //标签（自定义标签，逗号分隔 例：瘦身,减肥
            //     teacher_id: '',                //开课老师id
            //     number: '',                //人数
            //     remarks: '',                //备注
            //     operator: '课程',                //操作人
            //     start_time:'',                  //开课时间 24小时制
            //     end_time:'',                    //结课时间
            //     start_date:'',                  //开课日期
            //     deadline:'',                    //预约截至时间 24小时制
            // },
            var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
            
            if (this.form.images == '') {
                this.$message({
                    type:"error",
                    message:'请选择图片'
                })
                return
            } else if (this.form.price == '') {
                this.$message({
                    type:"error",
                    message:'请输入课程价格'
                })
                return
            } else if (this.form.course_name == '') {
                this.$message({
                    type:"error",
                    message:'请输入课程名称'
                })
                return
            } else if (this.form.teacher_id == '') {
                this.$message({
                    type:"error",
                    message:'请输入开课老师'
                })
                return
            } else if (this.form.tag == '') {
                this.$message({
                    type:'error',
                    message:'请输入标签'
                })
                return
            } else if(reg.test(this.form.tag)){
                this.$message({
                    type:'error',
                    message:'标签当中的符号是中文符号,请更改为英文符号'
                })
                return   
            } else if (this.form.number == '') {
                this.$message({
                    type:'error',
                    message:'请输入开课人数'
                })
                return
            } else if (this.form.start_time == '') {
                this.$message({
                    type:'error',
                    message:'请输入开课时间'
                })
                return
            } else if (this.form.end_time == '') {
                this.$message({
                    type:'error',
                    message:'请输入结课时间'
                })
                return
            } else if (this.form.start_date == '') {
                this.$message({
                    type:'error',
                    message:'请输入开课日期'
                })
                return
            } else if (this.form.deadline == '') {
                this.$message({
                    type:'error',
                    message:'请输入预约截至时间'
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
                        this.member()
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
                         this.member()
                    } else {
                        this.$message({
                            type:'error',
                            message:res.data.data
                        })
                    }
                    
                })
            }
        },
        contact1(arr){
            this.dialogTitle = "修改课程"
            this.hotel1FileList = []
            this.form = {
                id:arr.id,
                // organization_id:arr.member_id, //场馆ID
                course_name: arr.course_name,                //课程名称
                price: arr.price,                //价格
                course_type:Number(arr.course_type),                //课程类型（1私教，2团课
                images: arr.images,                //图片
                introduce: arr.introduce,                //介绍
                tag: arr.tag,                //标签（自定义标签，逗号分隔 例：瘦身,减肥
                teacher_id:Number(arr.teacher_id),                //开课老师id
                number: arr.number,                //人数
                remarks: arr.remarks,                //备注
                operator:this.creator.data[0].name,               //操作人
                start_time:arr.course_manage.start_time,                  //开课时间
                end_time:arr.course_manage.end_time,                    //结课时间
                start_date:arr.course_manage.start_date,                  //开课日期
                deadline:arr.course_manage.deadline,                    //预约截至时间
            }
            if (arr.images != '' && arr.images!= '-1') {
                this.hotel1ImageUrl = arr.images
                this.hotel1FileList.push({
                  name:'avatar.png',
                  url:arr.images
                })
            }
            api1.getTeacher({
                // venue_id:this.member_id,
                limit:'0,1000000000'
            }).then(res=>{
                // console.log(res);
                this.teacher = res.data.data
                this.add_isShow = true
            })
        },
        add_btn(val){
            this.$router.push({
                name:'curriculum',
                query:{
                    member_id:val.id
                }
            })
        },
        delete_btn(arr){
            this.del_isShow = true
            this.del_id = arr.id
        },
        see_btn(arr){
            this.hotel1FileList1 = []
            this.fileList1 = []
            this.videoUrl = ''
            // debugger
            if (arr.video == null) {
                this.form1 = {
                    course_id:arr.id,        //课程id
                    images:'',           //视频封面
                    video_url:'',        //视频地址
                }
            } else {
                this.form1 = {
                    course_id:arr.id,        //课程id
                    images:arr.video.images,           //视频封面
                    video_url:arr.video.video_url,        //视频地址
                }
                if (arr.video.images != '' && arr.video.images!= '-1') {
                    this.imageUrl = arr.video.images
                    this.hotel1FileList1.push({
                    name:'avatar.png',
                    url:arr.video.images
                    })
                }
                if (arr.video.video_url != '') {
                    this.videoUrl = arr.video.video_url
                }
            }
            this.teacher_info = arr
            this.see_isShow = true
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
    .hotelVideo{
        width: 100%;
        height: 500px;
    }
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
            width: 80px;
            height: 80px;
            border-radius: 10px;
        }
    }
    .phone{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
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
        height: 28px;
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
            padding: 20px;
            .box{
                width: 1300px;
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
            .textarea{
                width: 400px;
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