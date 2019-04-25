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
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" icon="el-icon-setting" @click="dialogPersonVisible = true">设置所属人</el-button></div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" icon="el-icon-printer" @click="setTaskGroup()">设置属组</el-button></div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" icon="el-icon-edit-outline">设置任务计划</el-button></div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" icon="el-icon-share">任务脉络</el-button></div></el-col>
</el-row>

<el-table
      ref="multipleTable"
      :data="tableData"
      style="height: 100%"
      @selection-change="handleSelectionChange"
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
      <el-table-column width="150px" prop="plan_start_time"  label="计划开始时间" align="center"></el-table-column>
      <el-table-column  prop="task_group_id"  label="计划工期" align="center"></el-table-column>
      <el-table-column  prop="task_status"  label="实际开始时间" align="center"></el-table-column>
      <el-table-column  prop="subordinate_person"  label="实际结束时间" align="center"></el-table-column>
      <el-table-column  prop="task_group_id"  label="延迟" align="center"></el-table-column>
      <el-table-column  prop="task_status"  label="优先级" align="center"></el-table-column>
</el-table>
    <!--  设置按钮 -->
    <el-dialog title="设置所属人" :visible.sync="dialogPersonVisible" center>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="本部门" name="first" ><el-table
      :data="tableData"
      :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}"
      style="width: 100%" >

      <el-table-column  prop="task_id"  label="姓名" align="center"></el-table-column>
      <el-table-column  prop="task_name"  label="匹配度"  align="center"></el-table-column>
      <el-table-column  fixed="right"  label="操作" align="center" class="aaa">
      <template slot-scope="scope">
      <el-button @click="handleClick(scope.row)" type="text" >分配</el-button>
      </template>
    </el-table-column>
    </el-table></el-tab-pane>

    <el-tab-pane label="上级部门" name="second"><el-table
      :data="tableData"
      :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}"
      style="width: 100%" >

      <el-table-column  prop="task_id"  label="姓名" align="center"></el-table-column>
      <el-table-column  prop="task_name"  label="匹配度"  align="center"></el-table-column>
      <el-table-column  fixed="right"  label="操作" align="center" class="aaa">
      <template slot-scope="scope">
      <el-button @click="handleClick(scope.row)" type="text" >分配</el-button>
      </template>
    </el-table-column>
    </el-table></el-tab-pane>

    <el-tab-pane label="公司" name="third"><el-table
      :data="tableData"
      :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}"
      style="width: 100%" >

      <el-table-column  prop="task_id"  label="姓名" align="center"></el-table-column>
      <el-table-column  prop="task_name"  label="匹配度"  align="center"></el-table-column>
      <el-table-column  fixed="right"  label="操作" align="center">
      <el-button @click="update()" type="text" >分配</el-button>
    </el-table-column>
    </el-table></el-tab-pane>
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
</div>

</template>

<script>
export default {
  data () {
    return {
      multipleSelection: [],
      form: {
        projectId: '2018725-020B',
        taskId: '',
        taskName: '',
        taskTarget: '',
        taskGroupId: ''
      },
      options: [],
      // 设置按钮
      dialogPersonVisible: false,
      dialogGroupVisible: false,
      // 项目编号输入框
      restaurants: [],
      state2: '',
      // 普通文本输入框
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      tableData: [],
      // 标签页下表格
      tableData1: [{}],
      activeName: 'second'
    }
  },

  methods: {
    // 标签页下事件
    handleClick (tab, event) {
      console.log(event.target.getAttribute('id')) // 获取到当前元素的id
    },
    // 确定按钮
    confirm () {
      let formData = new FormData()
      Object.keys(this.form).forEach(key => {
        console.log(key)
        formData.append(key, this.form[key])
      })
      this.$api.TaskList.getTaskList(formData).then(res => {
        var result = res.data
        console.log(result.data)
        this.tableData = result.data
      })
    },
    handchange (value) {
      let taskGroupId = value[value.length - 1]
      this.moveObj = Object.assign({}, {taskGroupId: taskGroupId}, {multipleSelection: this.multipleSelection})
    },
    setTaskGroup () {
      this.dialogGroupVisible = true
      this.$api.TaskList.getTaskGroupTree({projectId: this.form.projectId}).then(res => {
        var result = res.data
        // console.log(result.data)
        this.options = result.data
      })
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    dialogSetGroupVisible () {
      this.$api.TaskGroup.saveTaskGroup({moveObj: this.moveObj}).then(res => {
        var result = res.data
        if (result.status === '1') {
          this.dialogTimeandCondition = false
          let formData = new FormData()
          // this.form.taskGroupId = data.id
          Object.keys(this.form).forEach(key => {
            console.log(key)
            formData.append(key, this.form[key])
          })
          this.$api.TaskGroup.getTaskList(formData).then(res => {
            var result = res.data
            console.log(result.data)
            this.tableData3 = result.data
          })
          // console.log(data.id)
          // this.confirm()
          this.$message({
            message: '任务组调整成功',
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
</style>
