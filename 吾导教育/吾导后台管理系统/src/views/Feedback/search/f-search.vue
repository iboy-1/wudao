<template>
  <div class="search">
      <input type="text" placeholder="输入订单号查询">
      <input type="text" placeholder="输入住客姓名">
      <input type="text" placeholder="输入联系电话">
      <input type="text" placeholder="输入酒店名称">
      <input type="text" placeholder="输入房间类型">
      <div class="Reset">重置</div>
      <div class="query"><img src="./查询@2x.png" alt="">查询</div>
  </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.search{
    width: 98%;
    padding: 2% 1%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.search input{
    flex: 1;
    height: 46px;
    margin-right: 1%;
    background-color: #ffffff;
    border-style: none;
    border-radius: 5px;
    box-shadow: 2px 2px 5px #d9dadb;
    outline:none; 
}
.search .Reset{
    background-color: #3377FF;
    flex: 0.5;
    height: 46px;
    color: white;
    margin-left: 1%;
    border-radius: 5px;
    text-align: center;
    line-height: 46px;
    box-shadow: 2px 2px 5px #d9dadb;
}
.search .query{
    flex: 0.5;
    height: 46px;
    margin-left: 1%;
    background-color: #3377FF;
    color: white;
    border-radius: 5px;
    text-align: center;
    line-height: 46px;
    box-shadow: 2px 2px 5px #d9dadb;
}
.query img{
    width: 16px;
    height: 16px;
    margin: 0px 5px 0 0;
}
.Reset:hover{
    cursor: pointer;
}
.query:hover{
    cursor: pointer;
}
</style>