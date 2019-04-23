<template>
  <div class="box-table">
    <el-form ref="form" :model="form" label-width="80px" label-position="top">
      <el-row type="flex" justify="space-between">
         <el-col :span="3">
          <el-autocomplete class="input1" v-model="form.projectId" :fetch-suggestions="querySearch1"
            placeholder="项目编号" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
        </el-col>
        <el-col :span="3">
          <el-autocomplete class="input1" v-model="form.tid" :fetch-suggestions="querySearch2"
            placeholder="任务/组编码" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
        </el-col>
        <el-col :span="3">
          <el-autocomplete class="input1" v-model="form.tname" :fetch-suggestions="querySearch3"
            placeholder="任务/组名称" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
        </el-col>
        <el-col :span="3">
          <el-select class="select1" v-model="form.taskClass" clearable placeholder="类型">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select class="select1" v-model="form.effectDegree" clearable placeholder="影响度">
            <el-option v-for="item in options1" :key="item.value1" :label="item.label1" :value="item.value1">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select class="select1" v-model="form.dependencyDegree" clearable placeholder="依赖度">
            <el-option v-for="item in options2" :key="item.value2" :label="item.label2" :value="item.value2">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="3">
          <div class="button">
            <el-button type="primary" style="float:right" round @click.native.prevent="confirm">确定</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" style="height: 100%" :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}" >
      <el-table-column prop="tid" label="任务/组编码" align="center"></el-table-column>
      <el-table-column prop="tname" label="任务/组名称" align="center"></el-table-column>
      <el-table-column prop="postTask" label="影响项" align="center"></el-table-column>
      <el-table-column prop="effectDegree" label="影响度" align="center"></el-table-column>
      <el-table-column prop="predecessorTask" label="依赖项" align="center"></el-table-column>
      <el-table-column prop="dependencyDegree" label="依赖度" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template>
          <el-button @click="dialogTimeandCondition = true" type="text" icon="el-icon-upload">发布任务</el-button>
        </template>
      </el-table-column>
    </el-table>

<el-dialog title="任务发布设置" :visible.sync="dialogTimeandCondition" width="40%" center>
      <div class="block">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="请设置认领时限：">
    <el-date-picker v-model="tasktime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
  </el-form-item>
  <el-form-item label="请设置基础价格：">
    <el-input  placeholder="请输入价格" v-model="price"  clearable></el-input>
  </el-form-item>
  </el-form>
      </div>
      <div class="condition">
         <el-table :data="tableData1" border style="width: 100%" >
        <el-table-column prop="category" label="能力类别">
           <template slot-scope="scope">
              <template v-if="scope.row.edit">
               <el-cascader :options="options7" :show-all-levels="false" v-model="scope.row.label"></el-cascader>
              </template>
               <span v-else>{{ scope.row.label }}</span>
           </template>
        </el-table-column>
        <el-table-column prop="professional" label="能力级别">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-select v-model="scope.row.professional.value" placeholder="请选择专业技能">
                <el-option v-for="item in scope.row.professional.options" :key="item.label" :label="item.label" :value="item.label"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </template>
            <span v-else>{{ scope.row.professional.value }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="btn-icons-group">
              <i class="edit el-icon-edit" @click="scope.row.edit=true;isAddRow=false"></i>
              <i class="delect el-icon-delete" @click="deleteRow(scope.$index, tableData1)">
              </i>
              <i class="save el-icon-upload2" @click="saveClick(scope.$index,scope.row.label)">
              </i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="add-row" @click.prevent="addRow()"><span>+ 新增能力栏</span></div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTimeandCondition = false">取 消</el-button>
        <el-button type="primary" @click="dialogTimeandCondition = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tasktime: '',
      formInline: '',
      price: '',
      isAddRow: true,
      value7: '',
      loading: true, // 数据加载的loading效果
      dialogTimeandCondition: false,
      projectid: [],
      taskcode: [],
      taskname: [],

      form: {
        projectId: '2018725-020B',
        tid: '',
        tname: '',
        taskClass: 'T',
        effectDegree: '',
        dependencyDegree: ''
      },
      formLabelWidth: '72px',
      // select选择框
      options: [{
        value: 'T',
        label: '任务'
      }, {
        value: 'G',
        label: '任务组'
      }],
      options1: [{
        value1: '选项1',
        label1: '无影响'
      }, {
        value1: '选项2',
        label1: '一级（影响项<=2个）'
      }, {
        value1: '选项3',
        label1: '二级（影响项<=5个）'
      }, {
        value1: '选项4',
        label1: '三级（影响项<=8个）'
      }, {
        value1: '选项5',
        label1: '四级（影响项<=12个）'
      }, {
        value1: '选项6',
        label1: '五级（影响项>12个）'
      }],
      options2: [{
        value2: '选项1',
        label2: '无依赖'
      }, {
        value2: '选项2',
        label2: '一级（依赖项<=2个）'
      }, {
        value2: '选项3',
        label2: '二级（依赖项<=5个）'
      }, {
        value2: '选项4',
        label2: '三级（依赖项<=8个）'
      }, {
        value2: '选项5',
        label2: '四级（依赖项<=12个）'
      }, {
        value2: '选项6',
        label2: '五级（依赖项>12个）'
      }],
      tableData: [{
        tid: '',
        tname: '',
        postTask: '',
        effectDegree: '',
        predecessorTask: '',
        dependencyDegree: ''
      }],
      tableData1: [{
        id: '1', // id为空表示新增
        category: {
          value: '借款',
          options: [
            {
              label: '借款'
            },
            {
              label: '存款'
            }
          ]
        },
        professional: {
          value: 'Java',
          options: [
            {
              label: 'Java'
            },
            {
              label: 'Js'
            }
          ]
        },
        usageTime: '',
        mastery: {
          value: '熟悉',
          options: [
            {
              label: '精通'
            },
            {
              label: '熟悉'
            },
            {
              label: '了解'
            }
          ]
        },
        recentUsage: '2018-09-07',
        edit: false
      }],
      list: {
        id: null, // id为空表示新增
        category: {
          value: null,
          options: [
            {
              label: 'Java'
            },
            {
              label: 'Js'
            }
          ]
        },
        professional: {
          value: null,
          options: [
            {
              label: 'Java'
            },
            {
              label: 'Js'
            }
          ]
        },
        usageTime: null,
        mastery: {
          value: '',
          options: [
            {
              label: '精通'
            },
            {
              label: '熟悉'
            },
            {
              label: '了解'
            }
          ]
        },
        recentUsage: null,
        edit: true
      },
      options7: [{'children': [{'children': [], 'id': 'G17.CARD', 'label': 'G17.卡'}, {'children': [], 'id': 'L_AGRE_CARD_INFO.CARD', 'label': 'L_AGRE_CARD_INFO.卡'}], 'id': 'P-CARD', 'label': '卡'}, {'children': [{'children': [], 'id': 'G21.CHALLENGE', 'label': 'G21.综合'}, {'children': [], 'id': 'G44.CHALLENGE', 'label': 'G44.综合'}, {'children': [], 'id': 'L_ACCT_COUNTRYRISK_MANAGE.CHALLENGE', 'label': 'L_ACCT_COUNTRYRISK_MANAGE.综合'}, {'children': [], 'id': 'L_AGRE_OBSTACLE_INFO.CHALLENGE', 'label': 'L_AGRE_OBSTACLE_INFO.综合'}], 'id': 'P-CHALLENGE', 'label': '综合'}, {'children': [{'children': [], 'id': 'L_CUST_ALL.CUSTOMER', 'label': 'L_CUST_ALL.客户'}], 'id': 'P-CUSTOMER', 'label': '客户'}, {'children': [{'children': [], 'id': 'G01.DEP', 'label': 'G01.普通存款'}, {'children': [], 'id': 'G01.STUDEP', 'label': 'G01.结构性存款'}, {'children': [], 'id': 'L_ACCT_DEPOSIT.DEP', 'label': 'L_ACCT_DEPOSIT.普通存款'}, {'children': [], 'id': 'L_ACCT_DEPOSIT.STUDEP', 'label': 'L_ACCT_DEPOSIT.结构性存款'}], 'id': 'P-DEP', 'label': '存款'}, {'children': [{'children': [], 'id': 'G01.FIMM', 'label': 'G01.理财'}, {'children': [], 'id': 'L_FIMM_PRODUCT.FIMM', 'label': 'L_FIMM_PRODUCT.理财'}], 'id': 'P-FIMM', 'label': '理财'}, {'children': [{'children': [], 'id': 'G01.FINANCE', 'label': 'G01.财务'}, {'children': [], 'id': 'L_FINA_GL.FINANCE', 'label': 'L_FINA_GL.财务'}, {'children': [], 'id': 'L_PUBL_CDE_DATE.FINANCE', 'label': 'L_PUBL_CDE_DATE.财务'}, {'children': [], 'id': 'L_PUBL_RATE.FINANCE', 'label': 'L_PUBL_RATE.财务'}], 'id': 'P-FINANCE', 'label': '财务'}, {'children': [{'children': [], 'id': 'G01.DERIVATIVE', 'label': 'G01.衍生品'}, {'children': [], 'id': 'G01.INVEST', 'label': 'G01.投资'}, {'children': [], 'id': 'G01.ISSUE', 'label': 'G01.发行'}, {'children': [], 'id': 'G01.MMFUND', 'label': 'G01.资金往来'}, {'children': [], 'id': 'G01.REPO', 'label': 'G01.回购'}, {'children': [], 'id': 'L_ACCT_EXCHANGE_INFO.FX', 'label': 'L_ACCT_EXCHANGE_INFO.外汇'}, {'children': [], 'id': 'L_ACCT_FUND_BOND_ISSUE.ISSUE', 'label': 'L_ACCT_FUND_BOND_ISSUE.发行'}, {'children': [], 'id': 'L_ACCT_FUND_CDS_BAL.ISSUE', 'label': 'L_ACCT_FUND_CDS_BAL.发行'}, {'children': [], 'id': 'L_ACCT_FUND_EQUITY_INVESTED.ISSUE', 'label': 'L_ACCT_FUND_EQUITY_INVESTED.发行'}, {'children': [], 'id': 'L_ACCT_FUND_INVEST.INVEST', 'label': 'L_ACCT_FUND_INVEST.投资'}, {'children': [], 'id': 'L_ACCT_FUND_REPURCHASE.REPO', 'label': 'L_ACCT_FUND_REPURCHASE.回购'}, {'children': [], 'id': 'L_AGRE_CREDITLINE.OBSLOAN', 'label': 'L_AGRE_CREDITLINE.资金往来'}, {'children': [], 'id': 'L_AGRE_DERIVE_SUBJECT_INFO.DERIVATIVE', 'label': 'L_AGRE_DERIVE_SUBJECT_INFO.衍生品'}], 'id': 'P-INTERBANK', 'label': '同业'}, {'children': [{'children': [], 'id': 'G01.BILLLOAN', 'label': 'G01.票据融资'}, {'children': [], 'id': 'G01.LEASELOAN', 'label': 'G01.融资租赁'}, {'children': [], 'id': 'G01.LOAN', 'label': 'G01.普通贷款'}, {'children': [], 'id': 'G01.REPOLOAN', 'label': 'G01.非金融机构买入返售'}, {'children': [], 'id': 'G01.TRDLOAN', 'label': 'G01.贸易融资'}, {'children': [], 'id': 'G0101.OBSLOAN', 'label': 'G0101.表外贷款'}, {'children': [], 'id': 'G17.ODLOAN', 'label': 'G17.透支'}, {'children': [], 'id': 'L_ACCT_FUND_REPURCHASE.REPOLOAN', 'label': 'L_ACCT_FUND_REPURCHASE.非金融机构买入返售'}, {'children': [], 'id': 'L_AGRE_BILL_INFO.BILLLOAN', 'label': 'L_AGRE_BILL_INFO.票据融资'}, {'children': [], 'id': 'L_AGRE_CREDITLINE.LEASELOAN', 'label': 'L_AGRE_CREDITLINE.融资租赁'}, {'children': [], 'id': 'L_AGRE_CREDITLINE.LOAN', 'label': 'L_AGRE_CREDITLINE.普通贷款'}, {'children': [], 'id': 'L_AGRE_CREDITLINE.ODLOAN', 'label': 'L_AGRE_CREDITLINE.透支'}, {'children': [], 'id': 'L_AGRE_CREDITLINE.TRDLOAN', 'label': 'L_AGRE_CREDITLINE.贸易融资'}], 'id': 'P-LOAN', 'label': '贷款'}, {'children': [{'children': [], 'id': 'G07.MANAGEMENT', 'label': 'G07.组织架构'}, {'children': [], 'id': 'G17.MANAGEMENT', 'label': 'G17.组织架构'}, {'children': [], 'id': 'L_PUBL_ORG_BRA.MANAGEMENT', 'label': 'L_PUBL_ORG_BRA.组织架构'}], 'id': 'P-MANAGEMENT', 'label': '组织架构'}, {'children': [{'children': [], 'id': 'L_AGRE_EXGUARCONTRACTTAB.OVERSEAS', 'label': 'L_AGRE_EXGUARCONTRACTTAB.国际业务'}], 'id': 'P-OVERSEAS', 'label': '国际业务'}, {'children': [{'children': [], 'id': 'L_CUST_EPAYINFO.PAYMENT', 'label': 'L_CUST_EPAYINFO.支付系统'}], 'id': 'P-PAYMENT', 'label': '支付系统'}]
    }
  },
  methods: {
    change (value) {
      console.log(value)
    },
    taskTypeChage (val) {
      console.log(val)
    },
    handleClick (row) {
      console.log(row)
    },
    // 项目编号查询
    querySearch1 (queryString, cb) {
      var taskBlurry = this.projectid
      var results = queryString ? taskBlurry.filter(this.createFilter(queryString)) : taskBlurry
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    // 任务编号查询
    querySearch2 (queryString, cb) {
      var taskBlurry = this.taskcode
      var results = queryString ? taskBlurry.filter(this.createFilter(queryString)) : taskBlurry
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    // 组名称
    querySearch3 (queryString, cb) {
      var taskBlurry = this.taskname
      var results = queryString ? taskBlurry.filter(this.createFilter(queryString)) : taskBlurry
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (taskBlurry) => {
        return (taskBlurry.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      }
    },
    loadAll1 () {
      this.$api.taskIssue.getProject().then(res => {
        let result = res.data
        console.log(result)
        return result.data
      })
      // return[{
      //   'value': '三全鲜食（北新泾店）',
      //   'address': '长宁区新渔路144号'
      // },
      // {
      //   'value': 'Hot honey 首尔炸鸡（仙霞路）',
      //   'address': '上海市长宁区淞虹路661号'
      // }
      // ]
    },
    loadAll2 () {
      let formData = new FormData()
      Object.keys(this.form).forEach(key => {
        // console.log(key)
        formData.append(key, this.form[key])
      })
      // console.log(formData.get('tid'))
      this.$api.taskIssue.getTaskGroupTree(formData).then(res => {
        var result = res.data
        // console.log(result.data)
        return result.data
      })
      // return[{
      //   'value': '三全鲜食（北新泾店）',
      //   'address': '长宁区新渔路144号'
      // },
      // {
      //   'value': 'Hot honey 首尔炸鸡（仙霞路）',
      //   'address': '上海市长宁区淞虹路661号'
      // }
      // ]
    },
    loadAll3 () {
      this.$api.taskIssue.queryByblurry3().then(res => {
        let result = res.data
        return result.taskname
      })
    },
    handleSelect (item) {
      console.log(item)
    },
    // 添加一行
    addRow () {
      if (this.isAddRow) {
        this.tableData1.push(Object.assign({}, this.list))
        this.isAddRow = false
      } else {
        this.$notify({
          title: '提示',
          message: '请先保存上一条再添加！',
          type: 'warning',
          offset: 100
        })
        return false
      }
    },
    // 点击保存
    saveClick (index, row) {
      if (row.edit === false) {
        // 只有编辑状态才能进行保存操作，避免重复无用的后台请求
        this.$message('请先编辑')
        return false
      }
      // this.loading = true
      row.edit = false
      this.isAddRow = true
      let formData = new FormData()
      Object.keys(this.list).forEach(function (key) {
        formData.append(key, row[key]) // 遍历新增数据，把键值放在formData中传给后台
      })
      this.saveSubmit(index, formData)
    },
    // 删除一行
    deleteRow (index, rows) {
      if (rows[index].edit === true) { // 删除前，如果此行为不可编辑，把isAddRow置为true,防止在编辑状态删除后，出现不可新增的情况
        this.isAddRow = true
      }
      if (!rows[index].id) {
        rows.splice(index, 1) // 如果id为空，说明没有进行过保存操作，前台直接删除，不用调用后台
        return false
      }
      this.$confirm('是否要删除此条数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.loading = true
        var currData = rows[index]
        this.$api.jsnl.delTechnologicalCapability(currData).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // this.loading = false
        }).catch(res => {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
          // this.loading = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted () {
    // this.projectId = this.$route.query.date
    // console.log(this.projectId)
    //  this.$api.taskIssue.queryTask().then(res => {
    //    let result = res.data
    //    if
    //    this.tableData = result.data || []
    // })
    // this.projectid = this.loadAll1()
    this.options7 = this.loadAll2()
    // console.log(this.loadAll1())
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

  .el-form {
    margin-bottom: 20px;
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
    width: 100%;

    .el-input__inner {
      height: 40px;
      width: 100%;
      border-radius: 8px;
      border: 1px solid #DCDFE6;
    }
  }

  .select1 {
    .el-input__inner {
      height: 40px;
      border-radius: 8px;
      border: 1px solid #DCDFE6;
    }
  }

  .button {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .el-input__inner {
      border-radius: 5px;
      border: 1px solid #DCDFE6;
    }
    .input{
      .el-input__inner {
      border-radius: 5px;
      border: 1px solid #DCDFE6;
    }
    }
</style>
