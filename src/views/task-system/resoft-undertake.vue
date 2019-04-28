<template>
  <div class="create-table">
    <el-form ref="form" :model="form" label-width="80px" label-position="top">
      <el-row :gutter="18">
        <el-col :span="4">
          <el-autocomplete class="input1" v-model="form.projectId" :fetch-suggestions="querySearch" placeholder="项目编号"
            :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
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
        <el-col :span="8">
          <div class="button">
            <el-button type="primary" style="float:right" round @click.native.prevent="confirm">确定</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" style="height: 100%" :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}">
      <el-table-column width="250px" prop="projectId" label="项目" align="left">
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
      <el-table-column width="150px" prop="proQualityManager" label="承接类型" align="center"></el-table-column>
      <el-table-column width="100px" prop="taskTotalCount" label="任务总数" align="center"></el-table-column>
      <el-table-column width="200px" prop="taskPer" label="任务" align="right">
        <template slot-scope="scope">
          <span>分配情况</span><el-progress :text-inside="true" :stroke-width="6" :percentage="scope.row.taskDistributedPer"
            :show-text="false"></el-progress>

          <span>完成情况</span><el-progress :text-inside="true" :stroke-width="6" :percentage="scope.row.taskFinishedPer"
            :show-text="false"></el-progress>
        </template>
      </el-table-column>
      <el-table-column width="100px" prop="taskTotalCount" label="" align="left">
        <template slot-scope="scope1">
          <div>
            <p>{{scope1.row.taskDistributedLabel}}</p>
            <p>{{scope1.row.taskFinishedLabel}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <el-button @click="taskissue(scope.row.projectId)" type="text" size="medium"><i class="el-icon-upload"
              title="跳转到任务发布"></i></el-button>
          <el-button type="text" size="medium">
            <router-link to="/#/1-2"><i class="el-icon-share" title="跳转到任务脉络"></i></router-link>
          </el-button>
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
        projectName: '',
        proManager: '',
        proDirector: ''
      },
      projectid: [],
      tableData: []
    }
  },
  methods: {
    // 查询
    confirm () {
      let formData = new FormData()
      Object.keys(this.form).forEach(key => {
        console.log(key)
        formData.append(key, this.form[key])
      })
      this.$api.TaskCreate.getCountTaskList(formData).then(res => {
        var result = res.data
        console.log(result.data)
        this.tableData = result.data
      })
    },
    taskissue (param) {
      this.$router.push({
        name: '任务发布',
        query: {
          date: param
        }

      })
    },
    handleClick (row) {
      console.log(row)
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
    }
  },
  mounted () {
    this.$api.TaskCreate.getProject().then(res => {
      let result = res.data
      console.log(result.data)
      this.projectid = result.data
    })
  }
}

</script>
<style lang="scss" scoped>
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

  .input1 {
    .el-input__inner {
      height: 40px;
      width: 200px;
      background: #f9fafc;
      border-radius: 8px;
      border: 1px solid #DCDFE6;
    }
  }

</style>
