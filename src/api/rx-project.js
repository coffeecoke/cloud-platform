import axios from '@/utils/http' // 导入http中创建的axios实例
const resoftProject = {
  // 融鑫项目查看
  queryResoftProject (params) {
    return axios({
      method: 'post',
      url: '/project/queryResoftProject',
      data: params
    })
  },
  // 融鑫项目保存
  saveResoftProject (params) {
    return axios({
      method: 'post',
      url: '/project/saveResoftProject',
      data: params
    })
  },
  // 融鑫项目删除
  delresume (params) {
    return axios({
      method: 'post',
      url: '/project/delResoftProject',
      data: params
    })
  },
  // 融鑫项目同步
  synchronizationResoftProject (params) {
    return axios({
      method: 'post',
      url: '/project/synchronizationResoftProject',
      data: params
    })
  }
}

export default resoftProject
