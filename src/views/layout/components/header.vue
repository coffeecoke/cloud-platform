<template>
  <div class="header">
    <div class="logo"></div>
    <div class="top-nav">
      
    </div>
    <div class="user-name">{{userName}}</div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      activeName: 'second',
      userName: '吴超亭'
    }
  },
  activated () {},
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style scoped lang="scss">
.header {
  height:60px;
  .logo {
    float:left;
    width:200px;
    height:100%;
    background:url('~@assets/imgs/logo.png') left center no-repeat;//~@assets 是在webpack.base.conf.配置的别名
  }
}
</style>
