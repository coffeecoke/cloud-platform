<template>
  <div class="box-table">
    <el-form ref="form" :model="form" label-width="80px" label-position="top">
      <el-row type="flex" justify="flex-start" :gutter="24">
        <el-col :span="5">
          <el-autocomplete class="input1" v-model="form.projectId" :fetch-suggestions="querySearch" placeholder="项目编号"
            clearable :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
        </el-col>
        <el-col :span="5">
          <el-input placeholder="任务编码" class="input1" v-model="form.taskId" clearable></el-input>
        </el-col>
        <el-col :span="5">
          <el-input placeholder="任务名称" class="input1" v-model="form.taskName" clearable></el-input>
        </el-col>

        <el-col :span="15">
          <div class="button">
            <el-button type="primary" style="float:right" round @click.native.prevent="confirm">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" v-loading="loading" :height="tableHeight">
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
      <el-table-column prop="mastery" label="任务时间" width = "220px" align="left">
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
                <el-button @click.native.prevent="CancelTask(scope.$index,scope.row)" type="text" icon="el-icon-delete">
                  取消任务</el-button>
              </el-col>
            </el-row>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrap">

      <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total"
        @current-change="handleCurrChange" @size-change="handleSizeChange">
      </el-pagination>
    </div>
  </div>

</template>
<script>
export default {
  data () {
    return {
      isLimit: '',
      value: 1,

      // 页面跳转带的参数，不删
      data: '',
      loading: false,
      currPage: 1, // 当前页
      total: 1, // 总条数
      pageSize: 10, // 一页显示多少条
      pageNum: 1, // 需要查询的页码
      projectid: [],
      form: {
        projectId: '',
        tid: '',
        tname: '',
        taskClass: 'T',
        effectDegree: '',
        dependencyDegree: ''
      },
      formLabelWidth: '72px',
      tableHeight: null,
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
            this.loading = true
            let params = {
              pageNum: '1', // 请求的页码
              pageSize: this.pageSize, // 每页显示条数
              projectId: this.form.projectId,
              taskId: this.form.taskId,
              taskName: this.form.taskName
            }
            this.$api.Wdrw.getMyTaskList(params).then(res => {
              var result = res.data
              this.loading = false
              // this.tableData = result.data
              this.tableData = result.data.list || []
              this.total = result.data.total
              this.currPage = result.data.pageNum
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
    // 条目改变时
    handleSizeChange (value) {
      // console.log(currPage)
    },
    // 点击页码改变时
    handleCurrChange (value) {
      this.pageNum = value
      this.loading = true
      let params = {
        pageNum: this.pageNum, // 请求的页码
        pageSize: this.pageSize, // 每页显示条数
        projectId: this.form.projectId,
        taskId: this.form.taskId,
        taskName: this.form.taskName
      }
      this.$api.Wdrw.getMyTaskList(params).then(res => {
        var result = res.data
        this.loading = false
        // this.tableData = result.data
        this.tableData = result.data.list || []
        this.total = result.data.total
        this.currPage = result.data.pageNum
      })
    },
    // 查询
    confirm () {
      if (this.form.projectId) {
        this.loading = true
        let params = {
          pageNum: '1', // 请求的页码
          pageSize: this.pageSize, // 每页显示条数
          projectId: this.form.projectId,
          taskId: this.form.taskId,
          taskName: this.form.taskName
        }
        this.$api.Wdrw.getMyTaskList(params).then(res => {
          var result = res.data
          this.loading = false
          // this.tableData = result.data
          this.tableData = result.data.list || []
          this.total = result.data.total
          this.currPage = result.data.pageNum
        })
      } else {
        this.$message({
          type: 'warning',
          message: '项目编号不能为空！'
        })
      }
    },
    // // 任务
    // taskCollection (index, row) {
    //   this.$confirm('是否确认领取?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$api.TaskCollection.claim({
    //       row}).then(res => {
    //       var result = res.data
    //       if (result.status === '1') {
    //         this.confirm()
    //         this.$message({
    //           type: 'success',
    //           message: '领取成功!'
    //         })
    //       } else {
    //         this.$message('领取失败！')
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '取消领取'
    //     })
    //   })
    // },
    // 项目编号模糊查询
    querySearch (queryString, cb) {
      var taskBlurry = this.projectid
      var results = queryString ? taskBlurry.filter(this.createFilter(queryString)) : taskBlurry
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (taskBlurry) => {
        return (taskBlurry.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      }
    },
    handleSelect (item) {
      console.log(item)
    }
  },
  mounted () {
    this.data = this.$route.query.data
    this.$api.TaskCreate.getProject().then(res => {
      let result = res.data
      console.log(result.data)
      this.projectid = result.data
    })
    let params = {
      pageNum: this.pageNum, // 请求的页码
      pageSize: this.pageSize, // 每页显示条数
      isLimit: this.isLimit
    }
    this.$api.Wdrw.getMyTaskList(params).then(res => {
      let result = res.data
      this.tableData = result.data.list || []
      this.total = result.data.total
      this.currPage = result.data.pageNum
    })

    this.tableHeight = document.body.clientHeight - 300 + 'px'
    window.onresize = () => {
      this.tableHeight = document.body.clientHeight - 300 + 'px'
    }
  },
  activated () {}
}

</script>
<style scoped lang="scss" scope>
  .el-row {
    margin-bottom: 30px;
    margin-top: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-form {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .box-table /deep/ .input1 {
    width: 100%;

    .el-input__inner {
      height: 40px;
      width: 100%;
      border-radius: 8px;
      // border: 1px solid #DCDFE6;
    }
  }

  .box-table /deep/ .select1 {
    .el-input__inner {
      height: 40px;
      border-radius: 8px;
      border: 1px solid #DCDFE6;
    }
  }

  .box-table /deep/ .button {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .box-table /deep/ .el-input__inner {
    border: 1px solid #DCDFE6;
    border-radius: 8px;

  }

  .pagination-wrap {
    padding: 20px;

    .el-pagination {
      float: right;
    }
  }

</style>
