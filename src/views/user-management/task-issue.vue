<template>
  <div class="box-table">
    <el-form ref="form" :model="form" label-width="80px" label-position="top">
      <el-row type="flex" justify="space-between">
        <el-col :span="3">
          <el-autocomplete class="input1" v-model="form.projectId" :fetch-suggestions="querySearch" placeholder="项目编号"
            :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
        </el-col>
        <el-col :span="3">
          <el-autocomplete class="input1" v-model="form.tid" placeholder="任务/组编码" :trigger-on-focus="false"
            @select="handleSelect"></el-autocomplete>
        </el-col>
        <el-col :span="3">
          <el-autocomplete class="input1" v-model="form.tname" placeholder="任务/组名称" :trigger-on-focus="false"
            @select="handleSelect"></el-autocomplete>
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
    <el-table :data="tableData" style="height: 100%" :header-cell-style="{background:'#1a74ee',color:'#f9fafc'}">
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
            <el-input placeholder="请输入价格" v-model="price" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="condition">
        <el-table :data="tableData1" border style="width: 100%">
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
                  <el-option v-for="item in scope.row.professional.options" :key="item.label" :label="item.label"
                    :value="item.label" :disabled="item.disabled">
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
        projectId: '',
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
          options: [{
            label: '借款'
          },
          {
            label: '存款'
          }
          ]
        },
        professional: {
          value: 'Java',
          options: [{
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
          options: [{
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
          options: [{
            label: 'Java'
          },
          {
            label: 'Js'
          }
          ]
        },
        professional: {
          value: null,
          options: [{
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
          options: [{
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
      options7: []
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
    querySearch (queryString, cb) {
      var taskBlurry = this.projectid
      // console.log(taskBlurry)
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
    this.projectId = this.$route.query.date
    // 初始化模糊查询
    this.$api.TaskCollection.getProject().then(res => {
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

  .input {
    .el-input__inner {
      border-radius: 5px;
      border: 1px solid #DCDFE6;
    }
  }

</style>
