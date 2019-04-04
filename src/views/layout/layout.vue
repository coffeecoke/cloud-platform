<style scoped>
  /* css */
  .el-header {
    height: 66px;
    background-color: #1a74ee;
  }
</style>
<template>
  <el-container class="wrap">
    <el-header>
      <Header></Header>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>
<script>
import Header from './components/header'
export default {
  name: 'Layout',
  components: {
    Header
  },
  data () {
    return {}
  }
}

</script>
<style lang="scss" scoped>
  .wrap {
    height: 100%;
  }

</style>
