<template>
  <el-container>
    <el-header>
      <div class="w1200 header-content">
        <div class="resoft-logo">
          <img :src="logoSrc" alt="">
        </div>
        <ul class="nav-list">
          <li>Ai实验室</li>
          <li>知识图谱</li>
          <li>金融模型</li>
          <li>基础算法</li>
        </ul>
      </div>
    </el-header>
    <el-main>Main</el-main>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      logoSrc: require('@/assets/imgs/resoft-logo.png')
    }
  },
  activated () {}
}

</script>
<style scoped lang="scss">
  /* css */
  .w1200 {
    width:1200px;
    margin:0 auto;
  }
  .header-content {
    display:flex;
    height:100%;
    align-items: center;
  }
  .el-header {
    background-color:#2b282d;
    color:#fff;
    .nav-list {
      height:100%;
      margin-left:44px;
      display:flex;
      align-items: center;
      li {
        margin:0 44px;
        padding:10px 0;
      }
      li.active {
          position: relative;
      }
    }
  }
</style>
