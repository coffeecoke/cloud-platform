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
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
