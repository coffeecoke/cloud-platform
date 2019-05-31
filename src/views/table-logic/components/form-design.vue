<template>
  <div class="form-design" id="">
    <!-- 全部的标签 -->
    <div class="more-tags" v-show="isShowAllTags">
      <el-tag :key="tag.name" v-for="(tag, index) in dynamicTags" closable :disable-transitions="false" :type="tag.type" effect="dark"
        @close="handleClose(index,tag)" @click.native="highlight(index,tag)">
        {{tag.name}}
      </el-tag>
    </div>
    <div class="btns">
      <el-button type="primary">表逻辑设计</el-button>
      <el-button type="primary">逻辑校验</el-button>
    </div>

    <div class="box">
      <div class="box-header">
        <h3 class="box-title">取数逻辑</h3>
      </div>
      <div class="box-body">

      </div>
    </div>
    <div class="box">
      <div class="box-header">
        <h3 class="box-title">过滤条件</h3>
      </div>
      <div class="box-body">

      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['dynamicTags', 'isShowAllTags'],
  data () {
    return {}
  },
  
  methods: {
    highlight(index,tag) {
      this.$emit('highlight', index, tag)
    }
  },
  activated () {}
}

</script>
<style scoped lang="scss">
  /* css */
  .more-tags {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 60px;
    right:100px;
    min-height: 100px;
    border-radius: 4px;
    background-color: #d9e9ff;
    box-shadow: 0 0 8px #d9e9ff;
    padding:20px;
    .el-tag {
      margin-right:10px;
      margin-bottom:10px;
    }
  }

  .btns {
    padding: 12px;
  }

  .box {
    padding: 12px;
    background-color: #fffbea;
    min-height: 100px;
    margin-bottom: 10px;

    .box-title {
      padding-left: 12px;
      position: relative;
      margin: 0;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 5px;
        bottom: 5px;
        width: 2px;
        background-color: #3080ee;
      }
    }
  }

</style>
