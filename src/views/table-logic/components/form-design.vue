<template>
  <div class="form-design" id="">
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
  data () {
    return {
    }
  },
  activated () {
  }
}
</script>
<style scoped lang="scss">
/* css */
.btns {
  padding:12px;
}
.box {
  padding:12px;
  background-color:#fffbea;
  min-height:100px;
  margin-bottom:10px;
  .box-title {
    padding-left:12px;
    position: relative;
    margin:0;
    &:before {
      content:'';
      position:absolute;
      left:0;
      top:5px;
      bottom:5px;
      width:2px;
      background-color:#3080ee;
    }
  }
}
</style>
