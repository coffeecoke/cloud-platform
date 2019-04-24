
import axios from '@/utils/http' // 导入http中创建的axios实例
// import Qs from 'qs'
const TaskGroup = {
  // 模糊查询
  getProject (params) {
    return axios({
      method: 'post',
      url: '/taskPublish/getProject'
      // data: params
    })
  },
  // Tree查询
  initTaskGroupTree (params) {
    return axios({
      method: 'post',
      url: '/taskSet/initTaskGroupTree',
      data: params
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
  // 任务组查询
  getTaskList (params) {
    return axios({
      method: 'post',
      url: '/taskSet/getTaskList',
      data: params
    })
  },
  // 新增修改任务组
  saveTaskGroupInfo (params) {
    return axios({
      method: 'post',
      url: '/taskSet/saveTaskGroupInfo',
      data: params
    })
  },
  // 删除任务组
  deleteTaskGroupInfo (params) {
    return axios({
      method: 'post',
      url: '/taskSet/deleteTaskGroupInfo',
      data: params
    })
  },
  // 新增修改任务组
  saveTaskGroup (params) {
    return axios({
      method: 'post',
      url: '/taskSet/saveTaskGroup',
      data: params
    })
  }

}
export default TaskGroup
