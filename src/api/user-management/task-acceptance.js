
import axios from '@/utils/http' // 导入http中创建的axios实例
import Qs from 'qs'
const taskAcceptance = {
  // 任务承接查看
  queryTaskUndertaking (params) {
    return axios({
      method: 'post',
      url: '/taskUndertaking/queryTaskUndertaking'
      // data: params
    })
  },
  queryTask (params) {
    return axios({
      method: 'post',
      url: '/taskUndertaking/queryTask',
      data: Qs.stringify(params)
    })
  }

}
export default taskAcceptance
