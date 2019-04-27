
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
  // 任务列表查询
  getTaskList (params) {
    return axios({
      method: 'post',
      url: '/taskSet/getTaskList',
      data: params
    })
  },
  // 部门查询
  getTaskPersonList (params) {
    return axios({
      method: 'post',
      url: '/taskSet/getTaskPersonList',
      data: params
    })
  },
  // 任务列表分配
  saveSubordinatePerson (params) {
    return axios({
      method: 'post',
      url: '/taskSet/saveSubordinatePerson',
      data: params
    })
  },
  // 任务列表设置属组
  saveMultTaskGroup (params) {
    return axios({
      method: 'post',
      url: '/taskSet/saveMultTaskGroup',
      data: params
    })
  },
  // 审核操作
  auditTask (params) {
    return axios({
      method: 'post',
      url: '/taskSet/auditTask',
      data: params
    })
  },
  // 验收操作
  acceptTask (params) {
    return axios({
      method: 'post',
      url: '/taskSet/acceptTask',
      data: params
    })
  },
  // 验收操作
  saveTaskPlan (params) {
    return axios({
      method: 'post',
      url: '/taskSet/saveTaskPlan',
      data: params
    })
  }

}
export default TaskList
