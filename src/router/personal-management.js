// import Layout from '@/views/layout/layout'
import PersonalManagement from '@/views/personal-management/index'
import UserProfile from '@/views/personal-management/user-profile'
import MatchingQuery from '@/views/personal-management/matching-query'

export default [{
  path: '/personalManagement',
  component: PersonalManagement,
  name: '合伙人管理',
  // redirect: '/nav1',
  children: [
    {
      path: '/',
      name: '用户概括',
      component: UserProfile,
      redirect: '/nav1'
    },
    {
      path: '/nav1',
      name: '用户概括',
      component: UserProfile
    },
    {
      path: '/nav2',
      name: '匹配查询',
      component: MatchingQuery
    }
  ]
}]
