import axios from '@/utils/http' // 导入http中创建的axios实例
// 顶部菜单接口
const permissionMenu = {
  getHeaderMenu (params) {
    return axios({
      method: 'post',
      url: ''
    })
  },
  // 首页左侧菜单接口
  getHomeLeftMenu (params) {
    return axios({
      method: 'post',
      url: ''
    })
  },
  // 项目管理左侧接口
  getPMLeftMenu (params) {
    return axios({
      method: 'post',
      url: ''
    })
  },
  // 基本信息左侧接口
  getBaseLeftMenu (params) {
    return axios({
      method: 'post',
      url: ''
    })
  },
  // 合伙人管理左侧接口
  getParterManagementLeftMenu (params) {
    return axios({
      method: 'post',
      url: ''
    })
  }
}

export default {
  permissionMenu
}
