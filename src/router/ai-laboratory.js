
export default [
  {
    path: 'knowledgeGraph',
    name: '知识图谱',
    component: () => import('@/views/ai-laboratory/knowledge-graph'),
    meta: { title: '知识图谱', icon: 'knowledge', noCache: true }
  },
  {
    path: 'aiText',
    name: '首页',
    component: () => import('@/views/ai-laboratory/ai-text')
  },
  {
    path: 'workBench',
    name: '工作台',
    component: () => import('@/views/ai-laboratory/workbench'),
    meta: { title: '工作台', icon: 'workBench', noCache: true }
  },
  {
    path: 'serviceManagement',
    name: '服务管理',
    component: () => import('@/views/ai-laboratory/service-management'),
    meta: { title: '服务管理', icon: 'serviceManagement', noCache: true }
  }
]
