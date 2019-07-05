import axios from '@/utils/http' // 导入http中创建的axios实例
const permissionMenu = {
  getHeaderMenu (params) {
    return axios({
      method: 'post',
      url: ''
    })
  }
}
export default {
  permissionMenu
}
