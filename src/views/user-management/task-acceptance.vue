<template>
  <box-wrap>
    <template slot="boxHeaderTitle">任务承接</template>
    <template slot="boxBodyInner">
      <el-form ref="form" :model="form" label-width="80px" >
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
      <el-table border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        >
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="taskCode"
        label="任务编号">
      </el-table-column>
      <el-table-column
        prop="taskName"
        label="任务名称">
      </el-table-column>
      <el-table-column
        prop="taskType"
        label="任务类别">
      </el-table-column>
      <el-table-column
        prop="completion"
        label="完成情况">
      </el-table-column>
      <el-table-column
        prop="reworkNum"
        label="返工次数">
      </el-table-column>
      <el-table-column
        prop="satisfaction"
        label="满意度">
      </el-table-column>
    </el-table>
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
      },
      tableData: [
        {
          date: '2018-09-08',
          endTime: '2019-0809',
          taskCode: '',
          taskName: '',
          taskType: '',
          completion: '',
          reworkNum: '',
          satisfaction: ''
        }
      ]

    }
  },
  created () {
    this.$api.taskAcceptance.queryTaskUndertaking().then(res => {
      this.tableData = res.data
    })
  },
  methods: {
    submit () {
      // var loginParams = { taskNum: this.form.taskNum, taskName: this.form.taskName, taskType: this.form.taskType}
      // this.$api.taskAcceptance.
    }
  }
}
</script>
<style lang="scss" scoped>
  .search-btn {
    float:right;
  }
</style>
