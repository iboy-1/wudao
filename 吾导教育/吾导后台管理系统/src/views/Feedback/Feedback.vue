<template>
    <div class="whole">
        <el-image-viewer
        v-if="showViewer"
        :on-close="closeViewer"
        :url-list="[url]"
        />
        <!-- 表格 -->
        <div class="form_head" v-if="judata.yjfk_table">
            <ul>
                <li class="phone">联系电话</li>
                <li class="remarks">反馈内容</li>
                <li class="name">反馈图片</li>
                <li class="name">状态</li>
                <li class="name">用户昵称</li>
                <li class="remarks">处理结果</li>
                <li class="name">操作人</li>
                <li class="operation">操作</li>
            </ul>
        </div>
        <div class="form_information" v-if="judata.yjfk_table">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <div class="blue"></div>
                    <!-- <div></div>
                    <div></div> -->
                    <div class="phone">
                        {{item.phone}}
                    </div>
                    <div class="remarks">
                        {{item.contents}}
                    </div>
                    <div class="name">
                        <span v-if="item.images_url == '' ">无</span>
                        <img :src="item.images_url" alt="" v-else @click="onPreview(item.images_url)">
                    </div>
                    <div class="name">
                        <span v-if="item.state == '1'">已处理</span>
                        <span v-else>未处理</span>
                    </div>
                    <div class="name">
                        {{item.nickname}}
                    </div>
                    <div class="remarks">
                        <span v-if="item.remarks  == null">无</span>
                        <span v-else>{{item.remarks}}</span>
                    </div>
                    <div class="name">
                        <span v-if="item.operator == -1">无</span>
                        <span v-else>{{item.operator}}</span>
                        
                    </div>
                    <div class="operation">
                        <el-button @click="see(item)" v-if="judata.yjfk_see">查看</el-button>
                        <el-button @click="onPreview(item.images_url)" v-if="judata.yjfk_seeimg">反馈图片</el-button>
                        <el-button v-if="item.state == '1' && judata.yjfk_cl"  disabled>已处理</el-button>
                        <el-button v-else-if="item.state == '0' && judata.yjfk_cl" @click="examine(index,item)">处理</el-button>
                        <!-- <div v-if="item.state == '1' && judata.yjfk_cl" style="cursor: not-allowed;">已处理</div>
                        <div v-else-if="item.state == '0' && judata.yjfk_cl" class="red" @click="examine(index,item)">处理</div>
                        <div @click="see(item)" v-if="judata.yjfk_see">查看</div> -->
                    </div>
                </li>
            </ul>
        </div>
        <div class="Paging" v-if="judata.yjfk_table">
            <el-pagination background @current-change = "changePage" layout="prev, pager, next" :total="total"></el-pagination>
        </div>

        <div class="mask" v-if="showModal" @click="showModal=false"></div>
        <div class="pop" v-if="showModal">
            <div class="toExamine-head">
                <p>是否处理此意见反馈</p>
                <!-- <img src="./关闭@2x.png" alt="" @click="showModal=false"> -->
            </div>
            <div class="transverse"></div>
            <div class="center">
				<div class="textarea">
					<textarea class="bottominput" name="" id="" cols="30" rows="10" v-model="remarks" placeholder="请输入处理结果"></textarea>
				</div>
			</div>
            <div class="toExamine-btn">
                <div class="toExamineCancel" @click="showModal=false">取消</div>
                <div class="toExamineDetermine" @click="toExamine()">处理</div>
            </div>
        </div>

        <div class="mask" v-if="seeShow" @click="seeShow = false"></div>
        <div class="seePop" v-if="seeShow">
            <div class="head">
                <h2 class="">查看详情</h2>
                <img src="@/assets/关闭.png" alt="" @click="seeShow = false">
            </div>
            <div class="seecontent">
                <div class="box">
                    <div class="heads">反馈内容</div>
                    <div class="cen">{{yj_info.contents}}</div>
                </div>
                <div class="box">
                    <div class="heads">处理结果</div>
                    <div class="remarks" v-if="yj_info.remarks == null">无</div>
                    <div class="remarks" v-else>{{yj_info.remarks}}</div>
                </div>
            </div>
            <div class="seebtn">
                <div class="determine" @click="seeShow = false">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/Feedback";
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
    components: {
        ElImageViewer,
    },
    data(){
        return{
            list:[],
            total:0,
            page:1,
            listrows:10,
            showModal:false,
            item:null,
            seeShow:false,
            remarks:'',
            yj_info:'',
            creator:JSON.parse(localStorage.getItem('WuDaoeducation')),
			judata:{},//权限
            showViewer: false, // 显示查看器
            url: '',
            timer:null,    
        }
    },
    created(){
        this.render()
        this.changePower()
    },
    mounted(){
        
    },
    beforeDestroy() { 
        clearTimeout();
        clearTimeout(this.timer);
    },
    methods: {
        // 点击按钮预览图片
        onPreview(img) {
            this.url = img
            this.showViewer = true
        },
        // 关闭查看器
        closeViewer() {
            this.showViewer = false
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
        see(val){
            this.yj_info = val
            this.seeShow = true
        },
        render(){
            this.page = 1
            let page = (this.page-1)*this.listrows
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            api.feedback({
                limit:page+','+this.listrows
            }).then(res=>{
                // console.log(res);
                this.list = res.data.data.data
                this.total = res.data.data.count
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
        changePage(val){
            this.page = val
            let page = (this.page-1)*this.listrows
            api.feedback({
                limit:page+','+this.listrows
            }).then(res=>{
                this.$console(res)
                this.list = res.data.data.data
                this.total = res.data.data.count
            })
        },
        examine(index,data){
            this.item = data
            this.showModal = true
        },
        toExamine(){
            let userInfo = localStorage.getItem('WuDaoeducation')
            api.updateFeedback({
                id:this.item.id,
                operator:JSON.parse(userInfo).data[0].account,
                remarks:this.remarks
            }).then(res=>{
                if(res.data.code == 200){
                    this.showModal = false
                    this.$message({
                        message: '处理成功',
                        type: 'success'
                    });
                    this.render()
                }
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
    .seePop{
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%,-50%);
        // width: 450px;
        // height:163px;
        border-radius: 10px;
        padding-bottom: 50px;
        z-index: 2;
        .head{
            height: 80px;
            width: 100%;
            // background-color: aquamarine;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px; 
            border-bottom: 1px solid #ccc;
            font-size: 20px;
            img{
                width: 20px;
                height: 20px;
                cursor: pointer;
            }
        }
        .seecontent{
            padding: 0 20px; 
            // width: 500px;
            display: flex;
            // background-color: aquamarine;
            .heads{
                margin: 20px 10px 20px 0;
            }
            .box:nth-child(1){
                border-right: solid 1px #ccc;
                margin-right: 10px;
            }
            .cen{
                width: 300px;
                height: 300px;
                overflow: auto;
                word-break: normal;
                word-wrap: break-word;
            }
            .remarks{
                width: 300px;
                height: 300px;
                overflow: auto;
                word-break: normal;
                word-wrap: break-word;
            }
        }
        .seebtn{
            // height: 150px;
            .determine{
                bottom: 10px;
                position: absolute;
                right: 20px;
                width: 100px;
                // height: 40px;
                line-height: 40px;
                text-align: center;
                background-color: #3377FF;
                color: #ffffff;
                border-radius: 5px;
                margin-left: 20px;
                cursor: pointer;
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
        margin: 10px 0;
        img{
            width: 180px;
            height: 80px;
            border-radius: 10px;
            cursor: pointer;
        }
    }
    .phone{width: 150px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .pattern{width: 100px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .intention{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .time{width: 120px;word-break: normal;word-wrap: break-word;margin: 10px 0;}
    .operation{width: 350px;word-break: normal;word-wrap: break-word;margin: 10px 0;display: flex;}
    .remarks{
        width: 250px;
        word-break: normal;
        word-wrap: break-word;
        margin: 10px 0;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        // font-size: 5px;
        -webkit-box-orient: vertical;
    }
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
        // height:200px;
        z-index: 2;
        border-radius: 10px;
        padding-bottom: 20px;
        .center{
			padding: 20px 30px;
			.center_input{
				// width: 100px;
				display: flex;
				align-items: center;
				p{
					width: 130px;
				}
			}
			.textarea{
				padding: 20px 0;
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
		}
    }
    .transverse{
        width: 100%;
        height: 1px;
        background-color: #E6E6E6;
    }
    .toExamine-head{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
    }
    .toExamine-head p{
        width: 100%;
        text-align: center;
        font-size: 22px;
        color: #2E3033;
        font-weight: 600;
        margin:20px 0 0 60px;
    }
    .toExamine-head img:hover{
        cursor: pointer;
    }
    .toExamine-head img{
        width: 19px;
        height: 19px;
        margin: 20px 30px 0 0;
    }
    .toExamine-btn{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }
    .toExamineDetermine:hover{
        cursor: pointer;
    }
    .toExamineCancel:hover{
        cursor: pointer;
    }
    .toExamineCancel{
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #CCCCCC;
        border-radius: 5px;
    }
    .toExamineDetermine{
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #3377FF;
        color: #ffffff;
        border-radius: 5px;
        margin-left: 20px;
    }
    .toExamineDetermine:hover{
        cursor: pointer;
    }
    // .pop {
    //     background-color: #fff;
    //     position: absolute;
    //     top: 50%;
    //     left: 50%;
    //     transform:translate(-50%,-50%);
    //     width: 620px;
    //     // height:600px;
    //     padding-bottom: 20px;
    //     z-index: 2;
    //     border-radius: 10px;
    //     .btnMessage{
    //         width: 100%;
    //         margin-top: 20px;
    //         display:flex;
    //         justify-content: center;
    //     }
    //     img{
    //         width: 19px;
    //         height: 19px;
    //         // margin: 20px 30px 0 0;
    //         position: absolute;
    //         right: 20px;
    //         top: 20px;
    //         cursor: pointer;
    //     }
    //     h2{
    //         width: 100%;
    //         text-align: center;
    //     }
    //     .determine:hover{
    //         cursor: pointer;
    //     }
    //     .transverse{
    //         width: 100%;
    //         height: 1px;
    //         background-color: #E6E6E6;
    //     }
    //     .content{
    //         padding: 0 20px;
    //     }
    //     .bottominput{
    //         margin-top: 50px;
    //         width: 100%;
    //         height: 350px;
    //         background: #F6F6F6;
    //         border-radius: 10px;
    //         line-height: 25px;
    //         padding: 20px;
    //         box-sizing: border-box;
    //         resize: none;
    //         outline: none;
    //         border: none;
    //     }
    //     .determine{
    //         width: 200px;
    //         height: 40px;
    //         line-height: 40px;
    //         text-align: center;
    //         background-color: #3377FF;
    //         color: #ffffff;
    //         border-radius: 5px;
    //         margin-left: 20px;
    //     }
    //     .cancel{
    //         width: 200px;
    //         height: 40px;
    //         line-height: 40px;
    //         text-align: center;
    //         border: 1px solid #CCCCCC;
    //         border-radius: 5px;
    //     }
    //     .cancel:hover{
    //         cursor: pointer;
    //     }
    // }
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