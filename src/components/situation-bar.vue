<template>
  <div class="situation-bar">
    <div class="bar-title">{{barTitle}}</div>
    <el-progress :text-inside="true" :stroke-width="barHeight" :percentage="barValue" color="#3d8cf5"></el-progress>
    <div class="curr-link">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SituationBar',
  props: ['barTitle', 'barValue', 'barHeight'],
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
  .situation-bar {
    margin-bottom:16px;
  }
  .bar-title {
    width:80px;
    text-align:left;
    display: inline-block;
    vertical-align: middle;
  }
  .el-progress {
    width:462px;
    display:inline-block;
    vertical-align: middle;
  }
  .curr-link {
    min-width:140px;
    text-align:left;
    margin-left:20px;
    color:#3d8cf5;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }
</style>
