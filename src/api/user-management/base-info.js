import axios from '@/utils/http' // 导入http中创建的axios实例
// import Qs from 'qs'
// const headers = {
//   // 'Content-Type': 'multipart/form-data'
// 'Content-Type': 'application/x-www-form-urlencoded'
//   // 'Accept': `*/*`
// }
const baseInfo = {
  // 获取基本信息
  getuserbyloginname (params) {
    return axios({
      method: 'post',
      url: '/user/getuserbyloginname'
      // data: Qs.stringify(params)
    })
  },
  // 提交基本信息
  registerUser (params) {
    return axios({
      method: 'post',
      url: '/user/registerUser',
      data: params
    })
  }
}
export default baseInfo
