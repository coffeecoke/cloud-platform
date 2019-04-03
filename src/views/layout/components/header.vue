<template>
  <div class="header">
    <div class="logo"></div>
    <div class="top-nav">
      <ul class="top-nav__list">
        <li>首页</li>
        <li>项目管理</li>
        <li>我的首页</li>
        <li>工作台</li>
        <li>模型开发</li>
      </ul>
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
$baseHeight:60px;
.header {
  height:60px;
  position: relative;
  .logo {
    float:left;
    width:240px;
    height:100%;
    background:url('~@assets/imgs/logo.png') left center no-repeat;//~@assets 是在webpack.base.conf.配置的别名
    background-size:100% auto;
  }
  .top-nav {
    position:absolute;
    height:100%;
    left:50%;
    transform:translateX(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#fff;
    font-size:14px;
    li {
      float:left;
      margin-right:30px;
      &.active {
        color:#fff;
      }
    }
  }
  .user-name {
    float:right;
    color:#fff;
    line-height:$baseHeight;
  }
}
</style>
