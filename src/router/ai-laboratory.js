
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
  }
]
