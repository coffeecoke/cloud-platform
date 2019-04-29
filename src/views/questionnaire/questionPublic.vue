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

<!--表单分页 start-->
<el-row>
   <el-table v-loading="loading" :data="tableData" border style="width: 100%">
    <el-table-column prop="quTitle" label="问卷名称" ></el-table-column>
    <el-table-column prop="quType" label="问卷类型" ></el-table-column>
    <el-table-column prop="projectName" label="归属项目" ></el-table-column>
    <el-table-column prop="answerUserName" label="答题者" ></el-table-column>
    <el-table-column prop="createDate" label="创建时间" ></el-table-column>
    <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button size="small"  type="primary" v-if="scope.row.quStatus==='0'" icon="el-icon-edit"  @click="answerQuest(scope.$index, scope.row)" round></el-button>
        <el-button size="small" type="danger" v-if="scope.row.quStatus==='1'" icon="el-icon-document"  @click="handleShow(scope.$index, scope.row)" round></el-button>
        </template>
    </el-table-column>
  </el-table>
</el-row>
<el-row >
  <!-- <div class="block">
    <el-pagination background layout="total,prev, pager, next,jumper" :total="1000"></el-pagination>
  </div> -->
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
      loading: false,
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
      this.loading = true
      this.$api.questionPublic.getQuestionDeployList(this.formatForm(this.deployForm)).then(res => {
        let result = res.data
        this.tableData = result.data
      })
      this.loading = false
    },
    saveQuestion (valForm) {
      this.$refs[valForm].validate((valid) => {
        if (valid) {
          this.$api.questPublic.saveQuestionDeploy(this.questDeploy).then(res => {
            let result = res.data
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
    },
    projectHandleSelect (item) {
    },
    answerQuest (index, row) {
      this.$router.push({path: '/qu-5', query: {id: row.quId}})
    },
    handleShow (index, row) {
      this.$router.push({path: '/qu-4', query: {id: row.quId}})
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
