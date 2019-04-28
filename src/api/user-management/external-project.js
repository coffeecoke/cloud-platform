import axios from '@/utils/http' // 导入http中创建的axios实例
const externalProject = {
  // 外部项目查看
  queryExternalProjects (params) {
    return axios({
      method: 'post',
      url: '/project/queryExternalProjects',
      data: params
    })
  },
  // 外部项目保存
  saveExternalProjects (params) {
    return axios({
      method: 'post',
      url: '/project/saveExternalProjects',
      data: params
    })
  },
  // 外部项目删除
  delExternalProjects (params) {
    return axios({
      method: 'post',
      url: '/project/delExternalProjects',
      data: params
    })
  }
}

export default externalProject
