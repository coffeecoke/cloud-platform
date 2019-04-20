
import axios from '@/utils/http' // 导入http中创建的axios实例
const trainingExperience = {
  // 培训经历保存
  saveresume (params) {
    return axios({
      method: 'post',
      url: '/resume/saveresume',
      data: params
    })
  },
  // 培训经历查看
  queryResumeby (params) {
    return axios({
      method: 'post',
      url: '/resume/queryResumeby'
      // data: params
    })
  },
  // 培训经历删除
  delresume (params) {
    return axios({
      method: 'post',
      url: '/resume/delresume',
      data: params
    })
  },
  // 附件保存，上传服务器
  saveEnclosure (params) {
    return axios({
      method: 'post',
      url: '/enclosure/saveEnclosure',
      data: params
    })
  }
}
export default trainingExperience
