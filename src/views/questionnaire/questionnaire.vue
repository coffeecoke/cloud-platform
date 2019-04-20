<template>
<div class="box-table">
<el-form :inline="true" :model="questionnaire" class="demo-form-inline">
  <el-form-item label="问卷名称" prop="quTitle">
    <el-input v-model="questionnaire.quTitle" placeholder="问卷名称"></el-input>
  </el-form-item>
  <el-form-item label="问卷类型" prop="quType">
    <el-select v-model="questionnaire.quType" placeholder="问卷类型">
      <el-option label="接口改造类" value="1"></el-option>
      <el-option label="开发实施类" value="2"></el-option>
      <el-option label="人员外包类" value="3"></el-option>
      <el-option label="业务咨询类" value="4"></el-option>
      <el-option label="制度升级类" value="5"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="initTableData">查询</el-button>
  </el-form-item>
</el-form>

<el-row>
  <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" @click="questAdd = true" icon="el-icon-edit">新增</el-button></div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" @click="questAdd = true" icon="el-icon-edit">修改</el-button></div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" @click="addQuestion" icon="el-icon-document" >添加问题</el-button></div></el-col>
  <el-col :span="1"><div class="grid-content bg-purple"><el-button type="primary" @click="delData" icon="el-icon-delete" >删除</el-button></div></el-col>
</el-row>
<el-row>
   <el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%">
    <el-table-column  type="selection"  width="55"  align="center"></el-table-column>
    <el-table-column prop="quTitle" label="问卷名称" width="200"></el-table-column>
    <el-table-column prop="quType" label="问卷类型" width="200"></el-table-column>
    <el-table-column prop="quDescFlag" label="是否有简介" width="200"></el-table-column>
    <el-table-column prop="quDesc" label="简介" width="230"></el-table-column>
    <el-table-column prop="createUserName" label="创建人" width="200"></el-table-column>
    <el-table-column prop="createDate" label="创建时间" width="200"></el-table-column>
  </el-table>
</el-row>
<el-row >
  <div class="block">
    <el-pagination background layout="total,prev, pager, next,jumper" :total="1000"></el-pagination>
  </div>
</el-row>
<!--新增弹出框  start-->
<el-dialog title="新增调查问卷" :visible.sync="questAdd"  center>
<el-form  label-width="100px"  :model="questionnaire" :rules="questionnaireRules" ref="questionnaire">
<el-form-item label="问卷名称" prop="quTitle" >
  <el-input v-model="questionnaire.quTitle"  placeholder="问卷名称" size="medium"  ></el-input>
</el-form-item>
<el-form-item label="问卷类型" prop="quType" >
    <el-select v-model="questionnaire.quType" placeholder="问卷类型" size="medium">
      <el-option label="接口改造类" value="1"></el-option>
      <el-option label="开发实施类" value="2"></el-option>
      <el-option label="人员外包类" value="3"></el-option>
      <el-option label="业务咨询类" value="4"></el-option>
      <el-option label="制度升级类" value="5"></el-option>
    </el-select>
</el-form-item>
<el-form-item label="是否有简介" prop="quDescFlag" >
  <el-switch v-model="questionnaire.quDescFlag" active-color="#13ce66" @change="switchToggle" inactive-color="#ff4949"> </el-switch>
</el-form-item>
<el-form-item label="简介" v-show="questionnaire.quDescFlag" prop="quDesc" >
  <el-input type="textarea"  :rows="5" v-show="questionnaire.quDescFlag" placeholder="请输入内容" v-model="questionnaire.quDesc"></el-input>
</el-form-item>
<el-form-item>
  <el-button type="primary" @click.native.prevent="saveQuestionnaire('questionnaire')"  round>保存</el-button>
</el-form-item>
</el-form>
</el-dialog>
<!--新增弹出框 end-->

<!--问题选择  start-->
<el-dialog title="新增调查问卷" :visible.sync="questSel"  center>
  <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入关键字"
  :titles="['未选列表', '已选列表']"
  :left-default-checked="leftCheck"
  :right-default-checked="rightCheck"
  @change="handleChange"
  v-model="value4"
  :data="dataOpts">
  </el-transfer>
</el-dialog>
<!--问题选择  end-->
</div>
</template>
<script>
export default {
  data () {
    return {
      multipleSelection: [],
      questionnaire: {
        id: '',
        quTitle: '',
        quType: '',
        quDescFlag: 0,
        quDesc: '',
        createUserName: '',
        createDate: ''
      },
      questionnaireRules: {
        quTitle: [
          { required: true, message: '请输入问卷名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        quType: [
          {required: true, message: '请选择问卷类型', trigger: 'change'}
        ]
      },
      dataOpts: [
        {
          label: '上海',
          key: 0
        },
        {
          label: '北京',
          key: 1
        },
        {
          label: '广州',
          key: 2
        },
        {
          label: '深圳',
          key: 3
        },
        {
          label: '南京',
          key: 4
        },
        {
          label: '西安',
          key: 5
        },
        {
          label: '成都',
          key: 6
        }
      ],
      leftCheck: [],
      rightCheck: [],
      questAdd: false,
      questSel: false,
      value4: [],
      tableData: [
        {
          // 表格数据
          id: '11111111',
          quTitle: '测试问卷1',
          quType: '开发实施类',
          quDescFlag: '是',
          quDesc: '发生发生发射点发111111111',
          createUserName: 'admin',
          createDate: '2019-4-16'
        },
        {
          // 表格数据
          id: '222222',
          quTitle: '测试问卷1',
          quType: '开发实施类',
          quDescFlag: '是',
          quDesc: '发生发生发射点发111111111',
          createUserName: 'admin',
          createDate: '2019-4-16'
        },
        {
          // 表格数据
          id: '333333',
          quTitle: '测试问卷1',
          quType: '开发实施类',
          quDescFlag: '是',
          quDesc: '发生发生发射点发111111111',
          createUserName: 'admin',
          createDate: '2019-4-16'
        }
      ]
    }
  },
  mounted () {
    this.initTableData()
  },
  methods: {
    initTableData () {
      console.log(this.questionnaire)
      this.$api.questionnaire.getQuestionnaireList(this.questionnaire).then(res => {
        let result = res.data
        this.tableData = result.data
      })
    },
    saveQuestionnaire (valForm) {
      console.log(this.questionnaire)
      this.$refs[valForm].validate((valid) => {
        if (valid) {
          this.$api.questionnaire.saveQuestionnaire(this.questionnaire).then(res => {
            let result = res.data
            console.log(result)
            if (result.state === '1') {
              this.$message({
                type: 'success',
                message: '保存数据成功!'
              })
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
    delData () {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.questionnaire.deleteQuestionnaire(this.questionnaire).then(res => {
          let result = res.data
          console.log(result)
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
        this.initTableData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    filterMethod (query, item) {
      return item.label.indexOf(query) > -1
    },
    // 新增页面switch开关事件--添加项目描述校验规则
    switchToggle (val) {
      let quDescRule = [
        {required: val, message: '请填写简介', trigger: 'blur'},
        { min: 1, max: 10, message: '长度在 1 到 200 个字符', trigger: 'blur' }
      ]
      if (val) {
        this.questionnaireRules.quDesc = quDescRule
      } else {
        this.questionnaireRules.quDesc = []
      }
    },
    editQuestion () {
      if (this.multipleSelection.length === 1) {
        this.questionnaire = this.multipleSelection[0]
        this.questAdd = true
      } else {
        this.$message({
          type: 'warning',
          message: '请选择一条数据编辑！'
        })
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    addQuestion () {
      if (this.multipleSelection.length === 1) {
        this.questionnaire = this.multipleSelection[0]
        this.$api.questionnaire.loadQuestDataList(this.questionnaire).then(res => {
          let result = res.data
          console.log(result)
          this.dataOpts = result.dataOpts
          this.leftCheck = result.leftCheck
          this.rightCheck = result.rightCheck
        })
        this.questSel = true
      } else {
        this.$message({
          type: 'warning',
          message: '请选择一条数据编辑！'
        })
      }
    },
    // 保存问卷已选择问题
    handleChange (value, direction, movedKeys) {
      let param = []
      param.quId = this.questionnaire.id
      param.operation = direction === 'left' ? 'delete' : 'insert'
      param.movedKeys = movedKeys
      console.log(param)
      this.$api.questionnaire.saveQuestDataList(param).then(res => {
        let result = res.data
        console.log(result)
        if (result.state === '1') {
          this.$message({
            type: 'success',
            message: '保存数据成功!'
          })
          this.questSel = false
        } else {
          this.$message.error('保存数据失败！')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-pagination{
  margin-top:20px;
  text-align: right;
}
.el-transfer{
  height: 300px;
}
</style>
