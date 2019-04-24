import axios from '@/utils/http' // 导入http中创建的axios实例
import Qs from 'qs'

const questPublic = {
  // 问卷发布---获取列表信息
  getQuestionDeployList: (params) => {
    return axios({
      method: 'post',
      url: '/question/getQuestionDeployList',
      data: params
    })
  },
  // 问卷发布--保存数据
  saveQuestionDeploy: (params) => {
    return axios({
      method: 'post',
      url: '/question/saveQuestionDeploy',
      data: params
    })
  },
  // 问卷发布--删除数据
  deleteQuestionDeploy: (params) => {
    return axios({
      method: 'post',
      url: '/question/deleteQuestionDeploy',
      data: params
    })
  },
  // 根据用户输入---加载所有符合条件问卷
  loadQuestAsync: (params) => {
    return axios({
      method: 'post',
      url: '/question/loadQuestAsync',
      data: Qs.stringify(params)
    })
  }
}
export default questPublic
