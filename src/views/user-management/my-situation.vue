
<template>
  <div class="progress-wrap">
    <situation-bar  :bar-title="information.data.name" :bar-value="information.data.value" :bar-height="26">
      <router-link tag="span" :to="information.link">
          {{information.linkName}}
      </router-link>
    </situation-bar>
    <situation-bar  :bar-title="resume.data.name" :bar-value="resume.data.value" :bar-height="26">
      <router-link tag="span" :to="resume.link">
          {{resume.linkName}}
      </router-link>
    </situation-bar>
    <situation-bar  :bar-title="selfRatingView.data.name" :bar-value="selfRatingView.data.value" :bar-height="26">
      <router-link tag="span" :to="selfRatingView.link">
          {{selfRatingView.linkName}}
      </router-link>
    </situation-bar>
    <situation-bar  :bar-title="taskUndertaking.data.name" :bar-value="taskUndertaking.data.value" :bar-height="26">
      <router-link tag="span" :to="taskUndertaking.link">
          {{taskUndertaking.linkName}}
      </router-link>
    </situation-bar>
    <situation-bar  :bar-title="externalProject.data.name" :bar-value="externalProject.data.value" :bar-height="26">
      <router-link tag="span" :to="externalProject.link">
          {{externalProject.linkName}}
      </router-link>
    </situation-bar>
    <situation-bar  :bar-title="resoftProject.data.name" :bar-value="resoftProject.data.value" :bar-height="26">
      <router-link tag="span" :to="resoftProject.link">
          {{resoftProject.linkName}}
      </router-link>
    </situation-bar>
  </div>
</template>
<script>
import SituationBar from '@/components/situation-bar'

export default {
  data () {
    return {
      information: {
        linkName: '继续完善',
        link: '/1-1',
        data: {
          name: '基本信息',
          value: 50
        }
      },
      resume: {
        linkName: '继续完善',
        link: '/1-1',
        data: {
          name: '培训经历',
          value: 60
        }
      },
      selfRatingView: {
        linkName: '继续完善',
        link: '/1-1',
        data: {
          name: '自我评价',
          value: 70
        }
      },
      taskUndertaking: {
        linkName: '继续完善',
        link: '/1-1',
        data: {
          name: '任务承接',
          value: 80
        }
      },
      externalProject: {
        linkName: '继续完善',
        link: '/1-1',
        data: {
          name: '外部项目',
          value: 90
        }
      },
      resoftProject: {
        linkName: '继续完善',
        link: '/1-1',
        data: {
          name: '融鑫项目',
          value: 100
        }
      }
    }
  },
  created () {
    // 基本信息
    this.$api.mySituation.essentialInformation().then(res => {
      let result = res.data
      if (result.status === '1' && result.data) {
        this.information.data = result.data
      }
    })
    // 培训经历
    this.$api.mySituation.resumePercentage().then(res => {
      let result = res.data
      if (result.status === '1' && result.data) {
        this.resume.data = result.data
      }
    })
    // 自我评价
    this.$api.mySituation.selfRatingViewPercentage().then(res => {
      let result = res.data
      if (result.status === '1' && result.data) {
        this.selfRatingView.data = result.data
      }
    })
    // 任务承接
    this.$api.mySituation.taskUndertakingPercentage().then(res => {
      let result = res.data
      if (result.status === '1' && result.data) {
        this.taskUndertaking.data = result.data
      }
    })
    // 外部项目
    this.$api.mySituation.externalProjectPercentage().then(res => {
      let result = res.data
      if (result.status === '1' && result.data) {
        this.externalProject.data = result.data
      }
    })
    // 融鑫项目
    this.$api.mySituation.resoftProjectPercentage().then(res => {
      let result = res.data
      if (result.status === '1' && result.data) {
        this.resoftProject.data = result.data
      }
    })
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
