<template>
  <div class="header">
    <div class="logo"></div>
    <div class="top-nav">
      <ul class="top-nav__list">
        <li class="items-ul" v-for="(item,i) of list"
            :key="i"
            @click="clickIndex=i"
            :class="{'active':i==clickIndex}">
            {{item.text}}
        </li>
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
      userName: '吴超亭',
      clickIndex: -1,
      list: [
        {text: '首页'},
        {text: '项目管理'},
        {text: '我的首页'},
        {text: '工作台'},
        {text: '模型研发'}
      ]
    }
  },
  activated () {},
  methods: {

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
      padding:0 20px;
        line-height: 40px;
      &.active {
        color:#fff;
        border-bottom:solid 2px #ccc;
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
