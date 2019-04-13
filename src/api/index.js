/**
 * api接口的统一出口
 */
// 基本信息
import baseInfo from '@/api/base-info'
// 培训经历
import trainingExperience from '@/api/training-experience'
// 融鑫项目
import resoftProject from '@/api/rx-project.js'
// 业务能力
import ywnl from '@/api/ywnl'
// 技术能力
import jsnl from '@/api/jsnl'
// 语言能力
import yynl from '@/api/yynl'
// 我的情况
import mySituation from '@/api/my-situation'
// 导出接口
export default {
  baseInfo,
  trainingExperience,
  resoftProject,
  ywnl,
  jsnl,
  yynl,
  mySituation
}
