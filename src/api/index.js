// 用户管理api
import userManagementApi from './user-management'
// 人员管理
// 获取用户信息
import userInfo from './user'
// 问卷调查
import question from './questionnaire'
// 字典表
import dictionary from './dictionary'
// 对外暴露所有模块的接口
export default Object.assign({}, userManagementApi, userInfo, question, dictionary)
