<template>
    <div class="uploadImg">
        <el-upload
            action="https://upload.qiniup.com/"
            list-type="picture-card"
            :http-request="UploadRequest"
            :on-preview="Preview"
            :before-remove="removeadPho"
            :file-list="fileList"
            :limit="1"
            :on-exceed="Max"
            :before-upload="beforeAvatarUpload"
            accept=".gif,.jpg,.jpeg,.png,.GIF,.JPG,.PNG"
            :class="{hide:hideUpload}"
            :on-change="uploadChange">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogad" :append-to-body='true'>
            <img width="100%" :src="imageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import api from "@/api/uploadImg";
import {upload} from "../../utils/qiniu.js";
import $ from 'jquery'
export default {
    name: 'uploadImg',
    props: {
        fileList: {
            type: Array
        },
        imgs: {
            type: String
        },
        imgs_size:{
            type:Number
        }
    },
    data() {
        return {
            hideUpload:false,
            dialogad:false,
            imageUrl:'',
            imageSize:2,
        }
    },
    watch:{
        fileList(val){
            this.hideUpload = val.length >= 1
            this.$console(val)
        },
        imageSize(val){
            if (val == undefined || val == '') {
                this.imageSize = 2
            }
        }
    },
    mounted(){
        this.imageUrl = this.imgs
        this.imageSize = this.imgs_size
        if (this.imageSize == undefined || this.imageSize == '') {
            this.imageSize = 2
        }
        this.hideUpload = this.fileList.length >= 1
    },
    methods: {
        beforeAvatarUpload(file) {
            console.log(file);
            const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
            const whiteList = ["JPG", "PNG","jpg","png"];
             if (whiteList.indexOf(fileSuffix) === -1) {
                this.$message.error('上传图片只能是JPG、PNG格式');
                return false;
            }
            let obj = this.imageSize
            const isLt2M = file.size / 1024 / 1024 < obj;
            console.log(isLt2M);
             if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过'+ obj +'MB!');
                return isLt2M;
            }
        },
        changeUrl(url){
            this.imageUrl = url
        },
        UploadRequest(request){
            console.log(request);
            let _this = this
            let formData = new FormData()
                formData.append("file",request.file)
            $.ajax({
                url:'https://wudao.gxhxinfo.com/feedback/v1/Home/upfile',
                data: formData,
                header:{"Access-Control-Allow-Origin": "*"},
                type: "POST",
                dataType: "json",
                processData: false,
                contentType: false,
                success: function(res) {
                    console.log(res);
                    _this.imageUrl = res.url
                    _this.hideUpload = false
                    _this.$emit('change',_this.imageUrl);
                }
            })
        },
        Preview(file){
            this.imageUrl = file.url;
            this.dialogad = true;
        },
        removeadPho(file,fileList){
            this.hideUpload = false
        },
        uploadChange(file,fileList){
            this.hideUpload = fileList.length >= 1
            this.$console(this.hideUpload)
        },
        Max(file){
            this.$message.error("最多上传一张照片");
            return false
        },
    }
}
</script>

<style lang="scss">
    .hide .el-upload--picture-card {
       display: none !important;
    }
    .el-upload--picture-card{
        width: 9.25rem;
    }
</style>
