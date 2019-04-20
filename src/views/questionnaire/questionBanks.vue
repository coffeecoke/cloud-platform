
<template>
<div class="box-table">
<el-form :inline="true" :model="questInfo" >
  <el-form-item label="题目名称">
    <el-input v-model="questInfo.quTitle" placeholder="题目名称"></el-input>
  </el-form-item>
  <el-form-item label="题目类型">
    <el-select v-model="questInfo.quDirType" placeholder="题目类型">
      <el-option label="题目" value="1"></el-option>
      <el-option label="目录" value="2"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="initDataTable">查询</el-button>
  </el-form-item>
</el-form>
<el-row>
  <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" @click="questAdd = true" icon="el-icon-edit">新增</el-button></div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" @click="editQuestion" icon="el-icon-edit">修改</el-button></div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" @click="showOptionPanl" icon="el-icon-document" >添加选项信息</el-button></div></el-col>
  <el-col :span="1"><div class="grid-content bg-purple"><el-button type="primary" @click="delData" icon="el-icon-delete" >删除</el-button></div></el-col>
</el-row>
<el-row>
   <el-table :data="tableData" border @selection-change="handleSelectionChange_question" style="width: 100%">
    <el-table-column  type="selection"  width="55"  align="center"></el-table-column>
    <el-table-column prop="quTitle" label="标题" width="180"></el-table-column>
    <el-table-column prop="quDirType" label="题目类型" width="180" :formatter="getquDirTypeValue"></el-table-column>
    <el-table-column prop="quAnswerType" label="答案类型" width="180"></el-table-column>
    <el-table-column prop="quOpDescFlag" label="是否有详描述" width="180"></el-table-column>
    <el-table-column prop="createUserName" label="创建人" width="160"></el-table-column>
    <el-table-column prop="createDate" label="创建时间" width="170"></el-table-column>
    <el-table-column  label="操作" width="180"></el-table-column>
  </el-table>
</el-row>

<el-row >
  <div class="block">
    <el-pagination background layout="total,prev, pager, next,jumper" :total="1000"></el-pagination>
  </div>
</el-row>
<el-dialog title="新增题目" :visible.sync="questAdd"  center>
<el-form  label-width="120px"  :rules="addQuestionRules" ref="questInfo"  :model="questInfo" >
<el-form-item label="题目名称" prop="quTitle" >
  <el-input v-model="questInfo.quTitle"  placeholder="题目名称" size="medium"  ></el-input>
</el-form-item>
<el-form-item label="题目类型" prop="quDirType" >
    <el-select v-model="questInfo.quDirType" placeholder="题目类型" size="medium">
      <el-option label="题目" value="1"></el-option>
      <el-option label="目录" value="2"></el-option>
    </el-select>
</el-form-item>
<el-form-item label="答案类型" prop="quAnswerType">
    <el-select v-model="questInfo.quAnswerType" placeholder="答案类型" size="medium">
      <el-option label="多选题" value="1"></el-option>
      <el-option label="单选题" value="2"></el-option>
      <el-option label="填空题" value="3"></el-option>
      <el-option label="判断题" value="4"></el-option>
    </el-select>
</el-form-item>
<el-form-item label="是否有详细描述" prop="quOpDescFlag">
  <el-switch v-model="questInfo.quOpDescFlag" @change="switchToggle"  active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
</el-form-item>
<el-form-item label="详细描述" v-show="questInfo.quOpDescFlag" prop="quOpDesc">
  <el-input type="textarea"  :rows="5" v-show="questInfo.quOpDescFlag" placeholder="请输入内容" v-model="questInfo.quOpDesc"></el-input>
</el-form-item>
<el-form-item>
  <el-button type="primary" @click.native.prevent="saveQuestion('questInfo')"  round>保存</el-button>
</el-form-item>
</el-form>
</el-dialog>

<el-dialog title="选项信息" :visible.sync="questOptionsAdd"  ccustom-class="dialog-width" fullscreen center>
  <el-form :inline="true" :model="questOptions" class="demo-form-inline">
    <el-form-item label="选项名称">
      <el-input v-model="questOptions.quTitle" placeholder="选项名称"></el-input>
    </el-form-item>
    <el-form-item label="选项类型">
      <el-select v-model="questOptions.quOpType" placeholder="选项类型" size="medium">
        <el-option label="多选题" value="1"></el-option>
        <el-option label="单选题" value="2"></el-option>
        <el-option label="填空题" value="3"></el-option>
        <el-option label="判断题" value="4"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="initOptionData">查询</el-button>
    </el-form-item>
  </el-form>
  <el-row>
    <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" @click="optionAdd = true" icon="el-icon-edit">新增</el-button></div></el-col>
    <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" @click="editOption" icon="el-icon-edit">修改</el-button></div></el-col>
    <el-col :span="1"><div class="grid-content bg-purple"><el-button type="primary" @click="delData" icon="el-icon-delete" >删除</el-button></div></el-col>
  </el-row>
  <el-row>
   <el-table :data="tableDataOpt" border @selection-change="handleSelectionChange_option" style="width: 100%" :model="questOptions">
    <el-table-column  type="selection"  width="55"  align="center"></el-table-column>
    <el-table-column prop="quTitle" label="标题" width="230"></el-table-column>
    <el-table-column prop="quOpType" label="选项类型" width="230"></el-table-column>
    <el-table-column prop="quOpSign" label="选项符号" width="230"></el-table-column>
    <el-table-column prop="quOpScore" label="选项分值" width="230"></el-table-column>
    <el-table-column prop="quOpOrder" label="顺序号" width="230"></el-table-column>
    <el-table-column prop="quOpDescFlag" label="是否有详细描述" width="230"></el-table-column>
    <el-table-column prop="quOpDesc" label="详细描述" width="200"></el-table-column>
  </el-table>
</el-row>
<el-dialog title="选项" :visible.sync="optionAdd"  append-to-body center>
  <el-form  label-width="80px"  :model="questOptions" :rules="optionRules" ref="optionInfo" >
    <el-form-item label="标题" prop="quTitle">
      <el-input v-model="questOptions.quTitle"  placeholder="请输入内容"></el-input>
    </el-form-item>
    <!--<el-form-item label="选项类型">
      <el-input v-model="qots.quOpType"  placeholder="选项类型"></el-input>
    </el-form-item>-->
    <el-form-item label="选项符号">
      <el-input v-model="questOptions.quOpSign"  placeholder="选项符号"></el-input>
    </el-form-item>
    <el-form-item label="选项分值">
      <el-input-number v-model="questOptions.quOpScore"  :min="0" :max="100" label="选项分值"></el-input-number>
    </el-form-item>
    <el-form-item label="顺序号">
      <el-input-number v-model="questOptions.quOpOrder"  :min="1" :max="10" label="顺序号"></el-input-number>
    </el-form-item>
    <el-form-item label="是否有详细描述">
  <el-switch v-model="questOptions.quOpDescFlag" @change="switchToggleOpt" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
</el-form-item>
<el-form-item label="详细描述" v-show="questOptions.quOpDescFlag" prop="quOpDesc">
  <el-input type="textarea"  :rows="5" v-show="questOptions.quOpDescFlag" placeholder="请输入内容" v-model="questOptions.quOpDesc"></el-input>
</el-form-item>
<el-form-item>
  <el-button type="primary" @click.native.prevent="saveOptions('optionInfo')"  round>保存</el-button>
</el-form-item>
  </el-form>
</el-dialog>
</el-dialog>

</div>
</template>

<script>
export default {
  data () {
    return {
      multipleSelection: [],
      multipleSelOption: [],
      questInfo: {
        id: '',
        quTitle: '',
        quDirType: '',
        quAnswerType: '',
        quOpDescFlag: 0,
        quOpDesc: ''
      },
      addQuestionRules: {
        quTitle: [
          { required: true, message: '请输入题目名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        quDirType: [
          {required: true, message: '请选择题目类型', trigger: 'change'}
        ],
        quAnswerType: [
          {required: true, message: '请选择答案类型', trigger: 'change'}
        ]/* ,
        quOpDesc: [
          {required: this.questInfo.quOpDescFlag, message: '请选择答案类型', trigger: 'blur'}
        ] */
      },
      optionRules: {
        quTitle: [
          { required: true, message: '请输入题目名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      },
      questOptions: {
        id: '',
        quId: '',
        quTitle: '',
        quOpType: '',
        quOpSign: '',
        quOpScore: 0,
        quOpOrder: 1,
        quOpDescFlag: false,
        quOpDesc: ''
      },
      questAdd: false,
      questOptionsAdd: false,
      optionAdd: false,
      value1: false,
      tableData: [
        {
          // 表格数据
          id: '111111',
          quTitle: '用户信息',
          quDirType: '1',
          quAnswerType: '1',
          quOpDescFlag: true,
          quOpDesc: '发生发生发射点发111111111',
          createUserName: 'admin',
          createDate: '2019-4-16'
        },
        {
          // 表格数据
          id: '222222',
          quTitle: '用户信息',
          quDirType: '1',
          quAnswerType: '1',
          quOpDescFlag: true,
          quOpDesc: '发生发生发射点发111111111',
          createUserName: 'admin',
          createDate: '2019-4-16'
        },
        {
          // 表格数据
          id: '333333',
          quTitle: '用户信息',
          quDirType: '2',
          quAnswerType: '2',
          quOpDescFlag: true,
          quOpDesc: '发生发生发射点发111111111',
          createUserName: 'admin',
          createDate: '2019-4-16'
        }
      ],
      tableDataOpt: [
        {
          // 表格数据
          id: '11111111',
          quid: '222222',
          quTitle: '用户信息',
          quOpType: '题目',
          quOpSign: 'A',
          quOpScore: '1',
          quOpOrder: '0',
          quOpDescFlag: true,
          quOpDesc: '详细描述测试123'
        },
        {
          // 表格数据
          id: '11111111',
          quid: '222222',
          quTitle: '用户信息',
          quOpType: '题目',
          quOpSign: 'A',
          quOpScore: '1',
          quOpOrder: '0',
          quOpDescFlag: true,
          quOpDesc: '详细描述测试123'
        },
        {
          // 表格数据
          id: '11111111',
          quid: '222222',
          quTitle: '用户信息',
          quOpType: '题目',
          quOpSign: 'A',
          quOpScore: '1',
          quOpOrder: '0',
          quOpDescFlag: true,
          quOpDesc: '详细描述测试123'
        }
      ]

    }
  },
  mounted () {
    this.initDataTable()
  },
  methods: {
    // 初始化表格数据
    initDataTable () {
      console.log(this.questInfo)
      this.$api.questionBanks.getQuestionBankList(this.questInfo).then(res => {
        console.log(res)
        let result = res.data
        this.tableData = result.data
      })
    },
    // 初始化选项信息列表
    initOptionData () {
      console.log(this.questOptions)
      this.$api.questionBanks.getOptionsList(this.questOptions).then(res => {
        let result = res.data
        this.tableDataOpt = result
      })
    },
    editQuestion () {
      if (this.multipleSelection.length === 1) {
        this.questInfo = this.multipleSelection[0]
        this.questAdd = true
      } else {
        this.$message({
          type: 'warning',
          message: '请选择一条数据编辑！'
        })
      }
    },
    saveQuestion (valForm) {
      console.log(this.questInfo)
      this.$refs[valForm].validate((valid) => {
        if (valid) {
          this.$api.questionBanks.saveQuestionBank(this.questInfo).then(res => {
            let result = res.data
            console.log(result)
            if (result.state === '1') {
              this.$message({
                type: 'success',
                message: '保存数据成功!'
              })
              this.initDataTable()
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
    questDel () {
      console.log('edit')
    },
    delData () {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.questionBanks.deleteQuestionBank(this.questInfo).then(res => {
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
          this.initDataTable()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择数据'
        })
      }
    },
    switchToggle (val) {
      let quOpDescRule = [
        {required: val, message: '请填写详细描述', trigger: 'blur'},
        { min: 1, max: 10, message: '长度在 1 到 200 个字符', trigger: 'blur' }
      ]
      if (val) {
        this.addQuestionRules.quOpDesc = quOpDescRule
      } else {
        this.addQuestionRules.quOpDesc = []
      }
    },
    switchToggleOpt (val) {
      console.log(val)
      let quOpDescRule = [
        {required: val, message: '请填写详细描述', trigger: 'blur'},
        { min: 1, max: 10, message: '长度在 1 到 200 个字符', trigger: 'blur' }
      ]
      if (val) {
        this.optionRules.quOpDesc = quOpDescRule
      } else {
        this.optionRules.quOpDesc = []
      }
    },
    // 问题管理--数据列表选中事件
    handleSelectionChange_question (val) {
      this.multipleSelection = val
    },
    handleSelectionChange_option (val) {
      this.multipleSelOption = val
    },
    showOptionPanl () {
      if (this.multipleSelection.length === 1) {
        this.questInfo = this.multipleSelection[0]
        this.questOptionsAdd = true
        this.initOptionData()
      } else {
        this.$message({
          type: 'warning',
          message: '请选择一条数据编辑！'
        })
      }
    },
    getquDirTypeValue (row, column) {
      var value = row.quDirType
      if (value === '1') {
        return '题目'
      } else {
        return '目录'
      }
    },
    saveOptions (valForm) {
      this.questOptions.quId = this.questInfo.id
      console.log(this.questOptions)
      this.$refs[valForm].validate((valid) => {
        if (valid) {
          this.$api.questionBanks.saveOptions(this.questOptions).then(res => {
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
            this.optionAdd = false
          })
        } else {
          return false
        }
      })
    },
    // 修改选项信息
    editOption () {
      if (this.multipleSelOption.length === 1) {
        this.questOptions = this.multipleSelOption[0]
        this.optionAdd = true
      } else {
        this.$message({
          type: 'warning',
          message: '请选择一条数据编辑！'
        })
      }
    },
    // 删除选项信息
    optionDel () {
      if (this.multipleSelOption.length > 0) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.delOptions.saveOptions(this.questOptions).then(res => {
            let result = res.data
            console.log(result)
            if (result.state === '1') {
              this.$message({
                type: 'success',
                message: '数据删除成功!'
              })
              // 重新加载表格
              this.initOptionData()
            } else {
              this.$message.error('数据删除失败！')
            }
            this.optionAdd = false
          })
        }).catch(() => {
          this.$message.error('数据删除失败！')
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择数据'
        })
      }
    }
  }

}
</script>
<style lang="scss" scoped>

.dialog-width{
min-width: 600rem !important;
}
.el-pagination{
  margin-top:20px;
  text-align: right;
}
.el-input{
  border-top:1px solid #DCDFE6;
  border-left:1px solid #DCDFE6;
  border-right:1px solid #DCDFE6;
}
</style>
