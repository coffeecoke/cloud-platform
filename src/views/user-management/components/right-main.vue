<template>
  <main>
    <div class="breadcrumb">
      <Breadcrumb></Breadcrumb>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </main>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  data () {
    return {}
  },
  components: {
    Breadcrumb
  }
}

</script>
<style lang="scss" scoped>
  .breadcrumb {
    margin-bottom:20px;
  }
</style>
