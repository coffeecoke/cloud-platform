<template>
  <el-menu :router="true"
  :default-active="defaultActive">
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>我的情况</template>
      <el-menu-item-group>
        <el-menu-item index="1-1">基本信息</el-menu-item>
        <el-menu-item index="1-2">培训经历</el-menu-item>
        <el-menu-item index="1-3">自我评价</el-menu-item>
        <el-menu-item index="1-4">任务承接</el-menu-item>
        <el-menu-item index="1-5">外部项目</el-menu-item>
        <el-menu-item index="1-6">融鑫项目</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-menu"></i>任务体系</template>
      <el-menu-item-group>
        <el-menu-item index="2-1">任务详情</el-menu-item>
        <el-menu-item index="2-2">对外发布</el-menu-item>
        <el-menu-item index="2-3">任务领取</el-menu-item>
        <el-menu-item index="2-4">任务列表</el-menu-item>
        <el-menu-item index="2-5">任务组</el-menu-item>
        <el-menu-item index="2-6">任务脉络</el-menu-item>
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
