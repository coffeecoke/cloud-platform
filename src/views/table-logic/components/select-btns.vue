<template>
  <div class="" id="">
    <label for="" v-for="(item,index) in selectKeys" :key="index">
      <input type="text">
      <span>item</span>
    </label>
  </div>
</template>
<script>
export default {
  props: { selectKeys },
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
</style>
