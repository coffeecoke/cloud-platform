/* eslint-disable no-tabs */
<template>
<div class="box-table">
  <el-form ref="form" :model="form" label-width="80px" label-position="top">
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
  <el-col :span="4"><div class="grid-content bg-purple"><el-input placeholder="任务标的" class="input1" v-model="form.taskTarget"  clearable></el-input></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><el-input placeholder="任务所属组" class="input1" v-model="form.taskGroupId"  clearable></el-input></div></el-col>
  <el-col :span="3"><div class="button"><el-button type="primary" style="float:right"   @click="confirm">确定</el-button></div></el-col>
</el-row></el-form>

<el-row>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" icon="el-icon-setting"   @click="setTaskPerson()">设置所属人</el-button></div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" icon="el-icon-printer" @click="setTaskGroup()">设置属组</el-button></div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" icon="el-icon-setting">任务组管理</el-button></div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" icon="el-icon-edit-outline" @click="setTaskPlan()">设置任务计划</el-button></div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" icon="el-icon-share">任务脉络</el-button></div></el-col>
</el-row>

<el-table
      ref="multipleTable"
      :data="tableData"
      style="height: 100%"
      @selection-change="handleSelectionChange"
      :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}"
      v-loading="loading"
      >
      <el-table-column  type="selection"  width="55"  align="center"></el-table-column>
      <el-table-column prop="project" label="项目信息" width="200px"  align="center">
          <template slot-scope="scope2">
            <div>
              <p>{{scope2.row.projectId}}</p>
              <p>{{scope2.row.projectName}}</p>
            </div>
          </template>
        </el-table-column>
      <el-table-column width="200px" prop="taskId"  label="任务编码" align="center"></el-table-column>
      <el-table-column width="150px" prop="taskName"  label="任务名称"  align="center"></el-table-column>
      <el-table-column width="200px" prop="taskTarget"  label="任务标的" align="center"></el-table-column>
      <el-table-column width="200px" prop="predecessorTask"  label="前置任务" align="center"></el-table-column>
      <el-table-column width="200px" prop="postTask"  label="后置任务" align="center"></el-table-column>
      <el-table-column width="150px" prop="taskGroupId"  label="所属组" align="center"></el-table-column>
      <el-table-column width="100px" prop="taskStatus"  label="任务状态" align="center"></el-table-column>
      <el-table-column width="100px" prop="subordinatePerson"  label="所属人" align="center"></el-table-column>
      <el-table-column width="100px" prop="accepter"  label="验收人" align="center"></el-table-column>
      <el-table-column width="150px" prop="allocateTime"  label="分配时间" align="center"></el-table-column>
      <el-table-column width="150px" prop="planStartTime"  label="计划开始时间" align="center"></el-table-column>
      <el-table-column width="150px" prop="planedProjectDuration"  label="计划工期" align="center"></el-table-column>
      <el-table-column width="150px" prop="actualStartTime"  label="实际开始时间" align="center"></el-table-column>
      <el-table-column width="150px" prop="actualEndTime"  label="实际结束时间" align="center"></el-table-column>
      <el-table-column width="150px" prop="delay"  label="延迟" align="center"></el-table-column>
      <el-table-column width="150px" prop="task_status"  label="优先级" align="center"></el-table-column>
       <el-table-column fixed="right" label="操作" align="center" width="200px">
           <template slot-scope="scope" >
              <el-button @click.prevent="acceptance(scope.$index,scope.row)"  v-if="(scope.row.userName==scope.row.accepter)&&scope.row.taskStatus=='已完成'" type="text" icon="el-icon-setting">验收</el-button>
              <el-button @click.prevent="audit(scope.$index,scope.row)" v-if="(scope.row.userName==scope.row.proManager)&&scope.row.taskStatus=='已验收'" type="text" icon="el-icon-tickets">审核</el-button>
            </template>
          </el-table-column>
</el-table>
  <div class="pagination-wrap">
      <el-pagination
      background
      layout="prev, pager, next"
      :page-size= "pageSize"
      :total="total"
      @current-change = "handleCurrChange"
      @size-change = "handleSizeChange"
      >
      </el-pagination>
    </div>
    <!--  设置按钮 -->
    <el-dialog title="设置所属人" :visible.sync="dialogPersonVisible" center>
    <el-tabs v-model="activeName" @tab-click="setDepartment" type="border-card">
    <el-tab-pane label="本部门" name="T" v-model="department" ><el-table
      :data="tableData3"
      :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}"
      style="width: 100%" >

      <el-table-column  prop="userName"  label="姓名" align="center"></el-table-column>
      <el-table-column  prop="matchingDegree"  label="匹配度"  align="center"></el-table-column>
      <el-table-column  fixed="right"  label="操作" align="center" class="aaa">
      <template slot-scope="scope">
      <el-button @click="allocation(scope.row)" type="text" >分配</el-button>
      </template>
    </el-table-column>
    </el-table>
     <div class="pagination-wrap">
      <el-pagination
      background
      layout="prev, pager, next"
      :page-size= "pageSize"
      :total="total"
      @current-change = "handleCurrChange1"
      @size-change = "handleSizeChange1"
      >
      </el-pagination>
    </div></el-tab-pane>

    <el-tab-pane label="上级部门" name="H" v-model="department" ><el-table
      :data="tableData3"
      :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}"
      style="width: 100%" >

      <el-table-column  prop="userName"  label="姓名" align="center"></el-table-column>
      <el-table-column  prop="matchingDegree"  label="匹配度"  align="center"></el-table-column>
      <el-table-column  fixed="right"  label="操作" align="center" class="aaa">
      <template slot-scope="scope">
      <el-button @click="allocation(scope.row)" type="text" >分配</el-button>
      </template>
    </el-table-column>
    </el-table>  <div class="pagination-wrap">
      <el-pagination
      background
      layout="prev, pager, next"
      :page-size= "pageSize"
      :total="total"
      @current-change = "handleCurrChange2"
      @size-change = "handleSizeChange2"
      >
      </el-pagination>
    </div></el-tab-pane>

    <el-tab-pane label="公司" name="C" v-model="department" ><el-table
      :data="tableData3"
      :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}"
      style="width: 100%" >

      <el-table-column  prop="userName"  label="姓名" align="center"></el-table-column>
      <el-table-column  prop="matchingDegree"  label="匹配度"  align="center"></el-table-column>
      <el-table-column  fixed="right"  label="操作" align="center">
      <el-button @click="allocation(scope.row)" type="text" >分配</el-button>
    </el-table-column>
    </el-table>  <div class="pagination-wrap">
      <el-pagination
      background
      layout="prev, pager, next"
      :page-size= "pageSize"
      :total="total"
      @current-change = "handleCurrChange3"
      @size-change = "handleSizeChange3"
      >
      </el-pagination>
    </div></el-tab-pane>
  </el-tabs>
    </el-dialog>
    <el-dialog  title="设置属组" :visible.sync="dialogGroupVisible"   width="27%"  right>
    请选择属组：
     <el-cascader
      :options="options"
      :show-all-levels="false"
      class="aaaaa"
      expand-trigger="hover"
      @change="handchange"
     ></el-cascader>
     <el-button @click="dialogGroupVisible = false"  >取 消</el-button>
     <el-button type="primary" @click="dialogSetGroupVisible()" >确 定</el-button>
    </el-dialog>
    <!-- 设置任务计划 -->
    <el-dialog title="设置任务计划" :visible.sync="dialogSetTaskPlanVisible">
   <div class="block">
        <el-form :inline="true" :model="formp" class="demo-form-inline">
          <el-form-item label="请设置认领时限：">
            <el-date-picker v-model="formp.planStartTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="请设置计划工期：">
            <el-input placeholder="请输入工期" v-model="formp.planedProjectDuration" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogSetTaskPlanVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmPlan()">确 定</el-button>
  </div>
</el-dialog>
</div>

</template>

<script>
export default {
  data () {
    return {
      loading: false,
      currPage: 1, // 当前页
      total: 1, // 总条数
      pageSize: 10, // 一页显示多少条
      pageNum: 1, // 需要查询的页码
      formp: {
        planStartTime: '',
        planedProjectDuration: ''
      },
      // 设置所属人
      tableData3: [],
      department: 'T',
      multipleSelection: [],
      // 任务查询form表单
      form: {
        projectId: '2018725-020B',
        taskId: '',
        taskName: '',
        taskTarget: '',
        taskGroupId: ''
      },
      // 设置所属组
      options: [],
      // 设置按钮
      dialogSetTaskPlanVisible: false,
      dialogPersonVisible: false,
      dialogGroupVisible: false,
      // 项目编号输入框
      restaurants: [],
      state2: '',
      // 任务列表
      tableData: [],
      activeName: 'T',
      moveObj: null,
      setPerson: null,
      setPlan: null
    }
  },

  methods: {
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
        taskName: this.form.taskName,
        taskTarget: this.form.taskTarget,
        taskGroupId: this.form.taskGroupId
      }
      this.$api.TaskList.getTaskList(params).then(res => {
        var result = res.data
        this.loading = false
        this.tableData = result.data.list || []
        this.total = result.data.total
        this.currPage = result.data.pageNum
      })
    },
    // 条目改变时
    handleSizeChange1 (value) {
      // console.log(currPage)
    },
    // 点击页码改变时
    handleCurrChange1 (value) {
      this.pageNum = value
      this.setDepartment()
    },
    // 条目改变时
    handleSizeChange2 (value) {
      // console.log(currPage)
    },
    // 点击页码改变时
    handleCurrChange2 (value) {
      this.pageNum = value
      this.setDepartment()
    },
    // 条目改变时
    handleSizeChange3 (value) {
      // console.log(currPage)
    },
    // 点击页码改变时
    handleCurrChange3 (value) {
      this.pageNum = value
      this.setDepartment()
    },
    // 设置任务计划
    setTaskPlan () {
      if (this.multipleSelection && this.multipleSelection.length !== 0) {
        this.dialogSetTaskPlanVisible = true
      } else {
        this.$message({
          message: '请先选择数据',
          type: 'warning'
        })
      }
    },
    // 任务计划确定按钮
    confirmPlan () {
      this.setPlan = Object.assign({planedProjectDuration: this.formp.planedProjectDuration}, {planStartTime: this.formp.planStartTime}, {multipleSelection: this.multipleSelection})
      this.$api.TaskList.saveTaskPlan({setPlan: this.setPlan}).then(res => {
        var result = res.data
        if (result.status === '1') {
          this.dialogSetTaskPlanVisible = false
          this.loading = true
          let params = {
            pageNum: this.pageNum, // 请求的页码
            pageSize: this.pageSize, // 每页显示条数
            projectId: this.form.projectId,
            taskId: this.form.taskId,
            taskName: this.form.taskName,
            taskTarget: this.form.taskTarget,
            taskGroupId: this.form.taskGroupId
          }
          this.$api.TaskList.getTaskList(params).then(res => {
            var result = res.data
            this.loading = false
            this.tableData = result.data.list || []
            this.total = result.data.total
            this.currPage = result.data.pageNum
          })
          this.$message({
            type: 'success',
            message: '设置任务计划完成!'
          })
        } else {
          this.$message('设置任务计划失败！')
        }
      })
    },
    // 验收事件
    acceptance (index, row) {
      this.$confirm('是否进行验收?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.TaskList.acceptTask({projectId: row.projectId, taskId: row.taskId}).then(res => {
          var result = res.data
          if (result.status === '1') {
            this.loading = true
            let params = {
              pageNum: this.pageNum, // 请求的页码
              pageSize: this.pageSize, // 每页显示条数
              projectId: this.form.projectId,
              taskId: this.form.taskId,
              taskName: this.form.taskName,
              taskTarget: this.form.taskTarget,
              taskGroupId: this.form.taskGroupId
            }
            this.$api.TaskList.getTaskList(params).then(res => {
              var result = res.data
              this.loading = false
              this.tableData = result.data.list || []
              this.total = result.data.total
              this.currPage = result.data.pageNum
            })
            this.$message({
              type: 'success',
              message: '验收完成!'
            })
          } else {
            this.$message('验收失败！')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消领取'
        })
      })
    },
    // 审核事件
    audit (index, row) {
      this.$confirm('是否审核通过?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.TaskList.auditTask({projectId: row.projectId, taskId: row.taskId}).then(res => {
          var result = res.data
          if (result.status === '1') {
            this.loading = true
            let params = {
              pageNum: this.pageNum, // 请求的页码
              pageSize: this.pageSize, // 每页显示条数
              projectId: this.form.projectId,
              taskId: this.form.taskId,
              taskName: this.form.taskName,
              taskTarget: this.form.taskTarget,
              taskGroupId: this.form.taskGroupId
            }
            this.$api.TaskList.getTaskList(params).then(res => {
              var result = res.data
              this.loading = false
              this.tableData = result.data.list || []
              this.total = result.data.total
              this.currPage = result.data.pageNum
            })
            this.$message({
              type: 'success',
              message: '审核通过!'
            })
          } else {
            this.$message('审核失败！')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消审核'
        })
      })
    },
    setDepartment (tab, event) {
      this.loading = true
      let params = {
        pageNum: this.pageNum, // 请求的页码
        pageSize: this.pageSize, // 每页显示条数
        department: tab.name
      }
      console.log(tab.name)
      this.dialogPersonVisible = true
      this.$api.TaskList.getTaskPersonList(params).then(res => {
        var result = res.data
        this.loading = false
        this.tableData3 = result.data.list || []
        this.total = result.data.total
        this.currPage = result.data.pageNum
      })
    },
    // 标签页下事件
    // setDepartment (tab, event) {
    //   console.log(tab.name) // 获取到当前元素的id
    // },
    // 确定按钮
    confirm () {
      this.loading = true
      let params = {
        pageNum: '1', // 请求的页码
        pageSize: this.pageSize, // 每页显示条数
        projectId: this.form.projectId,
        taskId: this.form.taskId,
        taskName: this.form.taskName,
        taskTarget: this.form.taskTarget,
        taskGroupId: this.form.taskGroupId
      }
      this.$api.TaskList.getTaskList(params).then(res => {
        var result = res.data
        this.loading = false
        this.tableData = result.data.list || []
        this.total = result.data.total
        this.currPage = result.data.pageNum
      })
    },
    handchange (value) {
      let taskGroupId = value[value.length - 1]
      this.moveObj = Object.assign({}, {taskGroupId: taskGroupId}, {multipleSelection: this.multipleSelection})
    },
    setTaskPerson () {
      if (this.multipleSelection && this.multipleSelection.length !== 0) {
        this.loading = true
        this.dialogPersonVisible = true
        let params = {
          pageNum: this.pageNum, // 请求的页码
          pageSize: this.pageSize, // 每页显示条数
          department: this.department

        }
        this.$api.TaskList.getTaskPersonList(params).then(res => {
          var result = res.data
          this.loading = false
          // this.tableData = result.data
          this.tableData3 = result.data.list || []
          this.total = result.data.total
          this.currPage = result.data.pageNum
        })
      } else {
        this.$message({
          message: '请先选择数据',
          type: 'warning'
        })
      }
    },
    setTaskGroup () {
      if (this.multipleSelection && this.multipleSelection.length !== 0) {
        console.log(this.multipleSelection.length)
        this.dialogGroupVisible = true
        this.$api.TaskList.getTaskGroupTree({projectId: this.form.projectId}).then(res => {
          var result = res.data
          // console.log(result.data)
          this.options = result.data
        })
      } else {
        this.$message({
          message: '请先选择数据',
          type: 'warning'
        })
      }
    },
    // 设置所属人中的分配事件
    allocation (row) {
      // this.multipleSelection.subordinatePerson.push(row.subordinatePerson)
      // console.log(this.multipleSelection.subordinatePerson)
      this.setPerson = Object.assign({}, {subordinatePerson: row.subordinatePerson}, {multipleSelection: this.multipleSelection})
      // console.log(this.setPerson)
      this.$api.TaskList.saveSubordinatePerson({setPerson: this.setPerson}).then(res => {
        var result = res.data
        if (result.status === '1') {
          this.dialogPersonVisible = false
          this.loading = true
          let params = {
            pageNum: this.pageNum, // 请求的页码
            pageSize: this.pageSize, // 每页显示条数
            projectId: this.form.projectId,
            taskId: this.form.taskId,
            taskName: this.form.taskName,
            taskTarget: this.form.taskTarget,
            taskGroupId: this.form.taskGroupId
          }
          this.$api.TaskList.getTaskList(params).then(res => {
            var result = res.data
            this.loading = false
            this.tableData = result.data.list || []
            this.total = result.data.total
            this.currPage = result.data.pageNum
          })
          // console.log(data.id)
          // this.confirm()
          this.$message({
            message: '分配成功',
            type: 'success'
          })
        }
      })
    },
    // checkbox复选框点击事件
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    // 设置属组
    dialogSetGroupVisible () {
      this.$api.TaskList.saveMultTaskGroup({moveObj: this.moveObj}).then(res => {
        var result = res.data
        if (result.status === '1') {
          this.dialogGroupVisible = false
          this.loading = true
          let params = {
            pageNum: this.pageNum, // 请求的页码
            pageSize: this.pageSize, // 每页显示条数
            projectId: this.form.projectId,
            taskId: this.form.taskId,
            taskName: this.form.taskName,
            taskTarget: this.form.taskTarget,
            taskGroupId: this.form.taskGroupId
          }
          this.$api.TaskList.getTaskList(params).then(res => {
            var result = res.data
            this.loading = false
            this.tableData = result.data.list || []
            this.total = result.data.total
            this.currPage = result.data.pageNum
          })
          // console.log(data.id)
          // this.confirm()
          this.$message({
            message: '设置属组成功',
            type: 'success'
          })
        }
      })
    },
    // 项目编号查询
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      }
    },
    loadAll () {

    },
    handleSelect (item) {
      console.log(item)
    }
  },
  mounted () {
    // var pro = this.projectId
    // // console.log(pro)
    // // console.log(formData.get('tid'))
    // this.$api.taskList.getTaskGroupTree(pro).then(res => {
    //   var result = res.data
    //   // console.log(result.data)
    //   this.options = result.data
    // })
    this.restaurants = this.loadAll()
  }
}
</script>
<style lang="scss" scoped>
 .el-row {
    margin-bottom: 30px;
     margin-top: 10px;
    &:last-child {
      margin-bottom: 0;
    }
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
.input1{
 .el-input__inner {
      height: 40px;
      width: 200px;
      background: #f0f3f8;
      border-radius: 8px;
    }
}
.aaaaa {
   background: #f0f3f8;
      border-radius: 8px;
}
  .pagination-wrap {
    padding: 20px;
    .el-pagination {
      float: right;
    }
  }

</style>
