<template>
  <div class="box-table">
    <el-form ref="form" :model="form" label-width="80px" label-position="top">
      <el-row type="flex" justify="space-between">
        <el-col :span="4">
          <el-autocomplete class="input1" v-model="form.state1" :fetch-suggestions="querySearch1" placeholder="任务/组编码"
            :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
        </el-col>
        <el-col :span="4">
          <el-autocomplete class="input1" v-model="form.state2" :fetch-suggestions="querySearch2" placeholder="任务/组名称"
            :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
        </el-col>
        <el-col :span="4">
          <el-select class="select1" v-model="form.value" clearable placeholder="类型">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select class="select1" v-model="form.value1" clearable placeholder="影响度">
            <el-option v-for="item in options1" :key="item.value1" :label="item.label1" :value="item.value1">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select class="select1" v-model="form.value2" clearable placeholder="依赖度">
            <el-option v-for="item in options2" :key="item.value2" :label="item.label2" :value="item.value2">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="3">
          <div class="button">
            <el-button type="primary" style="float:right" v-on:click="confirm">确定</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" style="height: 100%" :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}">
      <el-table-column prop="date" label="任务/组编码" align="center"></el-table-column>
      <el-table-column prop="name" label="任务/组名称" align="center"></el-table-column>
      <el-table-column prop="province" label="影响项" align="center"></el-table-column>
      <el-table-column prop="city" label="影响度" align="center"></el-table-column>
      <el-table-column prop="address" label="依赖项" align="center"></el-table-column>
      <el-table-column prop="zip" label="依赖度" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template>
          <el-button @click="dialogPersonVisible = true" type="text" icon="el-icon-upload">发布任务</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="设置任务时间" :visible.sync="dialogPersonVisible">
      <div class="block">
        <span class="demonstration">使用 value-format</span>
        <div class="demonstration">值：{{ value2 }}</div>
        <el-date-picker v-model="value2" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPersonVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogPersonVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogPersonVisible: false,
      restaurants1: [],
      restaurants2: [],
      state1: '',
      state2: '',
      form: {
        name: '',
        date1: '',
        date2: '',
        value: '',
        value1: '',
        value2: ''
      },
      formLabelWidth: '120px',
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
      value: '',
      value1: '',
      value2: '',
      // 确定按钮
      confirm: function () {
        let formData = new FormData()
        Object.keys(this.form, key => {
          formData.append(key, this.form[key])
        })
        this.$api.taskIssue.queryTaskByForm(formData).then(res => {
          var result = res.data
          this.tableData = result
        })
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }]
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    // 项目编号查询
    querySearch1 (queryString, cb) {
      var restaurants = this.restaurants1
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    // 组名称
    querySearch2 (queryString, cb) {
      var restaurants = this.restaurants2
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      }
    },
    loadAll1 () {
      this.$api.taskIssue.queryByblurry1().then(res => {
        let result = res.data
        return result.restaurants1
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
      this.$api.taskIssue.queryByblurry2().then(res => {
        let result = res.data
        return result.restaurants2
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
    handleSelect (item) {
      console.log(item)
    }
  },
  mounted () {
    this.$api.taskIssue.queryTask().then(res => {
      let result = res.data
      this.tableData = result.data
    })
    this.restaurants1 = this.loadAll1()
    this.restaurants2 = this.loadAll2()
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
  .el-form {
    margin-bottom:20px;
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
    width:100%;
    .el-input__inner {
      height: 40px;
      width: 100%;
      border-radius: 8px;
      border:1px solid #DCDFE6;
    }
  }

  .select1 {
    .el-input__inner {
      height: 40px;
      border-radius: 8px;
      border:1px solid #DCDFE6;
    }
  }
  .button {
    height:100%;
    display: flex;
    align-items:center;
    justify-content: flex-end;
  }

</style>
