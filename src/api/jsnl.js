import axios from '@/utils/http' // 导入http中创建的axios实例
// import Qs from 'qs'
const jsnl = {
  // 技术能力查看
  queryTechnologicalCapability (params) {
    return axios({
      method: 'post',
      url: '/resume/queryTechnologicalCapability',
      data: params
    })
  },
  // 技术能力保存
  saveTechnologicalCapability (params) {
    return axios({
      method: 'post',
      url: '/resume/saveTechnologicalCapability',
      data: params
    })
  },

  // 技术能力删除
  delTechnologicalCapability (params) {
    return axios({
      method: 'post',
      url: '/resume/delTechnologicalCapability',
      data: params
    })
  }

}
export default jsnl
