import axios from '@/utils/http' // 导入http中创建的axios实例
// import Qs from 'qs'
const Thirdparty = {
  // 模糊查询1
  getProject () {
    return axios({
      method: 'post',
      url: '/taskClaim/getProject'
      // data: params
    })
  },
  //  任务功能
  claim (params) {
    return axios({
      method: 'post',
      url: '/taskClaim/claim',
      data: params
    })
  },
  // 任务体系查询
  getCountTaskList (params) {
    return axios({
      method: 'post',
      url: '/taskCount/getCountTaskList',
      data: params
    })
  }

}
export default Thirdparty
