<template>
  <el-menu :router="true"
  :default-active="defaultActive" :unique-opened="true">
    <el-submenu index="partner1">
      <template slot="title">融鑫合伙人</template>
      <el-menu-item-group>
        <el-menu-item index="partner-1">人员列表</el-menu-item>
        <el-menu-item index="partner-2">能力结构</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="partner2">
      <template slot="title">企业合伙人</template>
      <el-menu-item-group>
        <el-menu-item index="partner-3">企业列表</el-menu-item>
        <el-menu-item index="partner-4">企业能力评价</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="partner3">
      <template slot="title">个人合伙人</template>
      <el-menu-item-group>
        <el-menu-item index="partner-5">人员列表</el-menu-item>
        <el-menu-item index="partner-6">能力结构</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="partner4">
      <template slot="title">评级模型</template>
      <el-menu-item-group>
        <el-menu-item index="partner-7">人员能力评级模型</el-menu-item>
        <el-menu-item index="partner-8">人员费用计价模型</el-menu-item>
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
