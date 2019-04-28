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
  // 获取企业列表
  getEnterprise (params) {
    return axios({
      method: 'post',
      url: '/user/getEnterprise',
      data: params
    })
  },

  // 根据ID获取培训经历
  queryResumebyId (params) {
    return axios({
      method: 'post',
      url: '/resume/queryResumebyId',
      data: params
    })
  },
  // 根据ID获取业务能力
  queryProfessionalCapabilityById (params) {
    return axios({
      method: 'post',
      url: '/resume/queryProfessionalCapabilityById',
      data: params
    })
  },
  // 根据ID获取技术能力
  queryTechnologicalCapabilityById (params) {
    return axios({
      method: 'post',
      url: '/resume/queryTechnologicalCapabilityById',
      data: params
    })
  },
  // 根据ID获取语言能力
  queryLanguageAbilityById (params) {
    return axios({
      method: 'post',
      url: '/resume/queryLanguageAbilityById',
      data: params
    })
  }

}
// 获取企业列表
export default {
  partner: partner
}
