import axios from '@/utils/http' // 导入http中创建的axios实例
// import Qs from 'qs'
const Wdrl = {
  // 模糊查询1
  getProject () {
    return axios({
      method: 'post',
      url: '/taskClaim/getProject'
      // data: params
    })
  },
  //  任务领取功能
  claim (params) {
    return axios({
      method: 'post',
      url: '/taskClaim/claim',
      data: params
    })
  },
  // 任务组查询
  getClaimTaskList (params) {
    return axios({
      method: 'post',
      url: '/taskClaim/getClaimTaskList',
      data: params
    })
  }

}
export default Wdrl
