<template>
  <box-wrap>
    <template slot="boxHeaderTitle">任务承接</template>
    <template slot="boxBodyInner">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row type="flex" justify="space-between">
          <el-col :span="6">
            <el-form-item label="任务编号">
              <el-input v-model="form.taskNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="任务名称">
              <el-input v-model="form.taskName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="任务类型">
              <el-input v-model="form.taskType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary"  class="search-btn" round @click.native.prevent="submit('form')">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </box-wrap>
</template>
<script>
import BoxWrap from '@/components/box.vue'
export default {
  components: {
    BoxWrap
  },
  data () {
    return {
      form: {
        taskNum: '1233',
        taskName: '最大十家客户',
        taskType: 'Oracle'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .search-btn {
    float:right;
  }
</style>
