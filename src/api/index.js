// 用户管理api
import userManagementApi from './user-management'
// 人员管理
// 获取用户信息
import userInfo from './user'
// 问卷调查
import question from './questionnaire'
// 字典表
import dictionary from './dictionary'
// 合伙人管理
import partner from './personal-management'
// 表逻辑
import tableLogic from './tableLogic'
// 对外暴露所有模块的接口，方便每vue都能调用所有的api
export default Object.assign({},
  userManagementApi,
  userInfo,
  question,
  dictionary,
  partner,
  tableLogic
)
