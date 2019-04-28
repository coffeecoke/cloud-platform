<template>
  <div class="" id="">
    <el-table :data="tableData" border  v-loading="loading" header-cell-class-name="tableHeader" height="600">
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
      <el-table-column prop="country" label="国家">
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click.native.prevent="viewInfo(scope.$index,scope.row)" type="text">查看</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="pagination-wrap">

      <el-pagination
      background
      layout="prev, pager, next"
      :page-size= "pageSize"
      :total="total"
      @current-change = "handleCurrChange"
      @size-change = "handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      currPage: 1, // 当前页
      total: 1, // 总条数
      pageSize: 10, // 一页显示多少条
      pageNum: 1, // 需要查询的页码

      // 假数据
      tableData: [{
        id: null,
        customerNumber: '',
        customerFullName: '',
        customerAbbreviation: '',
        taxonomy: '',
        detailedCategories: '',
        country: ''
      }
      ]
    }
  },
  methods: {
    // 获取表格数据
    getTableList () {
      this.loading = true
      let params = {
        pageNum: this.pageNum, // 请求的页码
        pageSize: this.pageSize // 每页显示条数
        // customerNumber: '333333'
      }
      this.$api.partner.getEnterprise(params).then(res => {
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
    // 点击页码改变时
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
    background:#1a74ee;
    color:#f9fafc;
  }

</style>
