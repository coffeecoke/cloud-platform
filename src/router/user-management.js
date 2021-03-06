// 个人中心主页
import UserManagement from '@/views/user-management/index'
// 我的情况
import mySituation from '@/views/user-management/my-situation'
// 基本信息
import BaseInfo from '@/views/user-management/base-info'
// 培训经历
import TrainingExperience from '@/views/user-management/training-experience'
// 自我评价
import SelfEvaluation from '@/views/user-management/self-evaluation'
// 任务承接
import TaskAceeptance from '@/views/user-management/task-acceptance'
// 外部项目
import ExternalProject from '@/views/user-management/external-project'
// 融鑫项目
import RxProject from '@/views/user-management/rx-project'
// import Pm from '@/views/pm/pm'

export default [{
  path: 'userManagement',
  component: UserManagement,
  name: '个人中心',
  children: [{
    path: '/',
    name: '我的情况',
    component: mySituation
  },
  {
    path: '/1-1',
    name: '基本信息',
    component: BaseInfo
  },
  {
    path: '/1-2',
    name: '培训经历',
    component: TrainingExperience
  },
  {
    path: '/1-3',
    name: '自我评价',
    component: SelfEvaluation
  },
  {
    path: '/1-4',
    name: '任务承接',
    component: TaskAceeptance
  },
  {
    path: '/1-5',
    name: '外部项目',
    component: ExternalProject
  },
  {
    path: '/1-6',
    name: '融鑫项目',
    component: RxProject
  }
  ]
}]
