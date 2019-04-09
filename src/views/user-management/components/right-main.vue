<template>
  <main>
    <div class="breadcrumb">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
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
  .content {
    background-color:#fff;
    padding:30px;
  }
</style>
