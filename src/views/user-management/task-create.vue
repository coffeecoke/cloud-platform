<template>
  <div class="box-table">
<el-row :gutter="18">
  <el-col :span="4"><div class="grid-content bg-purple"><el-input placeholder="项目编号" class="input1" v-model="input2"  clearable></el-input></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><el-input placeholder="项目名称" class="input1" v-model="input3"  clearable></el-input></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><el-input placeholder="项目经理" class="input1" v-model="input4"  clearable></el-input></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"><el-input placeholder="项目总监" class="input1" v-model="input5"  clearable></el-input></div></el-col>
  <el-col :span="4"><div class="button"><el-button type="primary" style="float:right"   v-on:click="confirm">确定</el-button></div></el-col>
</el-row>

<el-table
    :data="tableData"
    style="height: 100%"
    :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}">
      <el-table-column width="250px" prop="date"  label="项目" align="center"></el-table-column>
      <el-table-column width="100px" prop="name"  label="立项时间"  align="center"></el-table-column>
      <el-table-column width="200px" prop="province"  label="项目状态" align="center"></el-table-column>
      <el-table-column width="200px" prop="city"  label="项目经理" align="center"></el-table-column>
      <el-table-column width="150px" prop="address"  label="项目总监" align="center"></el-table-column>
      <el-table-column width="150px" prop="zip"  label="质量管理" align="center"></el-table-column>
      <el-table-column width="100px" prop="address"  label="任务总数" align="center"></el-table-column>
      <el-table-column width="200px" prop="city"  label="任务" align="center">

        分配情况：<el-progress :text-inside="true" :stroke-width="14" :percentage="72" ></el-progress>

        完成情况：<el-progress :text-inside="true" :stroke-width="14" :percentage="54"></el-progress>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150px" align="center">
     <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      // 确定按钮
      confirm: function () {
        alert('1111111')
        console.log('11111')
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区1111111111111111111111',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    }
  }
}
</script>
<style lang="scss" scope>
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
</style>
