
<template>
<div class="box-table">
<el-form :inline="true" :model="questInfo" class="demo-form-inline">
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
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
<el-row>
  <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" @click="questAdd = true" icon="el-icon-edit">新增</el-button></div></el-col>
  <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" @click="questAdd = true" icon="el-icon-edit">修改</el-button></div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"><el-button type="primary" @click="questOptionsAdd = true" icon="el-icon-document" >添加选项信息</el-button></div></el-col>
  <el-col :span="1"><div class="grid-content bg-purple"><el-button type="primary" @click="delData" icon="el-icon-delete" >删除</el-button></div></el-col>
</el-row>
<el-row>
   <el-table :data="tableData" border style="width: 100%">
    <el-table-column  type="selection"  width="55"  align="center"></el-table-column>
    <el-table-column prop="quTitle" label="标题" width="180"></el-table-column>
    <el-table-column prop="quDirType" label="题目类型" width="180"></el-table-column>
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
<el-dialog title="新增题目" :visible.sync="questAdd" modal="false" center>
<el-form  label-width="80px"  :model="questInfo" >
<el-form-item label="题目名称" prop="quTitle" >
  <el-input v-model="questInfo.quTitle"  placeholder="题目名称" size="medium"  ></el-input>
</el-form-item>
<el-form-item label="题目类型">
    <el-select v-model="questInfo.quDirType" placeholder="题目类型" size="medium">
      <el-option label="题目" value="1"></el-option>
      <el-option label="目录" value="2"></el-option>
    </el-select>
</el-form-item>
<el-form-item label="答案类型">
    <el-select v-model="questInfo.quAnswerType" placeholder="答案类型" size="medium">
      <el-option label="多选题" value="1"></el-option>
      <el-option label="单选题" value="2"></el-option>
      <el-option label="填空题" value="3"></el-option>
      <el-option label="判断题" value="4"></el-option>
    </el-select>
</el-form-item>
<el-form-item label="是否有详细描述">
  <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
</el-form-item>
<el-form-item label="详细描述" v-show="value1">
  <el-input type="textarea"  :rows="5" v-show="value1" placeholder="请输入内容" v-model="textarea"></el-input>
</el-form-item>
<el-form-item>
  <el-button type="primary" @click="questAdd = false"  round>保存</el-button>
</el-form-item>
</el-form>
</el-dialog>

<el-dialog title="选项信息" :visible.sync="questOptionsAdd"  fullscreen="true" ccustom-class="dialog-width" center>
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
      <el-button type="primary" @click="onSubmit1">查询</el-button>
    </el-form-item>
  </el-form>
  <el-row>
    <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" @click="optionAdd = true" icon="el-icon-edit">新增</el-button></div></el-col>
    <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" @click="optionAdd = true" icon="el-icon-edit">修改</el-button></div></el-col>
    <el-col :span="1"><div class="grid-content bg-purple"><el-button type="primary" @click="optionDel" icon="el-icon-delete" >删除</el-button></div></el-col>
  </el-row>
  <el-row>
   <el-table :data="tableDataOpt" border style="width: 100%">
    <el-table-column  type="selection"  width="55"  align="center"></el-table-column>
    <el-table-column prop="quTitle" label="标题" width="230"></el-table-column>
    <el-table-column prop="quOpType" label="选项类型" width="230"></el-table-column>
    <el-table-column prop="quOpSign" label="选项符号" width="230"></el-table-column>
    <el-table-column prop="quOpScore" label="选项分值" width="230"></el-table-column>
    <el-table-column prop="quOpOrder" label="顺序号" width="230"></el-table-column>
    <el-table-column prop="quOpDescFlag" label="是否有详细描述" width="230"></el-table-column>
    <el-table-column prop="quOpdesc" label="详细描述" width="200"></el-table-column>
  </el-table>
</el-row>
<el-dialog title="选项" :visible.sync="optionAdd"  append-to-body center>
  <el-form  label-width="80px"  :model="qots" >
    <el-form-item label="标题">
      <el-input v-model="qots.quTitle"  placeholder="请输入内容"></el-input>
    </el-form-item>
    <!--<el-form-item label="选项类型">
      <el-input v-model="qots.quOpType"  placeholder="选项类型"></el-input>
    </el-form-item>-->
    <el-form-item label="选项符号">
      <el-input v-model="qots.quOpSign"  placeholder="选项符号"></el-input>
    </el-form-item>
    <el-form-item label="选项分值">
      <el-input-number v-model="qots.quOpScore" @change="handleChange" :min="0" :max="100" label="选项分值"></el-input-number>
    </el-form-item>
    <el-form-item label="顺序号">
      <el-input-number v-model="qots.quOpOrder" @change="handleChange" :min="1" :max="10" label="顺序号"></el-input-number>
    </el-form-item>
    <el-form-item label="是否有详细描述">
  <el-switch v-model="qots.quOpDescFlag" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
</el-form-item>
<el-form-item label="详细描述" v-show="qots.quOpDescFlag">
  <el-input type="textarea"  :rows="5" v-show="qots.quOpDescFlag" placeholder="请输入内容" v-model="qots.quOpDesc"></el-input>
</el-form-item>
<el-form-item>
  <el-button type="primary" @click="optionAdd = false"  round>保存</el-button>
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
      questInfo: {
        quTitle: '',
        quDirType: '',
        quAnswerType: ''
      },
      questOptions: {
        quTitle: '',
        quOpType: ''
      },
      qots: {
        quTitle: '',
        quOpType: '',
        quOpSign: '',
        quOpScore: 0,
        quOpOrder: 1,
        quOpDescFlag: 0,
        quOpDesc: ''
      },
      questAdd: false,
      questOptionsAdd: false,
      optionAdd: false,
      value1: false,
      tableData: [
        {
          // 表格数据
          quTitle: '用户信息',
          quDirType: '题目',
          quAnswerType: '单选',
          quOpDescFlag: '是',
          quOpDesc: '发生发生发射点发111111111',
          createUserName: 'admin',
          createDate: '2019-4-16'
        },
        {
          // 表格数据
          quTitle: '用户信息',
          quDirType: '题目',
          quAnswerType: '单选',
          quOpDescFlag: '是',
          quOpDesc: '发生发生发射点发111111111',
          createUserName: 'admin',
          createDate: '2019-4-16'
        },
        {
          // 表格数据
          quTitle: '用户信息',
          quDirType: '题目',
          quAnswerType: '单选',
          quOpDescFlag: '是',
          quOpDesc: '发生发生发射点发111111111',
          createUserName: 'admin',
          createDate: '2019-4-16'
        }
      ],
      tableDataOpt: [
        {
          // 表格数据
          quTitle: '用户信息',
          quOpType: '题目',
          quOpSign: 'A',
          quOpScore: '1',
          quOpOrder: '0',
          quOpDescFlag: '是',
          quOpdesc: '详细描述测试123'
        },
        {
          // 表格数据
          quTitle: '用户信息',
          quOpType: '题目',
          quOpSign: 'A',
          quOpScore: '1',
          quOpOrder: '0',
          quOpDescFlag: '是',
          quOpdesc: '详细描述测试123'
        },
        {
          // 表格数据
          quTitle: '用户信息',
          quOpType: '题目',
          quOpSign: 'A',
          quOpScore: '1',
          quOpOrder: '0',
          quOpDescFlag: '是',
          quOpdesc: '详细描述测试123'
        }
      ]

    }
  },
  methods: {
    onSubmit () {
      console.log('submit')
    },
    onSubmit1 () {
      console.log('submit1')
    },
    /** questAdd () {
      console.log('add')
    }, */
    questDel () {
      console.log('edit')
    },
    delData () {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.input10{
 .el-input__inner {
      height: 40px;
      width: 200px;
      border-top: 1px;
      border-left: 1px;
      border-right: 1px;
      border-bottom: 1px;
    }
}
.dialog-width{
min-width: 600rem !important;
}
.el-pagination{
  margin-top:20px;
  text-align: right;
}
</style>
