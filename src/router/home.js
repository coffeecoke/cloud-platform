import Home from '@/views/home/index'
// 任务领取
import TaskCollection from '@/views/task-system/task-collection'
// 我的待办
import Mytodo from '@/views/task-system/my-todo'
// 我的任务
import MyTask from '@/views/task-system/my-task'
export default [{
  path: '/home',
  component: Home,
  name: '首页',
  redirect: '/2-6',
  children: [
    {
      path: '/2-4',
      name: '任务领取',
      component: TaskCollection
    },
    {
      path: '/2-6',
      name: '我的待办',
      component: Mytodo
    },
    {
      path: '/2-10',
      name: '我的任务',
      component: MyTask
    }
  ]
}]
