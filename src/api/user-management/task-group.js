
import axios from '@/utils/http' // 导入http中创建的axios实例
// import Qs from 'qs'
const TaskGroup = {
  // 模糊查询1
  getProject (params) {
    return axios({
      method: 'post',
      url: '/taskPublish/getProject'
      // data: params
    })
  },
  // 级联查询
  initTaskGroupTree (params) {
    return axios({
      method: 'post',
      url: '/taskSet/initTaskGroupTree',
      data: params
    })
  },
  // 任务组查询
  getTaskList (params) {
    return axios({
      method: 'post',
      url: '/taskSet/getTaskList',
      data: params
    })
  },
  // 新增任务组
  saveTaskGroupInfo (params) {
    return axios({
      method: 'post',
      url: '/taskSet/saveTaskGroupInfo',
      data: params
    })
  },
  // 新增任务组
  deleteTaskGroupInfo (params) {
    return axios({
      method: 'post',
      url: '/taskSet/deleteTaskGroupInfo',
      data: params
    })
  }

}
export default TaskGroup
