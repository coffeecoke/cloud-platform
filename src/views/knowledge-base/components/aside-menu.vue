<template>
  <el-menu :router="true"
  :default-active="defaultActive">
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>知识库</template>
      <el-menu-item-group>
        <el-menu-item index="konwledge-1">知识库菜单1</el-menu-item>
        <el-menu-item index="konwledge-2">知识库菜单2</el-menu-item>
        <el-menu-item index="konwledge-3">知识库菜单3</el-menu-item>
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
