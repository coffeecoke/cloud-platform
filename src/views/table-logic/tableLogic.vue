<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    height="250">
    <el-table-column
      fixed
      prop="number"
      label=""
      width="50">
      <template slot-scope="scope">
        <span>{{ scope.row.number}}</span>
      </template>
    </el-table-column>
    <el-table-column
      fixed
      prop="name"
      label="字段名称"
      width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      fixed
      prop="type"
      label="类型"
      width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.type }}</span>
      </template>
    </el-table-column>
    <el-table-column
      fixed
      prop="text"
      label="（主键，可空）"
      width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.text }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="Cname"
      label="中文名称"
      width="120">
       <template slot-scope="scope">
        <span>{{ scope.row.Cname }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="explain"
      label="字段说明"
      width="240">
      <template slot-scope="scope">
        <span>{{ scope.row.explain }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="range"
      label="值域"
      width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.range }}</span>
      </template>
    </el-table-column>
    <el-table-column
      width="600"
      prop="logic">
      <template slot="header" slot-scope="scope">
          <el-row>
            <el-col :span="6"><div class="grid-content">取数逻辑</div></el-col>
            <el-col :span="12">
              <div class="grid-content logic-grid-box">
                dfgjnfkjgnfgj
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <span>全部></span>
                <span>+新增</span>
              </div></el-col>
          </el-row>
      </template>
      <template slot-scope="scope">
        <span>{{ scope.row.logic }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="summary"
      label="访谈纪要"
      width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.summary }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="operation"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <i class="el-icon-delete"></i>
        <i class="el-icon-check"></i>
        <i class="el-icon-sort"></i>
      </template>
    </el-table-column>
    <el-table-column
      prop="question"
      label="问题数"
      width="80">
      <template slot-scope="scope">
        <span>{{ scope.row.question }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="state"
      label="状态"
      width="120">
      <template slot-scope="scope">
      </template>
    </el-table-column>
    <el-table-column
      prop="system"
      label="系统.表.字段"
      width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.system }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="spring"
      label="业务逻辑"
      width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.spring }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="processingLogic"
      label="处理逻辑"
      width="120">
      <template slot-scope="scope">
      </template>
    </el-table-column>
    <el-table-column
      prop="remarks"
      label="备注"
      width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.remarks}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        id: 1,
        number: '1',
        name: 'DATA_DATE',
        type: 'CHA',
        text: '(a)',
        Cname: '数据日期',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '数据日期',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '1'
      }, {
        id: 2,
        number: '2',
        name: 'CUST_NAM_EN',
        type: 'CHAR(6)',
        text: '(a)',
        Cname: '客户英文名称',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '客户英文名称',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '1'
      }, {
        id: 3,
        number: '3',
        name: 'LALALLA',
        type: 'CHAR(2)',
        text: '(a)',
        Cname: '境内境外标志',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '境内境外标志',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '3'
      }, {
        id: 4,
        number: '4',
        name: 'HEHASI',
        type: 'INT',
        text: '(a)',
        Cname: '客户大类',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '客户大类',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '1'
      }, {
        id: 5,
        number: '5',
        name: 'FDEII',
        type: 'VARCHAR2(200)',
        text: '(a)',
        Cname: '行政代码',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '行政代码',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '7'
      }, {
        id: 6,
        number: '6',
        name: 'DATA',
        type: 'CHAR(1)',
        text: '(a)',
        Cname: '数据日期',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '数据日期',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '4'
      }, {
        id: 7,
        number: '7',
        name: 'DATA_DATE',
        type: 'CHAR(2)',
        text: '(a)',
        Cname: '境内境外标志',
        explain: '字段说明字段说明字段说明字段说明字段说明字段说',
        range: '境内境外标志',
        summary: '访谈纪要访谈纪要访谈纪要访谈纪要',
        question: '1'
      }]
    }
  }
}
</script>
<style scoped lang="scss">
/* css */
.el-table{
  th{
    div{
      line-height: 22px!important;
      display: block;
    }
  }
}
</style>
