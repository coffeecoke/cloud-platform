import axios from '@/utils/http' // 导入http中创建的axios实例
import Qs from 'qs'

const questionnaire = {
  // 问卷管理---获取列表信息
  getQuestionnaireList: (params) => {
    return axios({
      method: 'post',
      url: '/question/getQuestionnaireList',
      data: params
    })
  },
  // 问卷管理--保存问题数据
  saveQuestionnaire: (params) => {
    return axios({
      method: 'post',
      url: '/question/saveQuestionnaire',
      data: params
    })
  },
  // 问卷管理--删除问题数据
  deleteQuestionnaire: (params) => {
    return axios({
      method: 'post',
      url: '/question/deleteQuestionnaire',
      data: Qs.stringify(params)
    })
  },
  // 问卷管理--添加问题信息
  loadQuestList: (params) => {
    return axios({
      method: 'post',
      url: '/question/loadQuestList',
      data: params
    })
  },
  // 问题管理--添加问题 --保存数据
  saveQuestList: (params) => {
    return axios({
      method: 'post',
      url: '/question/saveQuestList',
      data: params
    })
  },
  // 加载所有问题列表 和 问题已选问题列表
  loadQuestDataList: (params) => {
    return axios({
      method: 'post',
      url: '/question/loadQuestDataList',
      data: Qs.stringify(params)
    })
  },
  // 保存问卷选择问题
  saveQuestDataList: (params) => {
    console.log(Qs.parse(params))
    return axios({
      method: 'post',
      url: '/question/saveQuestDataList',
      data: Qs.stringify(params)
    })
  },
  // 问卷预览
  showQuestionnaire: (params) => {
    return axios({
      method: 'post',
      url: '/question/showQuestionnaire',
      data: Qs.stringify(params)
    })
  }
}
export default questionnaire
