import axios from '@/utils/http' // 导入http中创建的axios实例
// import Qs from 'qs'
const ywnl = {
  // 业务能力查看
  queryProfessionalCapability (params) {
    return axios({
      method: 'post',
      url: '/resume/queryProfessionalCapability',
      data: params
    })
  },
  // 业务能力保存
  saveProfessionalCapability (params) {
    return axios({
      method: 'post',
      url: '/resume/saveProfessionalCapability',
      data: params
    })
  },

  // 业务能力删除
  delProfessionalCapability (params) {
    return axios({
      method: 'post',
      url: '/resume/delProfessionalCapability',
      data: params
    })
  }

}
export default ywnl
