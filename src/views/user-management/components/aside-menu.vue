<template>
  <el-menu :router="true" :default-active="defaultActive" :unique-opened = 'true'>
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
    <!-- <el-submenu index="1">
      <template slot="title">基本信息</template>
      <el-menu-item index="1-1">基本信息</el-menu-item>
      <el-menu-item index="1-2">培训经历</el-menu-item>
      <el-menu-item index="1-3">自我评价</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">项目经验</template>
      <el-menu-item index="1-5">外部项目</el-menu-item>
      <el-menu-item index="1-6">融鑫项目</el-menu-item>
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
          title: '基本信息',
          icon: '',
          index: 1, // 记得点标识
          children: [
            {
              id: 11,
              title: '基本信息',
              icon: '',
              index: '1-1',
              path: '/1-1'
            },
            {
              id: 12,
              title: '培训经历',
              icon: '',
              index: '1-2',
              path: '/1-2'
            },
            {
              id: 13,
              title: '自我评价',
              icon: '',
              index: '1-3',
              path: '/1-3'
            }
          ]
        },
        {
          id: 2,
          title: '项目经验',
          icon: '',
          index: 2, // 记得点标识
          chidlren: [
            {
              id: 21,
              title: '基本信息',
              icon: '',
              index: '1-5',
              path: '/1-5'
            },
            {
              id: 22,
              title: '培训经历',
              icon: '',
              index: '1-6',
              path: '/1-6'
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
  }

}

</script>
<style lang="scss">

</style>
