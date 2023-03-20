<template>
    <div class="whole">
        <!-- 按钮 -->
        <div class="btn" v-if="judata.hdgl_add">
            <div class="problem"  @click="addProblem"><img  class="btn-img" src="@/assets/添加.png" alt=""></div>
            <div class="problem_text">添加活动</div>
        </div>
        <!-- 添加问题 -->
        <div class="add_mask" v-if="addMemu" @click="addMemu=false"></div>
        <div class="add_pop" v-if="addMemu">
            <div class="add_head">
                <div class="text"><span>添加活动</span></div>
                <div class="img" @click="addMemu=false"><img  class="btn-img" src="@/assets/关闭.png" alt=""></div>
            </div>
            <div class="transverse"></div>
            <div class="add_content">
                <div class="input1">
                    <div class="text"><span>活动封面</span></div>
                    <div class="">
                        <upload-img :fileList="hotel1FileList" :imgs="hotel1ImageUrl" @change="change" />
                    </div>
                </div>
                <div class="input1">
                    <div class="text"><span>活动标题</span></div>
                    <div class=""><el-input v-model="form.activity_title" placeholder="输入内容标题"></el-input></div>
                </div>
                <div class="input1">
                    <div class="text"><span>活动状态</span></div>
                    <div class="">
                        <el-radio v-model="form.status" label="1">开始</el-radio>
                        <!-- <el-radio v-model="form.status" label="2">进行中</el-radio> -->
                        <el-radio v-model="form.status" label="0">结束</el-radio>
                    </div>
                </div>
                <div class="input2">
                    <div class="text"><span>选择场馆</span></div>
                    <div class="">
                        <el-select v-model="form.venue_id" placeholder="选择场馆">
                            <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.venue_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="input1">
                    <div class="text"><span>活动时间</span></div>
                    <div class="">
                        <el-date-picker
                        style="width: 400px;"
                        v-model="time"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="input1">
                    <div class="text"><span>活动简介</span></div>
                    <div class="textarea">
                        <textarea class="bottominput" name="" id="" cols="30" rows="10" v-model="form.activity_introduction" placeholder="请输入活动简介"></textarea>
                    </div>
                </div>
                <div class="input3">
                    <div class="text"><span>活动内容</span></div>
                    <div class="">
                        <vue-ueditor-wrap v-model="form.activity_content" :config="myConfig" ></vue-ueditor-wrap>
                    </div>
                </div>
            </div>
            <div class="add_pop_bottom">
                <div class="pop_bottom">
                    <div class="cancel" @click="addMemu = false">取消</div>
                    <div class="determine" @click="commit">确定</div>
                </div>
            </div>
        </div>
        <!-- 表格 -->
        <div class="form_head" v-if="judata.hdgl_tbale">
            <ul>
                <li class="problem">活动标题</li>
                <li class="problem">活动简介</li>
                <li class="answer"><span>活动内容</span></li>
                <li class="problem1">状态</li>
                <li class="problem">开始时间</li>
                <li class="problem">结束时间</li>
                <li class="problem">是否开启活动</li>
                <li class="operation">操作</li>
            </ul>
        </div>
        <!-- 列表 --> 
        <div class="form_information" v-if="judata.hdgl_tbale">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <div class="blue"></div>
                    <div class="problem">
                        <p>{{item.activity_title}}</p>
                    </div>
                    <div class="problem">
                        <p>{{item.activity_introduction}}</p>
                    </div>
                    <div class="answer">
                        <p class="_descBox" v-html="item.activity_content"></p>
                    </div>
                    <div class="problem1">
                        <p v-if="item.status == 0" style="color:#F56C6C;">结束</p>
                        <p v-if="item.status == 1" style="color:#67C23A;">进行中</p>
                        <p v-if="item.status == 2" style="color:#67C23A;">进行中</p>
                    </div>
                    <div class="problem">
                        <p>{{item.start_time}}</p>
                    </div>
                    <div class="problem">
                        <p>{{item.end_time}}</p>
                    </div>
                    <div class="problem">
                        <el-switch
                        :width="30"
                        v-model="item.status"
                        active-text="开始"
                        inactive-text="关闭"
                        active-value="1"
                        inactive-value="0"
                        @change="switchChange(item.status,item)"
                        active-color="#13ce66"
                        inactive-color="#ff4949" v-if="judata.hdgl_kg">
                        </el-switch>
                    </div>
                    <div class="operation">
                        <el-button @click="changeProblem(item)"  v-if="judata.hdgl_edit">编辑</el-button>
                        <el-button @click="Delete(item.id)" v-if="judata.hdgl_del">删除</el-button>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 分页 -->
        <div class="Paging" v-if="judata.hdgl_tbale">
            <el-pagination background layout="prev, pager, next" @current-change="changePage" :total="count"></el-pagination>
        </div>
        <div class="add_mask" v-if="del_isShow" @click="del_isShow = false"></div>
        <div class="pop" v-if="del_isShow">
            <img src="@/assets/关闭@2x.png" alt="" @click="del_isShow=false">
            <h2>是否要删除该活动</h2>
            <div class="transverse"></div>
            <div class="content1"></div>
            <div class="btnMessage">
                <div class="cancel" @click="del_isShow = false">取消</div>
                <div class="determine" @click="commitdel()">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/api/activity'
    import api1 from"@/api/studis.js";
    import uploadImg from '@/components/uploadImg/uploadImg.vue';
    import VueUeditorWrap from "vue-ueditor-wrap";
    export default {
        name: 'Dashboard',
        components:{
            uploadImg,
            VueUeditorWrap,
        },
        data(){
            return {
                addMemu:false,
                count:0,
                list:[],
                problem:'',
                contents:'',
                sort:'',
                radio: '-1',
                id:'',
                searchRender:false,
                memuTitle:'添加活动',
                value:'',
                options:[],
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
                    imageUrlPrefix:'http://keep.gxhxinfo.com/'
                },
                judata:{},//权限
                form:{
                    activity_title:"",
                    venue_id:'',
                    activity_introduction:'',
                    activity_image:'',
                    status:1,
                    activity_content:'',
                },
                hotel1FileList:[],
                hotel1ImageUrl:'',
                time:[],
                del_isShow:false,
                del_id:'',
                value2: true,
                timer:null,
            }
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
            this.changePower()
        },
        methods:{
            switchChange(e,val){
                // console.log(e,val);
                api.updateActivity({
                    id:val.id,
                    status:e
                }).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message: res.data.data,
                            type:'success'
                        });
                        this.addMemu = false
                        this.render()
                    }else{
                        this.$message({
                            message: res.data.data.info
                        });
                    }
                }).catch(res=>{
                    this.$message({
                        message: '网络错误请稍后再试',
                        type:'error'
                    });
                })
            },
            change(url){
                // console.log(url);
                this.hotel1ImageUrl = url
                this.form.activity_image = url
            },
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
            changeSort(item,index){
                if (item.sort.toString().includes('-')) {
                    this.$message({
                        type:"error",
                        message:'排序不能是负数'
                    })
                    return  this.render()
                } 
                api.updateCommonProblemContents({
                    id:item.id,
                    poblem_group_id:item.poblem_group_id,
                    title:item.title,
                    sort:item.sort,
                    contents:item.contents,
                }).then(res=>{
                    if(res.data.code == 200){
                        this.$message({
                            message: '编辑成功',
                            type:'success'
                        });
                        this.render()
                    }else{
                        this.$message({
                            message: res.data.data.info
                        });
                    }
                }).catch(res=>{
                    this.$message({
                        message: '网络错误请稍后再试',
                        type:'error'
                    });
                })
            },
            render(){
                let _this = this
                this.searchRender = false
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                api.queryActivity({
                    page:1,
                    listrows:10
                }).then(res=>{
                    this.searchRender = true
                    this.count = res.data.data.count
                    this.list = res.data.data.data
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
                    limit:'0,100000000000',
                }).then(res=>{
                    // console.log(res.data.data);
                    _this.options = res.data.data.data
                }).catch(res=>{
                    this.$message({
                        message: '网络错误请稍后再试',
                        type:'error'
                    });
                })
            },
            changePage(val){
                let _this = this
                this.page = val
                api.queryActivity({
                    page:val,
                    listrows:10,
                }).then(res=>{
                    // console.log(res);
                    this.count = res.data.data.count
                    this.list = res.data.data.data
                })
            },
            addProblem(){
                this.memuTitle = '添加活动'
                this.time = []
                this.hotel1FileList = []
                this.hotel1ImageUrl = ''
                this.form =  {
                    activity_title:"",
                    venue_id:'',
                    activity_introduction:'',
                    activity_image:'',
                    status:'1',
                    activity_content:'',
                }
                this.addMemu = true
            },
            changeProblem(arr){
                // console.log(arr);
                this.memuTitle = '编辑活动'
                // for(let i=0 ; i<this.options.length ; i++){
                //     if(this.options[i].id == item.poblem_group_id){
                //         this.value = this.options[i].poblem_group_name
                //     }
                // }
                this.hotel1FileList = []
                this.time = []
                this.hotel1ImageUrl = ''
                this.time.push(arr.start_time)
                this.time.push(arr.end_time)
                this.form =  {
                    id:arr.id,
                    activity_title:arr.activity_title,
                    venue_id:Number(arr.venue_id),
                    activity_introduction:arr.activity_introduction,
                    activity_image:arr.activity_image,
                    status:arr.status,
                    activity_content:arr.activity_content,
                }
                if (arr.status  == 2) {
                    this.form.status = '1'
                }
                if (arr.activity_image != '' && arr.activity_image!= '-1') {
                    this.hotel1ImageUrl = arr.activity_image
                    this.hotel1FileList.push({
                    name:'avatar.png',
                    url:arr.activity_image
                    })
                }
                // console.log(this.time);
                this.addMemu = true
            },
            commit(){
                let _this = this
                if(this.form.activity_title == ''){
                    this.$message({
                        message: '请输入活动标题'
                    });
                    return false
                } else if (this.form.venue_id == '') {
                    this.$message({
                        message: '请选择场馆'
                    });
                    return false
                } else if (this.time == '') {
                    this.$message({
                        message: '请选择时间'
                    });
                    return false
                } else if (this.form.activity_introduction == '') {
                    this.$message({
                        message: '请输入活动简介'
                    });
                    return false
                } else if (this.form.activity_content == '') {
                    this.$message({
                        message: '请输入活动内容'
                    });
                    return false
                } else if (this.form.activity_image == '') {
                    this.$message({
                        message: '请选则图片'
                    });
                    return false
                }
                if(this.time != ""){
                	this.form.start_time = this.time[0]
                	this.form.end_time = this.time[1]
                }
                if(this.memuTitle == '添加活动'){ 
                    api.addActivity(this.form).then(res=>{
                        if(res.data.code == 200){
                            this.$message({
                                message: '添加成功',
                                type:'success'
                            });
                            this.problem = ''
                            this.contents = ''
                            this.sort = ''
                            this.addMemu = false
                            this.render()
                        }else{
                            this.$message({
                                message: res.data.data.info
                            });
                        }
                    }).catch(res=>{
                        this.$message({
                            message: '网络错误请稍后再试',
                            type:'error'
                        });
                    })
                }else{
                    api.updateActivity(this.form).then(res=>{
                        if(res.data.code == 200){
                            this.$message({
                                message: '编辑成功',
                                type:'success'
                            });
                            this.id = ''
                            this.problem = ''
                            this.contents = ''
                            this.sort = ''
                            this.addMemu = false
                            this.render()
                        }else{
                            this.$message({
                                message: res.data.data.info
                            });
                        }
                    }).catch(res=>{
                        this.$message({
                            message: '网络错误请稍后再试',
                            type:'error'
                        });
                    })
                }
            },
            Delete(id){
                this.del_id = id
                this.del_isShow = true
            },
            commitdel(){
                api.deleteActivity({
                    id:this.del_id
                }).then(res=>{
                    // console.log(res);
                    if(res.data.code == 200){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.del_isShow = false
                        this.render()
                    }else{
                        this.$message({
                            message: res.data.data
                        });
                    }
                }).catch(res=>{
                    this.$message({
                        message: '网络错误请稍后再试',
                        type:'error'
                    });
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.whole{
    padding:10px 5px  0 20px;
    background-color: #EDF1F5;
    flex-grow: 1;
    display:flex;
    flex-direction: column;
}
//按钮

.btn{
    margin-left: 5px;
    .problem:hover{
        cursor: pointer;
    }
  .problem{
        width: 52px;
        height: 52px;
        background: #FFFFFF;
        border: 1px solid #66B3FF;
        box-shadow: 0px 5px 10px 0px rgba(102, 179, 255, 0.2);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        // text-align: center;
        align-items: center;
        margin-left: 20px ;
  }
  .problem_text{
      color: #66B3FF;
      margin-top: 4px;
      font-size: 14px;
  }
  .btn-img{
      width: 20px;
      height: 20px;
  }
}
// 添加问题
.transverse{
    width: 100%;
    height: 1px;
    background-color: #E6E6E6;
}
.add_mask {
    background-color: #000000;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1
}
.add_pop{
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    width: 1748px;
    height:80vh;
    overflow: auto;
    padding-bottom:15px;
    border-radius: 10px;
    z-index: 2;
    display:flex;
    box-sizing: border-box;
    flex-direction: column;
    .add_head{
        width: 100%;
        // background: chocolate;
        display: flex;
        position: relative;
        margin-bottom: 16px;
        .text{
            font-size: 20px;
            font-weight: 600;
            color: #4D4D4D;
            margin:23px 0 0 32px;
        }
        img{
            width: 16px;
            height: 17px;
            position: absolute;
            top: 23px;
            right: 32px;
        }
        .img:hover{
            cursor: pointer;
        }
    }
    .add_content{
        width: 100%;
        // background: aqua;
        margin-top: 37px;
        padding:0 80px ;
        .text{
            font-size: 16px;
            font-weight: 400;
            color: #4D4D4D;
            margin-bottom: 11px;
        }
        .input1{
            width: 100%;
            margin-bottom: 32px;
            input{
                outline: none;
                border: none;
                border-radius: 5px;
                border: 1px solid rgb(220, 223, 230);
                width: 100%;
                padding: 10px;
                height: 40px;
            }
        }
        .radio{
            width: 100%;
            margin-bottom: 32px;
        }
        .input2{
            width: 100%;
            margin-bottom: 32px;
        }
    }
    .add_pop_bottom{
        width: 100%;
        padding: 40px 0;
        // padding: 0 32px;
        .pop_bottom{
            display: flex;
            justify-content: center;
            // float: right;
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
        }
        .cancel:hover{
            cursor: pointer;
        }
        .determine:hover{
            cursor: pointer;
        }
        .determine{
            width: 148px;
            height: 40px;
            background: #3377FF;
            border-radius: 5px;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 10px;
        }
    }
}
// 表格
.form_head{
    width: 100%;
    /* background-color: #66B3FF; */
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
.form_head ul{
    // padding: 0;
    margin: 20px 20px 18px 0;
    display: flex;
    justify-content: space-between;
    padding: 0 64px 0 18px;
}
.form_head ul li{
    list-style: none;
}
.problem{
    width: 280px;
    word-break: normal;
    word-wrap: break-word;
    display: flex;
    align-items: center;
    p{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    // margin-left: 106px;
}
.problem1{
    width: 100px;
    word-break: normal;
    word-wrap: break-word;
    display: flex;
    align-items: center;
    p{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
.answer{
    width: 500px;
    word-break: normal;
    word-wrap: break-word;
    // text-align: center;
    // display: flex;
    // justify-content: center;
    // align-items: center;
}
.answer p{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    // font-size: 5px;
    -webkit-box-orient: vertical;
    max-height: 50px;
}
.operation{
    width: 140px;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    // justify-content: center;
    // margin-right: 92px;
}
._operation{
    width: 140px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // justify-content: center;
}
/* 数据 */
.form_information::-webkit-scrollbar{
    width: 15px;
    // background: #cccccc;
}
.form_information::-webkit-scrollbar-thumb{
    width: 8px;
    background: #ffffff;
    border-radius: 10px;
    // box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,.3);
}
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
    margin: 0 20px 0 0;
}
.form_information ul li{
    list-style:none;
    display: flex;
    justify-content: space-between;
    position: relative;
    margin: 0 0 10px 0;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 0 64px 0 18px;
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
.edit{
    width: 66px;
    height: 28px;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    color: #4D4D4D;
    line-height: 24px;
    text-align: center;
    margin:12px 0;
}
.edit:hover{
    cursor: pointer;
}
.del{
    width: 66px;
    height: 28px;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    // color: #CCCCCC;
    color: #4D4D4D;
    line-height: 24px;
    text-align: center;
    margin:12px 0 12px 10px;
}
.del:hover{
    cursor: pointer;
}
/* 分页 */
.Paging{
    padding:23px 0;
    text-align: center;
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
</style>
<style>
._descBox p span{
    font-size: 23px !important;
    color: #000;
}

._descBox img{
    width: 100%;
    height: 100px;
    border-radius: 10px;
}
</style>