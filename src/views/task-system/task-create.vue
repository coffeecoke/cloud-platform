<template>
  <div class="create-table">
    <el-form ref="form" :model="form" label-width="80px" label-position="top">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-autocomplete class="input1" v-model="form.projectId" :fetch-suggestions="querySearch" placeholder="项目编号"
            :trigger-on-focus="false" @select="handleSelect" clearable></el-autocomplete>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input placeholder="项目名称" class="input1" v-model="form.projectName" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input placeholder="项目经理" class="input1" v-model="form.proManager" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input placeholder="项目总监" class="input1" v-model="form.proDirector" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="button">
            <el-button type="primary" style="float:right" round @click.native.prevent="confirm">确定</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" style="height: 100%;margin-top:10px;" v-loading="loading1"
      :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}" :height='tableHeight'>
      <el-table-column width="250px" prop="projectId" label="项目" align="center">
        <template slot-scope="scope2">
          <div>
            <p>{{scope2.row.projectId}}</p>
            <p>{{scope2.row.projectName}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100px" prop="proTime" label="立项时间" align="center"></el-table-column>
      <el-table-column width="200px" prop="proStatus" label="项目状态" align="center"></el-table-column>
      <el-table-column width="90px" prop="proManager" label="项目经理" align="center"></el-table-column>
      <el-table-column width="150px" prop="proDirector" label="项目总监" align="center"></el-table-column>
      <el-table-column width="150px" prop="proQualityManager" label="质量管理" align="center"></el-table-column>
      <el-table-column width="100px" prop="taskTotalCount" label="任务总数" align="center"></el-table-column>
      <el-table-column width="200px" prop="taskPer" label="任务" align="right">
        <template slot-scope="scope">
          <span>分配情况</span>
          <el-progress :text-inside="true" :stroke-width="6" :percentage="scope.row.taskDistributedPer"
            :show-text="false"></el-progress>

          <span>完成情况</span>
          <el-progress :text-inside="true" :stroke-width="6" :percentage="scope.row.taskFinishedPer" :show-text="false">
          </el-progress>
        </template>
      </el-table-column>
      <el-table-column width="100px" prop="taskTotalCount" label="" align="left">
        <template slot-scope="scope1">
          <div>
            <router-link class="tab-item" :to="{path: '/2-2', query: {data:scope1.row.projectId,taskStatus:'d'}}">
              <a>{{scope1.row.taskDistributed}}</a>
            </router-link>/<router-link class="tab-item"
              :to="{path: '/2-2', query: {data:scope1.row.projectId,taskStatus:'ud'}}">
              <a>{{scope1.row.taskUnDistributed}}</a></router-link><br>
            <router-link class="tab-item" :to="{path: '/2-2', query: {data:scope1.row.projectId,taskStatus:'f'}}">
              <a>{{scope1.row.taskFinished}}</a>
            </router-link>/<router-link class="tab-item"
              :to="{path: '/2-2', query: {data:scope1.row.projectId,taskStatus:'d'}}">
              <a>{{scope1.row.taskDistributed}}</a></router-link>

          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <el-button @click="taskissue(scope.row.projectId)" type="text" size="medium"><i class="el-icon-upload"
              title="跳转到任务发布"></i></el-button>
          <el-button @click="skipUndertake(scope.row)" type="text" size="medium"><i class="el-icon-goods"
              title="承接项目"></i></el-button>
          <el-button @click="toContextMap(scope.row)" type="text" size="medium">
            <i class="fa fa-bar-chart" title="脉络图"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrap">

      <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total"
        @current-change="handleCurrChange" @size-change="handleSizeChange">
      </el-pagination>
    </div>
    <div class="cretable">
      <el-dialog title="任务承接" :visible.sync="dialogPersonalAndEnterprise" center>
        <el-tabs v-model="activeName" @tab-click="PersonalAndEnterprise" type="border-card">
          <el-tab-pane label="企业" name="C" v-model="department">
            <div class="" id="">
              <el-row :gutter="20">
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <el-input placeholder="客户编号" class="input1" v-model="customerNumber" clearable></el-input>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <el-input placeholder="客户名称" class="input1" v-model="customerFullName" clearable></el-input>
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="button">
                    <el-button type="primary" style="float:right" round @click.native.prevent="getTableList">确定
                    </el-button>
                  </div>
                </el-col>
              </el-row>
              <el-table :data="EnterpriseTableData" border v-loading="loading" header-cell-class-name="tableHeader"
                height="600" :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}">
                <el-table-column prop="customerNumber" label="客户编号">
                </el-table-column>
                <el-table-column prop="customerFullName" label="客户全称">
                </el-table-column>
                <el-table-column prop="customerAbbreviation" label="客户简称">
                </el-table-column>
                <el-table-column prop="taxonomy" label="分类类别">
                </el-table-column>
                <el-table-column prop="detailedCategories" label="详细分类类别">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button @click.native.prevent="viewInfo(scope.$index,scope.row)" type="text">查看</el-button>
                    <el-button @click.native.prevent="underTake(scope.$index,scope.row)" type="text">承接</el-button>
                  </template>
                </el-table-column>

              </el-table>
              <div class="pagination-wrap">

                <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total"
                  @current-change="handleCurrChange" @size-change="handleSizeChange">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="个人" name="P" v-model="department">
            <div class="" id="">
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <el-input placeholder="姓名" class="input1" v-model="name" clearable></el-input>
                </div>
              </el-col>
              <el-col :span="16">
                <div class="button">
                  <el-button type="primary" style="float:right" round @click.native.prevent="getTableList1">确定
                  </el-button>
                </div>
              </el-col>
              <el-table :data="PersonalTableData" border v-loading="loading" header-cell-class-name="tableHeader"
                height="600" :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}">
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="D_SEX" label="性别">
                </el-table-column>
                <el-table-column prop="phone" label="电话">
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="education" label="学历">
                </el-table-column>
                <el-table-column prop="major" label="专业">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button @click.native.prevent="viewInfo(scope.$index,scope.row)" type="text">查看</el-button>
                    <el-button @click.native.prevent="underTake1(scope.$index,scope.row)" type="text">承接</el-button>
                  </template>

                </el-table-column>

              </el-table>
              <div class="pagination-wrap">

                <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total"
                  @current-change="handleCurrChange1" @size-change="handleSizeChange1">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>

    <!--发布用户调查问卷 start-->
    <el-dialog title="生成调查问卷" :visible.sync="createQuestPanl" width="1000px">
      <el-form label-width="100px" :model="questionnaire" ref="questionnaire">
        <el-form-item label="归属项目">
          <el-input class="input2" v-model="questionnaire.projectName" placeholder="" readonly></el-input>
        </el-form-item>
        <el-form-item label="选择问卷">
          <el-autocomplete class="input2" v-model="questionnaire.quTitle" :fetch-suggestions="quTitleSearchAsync"
            :trigger-on-focus="false" @select="handleSelectTitle" placeholder="选择问卷"></el-autocomplete>
        </el-form-item>
        <el-form-item label="填报人员">
          <el-autocomplete class="input2" v-model="questionnaire.answerUserName" :fetch-suggestions="quUserSearchAsync"
            :trigger-on-focus="false" @select="handleSelectUser" placeholder="填报人员"></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="saveQuestionnaire('questionnaire')" round>保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--发布用户调查问卷 end-->

  </div>
</template>
<script>
export default {
  data () {
    return {
      // underTakingType: '',
      loading1: false,
      name: '',
      activeName: 'C',
      PersonalTableData: [],
      EnterpriseTableData: [],
      customerNumber: '',
      customerFullName: '',
      department: '',
      loading: false,
      currPage: 1, // 当前页
      total: 1, // 总条数
      pageSize: 10, // 一页显示多少条
      pageNum: 1, // 需要查询的页码
      createQuestPanl: false,
      dialogPersonalAndEnterprise: false,
      form: {
        projectId: '',
        projectName: '',
        proManager: '',
        proDirector: ''
      },
      questionnaire: {
        quId: '',
        quTitle: '',
        projectId: '',
        projectName: '',
        answerUserId: '',
        answerUserName: ''
      },
      projectid: [],
      tableHeight: null,
      tableData: [
        {
          projectId: '2018725-020B',
          proTime: '2019-05-13',
          proStatus: ''
        }
      ],
      Pro: null
    }
  },
  methods: {
    // 企业承接的方法
    underTake (index, row) {
      let params = {
        underTakingType: 'C',
        projectId: this.Pro,
        underTakingId: this.customerNumber
      }
      this.$api.partner.underTakingProjectId(params).then(res => {
        let result = res.data
        this.loading = false
        if (result.status === '1') {
          // this.$message({
          //   type: 'success',
          //   message: '承接成功'
          // })
          // this.dialogPersonalAndEnterprise = true
          // console.log(result.data.list.length)
          this.dialogPersonalAndEnterprise = false
          let params = {
            pageNum: this.pageNum, // 请求的页码
            pageSize: this.pageSize, // 每页显示条数
            projectId: this.form.projectId,
            projectName: this.form.projectName,
            proManager: this.form.proManager,
            proDirector: this.form.proDirector
          }
          this.$api.TaskCreate.underTakingProjectId(params).then(res => {
            var result = res.data
            // this.loading1 = false
            // this.tableData = result.data
            this.tableData = result.data.list || []
            this.total = result.data.total
            this.currPage = result.data.pageNum
          })
        }
      })
    },
    // 个人承接方法
    underTake1 (index, row) {
      let params = {
        underTakingType: 'P',
        projectId: this.Pro,
        underTakingId: this.userId
      }
      this.$api.partner.getEnterprise(params).then(res => {
        let result = res.data
        // this.loading = false
        if (result.status === '1') {
          // this.$message({
          //   type: 'success',
          //   message: '承接成功'
          // })
          this.dialogPersonalAndEnterprise = false
          let params = {
            pageNum: this.pageNum, // 请求的页码
            pageSize: this.pageSize, // 每页显示条数
            projectId: this.form.projectId,
            projectName: this.form.projectName,
            proManager: this.form.proManager,
            proDirector: this.form.proDirector
          }
          this.$api.TaskCreate.getCountTaskList(params).then(res => {
            var result = res.data
            // this.loading1 = false
            // this.tableData = result.data
            this.tableData = result.data.list || []
            this.total = result.data.total
            this.currPage = result.data.pageNum
          })
        }
      })
    },
    // 条目改变时
    handleSizeChange (value) {
      // console.log(currPage)
    },
    // 点击页码改变时
    handleCurrChange (value) {
      this.pageNum = value
      this.loading = true
      let params = {
        pageNum: this.pageNum, // 请求的页码
        pageSize: this.pageSize // 每页显示条数

        // customerNumber: '999999'
      }
      this.$api.partner.getEnterprise(params).then(res => {
        let result = res.data
        this.loading = false
        if (result.status === '1') {
          // console.log(result.data.list.length)
          this.EnterpriseTableData = result.data.list || []
          this.total = result.data.total
          this.currPage = result.data.pageNum
        } else {
          this.$message({
            type: 'error',
            message: '请求数据失败'
          })
        }
      })
    },
    getTableList () {
      let params = {
        pageNum: '1', // 请求的页码
        pageSize: this.pageSize,
        customerNumber: this.customerNumber,
        customerFullName: this.customerFullName
        // 每页显示条数
        // customerNumber: '999999'
      }
      this.$api.partner.getEnterprise(params).then(res => {
        let result = res.data
        this.loading = false
        if (result.status === '1') {
          // console.log(result.data.list.length)
          this.EnterpriseTableData = result.data.list || []
          this.total = result.data.total
          this.currPage = result.data.pageNum
        } else {
          this.$message({
            type: 'error',
            message: '请求数据失败'
          })
        }
      })
    },
    getTableList1 () {
      this.loading = true
      let params = {
        pageNum: '1', // 请求的页码
        pageSize: this.pageSize, // 每页显示条数
        customerNumber: '999999',
        name: this.name
      }
      this.$api.partner.getUserAll(params).then(res => {
        let result = res.data
        this.loading = false
        if (result.status === '1') {
          console.log(result.data.list.length)
          this.PersonalTableData = result.data.list || []
          this.total = result.data.total
          this.currPage = result.data.pageNum
        } else {
          this.$message({
            type: 'error',
            message: '请求数据失败'
          })
        }
      })
    },
    // 条目改变时
    handleSizeChange1 (value) {
      // console.log(currPage)
    },
    // 点击页码改变时
    handleCurrChange1 (value) {
      this.pageNum = value
      this.loading = true
      let params = {
        pageNum: this.pageNum, // 请求的页码
        pageSize: this.pageSize, // 每页显示条数
        customerNumber: '999999'
        // name: this.name
      }
      this.$api.partner.getUserAll(params).then(res => {
        let result = res.data
        this.loading = false
        if (result.status === '1') {
          console.log(result.data.list.length)
          this.PersonalTableData = result.data.list || []
          this.total = result.data.total
          this.currPage = result.data.pageNum
        } else {
          this.$message({
            type: 'error',
            message: '请求数据失败'
          })
        }
      })
    },
    //  个人或企业之间的跳转并同时向后台发请求返回table数据
    PersonalAndEnterprise (tab, event) {
      if (tab.name === 'C') {
        // console.log('11111111111111111111111111')
        this.loading = true
        let params = {
          pageNum: '1', // 请求的页码
          pageSize: this.pageSize

          // 每页显示条数
          // customerNumber: '999999'
        }
        this.$api.partner.getEnterprise(params).then(res => {
          let result = res.data
          this.loading = false
          if (result.status === '1') {
            // console.log(result.data.list.length)
            this.EnterpriseTableData = result.data.list || []
            this.total = result.data.total
            this.currPage = result.data.pageNum
          } else {
            this.$message({
              type: 'error',
              message: '请求数据失败'
            })
          }
        })
      } else {
        this.loading = true
        let params = {
          pageNum: '1', // 请求的页码
          pageSize: this.pageSize, // 每页显示条数
          customerNumber: '999999'

        }
        this.$api.partner.getUserAll(params).then(res => {
          let result = res.data
          this.loading = false
          if (result.status === '1') {
            console.log(result.data.list.length)
            this.PersonalTableData = result.data.list || []
            this.total = result.data.total
            this.currPage = result.data.pageNum
          } else {
            this.$message({
              type: 'error',
              message: '请求数据失败'
            })
          }
        })
      }
    },
    // 查询
    confirm () {
      this.loading1 = true
      let params = {
        pageNum: '1', // 请求的页码
        pageSize: this.pageSize, // 每页显示条数
        projectId: this.form.projectId,
        projectName: this.form.projectName,
        proManager: this.form.proManager,
        proDirector: this.form.proDirector
      }
      this.$api.TaskCreate.getCountTaskList(params).then(res => {
        var result = res.data
        this.loading1 = false
        // this.tableData = result.data
        this.tableData = result.data.list || []
        this.total = result.data.total
        this.currPage = result.data.pageNum
      })
    },
    // 跳转到任务发布
    taskissue (param) {
      this.$router.push({
        name: '任务发布',
        query: {
          data: param
        }
      })
    },
    // 承接跳转
    skipUndertake (row) {
      this.dialogPersonalAndEnterprise = true
      this.Pro = row.projectId
    },
    // 跳转到脉络图
    toContextMap () {
      this.$router.push({
        name: '脉络图'
      })
    },
    // 项目编号模糊查询
    querySearch (queryString, cb) {
      var taskBlurry = this.projectid
      var results = queryString ? taskBlurry.filter(this.createFilter(queryString)) : taskBlurry
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (taskBlurry) => {
        return (taskBlurry.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      }
    },
    handleSelect (item) {
      console.log(item)
    },
    showCreateQuestPanl (projectId, projectName) {
      this.questionnaire.projectId = projectId
      this.questionnaire.projectName = projectName
      this.createQuestPanl = true
    },
    quTitleSearchAsync (queryString, cb) {
      var restaurants = []
      this.$api.questionPublic.loadQuestAsync({
        key: queryString
      }).then(res => {
        let result = res.data
        restaurants = result.data
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        cb(results)
      })
    },
    quUserSearchAsync (queryString, cb) {
      var restaurants = []
      this.$api.questionPublic.loadUserAsync({
        key: queryString
      }).then(res => {
        let result = res.data
        restaurants = result.data
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        cb(results)
      })
    },
    saveQuestionnaire () {
      this.$api.questionPublic.handleGenerate(this.formatForm(this.questionnaire)).then(res => {
        let result = res.data
        if (result.status === '1') {
          this.$message({
            type: 'success',
            message: '生成问卷成功!'
          })
          this.createQuestPanl = false
        } else {
          this.$message.error('生成问卷失败！')
        }
      })
    },
    formatForm (val) {
      let formData = new FormData()
      Object.keys(val).forEach(key => {
        formData.append(key, val[key])
      })
      return formData
    },
    handleSelectTitle (item) {
      this.questionnaire.quId = item.quId
    },
    handleSelectUser (item) {
      this.questionnaire.answerUserId = item.uId
    }

  },
  mounted () {
    this.$api.TaskCreate.getProject().then(res => {
      let result = res.data
      console.log(result.data)
      this.projectid = result.data
    })
    this.tableHeight = document.body.clientHeight - 300 + 'px'
    window.onresize = () => {
      this.tableHeight = document.body.clientHeight - 300 + 'px'
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

  .input2 {
    width: 60%;
  }

  .input1 {
    .el-input__inner {
      background: #f9fafc;
      border-radius: 8px;
      border: 1px solid #DCDFE6;
    }
  }

  .pagination-wrap {
    padding: 20px;

    .el-pagination {
      float: right;
    }
  }

  // .el-table /deep/ .tableHeader {
  //   background:#1a74ee;
  //   color:#f9fafc;
  // }

</style>
