<template>
  <div class="header">
    <div class="logo">中软融鑫云交付平台</div>
    <div class="top-nav">
      <ul class="top-nav__list" ref="topNav">
        <template v-for="item in permissionMenu" >
          <template v-if="item.routerType==='frontRouter'">
            <router-link tag="li" :key="item.id" class="tab-item" :to="item.path">
              <a>{{item.title}}</a>
            </router-link>
          </template>
          <template v-else>
            <li class="tab-item" :key="item.id" @click = 'servlesslogin(`${item.path}`)'>
              <a href="javascript:void(0)">{{item.title}}</a>
            </li>
          </template>
        </template>
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
      origin: window.location.origin,
      permissionMenu: [
        // path：跟后台返回路由的path一致
        // routerType 路由类型  "frontRouter"为前台路由  "httpRouter"为硬链
        {
          id: 1,
          title: '我的首页',
          path: '/home',
          routerType: 'frontRouter',
          class: 'active'
        },
        {
          id: 2,
          title: '知识库',
          path: '/resoft/cloudView?tabId=workRoom#page&systemId=dispatchList',
          routerType: 'httpRouter'
        },
        {
          id: 3,
          title: '项目管理',
          path: '/projectManager',
          routerType: 'frontRouter'
        },
        {
          id: 4,
          title: '工作台',
          path: '/resoft/cloudView?tabId=workRoom#page&systemId=projectStart-projectInit',
          routerType: 'httpRouter'
        },
        {
          id: 5,
          title: '产品资料',
          path: '/resoft/cloudView?tabId=workRoom#page&systemId=productMaintain-productMaintain',
          routerType: 'httpRouter'
        },
        {
          id: 6,
          title: '系统管理',
          path: '/resoft/cloudView?tabId=workRoom#page&systemId=org',
          routerType: 'httpRouter'
        },
        {
          id: 7,
          title: '合伙人管理',
          path: '/partnerManager',
          routerType: 'frontRouter'
        },
        {
          id: 8,
          title: '云环境',
          path: '/resoft/cloudView?tabId=workRoom#page&systemId=cloudEnv',
          routerType: 'httpRouter'
        }
      ]
    }
  },
  activated () {},
  created () {
    // console.log(this.userName)
    this.userName = localStorage.getItem('userName') || '亲~'
  },
  methods: {
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
