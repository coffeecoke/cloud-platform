<template>
  <div class="progress-wrap">
    <situation-bar v-for = "(item, index) in situation" :key="index" :bar-title="item.name" :bar-value="item.value" :bar-height="26">
      <router-link tag="span" :to="links[index].link">
          {{links[index].name}}
      </router-link>
    </situation-bar>
  </div>
</template>
<script>
import SituationBar from '@/components/situation-bar'

export default {
  data () {
    return {
      links: [
        {
          name: '继续完善',
          link: '/1-1'
        },
        {
          name: '继续完善',
          link: '/1-2'
        },
        {
          name: '继续完善',
          link: '/1-3'
        },
        {
          name: '继续完善',
          link: '/1-4'
        },
        {
          name: '补充',
          link: '/1-5'
        },
        {
          name: '补充',
          link: '/1-5'
        }
      ],
      // 需要后台传入
      situation: [
        {
          name: '基本信息',
          value: 80
        },
        {
          name: '培训经历',
          value: 30
        },
        {
          name: '自我评价',
          value: 50
        },
        {
          name: '任务承接',
          value: 10
        },
        {
          name: '外部项目',
          value: 20
        },
        {
          name: '内部项目',
          value: 30
        }
      ]
    }
  },
  computed: {
  },
  components: {
    SituationBar
  }
}
</script>
<style lang="scss" scoped>
  .progress-wrap {
  }
  .el-progress {
    width:462px;
  }
</style>
