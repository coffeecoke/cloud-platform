<style scoped>
  /* css */
  .el-header {
    height: 66px;
    background-color: #1a74ee;
  }
  .w-1200 {
    width: 1200px;
    margin: 0 auto;
  }
</style>
<template>
  <el-container class="wrap">
    <el-header>
      <Header></Header>
    </el-header>
    <el-container class="content">
      <el-aside>
        <aside-menu></aside-menu>
      </el-aside>
      <el-main>
        <Main></Main>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Header from './components/header'
import Main from './components/main'
import asideMenu from './components/aside-menu'
export default {
  name: 'Layout',
  components: {
    Header,
    Main,
    asideMenu
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
  .content {
    height: calc(100% - 60px);
  }
</style>
