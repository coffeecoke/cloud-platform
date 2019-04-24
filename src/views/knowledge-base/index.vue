<template>
  <el-container class="content">
    <el-aside>
      <aside-menu></aside-menu>
    </el-aside>
    <el-main>
      <right-main></right-main>
    </el-main>
  </el-container>
</template>

<script>
import RightMain from './components/right-main'
import asideMenu from './components/aside-menu'
export default {
  components: {
    RightMain,
    asideMenu
  }
}

</script>
<style lang="scss" scoped>
  .content {
    height: calc(100% - 60px);
  }

</style>
