// import Layout from '@/views/layout/layout'
import Quest from '@/views/questionnaire/index'
import QuestBanks from '@/views/questionnaire/questionBanks'
import Questionnaire from '@/views/questionnaire/questionnaire'
import QuestionPublic from '@/views/questionnaire/questionPublic'
import QuestionShow from '@/views/questionnaire/showquestionnaire'
import QuestionAnswer from '@/views/questionnaire/questionAnswer'
import PostProject from '@/views/questionnaire/postProject'
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
      path: '/qu-4',
      name: '问卷预览',
      component: QuestionShow
    },
    {
      path: '/qu-5',
      name: '问卷参与',
      component: QuestionAnswer
    }
  ]
}, {
  path: '/quest',
  component: Quest,
  redirect: '/qu-3',
  name: '项目结转',
  children: [
    {
      path: '/qu-3',
      name: '问卷调查',
      component: QuestionPublic
    },
    {
      path: '/qu-6',
      name: '验收及结转',
      component: PostProject
    }
  ]
}]
