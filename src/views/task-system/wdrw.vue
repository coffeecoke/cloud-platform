<template>
  <box-wrap>
    <template slot="boxHeaderTitle">我的任务</template>
    <template slot="boxBodyInner">
      <!-- <el-form ref="form" :model="form" label-width="80px" label-position="top">
<el-row :gutter="18">
 <el-col :span="4">
    <el-autocomplete
      class="input1"
      v-model="form.projectId"
      :fetch-suggestions="querySearch"
      placeholder="项目编号"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><el-input placeholder="任务编号" class="input1" v-model="form.taskId"  clearable></el-input></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><el-input placeholder="任务名称" class="input1" v-model="form.taskName"  clearable></el-input></div></el-col>
  </el-row></el-form> -->
      <el-table :data="tableData" :border='true' style="width: 100%" v-loading="loading">
        <el-table-column prop="project" label="项目信息">
          <template slot-scope="scope2">
            <div>
              <p>{{scope2.row.projectId}}</p>
              <p>{{scope2.row.projectName}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="taskName" label="任务名称" align="left">
        </el-table-column>
        <el-table-column prop="taskStatus" label="任务状态" align="left">
        </el-table-column>
        <el-table-column prop="mastery" label="任务时间" align="left">
          <template slot-scope="scope1">
            <div>
              <p>计划开始时间：{{scope1.row.planStartTime}}</p>
              <p>实际开始时间：{{scope1.row.actualStartTime}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="actualEndTime" label="任务结束时间" align="left">
        </el-table-column>
        <el-table-column prop="recentUsage" label="预警信息" align="left">
        </el-table-column>
        <el-table-column prop="recentUsage" label="标准工时" align="left">
        </el-table-column>
        <el-table-column prop="recentUsage" label="成果矫正" align="left">
        </el-table-column>
        <el-table-column prop="recentUsage" label="评价" width="170px" align="left">
          <template>
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
              <el-row>
                <el-col>
                  <el-button @click.native.prevent="taskCollection(scope.$index,scope.row)" type="text"
                    icon="el-icon-edit">完成任务</el-button>
                </el-col>
                <el-col>
                  <el-button @click.native.prevent="CancelTask(scope.$index,scope.row)" type="text"
                    icon="el-icon-delete">取消任务</el-button>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="add-row" @click.prevent="myTask()"><span>+ 更多</span></div>
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
      isLimit: 'Y',
      loading: false,
      value: 1,

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
          row
        }).then(res => {
          var result = res.data
          if (result.status === '1') {
            this.$api.Wdrw.getMyTaskList({
              isLimit: this.isLimit
            }).then(res => {
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
    },
    myTask () {
      this.$router.push({
        name: '我的任务',
        query: {
          data: '1'
        }

      })
    }

  },
  mounted () {
    this.$api.Wdrw.getMyTaskList({
      isLimit: this.isLimit
    }).then(res => {
      let result = res.data
      console.log(result.data)
      this.tableData = result.data
    })
  }
}

</script>
<style lang="scss" scoped>

</style>
