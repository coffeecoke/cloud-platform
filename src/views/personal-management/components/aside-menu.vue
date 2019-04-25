<template>
  <el-menu :router="true"
  :default-active="defaultActive">
    <el-submenu index="partner1">
      <template slot="title"><i class="el-icon-message"></i>融鑫合伙人</template>
      <el-menu-item-group>
        <el-menu-item index="partner-1">用户列表</el-menu-item>
        <el-menu-item index="partner-2">用户评级</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="partner2">
      <template slot="title"><i class="el-icon-message"></i>企业合伙人</template>
      <el-menu-item-group>
        <el-menu-item index="partner-3">企业列表</el-menu-item>
        <el-menu-item index="partner-4">企业评级</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="partner3">
      <template slot="title"><i class="el-icon-message"></i>个人合伙人</template>
      <el-menu-item-group>
        <el-menu-item index="partner-5">用户列表</el-menu-item>
        <el-menu-item index="partner-6">用户评级</el-menu-item>
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
