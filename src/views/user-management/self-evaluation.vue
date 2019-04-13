<template>
  <div class="self-evaluation">
    <div class="self-evaluation__item">
      <ywnl></ywnl>
    </div>
    <div class="self-evaluation__item">
      <jsnl></jsnl>
    </div>
    <div class="self-evaluation__item">
      <yynl></yynl>
    </div>
  </div>
</template>
<script>
import Ywnl from '@/views/user-management/ywnl'
import Jsnl from '@/views/user-management/jsnl'
import Yynl from '@/views/user-management/yynl'
export default {
  components: {
    Ywnl,
    Jsnl,
    Yynl
  }
}
</script>
<style lang="scss" scoped>
  .self-evaluation__item {
    margin-bottom:30px;
  }
</style>
