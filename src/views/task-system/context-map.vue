<template>
  <div class="" id="">
    <!-- 脉络图 -->
    <chart id="context-map" class="context-map" width="100%" :height="chartHeight"></chart>
  </div>
</template>
<script>
import chart from '@/components/charts/graphChart'
export default {
  name: 'ContextMap',
  components: {
    chart
  },
  data () {
    return {
      chartHeight: '700px'
    }
  },
  activated () {
  },
  mounted () {
    this.chartHeight = document.body.clientHeight - 200 + 'px'
    window.onresize = () => {
      this.chartHeight = document.body.clientHeight - 200 + 'px'
    }
  }
}
</script>
<style scoped lang="scss">
/* css */
</style>
