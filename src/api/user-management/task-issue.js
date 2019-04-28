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
  // 任务发布查询
  getPublishTaskList (params) {
    return axios({
      method: 'post',
      url: '/taskPublish/getPublishTaskList',
      data: params
    })
  },
  // 技能级联查询
  getTaskSkill (params) {
    return axios({
      method: 'post',
      url: '/taskPublish/getTaskSkill'
      // data: params
    })
  },
  // 技能级联查询
  getCapAbilityLevels (params) {
    return axios({
      method: 'post',
      url: '/taskPublish/getCapAbilityLevels'
      // data: params
    })
  },
  publishTask (params) {
    return axios({
      method: 'post',
      url: '/taskPublish/publishTask',
      data: params
    })
  }

}
export default taskIssue
