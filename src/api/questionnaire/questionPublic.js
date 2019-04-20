import axios from '@/utils/http' // 导入http中创建的axios实例

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
  }
}
export default questPublic
