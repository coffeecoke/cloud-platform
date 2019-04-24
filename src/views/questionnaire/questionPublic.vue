<template>
<div class="box-table">
<!--查询表单 start-->
<el-form :inline="true" :model="deployForm" class="demo-form-inline">
  <el-form-item label="问卷名称">
    <el-input v-model="deployForm.quTitle" placeholder="问卷名称"></el-input>
  </el-form-item>
  <el-form-item label="项目名称">
    <el-input v-model="deployForm.projectName" placeholder="项目名称"></el-input>
  </el-form-item>
  <el-form-item label="问卷类型">
    <el-select v-model="deployForm.quType" placeholder="问卷类型">
      <el-option label="接口改造类" value="1"></el-option>
      <el-option label="开发实施类" value="2"></el-option>
      <el-option label="人员外包类" value="3"></el-option>
      <el-option label="业务咨询类" value="4"></el-option>
      <el-option label="制度升级类" value="5"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="initDataTable">查询</el-button>
  </el-form-item>
</el-form>
<!--查询表单 end-->
<!--按钮 start-->
<el-row>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" @click="questAdd = true" icon="el-icon-edit">发布调查问卷</el-button></div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" @click="editQuestDeploy = true" icon="el-icon-edit-outline">修改调查问卷</el-button></div></el-col>
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
<el-dialog title="发布调查问卷" :visible.sync="questAdd"  center>
<el-form  label-width="80px"  :model="questDeploy" >
<el-form-item label="选择问卷"  >
  <el-autocomplete v-model="questDeploy.quTitle" :fetch-suggestions="quTitleSearchAsync" placeholder="请选择问卷" @select="quTitleHandleSelect"></el-autocomplete>
</el-form-item>
<el-form-item label="归属项目">
    <el-autocomplete v-model="questDeploy.projectName" :fetch-suggestions="projectSearchAsync" placeholder="请选择归属项目" @select="projectHandleSelect"></el-autocomplete>
</el-form-item>
<el-form-item label="归属项目">
  <el-input v-model="questDeploy.projectName" placeholder="归属项目" ></el-input>
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
      timeout: null,
      deployForm: {
        quTitle: '',
        quType: '',
        projectName: ''
      },
      multipleSelection: [],
      questDeploy: {
        id: '',
        quTitle: '',
        quType: '',
        projectName: '',
        createUserName: '',
        createDate: ''
      },
      questAdd: false,
      tableData: []
    }
  },
  mounted () {
    this.initDataTable()
  },
  methods: {
    initDataTable () {
      console.log(this.questDeploy)
      this.$api.questionPublic.getQuestionDeployList(this.formatForm(this.deployForm)).then(res => {
        console.log(res)
        let result = res.data
        this.tableData = result.data
      })
    },
    saveQuestion (valForm) {
      console.log(this.questDeploy)
      this.$refs[valForm].validate((valid) => {
        if (valid) {
          this.$api.questPublic.saveQuestionDeploy(this.questDeploy).then(res => {
            let result = res.data
            console.log(result)
            if (result.status === '1') {
              this.$message({
                type: 'success',
                message: '保存数据成功!'
              })
              this.initDataTable()
            } else {
              this.$message.error('保存数据失败！')
            }
            this.questAdd = false
          })
        } else {
          return false
        }
      })
    },
    editQuestDeploy () {
      if (this.multipleSelection.length === 1) {
        this.questDeploy = this.multipleSelection[0]
        this.questAdd = true
      } else {
        this.$message({
          type: 'warning',
          message: '请选择一条数据编辑！'
        })
      }
    },
    delData () {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.questPublic.deleteQuestionDeploy(this.questDeploy).then(res => {
            let result = res.data
            console.log(result)
            if (result.state === '1') {
              this.$message({
                type: 'success',
                message: '删除数据成功!'
              })
            } else {
              this.$message.error('删除数据失败！')
            }
          })
          // 重新加载表格
          this.initDataTable()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择数据'
        })
      }
    },
    formatForm (val) {
      let formData = new FormData()
      Object.keys(val).forEach(key => {
        formData.append(key, val[key])
      })
      return formData
    },
    quTitleSearchAsync (queryString, cb) {
      var restaurants = []
      this.$api.questionPublic.loadQuestAsync({key: queryString}).then(res => {
        let result = res.data
        restaurants = result.data
        var results = queryString ? restaurants.filter(this.createTitleFilter(queryString)) : restaurants
        cb(results)
      })
    },
    projectSearchAsync (queryString, cb) {
      var restaurants = []
      this.$api.questionPublic.loadProjectAsync({key: queryString}).then(res => {
        let result = res.data
        restaurants = result.data
        var results = queryString ? restaurants.filter(this.createProjectFilter(queryString)) : restaurants
        cb(results)
      })
    },
    createTitleFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) > 0)
      }
    },
    createProjectFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) > 0)
      }
    },
    quTitleHandleSelect (item) {
      console.log(item)
    },
    projectHandleSelect (item) {
      console.log(item)
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
