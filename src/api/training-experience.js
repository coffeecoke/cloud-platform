
import {post} from './config'
// 培训经历保存
export const saveresume = p => post('/resume/saveresume', p, {})
// 培训经历查看
export const queryResumeby = p => post('/resume/queryResumeby', p, {})
// 培训经历删除
export const delresume = p => post('/resume/delresume', p, {})
