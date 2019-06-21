<template>
  <div class="box-content">
    <div class="box-right">
      <div class="form-table">
        <div class="form-box">
          <el-form :model="formInline" label-width="80px">
            <el-row type="flex" class="row-bg">
              <el-col :span="5">
                <el-form-item label="审批人">
                  <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="活动区域">
                  <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="活动时间">
                  <el-col :span="11">
                    <el-form-item prop="date1">
                      <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 100%;">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-form-item prop="date2">
                      <el-time-picker placeholder="选择时间" v-model="formInline.date2" style="width: 100%;">
                      </el-time-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item>
                  <el-button @click="resetForm('formInline')">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="table-box">
          <template>
            <el-table :data="tableData" style="width: 100%" :height="tableHeight">
              <el-table-column prop="name" label="模型一" width="280"></el-table-column>
              <el-table-column prop="state" label="模型二"></el-table-column>
              <el-table-column prop="relation" label="模型三"></el-table-column>
              <el-table-column prop="parameter" label="审核时间"></el-table-column>
              <el-table-column prop="operation" label="操作">
                <template slot-scope="scope">
                  <i class="icon el-icon-circle-plus-outline"></i>
                  <i class="icon el-icon-edit"></i>
                  <i class="icon el-icon-delete"></i>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <template>
            <div class="block-right">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                layout="total, sizes, prev, pager, next, jumper" :total="400">
              </el-pagination>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentPage: 4,
      formInline: {
        user: '',
        region: '',
        date1: '',
        date2: ''
      },
      tableHeight: null,
      tableData: [{
        name: '内容内容',
        state: '内容内容',
        relation: '内容内容',
        parameter: '2019.6.19 '
      }, {
        name: '内容内容',
        state: '内容内容',
        relation: '内容内容',
        parameter: '2019.6.19 '
      }, {
        name: '内容内容',
        state: '内容内容',
        relation: '内容内容',
        parameter: '2019.6.19 '
      }, {
        name: '内容内容',
        state: '内容内容',
        relation: '内容内容',
        parameter: '2019.6.19 '
      }, {
        name: '内容内容',
        state: '内容内容',
        relation: '内容内容',
        parameter: '2019.6.19 '
      }, {
        name: '内容内容',
        state: '内容内容',
        relation: '内容内容',
        parameter: '2019.6.19 '
      }, {
        name: '内容内容',
        state: '内容内容',
        relation: '内容内容',
        parameter: '2019.6.19 '
      }, {
        name: '内容内容',
        state: '内容内容',
        relation: '内容内容',
        parameter: '2019.6.19 '
      }, {
        name: '内容内容',
        state: '内容内容',
        relation: '内容内容',
        parameter: '2019.6.19 '
      }, {
        name: '内容内容',
        state: '内容内容',
        relation: '内容内容',
        parameter: '2019.6.19 '
      }]
    }
  },
  methods: {
    onSubmit () {

    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}

</script>
<style lang="scss" scoped>
  .el-table /deep/ .el-table__header th {
    background: #eceff4;
    color: #333333;
    text-align: center;
  }

  .el-table /deep/ tr th,
  .el-table /deep/ tr td {
    text-align: center;
  }

  .box-right {
    padding: 0 10px;
    // flex:1;
    // width:100%;
    height: 100%;
    overflow: auto;
    .form-table {
      background: #fff;
      border-radius: 5px;
      padding: 10px;

      .form-box {
        width: 100%;
        height: auto;
        padding: 10px 0;
        background: #eceff4;
        margin-bottom: 20px;
      }

      .table-box {
        text-align: center;

        .operation {
          width: 20px;
          height: 20px;
          display: inline-block;
          background: url("../../assets/imgs/operation.png") no-repeat center;
        }
      }
    }
  }
  .block-right {
    float: right;
    margin-top: 10px;
  }
  .el-form-item .line {
    text-align: center;
  }
</style>
