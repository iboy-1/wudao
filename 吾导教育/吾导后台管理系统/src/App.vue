<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  async created(){
    let userInfo = localStorage.getItem('WuDaoeducation')
    // let userInfo = Cookies.get('token')
    if(userInfo == undefined){
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      return false
    }
  },
}
</script>
<style>
  *{
    -webkit-user-select: text;
  }
  .el-submenu__title{
    font-size: 21px;
  }
  .el-menu-item{
    font-size: 21px;
  }
	#app{
		user-select: none;
	}
	.mask{
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0,0,0,0.5);
      z-index: 130;
  }
  .pagination{
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .el-form-item{
    display: flex;
    align-items: center;
  }
  .el-form-item__label{
    font-size: 20px;
    color: #4D4D4D;
  }
  .el-form-item__content{
    margin-left: 30px !important;
  }
</style>
