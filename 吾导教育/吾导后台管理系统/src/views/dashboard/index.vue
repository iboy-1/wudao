<template>
    <div class="dashboard-view">
        <!-- <el-upload
            action="##"
            list-type="picture-card"
            :http-request="upload_btn"
            :on-preview="Preview"
            :before-remove="removeadPho"
            :file-list="fileList"
            :limit="1"
            :on-exceed="Max"
            :before-upload="beforeAvatarUpload"
            :on-change="uploadChange">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogad" :append-to-body='true'>
            <img width="100%" :src="imageUrl" alt="">
        </el-dialog> -->
        <null-state :description="description"></null-state>
    </div>
</template>

<script>
    import $ from 'jquery'
    import nullState from '@/components/nullState/nullState.vue';
    export default {
  components: { nullState },
        name: 'Dashboard',
        data(){
            return {
                hideUpload:false,
                dialogad:false,
                description:"暂无数据",
                imageUrl:'',
                fileList:[]
            }
        },
        mounted(){
            
        },
        methods:{
            beforeAvatarUpload(file) {

            },
            upload_btn(param){
                console.log(param);
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
                        console.log(res);
                    }
                })
            },
            Preview(file){
                // console.log(file);
                this.imageUrl = file.url;
                this.dialogad = true;
            },
            removeadPho(file,fileList){
                console.log(file,fileList);
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
        }
    }
</script>

<style lang="scss">
    .hide .el-upload--picture-card {
       display: none !important;
    }
    .el-upload--picture-card{
        width: 9.25rem;
        border: 1px dashed #5CCCC5 !important;
    }
</style>
