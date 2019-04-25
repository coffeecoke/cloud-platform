/**
 * api接口的统一出口
 */
// 基本信息
import baseInfo from './base-info'
// 培训经历
import trainingExperience from './training-experience'
// 融鑫项目
import resoftProject from './rx-project.js'
// 业务能力
import ywnl from './ywnl'
// 技术能力
import jsnl from './jsnl'
// 语言能力
import yynl from './yynl'
// 我的情况
import mySituation from './my-situation'
import taskAcceptance from './task-acceptance'
// 任务发布
import taskIssue from './task-issue'
// 任务组
import TaskGroup from './task-group'
// 任务领取
import TaskCollection from './task-collection'
// 任务统计
import TaskCreate from './task-create'
// 任务列表
import TaskList from './task-list'
// 我的任务
import Wdrw from './wdrw'
// 我的认领
import Wdrl from './wdrl'
// 导出接口
export default {
  baseInfo,
  trainingExperience,
  resoftProject,
  ywnl,
  jsnl,
  yynl,
  mySituation,
  taskAcceptance,
  taskIssue,
  TaskGroup,
  TaskCollection,
  TaskCreate,
  TaskList,
  Wdrw,
  Wdrl
}
