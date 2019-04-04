<template>
  <el-menu :router="true"
  :default-active="$route.path">
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>我的情况</template>
      <el-menu-item-group>
        <el-menu-item index="1-1">基本信息</el-menu-item>
        <el-menu-item index="1-2">培训经历</el-menu-item>
        <el-menu-item index="1-3">自我评价</el-menu-item>
        <el-menu-item index="1-4">任务承接</el-menu-item>
        <el-menu-item index="1-4">外部项目</el-menu-item>
        <el-menu-item index="1-4">融鑫项目</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-menu"></i>任务体系</template>
      <el-menu-item-group>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
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
  }
}

</script>
<style lang="scss">

</style>
