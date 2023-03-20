<template>
    <div class="whole">
        <div class="search" v-if="judata.hykgl_search">
            <el-input v-model="search.card_name" placeholder="请输入会员卡名"></el-input>
            <!-- <el-date-picker
			  v-model="time"
			  value-format="yyyy-MM-dd HH:mm:ss"
			  type="datetimerange"
		      range-separator="至"
		      start-placeholder="开始日期"
		      end-placeholder="结束日期">
		    </el-date-picker> -->
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
        <!-- 按钮 -->
        <div class="btn">
            <!-- <div class="export" @click="exportExcel"><img src="@/assets/导出@2x.png" alt="">导出</div> -->
            <div class="refresh" @click="Refresh" v-if="judata.hykgl_sx"><img src="@/assets/刷新@2x.png" alt="">刷新</div>
            <div class="refresh" @click="add_teacher" v-if="judata.hykgl_add"><img src="@/assets/添加@2x.png" alt="">添加</div>
        </div>
        <!-- 表格 -->
        <div class="form_head" v-if="judata.hykgl_table">
            <ul>
                <li class="adminid">ID</li>
                <li class="name">场馆</li>
                <li class="name">会员卡封面</li>
                <li class="name">会员卡名</li>
                <li class="name">使用金额/次数</li>
                <li class="name">过期时间</li>
                <li class="operation">操作</li>
            </ul>
        </div>
        <div class="form_information" v-if="judata.hykgl_table">
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
                        <span v-if="item.venue == ''">无</span>
                        <span v-else>{{item.venue[0].venue_name}}</span>
                    </div>
                    <div class="name">
                        <img :src="item.card_image" alt="">
                    </div>
                    <div class="name">
                        <span v-if="item.card_name == -1">未填写</span>
                        <span v-else>{{item.card_name}}</span>
                    </div>
                    <div class="name">
                        <span v-if="item.card_value_type == 1">{{item.count}}次</span>
                        <span v-else-if="item.card_value_type == 2">{{item.count}}元</span>
                    </div>
                    <div class="name">
                        <span v-if="item.expire == -1">无</span>
                        <span v-else>{{item.expire}}天</span>
                    </div>
                    <div class="operation">
                        <el-button size="medium" @click="see_btn(item)" v-if="judata.hykgl_zckc">支持课程</el-button>
                        <el-button size="medium" @click="contact1(item)" v-if="judata.hykgl_edit">修改</el-button>
                        <el-button size="medium" type="danger" @click="delete_btn(item)" v-if="judata.hykgl_del">删除</el-button>
                        <!-- <div class="see" @click="see_btn(item)">支持课程</div>
                        <div class="see" @click="contact1(item)">修改</div>
                        <div class="see" @click="delete_btn(item)">删除</div> -->
                    </div>
                </li>
            </ul>
        </div>
        <!-- 分页 -->
        <div class="Paging" v-if="searchRender && judata.hykgl_table">
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
                            <div class="line">
                                <el-form-item label="封面">
                                    <upload-img :fileList="hotel1FileList" :imgs="hotel1ImageUrl" @change="change" />
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="名称">
                                    <el-input v-model="form.card_name" placeholder="请输入名称"></el-input>
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
                                <!-- <el-form-item label="标签">
                                    <el-input v-model="form.card_tag" placeholder="例：瘦身,减肥"></el-input>
                                </el-form-item> -->
                                <el-form-item label="次数" v-if="form.card_value_type == 1">
                                    <div class="count">
                                        <el-input-number v-model="form.count" @change="handleChange" :min="1" label="请输入次数"></el-input-number>
                                    </div>
                                </el-form-item>
                                <el-form-item label="余额" v-if="form.card_value_type == 2">
                                    <div class="count">
                                        <el-input-number v-model="form.count" @change="handleChange" :min="1" label="请输入余额"></el-input-number>
                                    </div>
                                </el-form-item>
                                <el-form-item label="课程类型">
                                    <el-radio-group v-model="form.card_value_type">
                                        <el-radio :label="1">次卡</el-radio>
                                        <el-radio :label="2">储值</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                            <div class="line">
                                
                            </div>
                            <div class="line">
                                <el-form-item label="过期时间">
                                    <el-input v-model="form.expire" placeholder="请输入过期天数">
                                        <template slot="append">天</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="价格">
                                    <el-input v-model="form.price" placeholder="请输入价格"></el-input>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="特别说明摘要">
                                    <div class="textarea">
                                        <textarea class="bottominput" name="" id="" cols="30" rows="10" v-model="form.remarks" placeholder="请输入特别说明"></textarea>
                                    </div>
                                </el-form-item>
                            </div>
                            <div class="line">
                                <el-form-item label="特别说明">
                                    <div class="">
                                        <vue-ueditor-wrap v-model="form.card_explain" :config="myConfig"></vue-ueditor-wrap>
                                    </div>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="btnMessage">
                <div class="cancel" @click="add_isShow = false">取 消</div>
                <div class="determine" @click="commitArticle(1)" v-if="dialogTitle == '添加会员卡'">确 定</div>
                <div class="determine" @click="commitArticle(2)" v-else-if="dialogTitle == '修改会员卡'">确 定</div>
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
        <div class="see_pop" v-if="see_isShow">
            <img src="@/assets/关闭@2x.png" alt="" @click="see_isShow=false">
            <h2>{{dialogTitle2}}</h2>
            <div class="transverse"></div>
            <div class="content">
                <div class="box">
                    <el-form ref="form" :model="forms" label-width="80px">
                        <div class="line">
                            <el-form-item label="选择课程">
                                <el-select v-model="forms.course_id" multiple collapse-tags placeholder="请选择" style="width:265px">
                                    <el-option
                                    v-for="item in course_id"
                                    :key="item.id"
                                    :label="item.course_name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div class="box_tab">
                        <el-tag class="tab" v-for="(item,index) in course_list" :key="index">
                            {{item}}
                        </el-tag>
                        <!-- <div class="tab" v-for="(item,index) in course_list" :key="index">
                            <div class="">
                                {{item}}
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="btnMessage">
                <div class="cancel" @click="see_isShow = false">取消</div>
                <div class="determine" @click="commitdel1()">确定</div>
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
                venue_id: '',     //场馆ID
                discount: '',      //课程名称
                price: '',      // 价格
                expire: '',      //过期时间
                card_value_type: 2,      //1次卡类型,2储值类型
                count: '',      //次数
                card_tag: '',      //标签（自定义标签，逗号分隔 例：瘦身,减肥
                card_explain: '',      //说明
                card_name: '',      //名称
                card_image: '',      //封面
                use_venue: '',      //会员卡支持的场馆(0表示全部，多场馆json格式
                is_many_venue:0,  //'是否多场馆 1 是  0否'
                remarks: '',      //备注
                operator: '会员卡',      //操作人
            },
            dialogTitle:'添加会员卡',
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
                UEDITOR_HOME_URL:'/wudao/admin/ueditor/'
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
            timer:null,
        }
    },
    created:function(){
        
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
        clearTimeout(this.timer);
    },
    mounted(){
        this.render()
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
                _this.searchRender = true
                this.timer = setTimeout(() => {
                    loading.close();
                }, );
            }).catch(res=>{
                this.$message({
                    message: '网络错误请稍后再试',
                    type:'error'
                });
            })
            api1.query({
                limit:page+','+1000000000,
            }).then(res=>{
                // console.log(res.data.data);
                _this.options = res.data.data.data
            })
        },
        commitdel1(){
            if (this.forms.course_id == '') {
                this.forms.course_id = ''
            }
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
                card_value_type: 1,      //1次卡类型,2储值类型
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
            api1.query({
                limit:'0'+','+'10000000',
            }).then(res=>{
                // console.log(res);
                this.member = res.data.data.data
            })
        },
        // 导出
        exportExcel(){

        },
        // 点击分页获取数据
        changePage(currentPage){
            let _this=this
            this.page = currentPage
            let page = (this.page-1)*this.limit
            if(this.searchData){
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
            let use_venue = []
            for (let j = 0; j < this.form.use_venue.length; j++) {
                for (let i = 0; i < this.member.length; i++) {
                    // console.log(this.form.use_venue[j]);
                    if (this.form.use_venue[j] == this.member[i].id) {
                        let obj = {}
                        obj.id = this.member[i].id
                        obj.msg = this.member[i].venue_name
                        use_venue.push(obj)
                    }
                }
            }
            this.form.use_venue = JSON.stringify(use_venue)
            var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
            // form: {
            //     venue_id: '',     //场馆ID
            //     discount: '',      //课程名称
            //     price: '',      // 价格
            //     expire: '',      //过期时间
            //     card_value_type: 1,      //1次卡类型,2储值类型
            //     count: '',      //次数
            //     card_tag: '',      //标签（自定义标签，逗号分隔 例：瘦身,减肥
            //     card_explain: '',      //说明
            //     card_name: '',      //名称
            //     card_image: '',      //封面
            //     use_venue: '',      //会员卡支持的场馆(0表示全部，多场馆json格式
            //     is_many_venue:0,  //'是否多场馆 1 是  0否'
            //     remarks: '',      //备注
            //     operator: '会员卡',      //操作人
            // },
            if (this.form.card_image == '') {
                this.$message({
                    type:"error",
                    message:'请选择封面'
                })
                return
            } else if (this.form.venue_id == '') {
                this.$message({
                    type:"error",
                    message:'请选择场馆'
                })
                return
            } else if (this.form.card_name == '') {
                this.$message({
                    type:"error",
                    message:'请输入名称'
                })
                return
            } else if (this.form.price == '') {
                this.$message({
                    type:"error",
                    message:'请输入价格'
                })
                return
            } else if (this.form.price.toString().includes('-')) {
                this.$message({
                    type:"error",
                    message:'价格不能是负数'
                })
                return
            } else if (this.form.expire == '') {
                this.$message({
                    type:'error',
                    message:'请输入过期时间'
                })
                return
            } else if (this.form.remarks == '') {
                this.$message({
                    type:'error',
                    message:'请输入特别说明摘要'
                })
                return
            } else if (this.form.card_explain == '') {
                this.$message({
                    type:'error',
                    message:'请输入特别说明'
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
        contact1(arr){
            api1.query({
                limit:'0'+','+'10000000',
            }).then(res=>{
                // console.log(res);
                this.member = res.data.data.data
            })
            this.dialogTitle = "修改会员卡"
            let use_venue = JSON.parse(arr.use_venue)
            // console.log(use_venue);
            let data = []
            for (let i = 0; i < use_venue.length; i++) {
                data.push(use_venue[i].id)
            }
            // console.log(data);
            // return
            this.hotel1FileList = []
            this.form = {
                id:arr.id,
                venue_id:Number(arr.venue_id),     //场馆ID
                discount: arr.discount,      //课程名称
                price: arr.price,      // 价格
                expire: arr.expire,      //过期时间
                card_value_type: Number(arr.card_value_type),      //1次卡类型,2储值类型
                count: arr.count,      //次数
                card_tag: arr.card_tag,      //标签（自定义标签，逗号分隔 例：瘦身,减肥
                card_explain: arr.card_explain,      //说明
                card_name: arr.card_name,      //名称
                card_image: arr.card_image,      //封面
                use_venue:data,      //会员卡支持的场馆(0表示全部，多场馆json格式
                remarks: arr.remarks,      //备注
                is_many_venue:Number(arr.is_many_venue),
                operator: this.creator.data[0].name,      //操作人
            }
            if (arr.card_image != '' && arr.card_image!= '-1') {
                this.hotel1ImageUrl = arr.card_image
                this.hotel1FileList.push({
                  name:'avatar.png',
                  url:arr.card_image
                })
            }
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
        width: 180px;
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
            height: 450px;
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
            width: 1700px;
            height: 80vh;
            overflow: auto;
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
            .count{
                width: 270px;
            }
            .textarea{
                width:690px;
            }
            .textarea{
                //   padding: 20px 0;
                .bottominput{
                    width: 100%;
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