/**
 * api接口的统一出口
 */
// 问题管理
import questionBanks from './questionBanks'
// 问卷管理
import questionnaire from './questionnaire'
// 问卷发布
import questionPublic from './questionPublic'
// 导出接口
export default {
  questionBanks,
  questionnaire,
  questionPublic
}
