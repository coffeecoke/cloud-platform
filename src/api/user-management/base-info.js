import axios from '@/utils/http' // 导入http中创建的axios实例
// import Qs from 'qs'
const headers = {
  // 'Content-Type': 'multipart/form-data'
  'Content-Type': 'application/x-www-form-urlencoded',
  'token': '6S2Ng1VO3ifU6fqGUmKNmRpJPEUSzIjI'
  // 'Accept': `*/*`
}
const baseInfo = {
  // 获取基本信息
  getuserbylognname (params) {
    return axios({
      method: 'post',
      url: '/user/getuserbylognname',
      data: params,
      headers: headers
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
