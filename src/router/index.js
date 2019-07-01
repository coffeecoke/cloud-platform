import Vue from 'vue'
import Router from 'vue-router'
// 金融ai实验室路由模块
import Ai from './ai-laboratory'

// 首页路由模块
// import Home from './home'
// 个人中心路由模块
// import UserRouter from './user-management'
// 用户管理路由模块
// import PersonalManagement from './personal-management'
// 项目管理路由模块
// import TaskSystem from './task-system'

// 引入权限路由
import permissionRouter from './permissionRouter'
// 引入key-value路由规则
import routerMapComponents from './routerMapComonent'
Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/404',
    component: () => import('@/views/404')
  },
  {
    path: '/login',
    component: () => import('@/views/login/login')
  },
  {
    path: '/wxCodePage',
    component: () => import('@/views/login/wx-qrcode')

  },
  {
    path: '/register',
    component: () => import('@/views/login/register')
  },
  // 取数逻辑表
  {
    path: '/tableLogic',
    component: () => import('@/views/table-logic/tableLogic')
  },

  // 由于标签刷新的hack方法
  {
    path: '/redirect',
    component: () => import('@/views/ai-laboratory'),
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // 金融ai实验室
  {
    path: '/ai',
    component: () => import('@/views/ai-laboratory'),
    redirect: '/ai/serviceManagement',
    children: [
      ...Ai
    ]
  }
  // {
  //   path: '/',
  //   component: () => import('@/views/layout/layout'),
  //   redirect: '/home',
  //   children: [
  //     ...Home,
  //     // 用户管理路由模块
  //     ...UserRouter,
  //     ...PersonalManagement,
  //     ...TaskSystem
  //   ]
  // }
  ]
})
// 处理路由把components字符串，跟key-value规则转换成真正的component组件
const formatRoutes = function (routes) {
  routes.forEach(route => {
    route.component = routerMapComponents[route.component]
    if (route.children) {
      formatRoutes(route.children)
    }
  })
}
formatRoutes(permissionRouter)
router.addRoutes(permissionRouter) // 动态添加路由
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    from.name ? next({
      name: from.name
    }) : next('/404')
  } else {
    // 如果匹配正常跳转
    next()
  }
})
export default router
