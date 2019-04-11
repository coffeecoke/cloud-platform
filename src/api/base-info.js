
import {post} from './config'
// 获取基本信息
export const getuserbylognname = p => post('/user/getuserbylognname', p, {})
// 提交基本信息
export const registerUser = p => post('/user/registerUser', p, {})
