<template>
    <div class="box">
        <div class="null">
            <img src="@/assets/空.png" alt="">
            <p>{{description1}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'uploadImg',
    props: {
        description: {
            type: String
        }
    },
    data(){
        return{
            description1:'暂无数据',
        }
    },
    mounted(){
        this.description1 = this.description
    }
}
</script>

<style lang="scss" scoped>
.box{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .null{
        text-align: center;
        color: #ccc;
        img{
            width: 320px;
        }
    }
}
</style>