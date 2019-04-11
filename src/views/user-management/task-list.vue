/* eslint-disable no-tabs */
<template>
<div class="box-table">
<el-row :gutter="18">
  <el-col :span="4"><div class="grid-content bg-purple"><el-input placeholder="项目编号" class="input1" v-model="input"  clearable></el-input></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><el-input placeholder="任务编号" class="input1" v-model="input"  clearable></el-input></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><el-input placeholder="任务名称" class="input1" v-model="input"  clearable></el-input></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><el-input placeholder="任务标的" class="input1" v-model="input"  clearable></el-input></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><el-input placeholder="任务所属组" class="input1" v-model="input"  clearable></el-input></div></el-col>
  <el-col :span="3"><div class="button"><el-button type="primary" style="float:right"  round @click="submit('form')">确定</el-button></div></el-col>
</el-row>
    <el-table
      :data="tableData"
      style="width: 100%" >
      <el-table-column  type="selection"  width="55" align="center"></el-table-column>
      <el-table-column  prop="task_id"  label="任务编码" align="center"></el-table-column>
      <el-table-column  prop="task_name"  label="任务名称"  align="center"></el-table-column>
      <el-table-column  prop="task_target"  label="任务标的" align="center"></el-table-column>
      <el-table-column  prop="predecessor_task"  label="前置任务" align="center"></el-table-column>
      <el-table-column  prop="post_task"  label="后置任务" align="center"></el-table-column>
      <el-table-column  prop="task_group_id"  label="所属组" align="center"></el-table-column>
      <el-table-column  prop="task_status"  label="任务状态" align="center"></el-table-column>
      <el-table-column  prop="subordinate_person"  label="所属人" align="center"></el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        task_id: '2016-05-02',
        task_name: '王小虎',
        task_target: '上海市普陀区金沙dsa',
        predecessor_task: '111dsadas',
        post_task: '222dsad',
        task_group_id: '333dsad',
        task_status: '3444dsad',
        subordinate_person: '231321gfd'
      },
      {
        task_id: '2016-05-02',
        task_name: '王小虎',
        task_target: '上海市普陀区金沙dsa',
        predecessor_task: '111dsadas',
        post_task: '222dsad',
        task_group_id: '333dsad',
        task_status: '3444dsad',
        subordinate_person: '231321gfd'
      }
      ]
    }
  }
}

</script>
<style lang="scss">
 .el-row {
    margin-bottom: 70px;
     margin-top: 20px;
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
</style>
