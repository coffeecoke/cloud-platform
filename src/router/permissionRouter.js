let permissionRouter = [
  {
    path: '/',
    component: 'Layout',
    redirect: '/home',
    children: [
      // home
      {
        path: '/home',
        name: '首页',
        component: 'Home',
        redirect: '/2-6',
        meta: {
          title: '首页'
        },
        children: [
          {
            path: '/2-4',
            name: '任务领取',
            meta: {
              title: '任务领取'
            },
            component: 'TaskCollection'
          },
          {
            path: '/2-6',
            name: '我的待办',
            meta: {
              title: '我的待办'
            },
            component: 'Mytodo'
          },
          {
            path: '/2-10',
            name: '我的任务',
            meta: {
              title: '我的任务'
            },
            component: 'MyTask'
          }
        ]
      },
      // 个人中心
      {
        path: 'userManagement',
        name: '个人中心',
        component: 'UserManagement',
        children: [{
          path: '/',
          name: '我的情况',
          meta: {
            title: '我的情况'
          },
          component: 'mySituation'
        },
        {
          path: '/1-1',
          name: '基本信息',
          meta: {
            title: '基本信息'
          },
          component: 'BaseInfo'
        },
        {
          path: '/1-2',
          name: '培训经历',
          meta: {
            title: '培训经历'
          },
          component: 'TrainingExperience'
        },
        {
          path: '/1-3',
          name: '自我评价',
          meta: {
            title: '自我评价'
          },
          component: 'SelfEvaluation'
        },
        {
          path: '/1-4',
          name: '任务承接',
          meta: {
            title: '任务承接'
          },
          component: 'TaskAceeptance'
        },
        {
          path: '/1-5',
          name: '外部项目',
          meta: {
            title: '外部项目'
          },
          component: 'ExternalProject'
        },
        {
          path: '/1-6',
          name: '融鑫项目',
          meta: {
            title: '融鑫项目'
          },
          component: 'RxProject'
        }
        ]
      },
      // 用户管理
      {
        path: '/partnerManager',
        component: 'PersonalManagement',
        name: '合伙人管理',
        redirect: '/partner-1',
        children: [
          {
            path: '/partner-1',
            name: '融鑫人员列表',
            component: 'ResoftPeopleList'
          },
          {
            path: '/partner-2',
            name: '融鑫人员能力结构',
            component: 'ResoftCapacityStructure'
          },
          {
            path: '/partner-3',
            name: '企业列表',
            component: 'BusinessList'
          },
          {
            path: '/partner-3-1',
            name: '企业人员列表',
            component: 'BusinessPeopleList'
          },
          {
            path: '/partner-4',
            name: '企业能力评价',
            component: 'BusinessAbilityEvaluation'
          },
          {
            path: '/partner-5',
            name: '个人合伙人员列表',
            component: 'PersonalPeopleList'
          },
          {
            path: '/partner-6',
            name: '个人合伙人能力结构',
            component: 'PersonalCapacityStructrue'
          },
          {
            path: '/partner-7',
            name: '人员能力评价模型',
            component: 'capabilityRatingModel'
          },
          {
            path: '/partner-8',
            name: '人员费用计价模型',
            component: 'costPricingModel'
          }
        ]
      },
      // 项目管理
      {
        path: '/projectManager',
        component: 'TaskSystem',
        name: '项目管理',
        redirect: '/2-1',
        children: [
          {
            path: '/2-1',
            name: '项目列表',
            meta: {
              title: '项目列表'
            },
            component: 'TaskCreate'
          },
          {
            path: '/contextMap',
            name: '脉络图',
            meta: {
              title: '脉络图'
            },
            component: 'ContextMap'
          },
          {
            path: '/2-2',
            name: '任务列表',
            meta: {
              title: '任务列表'
            },
            component: 'TaskList'
          },
          {
            path: '/2-3',
            name: '任务发布',
            meta: {
              title: '任务发布'
            },
            component: 'TaskIssued'
          },
          {
            path: '/2-5',
            name: '任务组',
            meta: {
              title: '任务组'
            },
            component: 'TaskGroup'
          },
          {
            path: '/2-7',
            name: '融鑫承接',
            meta: {
              title: '融鑫承接'
            },
            component: 'Resoft'
          },
          {
            path: '/2-8',
            name: '第三方企业承接',
            meta: {
              title: '第三方企业承接'
            },
            component: 'Thirdparty'
          },
          {
            path: '/2-9',
            name: '个人承接',
            meta: {
              title: '个人承接'
            },
            component: 'PersonUnderTake'
          },
          {
            path: '/qu-3',
            name: '问卷调查',
            meta: {
              title: '问卷调查'
            },
            component: 'QuestionPublic'
          },
          {
            path: '/qu-6',
            name: '验收及转结',
            meta: {
              title: '验收及转结'
            },
            component: 'PostProject'
          }
        ]
      }
    ]
  }
]
export default permissionRouter
