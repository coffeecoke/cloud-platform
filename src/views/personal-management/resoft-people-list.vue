<template>
  <div class="" id="">
    <el-table :data="tableData" border style="width: 100%" :loading="false">
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
    </el-table>
    <div class="pagination-wrap">
      <el-pagination
      background
      layout="prev, pager, next"
      :page-size= "pageSize"
      :total="totle"
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
      currPage: 1,
      totle: 1000,
      pageSize: 20,
      pageNum: 1,
      tableData: [{
        name: '唐欢',
        D_SEX: '男',
        phone: '18601376034',
        email: '972041969@qq.com',
        contact: '110',
        contactInfo: '100',
        education: '本科',
        major: '计算机',
        degree: '硕士',
        fullTime: '全日制'
      },
      {
        name: '唐欢',
        D_SEX: '男',
        phone: '18601376034',
        email: '972041969@qq.com',
        contact: '110',
        contactInfo: '100',
        education: '本科',
        major: '计算机',
        degree: '硕士',
        fullTime: '全日制'
      },
      {
        name: '唐欢',
        D_SEX: '男',
        phone: '18601376034',
        email: '972041969@qq.com',
        contact: '110',
        contactInfo: '100',
        education: '本科',
        major: '计算机',
        degree: '硕士',
        fullTime: '全日制'
      },
      {
        name: '唐欢',
        D_SEX: '男',
        phone: '18601376034',
        email: '972041969@qq.com',
        contact: '110',
        contactInfo: '100',
        education: '本科',
        major: '计算机',
        degree: '硕士',
        fullTime: '全日制'
      }
      ]
    }
  },
  methods: {
    // 获取表格数据
    getTableList () {
      this.loading = true
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      this.$api.partner.getUserList(params).then(res => {

      })
    },
    // 条目改变时
    handleSizeChange (currPage) {
      console.log(currPage)
    },
    // 改变时
    handleCurrChange (value) {
      this.pageNum = value
      this.getTableList()
    }
  },

  created () {

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

</style>
