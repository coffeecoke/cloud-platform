import Vue from 'vue'
import Router from 'vue-router'
import Page404 from '@/views/404'
import WxCodePage from '@/views/login/wx-qrcode'
import Register from '@/views/login/register'
import Login from '@/views/login/login'
import Layout from '@/views/layout/layout'
// 首页模块
import Home from './home'
// 个人中心路由模块
import UserRouter from './user-management'
// 问卷调查
import Quest from './questionnaire'
// 用户管理路由模块
import PersonalManagement from './personal-management'
// 项目管理
import TaskSystem from './task-system'
// 取数逻辑表
import TableLogic from '@/views/table-logic/tableLogic'
Vue.use(Router)
// let routes = new Set([...UserRouter]) // 合并多个路由模块
// const router = new Router({
//   routes
// })
const router = new Router({
  routes: [{
    path: '/404',
    component: Page404
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/wxCodePage',
    component: WxCodePage

  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/tableLogic',
    component: TableLogic
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      ...Home,
      // 用户管理路由模块
      ...UserRouter,
      ...Quest,
      ...PersonalManagement,
      ...TaskSystem
    ]
  }
  ]
})
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
