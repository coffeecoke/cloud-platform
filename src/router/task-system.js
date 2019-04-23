import TaskSystem from '@/views/task-system/index'
// 任务列表
import TaskList from '@/views/task-system/task-list'
// 任务体系
import TaskCreate from '@/views/task-system/task-create'
// 任务发布
import TaskIssued from '@/views/task-system/task-issue'
// 任务领取
import TaskCollection from '@/views/task-system/task-collection'
// 任务组
import TaskGroup from '@/views/task-system/task-group'

export default [{
  path: 'taskSystem',
  component: TaskSystem,
  name: '项目管理',
  children: [
    {
      path: '/',
      name: '任务体系',
      component: TaskCreate
    },
    {
      path: '/2-2',
      name: '任务列表',
      component: TaskList
    },
    {
      path: '/2-3',
      name: '任务发布',
      component: TaskIssued
    },
    {
      path: '/2-4',
      name: '任务领取',
      component: TaskCollection
    },
    {
      path: '/2-5',
      name: '任务组',
      component: TaskGroup
    }
  ]
}]
