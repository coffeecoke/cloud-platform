import axios from '@/utils/http' // 导入http中创建的axios实例
import Qs from 'qs'
const userInfo = {
  // 获取用户权限
  getUserInfo (params) {
    return axios({
      method: 'post',
      url: '/user/dologin',
      data: Qs.stringify(params),
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}
export default {
  userInfo: userInfo
}
