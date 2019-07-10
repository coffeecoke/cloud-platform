<template>
  <el-menu :router="true" :default-active="defaultActive" :unique-opened='true'>
    <template v-for = "item in permissionMenu">
      <el-menu-item index="item.index" v-if="!item.children" :key="item.id">
        <i class=""></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
      <el-submenu v-else :index="item.index" :key="item.id">
        <template slot="title">{{item.title}}</template>
        <el-menu-item-group>
          <el-menu-item v-for="child in item.children" :key="child.id" :index = "child.index">{{child.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </template>
    <!-- <el-submenu index="2">
      <template slot="title">我的代办</template>
      <el-menu-item index="2-6">我的待办</el-menu-item>
      <el-menu-item index="2-10">我的任务</el-menu-item>
      <el-menu-item index="2-4">任务领取</el-menu-item>
    </el-submenu> -->

  </el-menu>
</template>
<script>
export default {
  data () {
    return {
      permissionMenu: [
        {
          id: 1,
          title: '我的待办',
          icon: '',
          index: 2, // 记得点标识
          children: [
            {
              id: 11,
              title: '我的待办',
              icon: '',
              index: '2-6',
              path: '/2-6'
            },
            {
              id: 12,
              title: '我的任务',
              icon: '',
              index: '2-10',
              path: '/2-10'
            },
            {
              id: 13,
              title: '任务领取',
              icon: '',
              index: '2-4',
              path: '/2-4'
            }
          ]
        }
      ]
    }
  },
  computed: {
    defaultActive () {
      return this.$route.path.split('/')[1]
    }
  },
  created () {
    this.$api.permissionMenu.getHomeLeftMenu(res => {
      let result = res.data
      if (result.status === '1') {
        this.permissionMenu = result.data
      }
    })
  }

}

</script>
<style lang="scss">

</style>
