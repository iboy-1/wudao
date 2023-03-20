<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <audio src="@/assets/mp3.mp3" id="video" ref="video"></audio>
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import {initWebpack} from '@/utils/WebSocket'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  data(){
    return {
      path:"wss://wudao.gxhxinfo.com:5920",
      timer:null,
      // socket:'',
      socket:"",
      timer:null,
      Feedback:false,
      aotu:false,
      new:false,
      refund:false,
      refund1:false,
      uerwithdraw:false,
      driverwithdraw:false,
      fujianOrders:false,
      uid:'',
      groundShow:false,
      groundList:[],
    }
  },
  created(){
      let user = JSON.parse(localStorage.getItem('WuDaoeducation'))
      this.uid = user.data[0].account
      this.init()
  },
  mounted(){
    let user = JSON.parse(localStorage.getItem('WuDaoeducation'))

  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    init: function () {
      if(typeof(WebSocket) === "undefined"){
        alert("您的浏览器不支持socket")
      }else{
        // 实例化socket
        this.socket = new WebSocket(this.path)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    open: function () {
      this.send()
    },
    error: function () {
    },
    getMessage: function (msg) {
        let _this = this
        // console.log(msg);
        if (msg.data == 'card') {
          setTimeout(() => {
              this.$refs.video.play();
          }, 2000);
        }else if (msg.data == 'course') {
          setTimeout(() => {
              this.$refs.video.play();
          }, 2000);
        }
        
    },
    send: function () {
        let obj = {
            "uid":'-1',
            "type":"login_group",
            "group":"admin"
        }
        this.socket.send(JSON.stringify(obj))
        // api.add({
        //   uid:this.uid,
        //   type:'后台'
        // }).then(res=>{
        // })
        this.Interval()
    },
    close: function () {
      api.update({
        uid:this.uid,
        type:'后台'
      }).then(res=>{
      })
    },
    Interval(){
      let _this = this
      this.timer = setInterval(function(){
        if(_this.socket.readyState == '3'){
          _this.init()
        }else{
          _this.socket.send('1')
        }
      },50000);
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
