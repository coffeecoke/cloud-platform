<template>
  <el-menu :router="true"
  :default-active="defaultActive" :unique-opened="true">
    <el-submenu index="taskSystem1">
      <template slot="title">项目管理</template>
      <el-menu-item-group>
        <el-menu-item index="2-1">项目列表</el-menu-item>
        <el-menu-item index="2-2">任务列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="taskSystem2">
      <template slot="title">项目承接</template>
      <el-menu-item-group>
        <el-menu-item index="2-7">融鑫承接</el-menu-item>
        <el-menu-item index="2-8">第三方企业承接</el-menu-item>
        <el-menu-item index="2-9">个人承接</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="taskSystem3">
      <template slot="title">项目结转</template>
      <el-menu-item-group>
        <el-menu-item index="qu-3">问卷调查</el-menu-item>
        <el-menu-item index="qu-6">验收及结转</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="taskSystem4">
      <template slot="title">项目评价模型</template>
      <el-menu-item-group>
        <el-menu-item index="">项目难度评价模型</el-menu-item>
        <el-menu-item index="">项目计价模型</el-menu-item>
        <el-menu-item index="">任务难度评价模型</el-menu-item>
        <el-menu-item index="">任务计价模型</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-menu-item index="2-3">任务发布</el-menu-item>
    <el-menu-item index="2-4">任务领取</el-menu-item>
    <!-- <el-menu-item index="2-5">任务组</el-menu-item> -->
    <el-menu-item index="2-6">我的待办</el-menu-item>
     <el-menu-item index="2-10">我的任务</el-menu-item>
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
