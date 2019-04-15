import axios from '@/utils/http' // 导入http中创建的axios实例
// import Qs from 'qs'
const yynl = {
  // 语言能力查看
  queryLanguageAbility (params) {
    return axios({
      method: 'post',
      url: '/resume/queryLanguageAbility',
      data: params
    })
  },
  // 语言能力保存
  saveLanguageAbility (params) {
    return axios({
      method: 'post',
      url: '/resume/saveLanguageAbility',
      data: params
    })
  },

  // 语言能力删除
  delLanguageAbility (params) {
    return axios({
      method: 'post',
      url: '/resume/delLanguageAbility',
      data: params
    })
  }

}
export default yynl
