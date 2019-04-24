import axios from '@/utils/http' // 导入http中创建的axios实例
// import Qs from 'qs'
const taskIssue = {
  // 模糊查询1
  getProject () {
    return axios({
      method: 'post',
      url: '/taskPublish/getProject'
      // data: params
    })
  },
  // 级联查询
  getTaskGroupTree (params) {
    return axios({
      method: 'post',
      url: '/taskSet/getTaskGroupTree',
      data: params
    })
  },
  // 任务发布查询
  getPublishTaskList (params) {
    return axios({
      method: 'post',
      url: '/taskPublish/getPublishTaskList',
      data: params
    })
  }

}
export default taskIssue
