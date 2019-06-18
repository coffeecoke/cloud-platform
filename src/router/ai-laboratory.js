
import AiLaboratory from '@/views/ai-laboratory/index'
import KnowledgeGraph from '@/views/ai-laboratory/knowledge-graph'
export default [{
  path: '/worker-1',
  component: AiLaboratory,
  name: '工作台',
  redirect: '/worker-1',
  children: [
    {
      path: '/worker-1-1',
      name: '工作台1',
      component: KnowledgeGraph
    }
  ]
}]
