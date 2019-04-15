import Vue from 'vue'
import Router from 'vue-router'
// 个人中心路由模块
import UserRouter from './user-management'
// 用户中心路由模块
Vue.use(Router)
let routes = new Set([...UserRouter]) // 合并多个路由模块
const router = new Router({
  routes
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
