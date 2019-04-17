<template>
  <el-menu :router="true"
  :default-active="defaultActive">
    <el-submenu index="qu">
      <template slot="title"><i class="el-icon-message"></i>调查问卷管理</template>
      <el-menu-item-group>
        <el-menu-item index="qu-1">问题管理</el-menu-item>
        <el-menu-item index="qu-2">问卷管理</el-menu-item>
        <el-menu-item index="qu-3">问卷发布</el-menu-item>
      </el-menu-item-group>
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
