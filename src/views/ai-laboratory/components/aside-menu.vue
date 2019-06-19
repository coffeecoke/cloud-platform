<template>
   <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
     <div class="logo">
       <img src="../../../assets/imgs/logo-ai.png" alt="">
     </div>
    <el-submenu index="worker-1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>工作台</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="worker-1-1">选项1</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="worker-1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="worker-1-3">选项3</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">知识图谱</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">标注管理</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">算子管理</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-setting"></i>
      <span slot="title">模型管理</span>
    </el-menu-item>
    <el-menu-item index="6">
      <i class="el-icon-setting"></i>
      <span slot="title">服务管理</span>
    </el-menu-item>
    <div class="switch-icon">
      <div class="positionnFix">
         <i :label="true" class="icon indent-left" :class="{'is-active':isActive}" @click="toggleLeftSide"></i>
      </div>
    </div>
  </el-menu>
</template>
<script>
export default {
  props: ['boxWidth'],
  data () {
    return {
      isCollapse: false,
      isActive: false
    }
  },
  methods: {
    toggleLeftSide () {
      this.isCollapse = !this.isCollapse
      this.isActive = !this.isActive
    },
    handleOpen () {

    },
    handleClose () {

    }
  }
}
</script>
<style lang="scss" scoped>
.el-submenu.is-opened /deep/ .el-submenu__title{
  background:#e8eeff;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
.el-submenu /deep/ .el-menu{
  background: #fff;
}
.el-submenu .el-menu-item.is-active{
  background: #4977fc;
  color:#fff;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
.el-menu-item.is-active{
  background: #e8eeff;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
.el-menu{
  background: #fff;
  .logo{
    background: #000;
    height:80px;
    text-align:center;
    img{
      display: inline-block;
      padding-top:25px;
    }
  }
}
.switch-icon{
  // width:220px;
  position:fixed;
  bottom:0px;
  left:0px;
  background: #fff;
  .positionnFix{
    width:100%;
    height:60px;
    vertical-align: middle;
    .indent-left{
      cursor: pointer;
      display: inline-block;
      padding-left: 30px;
      margin-top:25px;
      width:20px;
      height:20px;
      background: url("../../../assets/imgs/indent-right.png") no-repeat center;
      &.is-active{
        transform: rotate(180deg);
      }
    }
  }
}
.boxWidth{
  width:64px;
}
</style>
