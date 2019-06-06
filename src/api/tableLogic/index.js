import axios from '@/utils/http' // 导入http中创建的axios实例
// import Qs from 'qs'
const tableLogic = {
  // 新增逻辑
  newLogic (params) {
    return axios({
      method: 'post',
      url: '/tableLogic/newLogic',
      data: params
    })
  }
}
export default {
  tableLogic: tableLogic
}
