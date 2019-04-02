<style scoped>
  /* css */
  .el-header {
    height:66px;
    background-color:#1a74ee;
  }
  .w-1200 {
    width:1200px;
    margin:0 auto;
  }
</style>
<template>
  <div class="wrap">
    <el-container>
      <el-header>
        <div class="w-1200">
          <Header></Header>
        </div>
      </el-header>
      <el-container class="w-1200">
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Header from './components/header'
export default {
  name: 'Layout',
  components: { Header }
}
</script>
<style scoped></style>
