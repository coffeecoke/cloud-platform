// import Layout from '@/views/layout/layout'
import PersonalManagement from '@/views/personal-management/index'
// import UserProfile from '@/views/personal-management/user-profile'
// import MatchingQuery from '@/views/personal-management/matching-query'
// 融鑫人员列表
import ResoftPeopleList from '@/views/personal-management/resoft-people-list'
// 融鑫人员能力结构
import ResoftCapacityStructure from '@/views/personal-management/resoft-capacity-structure'
// 企业列表
import BusinessList from '@/views/personal-management/business-list'
// 企业能力评价
import BusinessAbilityEvaluation from '@/views/personal-management/business-ability-evaluation'
// 个人合伙人人员列表
import PersonalPeopleList from '@/views/personal-management/personal-people-list'
// 个人能力结构
import PersonalCapacityStructrue from '@/views/personal-management/personal-capacity-structure'

// 人员能力评价模型
import capabilityRatingModel from '@/views/personal-management/capability-rating-model'
// 人员费用计价模型
import costPricingModel from '@/views/personal-management/cost-pricing-model'
export default [{
  path: '/personalManagement',
  component: PersonalManagement,
  name: '合伙人管理',
  // redirect: '/nav1',
  children: [
    {
      path: '/partner-1',
      name: '融鑫人员列表',
      component: ResoftPeopleList
    },
    {
      path: '/partner-2',
      name: '融鑫人员能力结构',
      component: ResoftCapacityStructure
    },
    {
      path: '/partner-3',
      name: '企业列表',
      component: BusinessList
    },
    {
      path: '/partner-4',
      name: '企业能力评价',
      component: BusinessAbilityEvaluation
    },
    {
      path: '/partner-5',
      name: '个人合伙人员列表',
      component: PersonalPeopleList
    },
    {
      path: '/partner-6',
      name: '个人合伙人能力结构',
      component: PersonalCapacityStructrue
    },
    {
      path: '/partner-7',
      name: '人员能力评价模型',
      component: capabilityRatingModel
    },
    {
      path: '/partner-8',
      name: '人员费用计价模型',
      component: costPricingModel
    }
  ]
}]
