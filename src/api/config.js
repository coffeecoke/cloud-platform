
import axios from 'axios'
// import Qs from 'qs'
export let commonConfig = {
  headers: { 'Content-Type': 'multipart/form-data' },
  // 添加上传进度监听事件
  onUploadProgress: e => {
    // var completeProgress = ((e.loaded / e.total * 100) | 0) + '%'
    // this.progress = completeProgress
  }
}

export function get (url, params, config) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }, Object.assign({}, commonConfig, config)).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function post (url, params, config) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, Object.assign({}, commonConfig, config))
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
