<template>
  <el-menu :router="true" :default-active="defaultActive" :unique-opened='true'>
    <el-submenu index="2">
      <template slot="title">我的代办</template>
      <el-menu-item index="2-6">我的待办</el-menu-item>
      <el-menu-item index="2-10">我的任务</el-menu-item>
      <el-menu-item index="2-4">任务领取</el-menu-item>
    </el-submenu>

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
