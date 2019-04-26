<template>
  <el-menu :router="true"
  :default-active="defaultActive">
    <el-menu-item index="2-1">任务统计</el-menu-item>
      <el-menu-item index="2-2">任务列表</el-menu-item>
      <el-menu-item index="2-3">任务发布</el-menu-item>
      <el-menu-item index="2-4">任务领取</el-menu-item>
      <el-menu-item index="2-5">任务组</el-menu-item>
      <el-menu-item index="2-6">我的待办</el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data () {
    return {}
  },
  computed: {
    defaultActive () {
      return this.$route.path.split('/')[1]
    }
  }

}

</script>
<style lang="scss">

</style>
