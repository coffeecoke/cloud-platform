<template>
  <div class="" id="">
    <label for="" v-for="(item,index) in selectKeys" :key="index">
      <input type="text" class="select-input">
      <span>item</span>
    </label>
  </div>
</template>
<script>
export default {
  // props: { selectKeys },
  data () {
    return {
      selectKeys: ['字段名称', '类型', '主键', '中文名称', '字段说明']
    }
  },
  activated () {
  }
}
</script>
<style scoped lang="scss">
/* css */
.select-input {
  display:none;
}
</style>
