<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in data1" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data(){
    return {
      data1:[],
      selectCheck1:[],
      data2:[
        {
          path: '/',
          name:'/today_course',
          meta: { title: '约课管理', icon: 'kc' },
          children: [
            {
              path: 'today_course',
              name: 'today_course',
              meta: { title: '今日课程',  }
            },
            {
              path: 'distribution2',
              name: 'distribution2',
              meta: { title: '约课列表',  }
            },
          ]
        },
        {
          path: '/order_list',
          name:'/order_list',
          meta: { title: '订单管理', icon: 'dd' },
          children: [
            {
              path: 'order_list',
              name: 'order_list',
              meta: { title: '订单列表', }
            },
            {
              path: 'comment1',
              name: 'comment1',
              meta: { title: '提现列表',  }
            },
          ]
        },
        {
          path: '/distribution1',
          name:'/distribution1',
          meta: { title: '用户列表', icon: 'yh' },
          children: [
            {
              path: 'distribution1',
              name: 'distribution1',
              meta: { title: '用户列表', }
            },
          ]
        },
        {
          path: '/order',
          name:'/order',
          meta: { title: '教师管理', icon: 'ls' },
          children: [
            {
              path: 'order',
              name: 'order',
              meta: { title: '教师列表',  }
            },
            {
              path: 'comment',
              name: 'comment',
              meta: { title: '评论列表',  }
            },
            {
              path: 'wallet',
              name: 'wallet',
              meta: { title: '教师中心',  }
            },
          ]
        },
        {
          path: '/studio',
          name: 'studio',
          meta:{
              title: '工作室管理',
              icon: 'gzs'
          },
          children: [
            {
              path: 'studio',
              name: 'studio',
              meta: { title: '工作室管理'}
            },
          ]
        },
        {
          path: '/card',
          name:'/card',
          meta: { title: '会员卡管理', icon: 'hy' },
          children: [
            {
              path: 'card',
              name: 'card',
              meta: { title: '会员卡管理', }
            },
            {
              path: 'comment2',
              name: 'comment2',
              meta: { title: '转卡列表',  }
            },
          ]
        },
        {
          path: '/homeCarousel',
          name:'/homeCarousel',
          meta: { title: '首页轮播图', icon: 'lbt' },
          children: [
            {
              path: 'homeCarousel',
              name: 'homeCarousel',
              meta: { title: '首页轮播图',}
            },
          ]
        },
        {
          path:'/feedback',
          name:'feedback',
          meta:{
            title: '意见反馈',
            icon: 'yjfk'
          },
          children:[
            {
              path:'Feedback',
              name:'Feedback',
              meta: { title: '意见反馈'}
            },
          ]
        },
        {
          path:'/article',
          name:'article',
          meta:{
            title: '公告管理',
            icon: 'gg'
          },
          children:[
            // {
            //   path:'questionTitle',
            //   name:'questionTitle',
            //   meta: { title: '公告类型'}
            // },
            // {
            //   path:'articles',
            //   name:'articles',
            //   meta: { title: '标题'}
            // },
            {
              path:'articleClassification',
              name:'articleClassification',
              meta: { title: '公告管理'}
            },
          ]
        },
        {
          path:'/activity',
          name:'activity',
          meta:{
            title: '活动管理',
            icon: 'hdgl'
          },
          children:[
            // {
            //   path:'questionTitle',
            //   name:'questionTitle',
            //   meta: { title: '公告类型'}
            // },
            // {
            //   path:'articles',
            //   name:'articles',
            //   meta: { title: '标题'}
            // },
            {
              path:'activity',
              name:'activity',
              meta: { title: '添加活动'}
            },
            {
              path:'activity1',
              name:'activity1',
              meta: { title: '报名列表'}
            },
            {
              path:'activity2',
              name:'activity2',
              meta: { title: '全民砍价'}
            },
          ]
        },
        {
          path:'/jurisdiction1',
          name:'jurisdiction1',
          meta:{
            title: '系统管理',
            icon: 'xt'
          },
          children:[
            {
              path:'personnel',
              name:'personnel',
              meta: { title: '人员管理'}
            },
            {
              path:'jurisdictionbranch',
              name:'jurisdictionbranch',
              meta: { title: '角色管理'}
            },
            {
              path:'jurisdictionmenu',
              name:'jurisdictionmenu',
              meta: { title: '权限添加'}
            },
          ]
        },
      ]
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar',
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created(){
    let _this = this
    let data = localStorage.getItem('WuDaoeducation')
    let userInfo = JSON.parse(data)
    let jurisdiction = JSON.parse(userInfo.data.jurisdiction)
    this.selectCheck1 = []
    for(let i=0;i<jurisdiction.length;i++){
      for(let j=0;j<jurisdiction[i].children.length;j++){
				for (let k = 0; k < jurisdiction[i].children[j].children.length; k++) {
					if(jurisdiction[i].children[j].children[k].isShow){
							this.selectCheck1.push(jurisdiction[i].children[j].path)
					}
				}
      }
    }
    // console.log(this.selectCheck1);
    // console.log(this.data2);
    let judata = this.data2
    for (let i = 0; i <_this.selectCheck1.length; i++) {
      for (let j = 0; j < judata.length; j++) {
        for (let k = 0; k < judata[j].children.length; k++) {
          if(_this.selectCheck1[i] == judata[j].children[k].path){
            judata[j].children[k].isShow = true
          }
        }
      }
    }
    // console.log(judata);


    for(let i=0 ; i<judata.length ; i++){
      for(let j=0 ; j<judata[i].children.length ; j++){
        if(judata[i].children[j].isShow){
          
        }else{
          judata[i].children[j] = ''
        }
      }
    }
    for(let i=0 ; i<judata.length ; i++){
      for(let j=0 ; j<judata[i].children.length ; j++){
        if(judata[i].children[j] == ''){
          judata[i].children.splice(j,1);  
          j= j-1;
        }
      }
    }
    judata.forEach(function(value){
      if(value.children.length > '0'){
        _this.data1.push(value)
      }
    })
    // console.log(this.data1);
  }
}
</script>
