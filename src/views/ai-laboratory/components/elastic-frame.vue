<template>
  <el-dialog title="查看详情" :visible.sync="detailDialog" width="882px" class="dialog-container" @close="closeHandel">
    <el-container>
      <el-aside width="186px">
        <el-tree :data="detailTreeData" :props="defaultProps"></el-tree>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-dialog>
</template>
<script>
export default {
  props: ['detailDialog'],
  data () {
    return {
      detailTreeData: [{
        label: '分类1',
        children: [{
          label: '二级 1-1'
        }]
      }, {
        label: '分类2',
        children: [{
          label: '二级 2-1'
        }, {
          label: '二级 2-2'
        }]
      }, {
        label: '分类3',
        children: [{
          label: '二级 3-1'
        }, {
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    closeHandel () {
      this.$emit('detailBoxHide')
    }
  }
}

</script>
<style lang="scss" scoped>
  .el-aside {
    background-color: #e8eeff;
    height: 400px;
    .el-tree {
      background-color:transparent;
      & /deep/ .el-tree-node__content {
        height:32px;

      }
      & /deep/ .el-tree-node:focus>.el-tree-node__content {
        // background-color: transparent;
      }
      & /deep/ .el-tree-node__content:hover {
        background-color: transparent;
      }
      & /deep/ .is-expanded {
        & > .el-tree-node__content {
          background-color:#d8e2ff;
          border-top-right-radius: 16px;
          border-bottom-right-radius: 16px;
          margin-right:12px;
        }
      }
      & /deep/ .el-tree-node {
        color:#595959;
      }
      & > .el-tree-node > .el-tree-node__content .el-tree-node{
        color:#4977fc;
      }
      & /deep/ .el-tree-node.is-current {
        color:#4977fc;
        & > .el-tree-node__content > .is-leaf.el-icon-caret-right:before {
          background-color:#4977fc;
        }
      }
      & /deep/ .el-icon-caret-right:before {
        content:'';
        width:14px;
        height:14px;
        display:inline-block;
        background:url('~@assets/imgs/right-arrow-blue-icon.png') center no-repeat;
      }
      & /deep/ .is-leaf.el-icon-caret-right:before {
        content:'';
        width:6px;
        height:6px;
        display:inline-block;
        border-radius:50%;
        background-color:#6e6e6e;
        background-image: none;
      }
    }
  }
  .el-main {
    border:1px solid #e8eeff;
    margin-left:20px;
  }
  .dialog-container /deep/ .el-dialog__header {
    padding-bottom: 0px;
    position: relative;

    .el-dialog__title {
      border-bottom: 2px solid #4977fc;
    }

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 20px;
      right: 20px;
      height: 1px;
      background-color: #ddd;
    }

    .el-dialog__headerbtn .el-dialog__close {
      color: red;
    }
  }

  .dialog-container /deep/ .el-dialog__body {
    padding-top: 10px;

  }

</style>
