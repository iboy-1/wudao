(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-commons"],{"17ff":function(e,i,t){"use strict";var a=function(){var e=this,i=e.$createElement,a=e._self._c||i;return a("div",{staticClass:"box"},[a("div",{staticClass:"null"},[a("img",{attrs:{src:t("8dd7"),alt:""}}),a("p",[e._v(e._s(e.description1))])])])},n=[],o=(t("a4d3"),t("e01a"),{name:"uploadImg",props:{description:{type:String}},data:function(){return{description1:"暂无数据"}},mounted:function(){this.description1=this.description}}),s=o,l=(t("e735"),t("2877")),r=Object(l["a"])(s,a,n,!1,null,"e3ad6c6e",null);i["a"]=r.exports},"7a0f":function(e,i,t){},c585:function(e,i,t){"use strict";var a=t("cd72"),n=t.n(a);n.a},cd72:function(e,i,t){},e735:function(e,i,t){"use strict";var a=t("7a0f"),n=t.n(a);n.a},fba7:function(e,i,t){"use strict";var a=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{staticClass:"uploadImg"},[t("el-upload",{class:{hide:e.hideUpload},attrs:{action:"https://upload.qiniup.com/","list-type":"picture-card","http-request":e.UploadRequest,"on-preview":e.Preview,"before-remove":e.removeadPho,"file-list":e.fileList,limit:1,"on-exceed":e.Max,"before-upload":e.beforeAvatarUpload,accept:".gif,.jpg,.jpeg,.png,.GIF,.JPG,.PNG","on-change":e.uploadChange}},[t("i",{staticClass:"el-icon-plus"})]),t("el-dialog",{attrs:{visible:e.dialogad,"append-to-body":!0},on:{"update:visible":function(i){e.dialogad=i}}},[t("img",{attrs:{width:"100%",src:e.imageUrl,alt:""}})])],1)},n=[],o=(t("c975"),t("baa5"),t("b0c0"),t("a9e3"),t("f80a"),t("054f"),t("1157")),s=t.n(o),l={name:"uploadImg",props:{fileList:{type:Array},imgs:{type:String},imgs_size:{type:Number}},data:function(){return{hideUpload:!1,dialogad:!1,imageUrl:"",imageSize:2}},watch:{fileList:function(e){this.hideUpload=e.length>=1,this.$console(e)},imageSize:function(e){void 0!=e&&""!=e||(this.imageSize=2)}},mounted:function(){this.imageUrl=this.imgs,this.imageSize=this.imgs_size,void 0!=this.imageSize&&""!=this.imageSize||(this.imageSize=2),this.hideUpload=this.fileList.length>=1},methods:{beforeAvatarUpload:function(e){console.log(e);var i=e.name.substring(e.name.lastIndexOf(".")+1),t=["JPG","PNG","jpg","png"];if(-1===t.indexOf(i))return this.$message.error("上传图片只能是JPG、PNG格式"),!1;var a=this.imageSize,n=e.size/1024/1024<a;return console.log(n),n?void 0:(this.$message.error("上传头像图片大小不能超过"+a+"MB!"),n)},changeUrl:function(e){this.imageUrl=e},UploadRequest:function(e){console.log(e);var i=this,t=new FormData;t.append("file",e.file),s.a.ajax({url:"https://wudao.gxhxinfo.com/feedback/v1/Home/upfile",data:t,header:{"Access-Control-Allow-Origin":"*"},type:"POST",dataType:"json",processData:!1,contentType:!1,success:function(e){console.log(e),i.imageUrl=e.url,i.hideUpload=!1,i.$emit("change",i.imageUrl)}})},Preview:function(e){this.imageUrl=e.url,this.dialogad=!0},removeadPho:function(e,i){this.hideUpload=!1},uploadChange:function(e,i){this.hideUpload=i.length>=1,this.$console(this.hideUpload)},Max:function(e){return this.$message.error("最多上传一张照片"),!1}}},r=l,c=(t("c585"),t("2877")),d=Object(c["a"])(r,a,n,!1,null,null,null);i["a"]=d.exports}}]);