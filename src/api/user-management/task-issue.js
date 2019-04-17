
import axios from '@/utils/http' // 导入http中创建的axios实例
// import Qs from 'qs'
const taskIssue = {
  // 模糊查询1
  queryByblurry1 (params) {
    return axios({
      method: 'post',
      url: '/taskIssue/queryByblurry1'
      // data: params
    })
  },
  // 模糊查询2
  queryByblurry2 (params) {
    return axios({
      method: 'post',
      url: '/taskIssue/queryByblurry2'
      // data: params
    })
  },
  // 任务发布查看
  queryTask (params) {
    return axios({
      method: 'post',
      url: '/taskIssue/queryTask'
      // data: params
    })
  },
  queryTaskByForm (params) {
    return axios({
      method: 'post',
      url: '/taskIssue/queryTaskByForm',
      data: params
    })
  }

}
export default taskIssue
