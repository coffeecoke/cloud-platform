<template>
  <box-wrap>
    <template slot="boxHeaderTitle">我的任务</template>
    <template slot="boxBodyInner">
      <el-table :data="tableData" border style="width: 100%" v-loading="loading">
        <el-table-column prop="project" label="项目信息">
          <template slot-scope="scope2">
            <div>
              <p>{{scope2.row.projectId}}</p>
              <p>{{scope2.row.projectName}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="taskName" label="任务名称" align="center">
        </el-table-column>
        <el-table-column prop="taskStatus" label="任务状态" align="center">
        </el-table-column>
        <el-table-column prop="mastery" label="任务时间" align="center">
          <template slot-scope="scope1">
            <div>
              计划开始时间：<p>{{scope1.row.planStartTime}}</p>
              实际开始时间：<p>{{scope1.row.actualStartTime}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="actualEndTime" label="任务结束时间" align="center">
        </el-table-column>
        <el-table-column prop="recentUsage" label="预警信息" align="center">
        </el-table-column>
        <el-table-column prop="recentUsage" label="标准工时" align="center">
        </el-table-column>
        <el-table-column prop="recentUsage" label="成果矫正" align="center">
        </el-table-column>
        <el-table-column prop="recentUsage" label="评价" width="170px" align="center">
          <template >
            <span>效率</span>
            <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}">
            </el-rate>
            <span>质量</span>
            <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="btn-icons-group">
              <i class="edit el-icon-edit" @click="scope.row.edit=true;isAddRow=false">完成任务</i>
              <i class="delect el-icon-delete" @click="CancelTask(scope.$index, scope.row)">取消任务</i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </box-wrap>
</template>
<script>
// 自定义box组件，用到了*具名插槽*
import BoxWrap from '@/components/box.vue'
export default {
  components: {
    BoxWrap
  },
  data () {
    return {
      value: 2.5,
      value1: 3.8,

      tableData: []
    }
  },
  methods: {
    CancelTask (index, row) {
      this.$confirm('是否取消任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.Wdrw.cancelTask({
          row}).then(res => {
          var result = res.data
          if (result.status === '1') {
            this.$api.Wdrw.getAllMyTask().then(res => {
              let result1 = res.data
              console.log(result1.data)
              this.tableData = result1.data
            })
            this.$message({
              type: 'success',
              message: '取消成功!'
            })
          } else {
            this.$message('取消失败！')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消领取'
        })
      })
    }

  },
  mounted () {
    this.$api.Wdrw.getAllMyTask().then(res => {
      let result = res.data
      console.log(result.data)
      this.tableData = result.data
    })
  }
}

</script>
<style lang="scss" scoped>

</style>
