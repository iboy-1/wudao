<template>
  <div class="order-Text">
      <ul>
          <li class="Id">用户名</li>
          <li class="Name">时间</li>
          <li class="number">投诉标题</li>
          <li class="tel">意见标题</li>
          <li class="operation">操作</li>
      </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
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
.operation{
    text-align: center !important;
}
</style>