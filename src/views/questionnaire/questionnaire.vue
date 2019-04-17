<template>
<div class="box-table">
<el-form :inline="true" :model="quer" class="demo-form-inline">
  <el-form-item label="问卷名称">
    <el-input v-model="quer.quTitle" placeholder="问卷名称"></el-input>
  </el-form-item>
  <el-form-item label="问卷类型">
    <el-select v-model="quer.quType" placeholder="问卷类型">
      <el-option label="接口改造类" value="1"></el-option>
      <el-option label="开发实施类" value="2"></el-option>
      <el-option label="人员外包类" value="3"></el-option>
      <el-option label="业务咨询类" value="4"></el-option>
      <el-option label="制度升级类" value="5"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>

<el-row>
  <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" @click="questAdd = true" icon="el-icon-edit">新增</el-button></div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" @click="questAdd = true" icon="el-icon-edit">修改</el-button></div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" @click="questSel = true" icon="el-icon-document" >添加问题</el-button></div></el-col>
  <el-col :span="1"><div class="grid-content bg-purple"><el-button type="primary" @click="delData" icon="el-icon-delete" >删除</el-button></div></el-col>
</el-row>
<el-row>
   <el-table :data="tableData" border style="width: 100%">
    <el-table-column  type="selection"  width="55"  align="center"></el-table-column>
    <el-table-column prop="quTitle" label="问卷名称" width="200"></el-table-column>
    <el-table-column prop="quType" label="问卷类型" width="200"></el-table-column>
    <el-table-column prop="quDescFlag" label="是否有简介" width="200"></el-table-column>
    <el-table-column prop="quDesc" label="简介" width="230"></el-table-column>
    <el-table-column prop="createUserName" label="创建人" width="200"></el-table-column>
    <el-table-column prop="createDate" label="创建时间" width="200"></el-table-column>
  </el-table>
</el-row>
<el-row >
  <div class="block">
    <el-pagination background layout="total,prev, pager, next,jumper" :total="1000"></el-pagination>
  </div>
</el-row>
<!--新增弹出框  start-->
<el-dialog title="新增调查问卷" :visible.sync="questAdd"  center>
<el-form  label-width="80px"  :model="querInfo" >
<el-form-item label="问卷名称" prop="quTitle" >
  <el-input v-model="querInfo.quTitle"  placeholder="问卷名称" size="medium"  ></el-input>
</el-form-item>
<el-form-item label="问卷类型">
    <el-select v-model="querInfo.quType" placeholder="问卷类型" size="medium">
      <el-option label="接口改造类" value="1"></el-option>
      <el-option label="开发实施类" value="2"></el-option>
      <el-option label="人员外包类" value="3"></el-option>
      <el-option label="业务咨询类" value="4"></el-option>
      <el-option label="制度升级类" value="5"></el-option>
    </el-select>
</el-form-item>
<el-form-item label="是否有简介">
  <el-switch v-model="querInfo.quDescFlag" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
</el-form-item>
<el-form-item label="简介" v-show="querInfo.quDescFlag">
  <el-input type="textarea"  :rows="5" v-show="querInfo.quDescFlag" placeholder="请输入内容" v-model="querInfo.quDesc"></el-input>
</el-form-item>
<el-form-item>
  <el-button type="primary" @click="questAdd = false"  round>保存</el-button>
</el-form-item>
</el-form>
</el-dialog>
<!--新增弹出框 end-->

<!--问题选择  start-->
<el-dialog title="新增调查问卷" :visible.sync="questSel"  center>
  <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入关键字"
  :titles="['未选列表', '已选列表']"
  :left-default-checked="[2, 3]"
  :right-default-checked="[1]"
  v-model="value4"
  :data="dataOpts">
  </el-transfer>
</el-dialog>
<!--问题选择  end-->
</div>
</template>
<script>
export default {
  data () {
    return {
      quer: {
        quTitle: '',
        quType: ''
      },
      querInfo: {
        quTitle: '',
        quType: '',
        quDescFlag: 0,
        quDesc: ''
      },
      dataOpts: [
        {
          label: '上海',
          key: 0
        },
        {
          label: '北京',
          key: 1
        },
        {
          label: '广州',
          key: 2
        },
        {
          label: '深圳',
          key: 3
        },
        {
          label: '南京',
          key: 4
        },
        {
          label: '西安',
          key: 5
        },
        {
          label: '成都',
          key: 6
        }
      ],
      questAdd: false,
      questSel: false,
      value4: [1, 5],
      tableData: [
        {
          // 表格数据
          quTitle: '测试问卷1',
          quType: '开发实施类',
          quDescFlag: '是',
          quDesc: '发生发生发射点发111111111',
          createUserName: 'admin',
          createDate: '2019-4-16'
        },
        {
          // 表格数据
          quTitle: '测试问卷1',
          quType: '开发实施类',
          quDescFlag: '是',
          quDesc: '发生发生发射点发111111111',
          createUserName: 'admin',
          createDate: '2019-4-16'
        },
        {
          // 表格数据
          quTitle: '测试问卷1',
          quType: '开发实施类',
          quDescFlag: '是',
          quDesc: '发生发生发射点发111111111',
          createUserName: 'admin',
          createDate: '2019-4-16'
        }
      ]
    }
  },
  methods: {
    onSubmit () {
      console.log('submit')
    },
    delData () {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    filterMethod (query, item) {
      return item.label.indexOf(query) > -1
    }
  }
}
</script>
<style lang="scss" scoped>
.el-pagination{
  margin-top:20px;
  text-align: right;
}
.el-transfer{
  height: 300px;
}
</style>
