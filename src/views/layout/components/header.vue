<template>
  <div class="header">
    <div class="logo">中软融鑫云交付平台</div>
    <div class="top-nav">
      <ul class="top-nav__list" ref="topNav">
        <!-- <li class="nav-item" v-for="(item, i) in topNavs" :key="item.id" :class="{selected:select == i}" @click="clickLi(i)">
          {{item.name}}
        </li> -->

        <router-link tag="li" class="tab-item" to="/home">
          <a>我的首页</a>
        </router-link>
        <li class="tab-item"  @click = 'servlesslogin("/resoft/cloudView?tabId=workRoom#page&systemId=dispatchList")'>
          <a href="javascript:void(0)">知识库</a>
        </li>
        <router-link tag="li" class="tab-item" to="/projectManager">
          <a>项目管理</a>
        </router-link>
        <li class="tab-item" @click = 'servlesslogin("/resoft/cloudView?tabId=workRoom#page&systemId=projectStart-projectInit")'>
          <a href="javascript:void(0)">工作台</a>
        </li>
        <li class="tab-item" @click = 'servlesslogin("/resoft/cloudView?tabId=workRoom#page&systemId=productMaintain-productMaintain")'>
          <a href="javascript:void(0)">产品资料</a>
        </li>
        <li class="tab-item" @click = 'servlesslogin("/resoft/cloudView?tabId=workRoom#page&systemId=org")'>
          系统管理
        </li>
         <router-link tag="li" class="tab-item" to="/partnerManager" exact>
          <a>合伙人管理</a>
        </router-link>
        <li class="tab-item" @click = 'servlesslogin("/resoft/cloudView?tabId=workRoom#page&systemId=cloudEnv")'>
          <a href="javascript:void(0)">云环境</a>
        </li>
        <router-link tag="li" class="tab-item" to="/qu-1">
          <a>调查问卷</a>
        </router-link>
      </ul>
    </div>
    <div class="right-options">
      欢迎您 <span @click = 'toUserManagement' class="user-name">[{{userName}}]</span>
      <!-- <span class="logout" @click="logout">登出</span> -->
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'Header',
  data () {
    return {
      activeName: 'second',
      userName: '',
      select: 0,
      origin: window.location.origin
    }
  },
  activated () {},
  created () {
    console.log(this.userName)
    this.userName = localStorage.getItem('userName') || '亲~'
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    clickLi (index) {
      this.select = index
    },
    logout () {
      localStorage.setItem('token', '')
      if (window.location.origin === 'http://cloud.chinaresoft.com') {
        this.$router.push({ path: '/wxCodePage' })
      } else {
        this.$router.push({ path: '/login' })
      }
    },
    toUserManagement () {
      this.$router.push({ path: '/userManagement' })
      // 移除左侧下导航的下划横线
      $('.top-nav__list li').removeClass('active')
    },
    servlesslogin (link) {
      this.$api.userInfo.servlesslogin({
        uid: localStorage.getItem('loginName'),
        token: localStorage.getItem('token')
      }).then(res => {
        let result = res.data
        if (result.login === 'expires') {
          if (window.location.origin === 'http://cloud.chinaresoft.com') {
            this.$router.push({ path: '/wxCodePage' })
          } else {
            this.$router.push({ path: '/login' })
          }
        } else {
          window.location.href = this.origin + link
        }
      })
    }
  },
  mounted () {
    // 通过localstorage的方式解决多层路由嵌套 router-link-active失效的问题（解决方式不忍直视）
    let headerNavCurrIndex = localStorage.getItem('headerNavCurrIndex')
    if (headerNavCurrIndex) {
      $('.top-nav__list li').eq(headerNavCurrIndex).addClass('active').siblings().removeClass('active')
    }
    $('.top-nav__list li').on('click', function () {
      localStorage.setItem('headerNavCurrIndex', $(this).index())
      $(this).addClass('active').siblings().removeClass('active')
    })
  }
}

</script>
<style scoped lang="scss">
  $baseHeight:60px;

  .header {
    width:100%;
    overflow:hidden;
    height: 60px;
    position: relative;

    .logo {
      float: left;
      width: 270px;
      height: 100%;
      line-height: 60px;
      text-align: right;
      color:#fff;
      font-size:20px;
      background: url('~@assets/imgs/logo.png') left center no-repeat; //~@assets 是在webpack.base.conf.配置的别名
    }

    .top-nav {
      position: absolute;
      width:90%;
      height: 100%;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
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
        &.active {
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
  .right-options {
      float: right;
      color: #fff;
      line-height: $baseHeight;
      font-size:14px;
      .user-name {
        cursor: pointer;
        font-size:14px;
      }
  }
  .logout {
    margin-left:20px;
    cursor: pointer;
  }
</style>
