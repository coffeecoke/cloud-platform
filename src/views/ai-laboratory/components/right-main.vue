<template>
    <div class="right-main">
        <div class="header-box clearfix">
            <div class="header">
                <el-badge is-dot class="item"><i class="icon el-icon-bell"></i></el-badge>
                <i class="massage"></i>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        管理员<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <!-- 标签页导航 -->
            <tags-view/>
        </div>
        <section>
            <div class="box-contenter" :style='{height:tableHeight}'>
                <transition name="fade-transform" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </section>
    </div>
</template>
<script>
import $ from 'jquery'
import TagsView from './TagsView'
export default {
  components: {
    TagsView
  },
  data () {
    return {
      tableHeight: ''
    }
  },
  mounted () {
    this.tableHeight = $('body').height() - 80 + 'px'
    window.onresize = () => {
      this.tableHeight = $('body').height() - 80 + 'px'
    }
  }
}
</script>
<style lang="scss" scoped>
.right-main {
    height:auto;
    min-height:100%;
    background: url("../../../assets/imgs/background-ai.png") no-repeat right top;
}
.header-box {
  width:100%;
  height:80px;
  position: relative;
  .header{
      height:40px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right:32px;
    .item{
        color:#fff;
        font-weight:800;
    }
    .massage{
        width:20px;
        height:20px;
        padding:0 30px;
        background:url("../../../assets/imgs/message.png") no-repeat center top;
    }
    }
    .tags{
        height:40px;
    }
}
.el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
