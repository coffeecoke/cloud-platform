
import {post} from './config'
// 融鑫项目查看
export const queryResoftProject = p => post('/project/queryResoftProject', p, {})
// 融鑫项目保存
export const saveResoftProject = p => post('/project/saveResoftProject', p, {})
// 融鑫项目删除
export const delresume = p => post('/project/delResoftProject', p, {})
// 融鑫项目同步
export const synchronizationResoftProject = p => post('/project/synchronizationResoftProject', p, {})
