import axios from '@/utils/http' // 导入http中创建的axios实例

const questionBank = {
  // 问题管理---获取列表信息
  getQuestionBankList: (params) => {
    return axios({
      method: 'post',
      url: '/quest/getQuestionBankList',
      data: params
    })
  },
  // 问题管理--保存问题数据
  saveQuestionBank: (params) => {
    return axios({
      method: 'post',
      url: '/quest/saveQuestionBank',
      data: params
    })
  },
  // 问题管理--删除问题数据
  deleteQuestionBank: (params) => {
    return axios({
      method: 'post',
      url: '/quest/deleteQuestionBank',
      data: params
    })
  },
  // 问题管理--添加选项信息
  loadQuestionOptions: (params) => {
    return axios({
      method: 'post',
      url: '/quest/loadQuestionOptions',
      data: params
    })
  },
  // 问题管理--添加选项信息 --保存选项数据
  saveQuestionOption: (params) => {
    return axios({
      method: 'post',
      url: '/quest/saveQuestionOption',
      data: params
    })
  },
  // 问题管理--添加选项信息 --删除数据
  deleteQuestionOption: (params) => {
    return axios({
      method: 'post',
      url: '/quest/deleteQuestionOption',
      data: params
    })
  }
}
export default questionBank
