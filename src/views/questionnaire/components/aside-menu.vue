<template>
  <el-menu :router="true"
  :default-active="defaultActive">
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>调查问卷管理</template>
      <el-menu-item-group>
        <el-menu-item index="1-1">问题管理</el-menu-item>
        <el-menu-item index="1-2">培训经历</el-menu-item>
        <el-menu-item index="1-3">自我评价</el-menu-item>
        <el-menu-item index="1-4">任务承接</el-menu-item>
        <el-menu-item index="1-5">外部项目</el-menu-item>
        <el-menu-item index="1-6">融鑫项目</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-menu"></i>调查问卷</template>
      <el-menu-item-group>
        <el-menu-item index="2-1">任务体系</el-menu-item>
        <el-menu-item index="2-2">任务列表</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-menu-item index="2-4-1">选项4-1</el-menu-item>
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
