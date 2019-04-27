import axios from '@/utils/http' // 导入http中创建的axios实例
// import Qs from 'qs'
const partner = {
  // 获取用户列表
  getUserAll (params) {
    return axios({
      method: 'post',
      url: '/user/getUserAll',
      data: params
    })
  },
  getEnterprise (params) {
    return axios({
      method: 'post',
      url: '/user/getEnterprise',
      data: params
    })
  }
}
// 获取企业列表
export default {
  partner: partner
}
