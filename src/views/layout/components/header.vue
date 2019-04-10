<template>
  <div class="header">
    <div class="logo"></div>
    <div class="top-nav">
      <ul class="top-nav__list">
        <!-- <li class="nav-item" v-for="(item, i) in topNavs" :key="item.id" :class="{selected:select == i}" @click="clickLi(i)">
          {{item.name}}
        </li> -->

        <router-link tag="li" class="tab-item" to="/home">
          <a>我的首页</a>
        </router-link>
        <router-link tag="li" class="tab-item" to="/pm">
          <a>项目信息</a>
        </router-link>
        <router-link tag="li" class="tab-item" to="/">
          <a>个人中心</a>
        </router-link>
        <li class="tab-item">
          <a href="http://www.baidu.com">知识库</a>
        </li>
        <li class="tab-item">
          <a>工作台</a>
        </li>
        <li class="tab-item">
          <a>产品资料</a>
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
      activeName: 'second',
      userName: '吴超亭',
      select: 0
    }
  },
  activated () {},
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    clickLi (index) {
      this.select = index
    }
  }
}

</script>
<style scoped lang="scss">
  $baseHeight:60px;

  .header {
    height: 60px;
    position: relative;

    .logo {
      float: left;
      width: 240px;
      height: 100%;
      background: url('~@assets/imgs/logo.png') left center no-repeat; //~@assets 是在webpack.base.conf.配置的别名
      background-size: 100% auto;
    }

    .top-nav {
      position: absolute;
      height: 100%;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      font-size: 14px;

      li {
        width: 70px;
        float: left;
        text-align: center;
        margin-right: 30px;
        position: relative;
        cursor: pointer;
        a {
          color:#fff;
          text-decoration: none;
        }
        &.router-link-active {
          color: #fff;

          &:after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -10px;
            width: 100%;
            height: 2px;
            background-color: #fff;
          }
        }
      }
    }
  }
  .user-name {
      float: right;
      color: #fff;
      line-height: $baseHeight;
  }
</style>
