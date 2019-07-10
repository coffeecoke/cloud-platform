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

    <!-- <el-submenu index="partner1">
      <template slot="title">融鑫合伙人</template>
      <el-menu-item-group>
        <el-menu-item index="partner-1">人员列表</el-menu-item>
        <el-menu-item index="partner-2">能力结构</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="partner2">
      <template slot="title">企业合伙人</template>
      <el-menu-item-group>
        <el-menu-item index="partner-3">企业列表</el-menu-item>
        <el-menu-item index="partner-4">企业能力评价</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="partner3">
      <template slot="title">个人合伙人</template>
      <el-menu-item-group>
        <el-menu-item index="partner-5">人员列表</el-menu-item>
        <el-menu-item index="partner-6">能力结构</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="partner4">
      <template slot="title">评级模型</template>
      <el-menu-item-group>
        <el-menu-item index="partner-7">人员能力评级模型</el-menu-item>
        <el-menu-item index="partner-8">人员费用计价模型</el-menu-item>
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
          title: '融鑫合伙人',
          icon: '',
          index: 'partner1',
          children: [
            {
              id: 11,
              title: '人员列表',
              index: 'partner-1',
              path: '/partner-1'
            },
            {
              id: 12,
              title: '能力结构',
              index: 'partner-2',
              path: '/partner-2'
            }
          ]
        },
        {
          id: 2,
          title: '企业合伙人',
          icon: '',
          index: 'partner2',
          children: [
            {
              id: 21,
              title: '企业列表',
              index: 'partner-3',
              path: '/partner-3'
            },
            {
              id: 22,
              title: '能力结构',
              index: 'partner-4',
              path: '/partner-4'
            }
          ]
        },
        {
          id: 3,
          title: '个人合伙人',
          icon: '',
          index: 'partner3',
          children: [
            {
              id: 31,
              title: '企业列表',
              index: 'partner-5',
              path: '/partner-5'
            },
            {
              id: 32,
              title: '能力结构',
              index: 'partner-6',
              path: '/partner-6'
            }
          ]
        },
        {
          id: 4,
          title: '评级模型',
          icon: '',
          index: 'partner4',
          children: [
            {
              id: 31,
              title: '人员能力评级模型',
              index: 'partner-7',
              path: '/partner-7'
            },
            {
              id: 32,
              title: '人员费用计价模型',
              index: 'partner-8',
              path: '/partner-8'
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
    this.$api.permissionMenu.getParterManagementLeftMenu(res => {
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
