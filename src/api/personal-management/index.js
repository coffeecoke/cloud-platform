import axios from '@/utils/http' // 导入http中创建的axios实例
import Qs from 'qs'
const partner = {
  // 获取用户列表
  getUserAll (params) {
    return axios({
      method: 'post',
      url: '/user/getUserAll',
      data: Qs.stringify(params)
    })
  }
}
export default {
  partner: partner
}
