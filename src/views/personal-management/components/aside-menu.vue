<template>
  <el-menu :router="true"
  :default-active="defaultActive">
    <el-menu-item index="nav1">
      <i class="el-icon-menu"></i>
      <span slot="title" index="nav1">用户概述</span>
    </el-menu-item>
    <el-menu-item index="nav2">
      <i class="el-icon-menu"></i>
      <span slot="title" index="nav2">匹配查询</span>
    </el-menu-item>
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
