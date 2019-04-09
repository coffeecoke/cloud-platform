<template>
  <div class="box">
    <div class="box-header">
      <h3 class="box-header__title">
        <slot name="boxHeaderTitle"></slot>
      </h3>
    </div>
    <div class="box-body">
      <slot name="boxBodyInner"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BoxWrap',
  data () {
    return {}
  },
  activated () {}
}

</script>
<style scoped lang="scss">
  .box {
    .box-header {
      margin-bottom:20px;
    }
    .box-header__title {
      font-size:18px;
      position: relative;
      &:before {
        content:'';
        position:absolute;
        width:4px;
        height:100%;
        border-radius: 2px;
        left:-10px;
        background-color:#1a74ee;
      }
    }
    .box-body {
      padding:15px;
    }
  }

</style>
