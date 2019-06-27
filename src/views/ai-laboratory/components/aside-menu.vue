<template>
  <el-menu :router="true" :default-active="activeMenu" class="el-menu-vertical-demo" @open="handleOpen"
    @close="handleClose" :collapse="isCollapse">
    <div class="logo">
      <img src="../../../assets/imgs/logo-ai.png" alt="">
    </div>
    <el-menu-item index="/ai/workBench">
      <i class="icon gzt-icon"></i>
      <span slot="title">工作台</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="icon zstp-icon"></i>
        <span slot="title">知识图谱</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/ai/knowledgeGraph">识别算法管理</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="2-2">种子管理</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="2-3">字典管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="3">
      <i class="icon bzgl-icon"></i>
      <span slot="title">标注管理</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="icon szgl-icon"></i>
      <span slot="title">算子管理</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="icon mxgl-icon"></i>
      <span slot="title">模型管理</span>
    </el-menu-item>
    <el-menu-item index="/ai/serviceManagement">
      <i class="icon fwgl-icon"></i>
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
  computed: {
    activeMenu () {
      const route = this.$route
      const {
        meta,
        path
      } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
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
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
  .el-submenu.is-opened /deep/ .el-submenu__title {
    background: #e8eeff;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }

  .el-submenu /deep/ .el-menu {
    background: #fff;
  }

  .el-submenu .el-menu-item.is-active {
    background: #4977fc;
    color: #fff;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    //margin-left: 10px;
  }

  .el-menu-item.is-active {
    background: #4977fc;
    color: #fff;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;

    .icon.gzt-icon {
      background: url('~@assets/imgs/gzt-white-icon.png') center no-repeat;
    }

    .icon.zstp-icon {
      background: url('~@assets/imgs/zstp-white-icon.png') center no-repeat;

    }

    .icon.bzgl-icon {
      background: url('~@assets/imgs/bzgl-white-icon.png') center no-repeat;

    }

    .icon.szgl-icon {
      background: url('~@assets/imgs/szgl-white-icon.png') center no-repeat;

    }

    .icon.mxgl-icon {
      background: url('~@assets/imgs/mxgl-white-icon.png') center no-repeat;

    }

    .icon.fwgl-icon {
      background: url('~@assets/imgs/fwgl-white-icon.png') center no-repeat;

    }
  }

  .el-menu {
    .icon {
      width: 20px;
      height: 20px;
      display: inline-block;
      margin-right: 5px;

      &.gzt-icon {
        background: url('~@assets/imgs/gzt-icon.png') center no-repeat;
      }

      &.zstp-icon {
        background: url('~@assets/imgs/zstp-icon.png') center no-repeat;

      }

      &.bzgl-icon {
        background: url('~@assets/imgs/bzgl-icon.png') center no-repeat;

      }

      &.szgl-icon {
        background: url('~@assets/imgs/szgl-icon.png') center no-repeat;

      }

      &.mxgl-icon {
        background: url('~@assets/imgs/mxgl.png') center no-repeat;

      }

      &.fwgl-icon {
        background: url('~@assets/imgs/fwgl-icon.png') center no-repeat;

      }
    }

    .el-submenu.is-opened {
      .zstp-icon {
        background: url('~@assets/imgs/gzt-blue-icon.png') center no-repeat;
      }
    }
  }

  .el-menu {
    background: #fff;

    .logo {
      background: #000;
      height: 80px;
      text-align: center;
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        display: inline-block;
        // padding-top: 25px;
        width:90%;
      }
    }
  }

  .switch-icon {
    // width:220px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    // background: #fff;
    .positionnFix {
      width: 100%;
      height: 60px;
      vertical-align: middle;

      .indent-left {
        cursor: pointer;
        display: inline-block;
        padding-left: 30px;
        margin-top: 25px;
        width: 20px;
        height: 20px;
        background: url("../../../assets/imgs/indent-right.png") no-repeat center;

        &.is-active {
          transform: rotate(180deg);
        }
      }
    }
  }

  .boxWidth {
    width: 64px;
  }

</style>
