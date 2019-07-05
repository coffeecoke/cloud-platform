import router from '@/router'
import { formatRoutes } from '@/utils'
import routerMapComponents from '@/router/routerMapComponent'
const state = {
  permissionRouter: []
}
const mutations = {
  ADD_ROUTES: (state, addRoutes) => {
    formatRoutes(addRoutes, routerMapComponents) // 将后台的路由数据components转化成组件
    router.addRoutes(addRoutes) // 添加路由
    router.push('/')
  }
}
const actions = {
  addRoutes ({commit}, addRoutes) {
    commit('ADD_ROUTES', addRoutes)
  }
}
export default {
  state,
  mutations,
  actions
}
