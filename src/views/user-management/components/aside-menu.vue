<template>
  <el-menu :router="true" :default-active="defaultActive">
    <el-menu-item index="1-1">基本信息</el-menu-item>
    <el-menu-item index="1-2">培训经历</el-menu-item>
    <el-menu-item index="1-3">自我评价</el-menu-item>
    <el-menu-item index="1-4">任务承接</el-menu-item>
    <el-menu-item index="1-5">外部项目</el-menu-item>
    <el-menu-item index="1-6">融鑫项目</el-menu-item>
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
