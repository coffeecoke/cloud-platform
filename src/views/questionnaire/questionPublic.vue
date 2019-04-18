<template>
<div class="box-table">
<!--查询表单 start-->
<el-form :inline="true" :model="quer" class="demo-form-inline">
  <el-form-item label="问卷名称">
    <el-input v-model="quer.quTitle" placeholder="问卷名称"></el-input>
  </el-form-item>
  <el-form-item label="项目名称">
    <el-input v-model="quer.projectName" placeholder="项目名称"></el-input>
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
<!--查询表单 end-->
<!--按钮 start-->
<el-row>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" @click="questAdd = true" icon="el-icon-edit">发布调查问卷</el-button></div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" @click="questAdd = true" icon="el-icon-edit-outline">修改调查问卷</el-button></div></el-col>
  <el-col :span="1"><div class="grid-content bg-purple"><el-button type="primary" @click="delData" icon="el-icon-delete" >删除</el-button></div></el-col>
</el-row>
<!--按钮 end-->
<!--表单分页 start-->
<el-row>
   <el-table :data="tableData" border style="width: 100%">
    <el-table-column  type="selection"  width="55"  align="center"></el-table-column>
    <el-table-column prop="quTitle" label="问卷名称" width="250"></el-table-column>
    <el-table-column prop="quType" label="问卷类型" width="245"></el-table-column>
    <el-table-column prop="projectName" label="归属项目" width="240"></el-table-column>
    <el-table-column prop="createUserName" label="创建人" width="240"></el-table-column>
    <el-table-column prop="createDate" label="创建时间" width="240"></el-table-column>
  </el-table>
</el-row>
<el-row >
  <div class="block">
    <el-pagination background layout="total,prev, pager, next,jumper" :total="1000"></el-pagination>
  </div>
</el-row>
<!--表单分页 end-->
<!--发布调查问卷 start-->
<el-dialog title="新增调查问卷" :visible.sync="questAdd"  center>
<el-form  label-width="80px"  :model="quer" >
<el-form-item label="问卷名称"  >
  <el-input v-model="quer.quTitle"  placeholder="问卷名称" size="medium"  ></el-input>
</el-form-item>
<el-form-item label="问卷类型">
    <el-select v-model="quer.quType" placeholder="问卷类型" size="medium">
      <el-option label="接口改造类" value="1"></el-option>
      <el-option label="开发实施类" value="2"></el-option>
      <el-option label="人员外包类" value="3"></el-option>
      <el-option label="业务咨询类" value="4"></el-option>
      <el-option label="制度升级类" value="5"></el-option>
    </el-select>
</el-form-item>
<el-form-item label="归属项目">
  <el-input v-model="quer.projectName" placeholder="归属项目" ></el-input>
</el-form-item>
<el-form-item>
  <el-button type="primary" @click="questAdd = false"  round>保存</el-button>
</el-form-item>
</el-form>
</el-dialog>
<!--发布调查问卷 end-->
</div>
</template>
<script>
export default {
  data () {
    return {
      quer: {
        quTitle: '',
        quType: '',
        projectName: ''
      },
      questAdd: false,
      tableData: [
        {
          quTitle: '测试问卷1',
          quType: '开发实施类',
          projectName: '广州农商',
          createUserName: 'admin',
          createDate: '2019-4-16'
        },
        {
          quTitle: '测试问卷1',
          quType: '开发实施类',
          projectName: '广州农商',
          createUserName: 'admin',
          createDate: '2019-4-16'
        },
        {
          quTitle: '测试问卷1',
          quType: '开发实施类',
          projectName: '广州农商',
          createUserName: 'admin',
          createDate: '2019-4-16'
        },
        {
          quTitle: '测试问卷1',
          quType: '开发实施类',
          projectName: '广州农商',
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
    }
  }
}
</script>
<style lang="scss" scoped>
.el-pagination{
  margin-top:20px;
  text-align: right;
}
</style>
