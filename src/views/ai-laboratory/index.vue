<template>
<el-container>
  <aside-menu></aside-menu>
  <el-container>
    <el-main>
        <right-main></right-main>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import RightMain from './components/right-main'
import asideMenu from './components/aside-menu'
export default {
  components: {
    RightMain,
    asideMenu
  },
  data () {
    return {
      boxWidth: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.el-container {
    height: calc(100%);
}
.el-main{
    height:100%;
    padding:0px;
}
.el-aside{
  // width:200px;
  background:#fff;
}
</style>
