<template>
  <div class="Feedback">
     
      <div class="btn">
        <!-- <div class="refresh"><img src="./Icon/添加@3x.png" alt="">添加</div> -->
      </div>

      <!-- 点击审查 -->
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
                <div class="toExamineDetermine" @click="toExamine()">已处理</div>
            </div>
        </div>

     
        <div class="order-Text" v-if="judata.yjfk_table">
                <ul>
                    <li class="number">联系电话</li>
                    <li class="tel">反馈内容</li>
                    <li class="number">反馈图片</li>
                    <li class="Id">状态</li>
                    <li class="Name">用户昵称</li>
                    <li class="tel">处理结果</li>
                    <li class="operation">操作</li>
                </ul>
        </div>
        <div class="lounge-Information" v-if="judata.yjfk_table">
            <ul v-for="(item,index) of list" :key="index">
                <div class="hr"></div>
                <li>{{item.phone}}</li>
                <li>{{item.contents}}</li>
                <li v-if="item.images_url == ''">
                    无
                </li>
                <li v-else>
                    <img :src="item.images_url" alt="">
                </li>
                <li>
                    <span v-if="item.state == '1'">已处理</span>
                    <span v-else>未处理</span>
                </li>
                <li>{{item.nickname}}</li>
                <li class="tel">
                    <span v-if="item.remarks == null">无</span>
                    <span v-else>{{item.remarks}}</span>
                </li>
                <li>
                    <div class="operation">
                        <div v-if="item.state == '1' && judata.yjfk_cl" style="cursor: not-allowed;">已处理</div>
                        <div v-else-if="item.state == '0' && judata.yjfk_cl" class="red" @click="examine(index,item)">处理</div>
                        <div @click="see(item)" v-if="judata.yjfk_see">查看</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="Paging" v-if="judata.yjfk_table">
            <el-pagination background @current-change = "changePage" layout="prev, pager, next" :total="total"></el-pagination>
        </div>
        <div class="mask" v-if="seeShow" @click="seeShow = false"></div>
        <div class="seePop" v-if="seeShow">
            <div class="head">
                <div class="">查看详情</div>
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
    // import FileSaver from "file-saver";
    // import XLSX from "xlsx";
    export default {
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
            }
        },
        created(){
            this.render()
            this.changePower()
        },
        methods: {
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
                api.feedback({
                    limit:page+','+this.listrows
                }).then(res=>{
                    // console.log(res);
                    this.list = res.data.data.data
                    this.total = res.data.data.count
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
*{
  padding: 0;
  margin: 0;
}
/*  */
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
            height: 50px;
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
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0,0,0,0.5);
        z-index: 1;
    }
    .toExamine-btn{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 50px;
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
    .Information:hover{
        background-color: #F2F9FF;
    }
    .Information:hover .blue{
        display: block;
    }
.Feedback{
  width: 100%;
  flex-grow: 1;
  background-color: #EDF1F5;
  display:flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
}

.btn{
  margin-left: 1%;
  width: 146px;
  display: flex;
  justify-content: space-between;
  margin-top: 1%;
  margin-bottom: 1%;
  text-align-last: center;
}
.export{
  width: 58px;
  height: 58px;
  margin-right: 20px;
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
.btn img{
  width: 16px;
  height: 16px;
  position: absolute;
  left: 18px;
  top: 5px;
}

.order-Text ul{
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 98%;
    padding: 0.5% 1%;
    line-height: 26px;
}
.order-Text ul li{
    text-align: left;
    list-style: none;
    flex: 1;
}
.tel{
        width: 250px;
        overflow: hidden;
    }
.lounge-Information{
    position: relative;
    flex-grow: 1;
    height: 0;
    overflow: hidden;
    display: flex;
    overflow-y: overlay;
    flex-direction: column;
    /* overflow-y: auto; */
}
.lounge-Information ul{
    position: relative;
    background: #FFFFFF;
    width: 98%;
    margin: 5px auto;
    // height: 50px;
    line-height: 50px;
    border-radius: 5px;
    padding: 0 1%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
}
.lounge-Information ul:hover{
    background: #F2F9FF;
}
.hr{
    width: 4px;
    height: 100%;
    background: #3377FF;
    position: absolute;
    left: 0;
    display: none;
}
.lounge-Information ul:hover .hr{
    display: block;
}
.lounge-Information ul li{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    // -webkit-line-clamp: 1;
    line-clamp: 1;
    -webkit-box-orient: vertical;
    flex: 1;
    list-style: none;
    text-align: left;
    padding-right: 20px;
    box-sizing: border-box;
    img{
        width: 150px;
        height: 80px;
        border-radius: 10px;
        margin: 20px 0;
    }
}
p{
    float: left;
}
.Id{
    width: 136px;
    height: 36px;
    word-break: break-all;
}
.operation{
    display: flex;
    /* text-align: center !important; */
}
.operation div{
    width: 76px;
    height: 28px;
    border-radius: 5px;
    background: #ffffff;
    border: 1px solid #CCCCCC;
    line-height: 28px;
    margin-right: 10px;
    text-align: center !important;
    /* margin: 0 auto; */
}
.operation div:hover{
    cursor: pointer;
}
.del{
    background-color: #ffffff;
    color: #CCCCCC;
}
.operation1{
    width: 264px;
    height: 28px;
    line-height: 80px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}
.operation1 div{
    margin: 0 auto;
    text-align: center;
}
.operation1 input:hover{
    cursor: pointer;
}
.model{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0, 0,0.5);
    z-index: 100;
}
.exmodel{
    position: absolute;
    top: 45%;
    left: 45%;
    width: 20%;
    height: 200px;
    background: #FFFFFF;
}
.Paging{
    width: 100%;
    padding: 1% 0;
    text-align: center;
    /* background: red; */
}
.red{
    color: red;
}
</style>