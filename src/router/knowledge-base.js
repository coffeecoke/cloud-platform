import Knowledge from '@/views/knowledge-base/index'
import Knowledge1 from '@/views/knowledge-base/knowledge-1'
export default [{
  path: '/knowledge',
  component: Knowledge,
  redirect: '/',
  name: '知识库',
  children: [
    {
      path: '/qu-1',
      name: '菜单1',
      component: Knowledge1
    }
  ]
}]
