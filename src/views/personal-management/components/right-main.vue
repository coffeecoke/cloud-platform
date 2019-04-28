<template>
  <main>
    <div class="breadcrumb">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="content">
      <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
      </transition>
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
  },
  beforeCreate () {
    console.log()
  }
}

</script>
<style lang="scss" scoped>
  .content {
    background-color:#fff;
    padding:10px;

  }
</style>
