import axios from '@/utils/http' // 导入http中创建的axios实例
import Qs from 'qs'
const userInfo = {
  // 获取用户权限
  getUserInfo (params) {
    return axios({
      method: 'post',
      url: '/user/dologin',
      data: Qs.stringify(params)
    })
  },

  // 获取script
  getScript (params) {
    return axios({
      method: 'get',
      url: 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
    })
  },
  loadQRCode () {
    return axios({
      method: 'post',
      url: '/resoft/wxopen/QRCodeLoad'
    })
  },
  submitWxCode (params) {
    return axios({
      method: 'post',
      url: '/user/callback',
      data: Qs.stringify(params)
    })
  },
  // 注册提交
  saveWechatInfo (params) {
    return axios({
      method: 'post',
      url: '/user/saveWechatInfoExt',
      data: Qs.stringify(params)
    })
  },
  // 内网虚拟登录
  servlesslogin (params) {
    return axios({
      method: 'post',
      url: '/rcdp/resoft/wxopen/servlesslogin',
      params: Qs.stringify(params)
    })
  }

  //
}
export default {
  userInfo: userInfo
}
