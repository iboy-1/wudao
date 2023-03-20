import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: '仪表盘', icon: 'dashboard' }
  //   }]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/today_course',
    name:'/today_course',
    meta: { title: '约课管理', icon: 'kc' },
    children: [
      {
        path: 'today_course',
        name: 'today_course',
        component: () => import('@/views/today_course/index'),
        meta: { title: '今日课程',  }
      },
      {
        path: 'today_course1',
        name: 'today_course1',
        hidden:true,
        component: () => import('@/views/today_course/today_course'),
        meta: { title: '上课用户',  }
      },
      {
        path: 'distribution2',
        name: 'distribution2',
        component: () => import('@/views/distribution/distribution2'),
        meta: { title: '约课列表',  }
      },
    ]
  },
  {
    path: '/order_list',
    component: Layout,
    redirect: '/order_list',
    name:'/order_list',
    meta: { title: '订单管理', icon: 'dd' },
    children: [
      {
        path: 'order_list',
        name: 'order_list',
        component: () => import('@/views/order/list'),
        meta: { title: '订单列表', }
      },
      {
        path: 'comment1',
        name: 'comment1',
        component: () => import('@/views/comment/comment1'),
        meta: { title: '提现列表',  }
      },
    ]
  },
  {
    path: '/distribution1',
    component: Layout,
    redirect: '/distribution1',
    name:'/distribution1',
    meta: { title: '用户列表', icon: 'dashboard' },
    children: [
      {
        path: 'distribution1',
        name: 'distribution1',
        component: () => import('@/views/distribution/distribution1'),
        meta: { title: '用户列表', }
      },
      {
        path: 'ransfercard',
        name: 'ransfercard',
        hidden:true,
        component: () => import('@/views/card/index1'),
        meta: { title: '用户卡', }
      },
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order',
    name:'/order',
    meta: { title: '教师管理', icon: 'ls' },
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/order/index'),
        meta: { title: '教师列表',  }
      },
      {
        path: 'Carousel',
        name: 'Carousel',
        hidden:true,
        component: () => import('@/views/order/carousel'),
        meta: { title: '教师轮播图',  }
      },
      {
        path: 'comment',
        name: 'comment',
        component: () => import('@/views/comment/comment'),
        meta: { title: '评论列表',  }
      },
      {
        path: 'wallet',
        name: 'wallet',
        component: () => import('@/views/order/wallet'),
        meta: { title: '教师中心',  }
      },
    ]
  },
  {
    path: '/studio',
    component: Layout,
    name: 'studio',
    meta:{
        title: '工作室管理',
        icon: 'dashboard'
    },
    children: [
      {
        path: 'studio',
        name: 'studio',
        component: () => import('@/views/studio/index'),
        meta: { title: '工作室管理'}
      },
      {
        path: 'curriculum',
        name: 'curriculum',
        component: () => import('@/views/curriculum/curriculum'),
        meta: { title: '课程管理'},
        hidden:true,
      }
    ]
  },
  {
    path: '/card',
    component: Layout,
    redirect: '/card',
    name:'/card',
    meta: { title: '会员卡管理', icon: 'hy' },
    children: [
      {
        path: 'card',
        name: 'card',
        component: () => import('@/views/card/index'),
        meta: { title: '会员卡管理', }
      },
      {
        path: 'comment2',
        name: 'comment2',
        component: () => import('@/views/comment/comment2'),
        meta: { title: '转卡列表',  }
      },
    ]
  },
  {
    path: '/homeCarousel',
    component: Layout,
    redirect: '/homeCarousel',
    name:'/homeCarousel',
    meta: { title: '首页轮播图', icon: 'lbt' },
    children: [
      {
        path: 'homeCarousel',
        name: 'homeCarousel',
        component: () => import('@/views/homeCarousel/index'),
        meta: { title: '首页轮播图',}
      },
    ]
  },
  {
    path:'/feedback',
    component:Layout,
    name:'feedback',
    meta:{
      title: '意见反馈',
      icon: 'dashboard'
    },
    children:[
      {
        path:'Feedback',
        component:() =>import('@/views/Feedback/Feedback'),
        name:'Feedback',
        meta: { title: '意见反馈'}
      },
    ]
  },
  {
    path:'/article',
    component:Layout,
    name:'article',
    meta:{
      title: '公告管理',
      icon: 'gg'
    },
    children:[
      {
        path:'questionTitle',
        component:() =>import('@/views/article/question-title'),
        name:'questionTitle',
        meta: { title: '公告类型'}
      },
      {
        path:'articles',
        component:() =>import('@/views/article/problems'),
        name:'articles',
        meta: { title: '标题'}
      },
      {
        path:'articleClassification',
        component:() =>import('@/views/article/feedback'),
        name:'articleClassification',
        meta: { title: '内容'}
      },
    ]
  },
  {
    path:'/activity',
    component:Layout,
    name:'activity',
    meta:{
      title: '活动管理',
      icon: 'gg'
    },
    children:[
      {
        path:'activity',
        component:() =>import('@/views/activity/index'),
        name:'activity',
        meta: { title: '添加活动'}
      },
      {
        path:'activity1',
        component:() =>import('@/views/activity/user'),
        name:'activity1',
        meta: { title: '报名列表'}
      },
      {
        path:'activity2',
        component:() =>import('@/views/activity/activity'),
        name:'activity2',
        meta: { title: '全名砍价'}
      },
    ]
  },
  {
	  path:'/jurisdiction1',
	  component:Layout,
	  name:'jurisdiction1',
	  meta:{
	    title: '系统管理',
	    icon: 'xt'
	  },
	  children:[
      {
        path:'personnel',
        component:() =>import('@/views/personnel/personnel'),
        name:'personnel',
        meta: { title: '人员管理'}
      },
	    {
	      path:'jurisdictionbranch',
	      component:() =>import('@/views/right/branch'),
	      name:'jurisdictionbranch',
	      meta: { title: '角色管理'}
	    },
      {
        path:'jurisdictionuser',
        component:() =>import('@/views/right/user'),
        name:'jurisdictionuser',
        hidden:true,
        meta: { title: '人员管理'}
      },
      {
        path:'jurisdictionmenu',
        component:() =>import('@/views/right/menu'),
        name:'jurisdictionmenu',
        meta: { title: '权限添加'}
      },
      {
        path:'jurisdictionsubmenu',
        component:() =>import('@/views/right/submenu'),
        name:'jurisdictionsubmenu',
        hidden:true,
        meta: { title: '子菜单'}
      },
      {
        path:'element_menu',
        component:() =>import('@/views/right/element_menu'),
        name:'element_menu',
        hidden:true,
        meta: { title: '按钮'}
      },
	  ]
	},
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
