// import Layout from '@/views/layout/layout'
import Quest from '@/views/questionnaire/index'
import QuestBanks from '@/views/questionnaire/questionBanks'
import Questionnaire from '@/views/questionnaire/questionnaire'
import QuestionPublic from '@/views/questionnaire/questionPublic'
export default [{
  path: '/quest',
  component: Quest,
  redirect: '/qu-1',
  name: '调查问卷管理',
  children: [
    {
      path: '/qu-1',
      name: '问题管理',
      component: QuestBanks
    },
    {
      path: '/qu-2',
      name: '问卷管理',
      component: Questionnaire
    },
    {
      path: '/qu-3',
      name: '问卷发布',
      component: QuestionPublic
    }
  ]
}]
