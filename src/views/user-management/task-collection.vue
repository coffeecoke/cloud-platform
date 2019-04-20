<template>
  <div class="box-table">
    <el-form ref="form" :model="form" label-width="80px" label-position="top">
      <el-row type="flex" justify="space-between">
         <el-col :span="3">
          <el-autocomplete class="input1" v-model="form.projectId" :fetch-suggestions="querySearch1"
            placeholder="项目编号" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
        </el-col>
        <el-col :span="3">
          <el-autocomplete class="input1" v-model="form.tid" :fetch-suggestions="querySearch2"
            placeholder="任务/组编码" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
        </el-col>
        <el-col :span="3">
          <el-autocomplete class="input1" v-model="form.tname" :fetch-suggestions="querySearch3"
            placeholder="任务/组名称" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
        </el-col>
        <el-col :span="3">
          <el-select class="select1" v-model="form.taskClass" clearable placeholder="类型">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select class="select1" v-model="form.effectDegree" clearable placeholder="影响度">
            <el-option v-for="item in options1" :key="item.value1" :label="item.label1" :value="item.value1">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select class="select1" v-model="form.dependencyDegree" clearable placeholder="依赖度">
            <el-option v-for="item in options2" :key="item.value2" :label="item.label2" :value="item.value2">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="3">
          <div class="button">
            <el-button type="primary" style="float:right" round @click.native.prevent="confirm">确定</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" style="height: 100%" :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}" >
      <el-table-column prop="tid" label="任务/组编码" align="center"></el-table-column>
      <el-table-column prop="tname" label="任务/组名称" align="center"></el-table-column>
      <el-table-column prop="postTask" label="影响项" align="center"></el-table-column>
      <el-table-column prop="effectDegree" label="影响度" align="center"></el-table-column>
      <el-table-column prop="predecessorTask" label="依赖项" align="center"></el-table-column>
      <el-table-column prop="dependencyDegree" label="依赖度" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template>
          <el-button @click="dialogTimeandCondition = true" type="text" icon="el-icon-sold-out">任务领取</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<script>
export default {
  data () {
    return {
      form: {
        projectId: '',
        tid: '',
        tname: '',
        taskClass: 'T',
        effectDegree: '',
        dependencyDegree: ''
      },
      formLabelWidth: '72px',
      // select选择框
      options: [{
        value: 'T',
        label: '任务'
      }, {
        value: 'G',
        label: '任务组'
      }],
      options1: [{
        value1: '选项1',
        label1: '无影响'
      }, {
        value1: '选项2',
        label1: '一级（影响项<=2个）'
      }, {
        value1: '选项3',
        label1: '二级（影响项<=5个）'
      }, {
        value1: '选项4',
        label1: '三级（影响项<=8个）'
      }, {
        value1: '选项5',
        label1: '四级（影响项<=12个）'
      }, {
        value1: '选项6',
        label1: '五级（影响项>12个）'
      }],
      options2: [{
        value2: '选项1',
        label2: '无依赖'
      }, {
        value2: '选项2',
        label2: '一级（依赖项<=2个）'
      }, {
        value2: '选项3',
        label2: '二级（依赖项<=5个）'
      }, {
        value2: '选项4',
        label2: '三级（依赖项<=8个）'
      }, {
        value2: '选项5',
        label2: '四级（依赖项<=12个）'
      }, {
        value2: '选项6',
        label2: '五级（依赖项>12个）'
      }],
      tableData: [{
        tid: '',
        tname: '',
        postTask: '',
        effectDegree: '',
        predecessorTask: '',
        dependencyDegree: ''
      }]
    }
  },
  activated () {
  }
}
</script>
<style scoped lang="scss"  scope>
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
      border: 1px solid #DCDFE6;
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
</style>
