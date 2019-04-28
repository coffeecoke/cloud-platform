import axios from '@/utils/http' // 导入http中创建的axios实例
// import Qs from 'qs'
const dictionary = {
  // 获取字典表
  getDictionaries (params) {
    return axios({
      method: 'post',
      url: '/dictionaries/getDictionaries',
      data: params
    })
  },

  // 获取树形字典
  getDictionariesTree (params) {
    return axios({
      method: 'post',
      url: '/dictionaries/getDictionariesTree',
      data: params
    })
  }
}
export default {
  dictionary: dictionary
}
