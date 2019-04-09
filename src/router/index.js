import Vue from 'vue'
import Router from 'vue-router'
import Page404 from '@/views/404'
import Layout from '@/views/layout/layout'
import Home from '@/views/home/index'
import UserManagement from '@/views/user-management/index'
import mySituation from '@/views/user-management/my-situation'
import BaseInfo from '@/views/user-management/base-info'
import TrainingExperience from '@/views/user-management/training-experience'
import SelfEvaluation from '@/views/user-management/self-evaluation'
import Pm from '@/views/pm/pm'
Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/404',
    component: Page404

  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/',
    component: Layout,
    redirect: '/userManagement',
    name: '个人信息',
    children: [
      {
        path: 'userManagement',
        component: UserManagement,
        redirect: '/userManagement/',
        children: [
          {
            path: '/',
            name: '我的情况',
            component: mySituation
          },
          {
            path: '/1-1',
            name: '基本信息',
            component: BaseInfo
          },
          {
            path: '/1-2',
            name: '培训经历',
            component: TrainingExperience
          },
          {
            path: '/1-3',
            name: '自我评价',
            component: SelfEvaluation
          }
        ]
      },
      {
        path: '/layout/pm/',
        component: Pm
      }
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
