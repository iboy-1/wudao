<template>
  <div class="btn">
    <div class="export"><img src="./导出@2x.png" alt="">导出</div>
    <div class="refresh"><img src="./添加@3x.png" alt="">添加</div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
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
</style>