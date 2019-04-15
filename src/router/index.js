import Vue from 'vue'
import Router from 'vue-router'
import Page404 from '@/views/404'
import Login from '@/views/login/login'
import Layout from '@/views/layout/layout'
import Home from '@/views/home/index'
// 个人中心路由模块
import UserRouter from './user-management'
import Queste from './questionnaire'
// 用户中心路由模块
Vue.use(Router)
// let routes = new Set([...UserRouter]) // 合并多个路由模块
// const router = new Router({
//   routes
// })

let secRouter = []
secRouter.push(UserRouter)
secRouter.push(Queste)

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
    path: '/home',
    component: Home
  },
  {
    path: '/',
    component: Layout,
    redirect: '/userManagement',
    name: '我的情况',
    children: secRouter
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
