<template>
  <div class="self-evaluation">
    <div class="self-evaluation__item">
      <wdrw></wdrw>
    </div>
    <div class="self-evaluation__item">
      <wdrl></wdrl>
    </div>
  </div>
</template>
<script>
import Wdrw from '@/views/task-system/wdrw'
import Wdrl from '@/views/task-system/wdrl'
// import Yynl from '@/views/task-system/yynl'
export default {
  components: {
    Wdrw,
    Wdrl
  }
}
</script>
<style lang="scss" scoped>
  .self-evaluation__item {
    margin-bottom:30px;
  }
</style>
