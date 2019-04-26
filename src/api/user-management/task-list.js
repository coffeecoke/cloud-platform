
import axios from '@/utils/http' // 导入http中创建的axios实例
// import Qs from 'qs'
const TaskList = {
  // 级联查询
  getTaskGroupTree (params) {
    return axios({
      method: 'post',
      url: '/taskSet/getTaskGroupTree',
      data: params
    })
  },
  // 任务发布查询
  getTaskList (params) {
    return axios({
      method: 'post',
      url: '/taskSet/getTaskList',
      data: params
    })
  }

}
export default TaskList
