import axios from '@/utils/http' // 导入http中创建的axios实例
const mySituation = {
  // 基本信息百分比
  essentialInformationPercentage (params) {
    return axios({
      method: 'post',
      url: '/user/essentialInformationPercentage',
      data: params
    })
  },
  // 培训经历百分比
  resumePercentage (params) {
    return axios({
      method: 'post',
      url: '/resume/resumePercentage',
      data: params
    })
  },
  // 自我评价百分比
  selfRatingViewPercentage (params) {
    return axios({
      method: 'post',
      url: '/resume/selfRatingViewPercentage',
      data: params
    })
  },
  // 任务承接百分比
  taskUndertakingPercentage (params) {
    return axios({
      method: 'post',
      url: '/taskUndertaking/taskUndertakingPercentage',
      data: params
    })
  },
  // 外部项目百分比
  externalProjectPercentage (params) {
    return axios({
      method: 'post',
      url: '/project/externalProjectPercentage',
      data: params
    })
  },
  // 融鑫项目百分比
  resoftProjectPercentage (params) {
    return axios({
      method: 'post',
      url: '/project/resoftProjectPercentage',
      data: params
    })
  },

  // 拼接上面的6个请求
  situationAll () {
    return axios.all(
      [
        this.essentialInformationPercentage(),
        this.resumePercentage(),
        this.selfRatingViewPercentage(),
        this.taskUndertakingPercentage(),
        this.externalProjectPercentage(),
        this.resoftProjectPercentage()
      ]
    )
  }
}
export default mySituation
