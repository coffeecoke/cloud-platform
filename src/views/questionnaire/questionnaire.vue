<template>
<div class="box-table">
<el-form :inline="true" :model="qu_naire_form" class="demo-form-inline">
  <el-form-item label="问卷名称" prop="quTitle">
    <el-input v-model="qu_naire_form.quTitle" placeholder="问卷名称"></el-input>
  </el-form-item>
  <el-form-item label="问卷类型" prop="quType">
    <el-select v-model="qu_naire_form.quType" clearable placeholder="问卷类型">
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
  <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" @click="questAdd = true" icon="el-icon-plus">新增</el-button></div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" @click="editQuestion" icon="el-icon-edit">修改</el-button></div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" @click="questOptions" icon="el-icon-document" >管理问题</el-button></div></el-col>
  <el-col :span="1"><div class="grid-content bg-purple"><el-button type="primary" @click="delData" icon="el-icon-delete" >删除</el-button></div></el-col>
</el-row>
<el-row>
   <el-table :data="tableData" @selection-change="handleSelectionChange"  border style="width: 100%">
    <el-table-column  type="selection"    align="center"></el-table-column>
    <el-table-column prop="quTitle" label="问卷名称" ></el-table-column>
    <el-table-column prop="quType" label="问卷类型" >
      <template slot-scope="scope">{{scope.row.quType | formatquType }}</template>
    </el-table-column>
    <el-table-column prop="quDescFlag" label="是否有简介" >
      <template slot-scope="scope">{{scope.row.quDescFlag | formatquDescFlag }}</template>
    </el-table-column>
    <el-table-column   label="简介"  show-overflow-tooltip>
      <template slot-scope="scope">
          <span>{{ scope.row.quDesc }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="createUser" label="创建人" ></el-table-column>
    <el-table-column prop="createDate" label="创建时间" ></el-table-column>
    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button  type="primary"  icon="el-icon-document"  @click="handleShow(scope.$index, scope.row)" round>预览</el-button>
      </template>
    </el-table-column>
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

<!--问题管理-->
<el-dialog title="问题管理" :visible.sync="questOptionsAdd"   width="1000px">
  <el-row>
    <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" @click="saveSort" icon="el-icon-edit">保存顺序号</el-button></div></el-col>
    <el-col :span="1"><div class="grid-content bg-purple"><el-button type="primary" @click="addQuestion" icon="el-icon-plus">添加问题</el-button></div></el-col>
  </el-row>
  <el-row>
    <el-table :data="optionTableData" border style="width: 100%">
      <el-table-column prop="quTitle" label="标题" ></el-table-column>
      <el-table-column prop="quDirType" label="题目类型"  >
        <template slot-scope="scope">{{scope.row.quDirType | formatquDirType }}</template>
      </el-table-column>
      <el-table-column prop="quAnswerType" label="答案类型" >
        <template slot-scope="scope">{{scope.row.quAnswerType | formatanswerType }}</template>
      </el-table-column>
      <el-table-column prop="quSort" label="顺序号">
        <template slot-scope="scope">
          <el-input v-model="scope.row.quSort" placeholder=""></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="createUser" label="创建人" ></el-table-column>
      <el-table-column prop="createDate" label="创建时间" ></el-table-column>
    </el-table>
  </el-row>
</el-dialog>
<!--问题管理-->

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
      qu_naire_form: {
        quTitle: '',
        quType: ''
      },
      multipleSelection: [],
      questionnaire: {
        id: '',
        quTitle: '',
        quType: '',
        quDescFlag: 0,
        quDesc: '',
        createUser: '',
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
      dataOpts: [],
      leftCheck: [],
      rightCheck: [],
      questAdd: false,
      questSel: false,
      questOptionsAdd: false,
      value4: [],
      tableData: [],
      optionTableData: []
    }
  },
  filters: {
    formatquType (val) {
      if (val === '1') {
        return '接口改造类'
      } else if (val === '2') {
        return '开发实施类'
      } else if (val === '3') {
        return '人员外包类'
      } else if (val === '4') {
        return '业务咨询类'
      } else if (val === '5') {
        return '制度升级类'
      }
    },
    formatquDescFlag (val) {
      if (val) {
        return '是'
      } else {
        return '否'
      }
    },
    formatanswerType (val) {
      let result = ''
      if (val === '1') {
        result = '多选题'
      } else if (val === '2') {
        result = '单选题'
      } else if (val === '3') {
        result = '填空题'
      } else if (val === '4') {
        result = '判断题'
      }
      return result
    },
    formatquDirType (val) {
      return val === '1' ? '题目' : '目录'
    }
  },
  mounted () {
    this.initTableData()
  },
  methods: {
    initTableData () {
      this.$api.questionnaire.getQuestionnaireList(this.formatForm(this.qu_naire_form)).then(res => {
        let result = res.data
        this.tableData = result.data
      })
    },
    saveQuestionnaire (valForm) {
      this.$refs[valForm].validate((valid) => {
        if (valid) {
          this.$api.questionnaire.saveQuestionnaire(this.formatForm(this.questionnaire)).then(res => {
            let result = res.data

            if (result.status === '1') {
              this.$message({
                type: 'success',
                message: '保存数据成功!'
              })
            } else {
              this.$message.error('保存数据失败！')
            }
            this.questAdd = false
            this.initTableData()
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
        let values = []
        this.multipleSelection.forEach((val) => {
          values.push(val.id)
        })
        let param = {qid: values.join(',')}
        this.$api.questionnaire.deleteQuestionnaire(param).then(res => {
          let result = res.data
          if (result.status === '1') {
            this.$message({
              type: 'success',
              message: '删除数据成功!'
            })
            this.initTableData()
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
        { min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
      ]
      if (val) {
        this.questionnaireRules.quDesc = quDescRule
      } else {
        this.questionnaireRules.quDesc = []
      }
    },
    editQuestion () {
      if (this.multipleSelection.length === 1) {
        this.questionnaire = Object.assign({}, this.multipleSelection[0])
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
        this.questionnaire = Object.assign({}, this.multipleSelection[0])
        let param = {quId: this.questionnaire.id}
        this.$api.questionnaire.loadQuestDataList(param).then(res => {
          let result = res.data
          this.dataOpts = result.data.allData
          this.value4 = result.data.checkData
          this.rightCheck = result.data.checkData
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
      param.movedKeys = movedKeys.join(',')
      this.$api.questionnaire.saveQuestDataList(param).then(res => {
        let result = res.data
        if (result.status === '1') {
          this.$message({
            type: 'success',
            message: '保存数据成功!'
          })
          this.questSel = false
          this.questOptions()
        } else {
          this.$message.error('保存数据失败！')
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
    handleShow (index, row) {
      this.$router.push({path: '/qu-4', query: {id: row.id}})
    },
    answerQuest (index, row) {
      this.$router.push({path: '/qu-5', query: {id: row.id}})
    },
    questOptions () {
      if (this.multipleSelection.length === 1) {
        this.questionnaire = Object.assign({}, this.multipleSelection[0])
        let param = {quId: this.questionnaire.id}
        this.$api.questionnaire.getQuestBankList(param).then(res => {
          let result = res.data
          this.optionTableData = result.data
        })
        this.questOptionsAdd = true
      } else {
        this.$message({
          type: 'warning',
          message: '请选择一条数据编辑！'
        })
      }
    },
    saveSort () {
      this.questionnaire = Object.assign({}, this.multipleSelection[0])
      let option = []
      this.optionTableData.forEach((item, index) => {
        let temp = {qbId: item.id, quSort: item.quSort}
        option.push(temp)
      })
      let param = {quId: this.questionnaire.id, option: JSON.stringify(option)}

      this.$api.questionnaire.saveQuestOptionsRel(param).then(res => {
        let result = res.data
        if (result.status === '1') {
          this.$message({
            type: 'success',
            message: '保存数据成功!'
          })
          this.questSel = false
          this.questOptions()
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
<style>
.el-tooltip__popper {
  max-width: 400px;
}
</style>
