<template>
  <div class="" id="">
    <el-table :data="tableData" border v-loading="loading" header-cell-class-name="tableHeader" height="600">
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="D_SEX" label="性别">
      </el-table-column>
      <el-table-column prop="phone" label="电话">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="contact" label="紧急联系人">
      </el-table-column>
      <el-table-column prop="contactInfo" label="紧急联系方式">
      </el-table-column>
      <el-table-column prop="education" label="学历">
      </el-table-column>
      <el-table-column prop="major" label="专业">
      </el-table-column>
      <el-table-column prop="degree" label="学位">
      </el-table-column>
      <el-table-column prop="fullTime" label="全日制">
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click.native.prevent="viewInfo(scope.$index,scope.row)" type="text">查看</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="pagination-wrap">

      <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total"
        @current-change="handleCurrChange" @size-change="handleSizeChange">
      </el-pagination>
    </div>

    <!-- 弹出人员信息概览 -->
    <el-dialog title="人员信息概览" :visible.sync="dialogInformationOverview" :dialogLoading = "dialogLoading">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="培训经历" name="first">
          <template>
            <el-table :data="trainingTableData" border style="width: 100%">
              <el-table-column prop="product" label="产品" width="180">
              </el-table-column>
              <el-table-column prop="one" label="一级" width="180">
              </el-table-column>
              <el-table-column prop="two" label="二级">
              </el-table-column>
              <el-table-column prop="three" label="三级">
              </el-table-column>
              <el-table-column prop="four" label="四级">
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="业务能力" name="second">
          <template>
            <el-table :data="ywnlTableData" border style="width: 100%">
              <el-table-column prop="product" label="客户">
              </el-table-column>
              <el-table-column prop="one" label="一级">
              </el-table-column>
              <el-table-column prop="two" label="二级">
              </el-table-column>
              <el-table-column prop="three" label="三级">
              </el-table-column>
              <el-table-column prop="four" label="四级">
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="技术能力" name="third">
          <template>
            <el-table :data="ywnlTableData" border style="width: 100%">
              <el-table-column prop="product" label="客户" width="180">
              </el-table-column>
              <el-table-column prop="one" label="一级" width="180">
              </el-table-column>
              <el-table-column prop="two" label="二级">
              </el-table-column>
              <el-table-column prop="three" label="三级">
              </el-table-column>
              <el-table-column prop="four" label="四级">
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="语言能力" name="fourth">
          <template>
            <el-table :data="ywnlTableData" border style="width: 100%">
              <el-table-column prop="product" label="客户" width="180">
              </el-table-column>
              <el-table-column prop="one" label="一级" width="180">
              </el-table-column>
              <el-table-column prop="two" label="二级">
              </el-table-column>
              <el-table-column prop="three" label="三级">
              </el-table-column>
              <el-table-column prop="four" label="四级">
              </el-table-column>
            </el-table>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 弹出层
      dialogLoading: false,
      dialogInformationOverview: false,
      // 表格
      loading: false,
      currPage: 1, // 当前页
      total: 1000, // 总条数
      pageSize: 10, // 一页显示多少条
      pageNum: 1, // 需要查询的页码
      tableData: [{
        name: '',
        D_SEX: '',
        phone: '',
        email: '',
        contact: '',
        contactInfo: '',
        education: '',
        major: '',
        degree: '',
        fullTime: ''
      }],
      // 培训经历
      trainingTableData: [
        {
          id: '',
          date: '',
          endtime: '',
          trainingMode: '',
          trainname: '',
          traincon: '',
          skill: '',
          diploma: '',
          fileList: [],
          edit: false
        }
      ],
      // 业务能力
      ywnlTableData: [
        {
          id: null, // id为空表示新增
          businessCategory: '',
          usageTime: '',
          masteryLevel: '',
          recentUsage: '',
          edit: false
        }
      ]
      // 技术能力

    }
  },
  methods: {
    // 获取表格数据
    getTableList () {
      this.loading = true
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        customerNumber: '00'
      }
      this.$api.partner.getUserAll(params).then(res => {
        let result = res.data
        this.loading = false
        if (result.status === '1') {
          console.log(result.data.list.length)
          this.tableData = result.data.list || []
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
    handleSizeChange (value) {
      // console.log(currPage)
    },
    // 改变时
    handleCurrChange (value) {
      this.pageNum = value
      this.getTableList()
    },
    viewInfo (index, row) {
      console.log(index)
    }
  },
  created () {
    this.getTableList()
  },
  activated () {}
}

</script>
<style scoped lang="scss">
  /* css */
  .pagination-wrap {
    padding: 20px;

    .el-pagination {
      float: right;
    }
  }

  .el-table /deep/ .tableHeader {
    background: #1a74ee;
    color: #f9fafc;
  }

</style>
