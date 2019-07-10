<template>
  <el-menu :router="true"
  :default-active="defaultActive" :unique-opened="true">
    <template v-for = "item in permissionMenu">
      <el-menu-item index="item.index" v-if="!item.children" :key="item.id">
        <i class=""></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
      <el-submenu v-else :index="item.index" :key="item.id">
        <template slot="title">{{item.title}}</template>
        <el-menu-item-group>
          <el-menu-item v-for="child in item.children" :key="child.id">{{child.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </template>

    <!-- <el-submenu index="taskSystem1">
      <template slot="title">项目管理</template>
      <el-menu-item-group>
        <el-menu-item index="2-1">项目列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="taskSystem2">
      <template slot="title">项目承接</template>
      <el-menu-item-group>
        <el-menu-item index="2-7">融鑫承接</el-menu-item>
        <el-menu-item index="2-8">第三方企业承接</el-menu-item>
        <el-menu-item index="2-9">个人承接</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="taskSystem3">
      <template slot="title">项目结转</template>
      <el-menu-item-group>
        <el-menu-item index="qu-3">问卷调查</el-menu-item>
        <el-menu-item index="qu-6">验收及结转</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="taskSystem4">
      <template slot="title">项目评价模型</template>
      <el-menu-item-group>
        <el-menu-item index="">项目难度评价模型</el-menu-item>
        <el-menu-item index="">项目计价模型</el-menu-item>
        <el-menu-item index="">任务难度评价模型</el-menu-item>
        <el-menu-item index="">任务计价模型</el-menu-item>
      </el-menu-item-group>
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
          title: '项目管理',
          icon: '',
          index: 'taskSystem1',
          children: [
            {
              id: 11,
              title: '项目列表',
              index: '2-1',
              path: '/2-1'
            }
          ]
        },
        {
          id: 2,
          title: '项目承接',
          icon: '',
          index: 'taskSystem2',
          children: [
            {
              id: 21,
              title: '融鑫承接',
              index: '2-7',
              path: '/2-7'
            },
            {
              id: 22,
              title: '第三方企业承接',
              index: '2-8',
              path: '/2-8'
            },
            {
              id: 23,
              title: '个人承接',
              index: '2-9',
              path: '/2-9'
            }
          ]
        },
        {
          id: 3,
          title: '项目结转',
          icon: '',
          index: 'taskSystem3',
          children: [
            {
              id: 31,
              title: '融鑫承接',
              index: 'qu-3',
              path: '/qu-3'
            },
            {
              id: 32,
              title: '第三方企业承接',
              index: '2-8',
              path: '/2-8'
            }
          ]
        },
        {
          id: 4,
          title: '项目评价模型',
          icon: '',
          index: 'taskSystem4',
          children: [
            {
              id: 41,
              title: '项目难度评价模型',
              index: '',
              path: ''
            },
            {
              id: 42,
              title: '项目计价模型',
              index: '',
              path: ''
            },
            {
              id: 43,
              title: '任务难度评价模型',
              index: '',
              path: ''
            },
            {
              id: 44,
              title: '任务计价模型',
              index: '',
              path: ''
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
    this.$api.permissionMenu.getPMLeftMenu(res => {
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
