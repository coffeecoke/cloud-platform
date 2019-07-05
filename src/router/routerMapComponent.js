// key-value路由映射关系，由前台维护
export default {
  // layout结构 //
  Layout: () => import('@/views/layout/layout'),

  // 首页 //
  Home: () => import('@/views/home/index'),
  // 任务领取
  TaskCollection: () => import('@/views/task-system/task-collection'),
  // 我的代办
  Mytodo: () => import('@/views/task-system/my-todo'),
  // 我的任务
  MyTask: () => import('@/views/task-system/my-task'),

  // 个人中心模块 //
  UserManagement: () => import('@/views/user-management/index'),
  // 我的情况
  mySituation: () => import('@/views/user-management/my-situation'),
  // 基本信息
  BaseInfo: () => import('@/views/user-management/base-info'),
  // 培训经历
  TrainingExperience: () => import('@/views/user-management/training-experience'),
  // 自我评价
  SelfEvaluation: () => import('@/views/user-management/self-evaluation'),
  // 任务承接
  TaskAceeptance: () => import('@/views/user-management/task-acceptance'),
  // 外部项目
  ExternalProject: () => import('@/views/user-management/external-project'),
  // 融鑫项目
  RxProject: () => import('@/views/user-management/rx-project'),

  // 用户管理模块 //
  PersonalManagement: () => import('@/views/personal-management/index'),
  // 融鑫人员列表
  ResoftPeopleList: () => import('@/views/personal-management/resoft-people-list'),
  // 融鑫人员能力结构
  ResoftCapacityStructure: () => import('@/views/personal-management/resoft-capacity-structure'),
  // 企业列表
  BusinessList: () => import('@/views/personal-management/business-list'),
  // 企业人员列表
  BusinessPeopleList: () => import('@/views/personal-management/business-people-list'),
  // 企业能力评价
  BusinessAbilityEvaluation: () => import('@/views/personal-management/business-ability-evaluation'),
  // 个人合伙人人员列表
  PersonalPeopleList: () => import('@/views/personal-management/personal-people-list'),
  // 个人能力结构
  PersonalCapacityStructrue: () => import('@/views/personal-management/personal-capacity-structure'),
  // 人员能力评价模型
  capabilityRatingModel: () => import('@/views/personal-management/capability-rating-model'),
  // 人员费用计价模型
  costPricingModel: () => import('@/views/personal-management/cost-pricing-model'),

  // 项目管理 //
  TaskSystem: () => import('@/views/task-system/index'),
  // 任务列表
  TaskList: () => import('@/views/task-system/task-list'),
  // 脉络图
  ContextMap: () => import('@/views/task-system/context-map'),
  // 任务体系
  TaskCreate: () => import('@/views/task-system/task-create'),
  // 任务发布
  TaskIssued: () => import('@/views/task-system/task-issue'),
  // 任务组
  TaskGroup: () => import('@/views/task-system/task-group'),
  // 融鑫承接
  Resoft: () => import('@/views/task-system/resoft-undertake'),
  // 融鑫承接
  Thirdparty: () => import('@/views/task-system/third-party'),
  // 融鑫承接
  PersonUnderTake: () => import('@/views/task-system/person-undertake'),
  // 问卷调查
  QuestionPublic: () => import('@/views/questionnaire/questionPublic'),
  // 验收及转接
  PostProject: () => import('@/views/questionnaire/postProject')

}
