<template>
  <div class="question-wrapper">
    <el-row :span="24"><div class="grid-content bg-purple-dark">{{questInfo.quTitle}}</div></el-row>
    <el-row :span="24"></el-row>
    <el-row :gutter="20">
      <el-col :span="15" :offset="5"><div class="grid-content bg-purple">
        <el-input
      type="textarea"
      autosize
      placeholder=""
      :readonly="true"
      class="quDesc"
      resize='none'
      v-model="questInfo.quDesc">
    </el-input>
        </div></el-col>
    </el-row>
    <el-row :span="24" :offset="10" class="question-list">
    <p v-if="option.length == 0" style="margin: 10px 0">当前问卷没有数据</p>
    <el-row  :gutter="24"  align="top" v-for="(item,index) in option" :key="item.id" class="question-item">
      <el-col :span="16" :offset="4">
      <div class="question-title">
        <h4>{{ index + 1 }}:{{item.quTitle}}</h4>
      </div>
      <div class="question-options">
        <div v-if="item.quDirType === '1'">
          <!--题目-->
          <div v-if="item.quAnswerType === '1'">
            <!--单选-->
            <el-radio-group class="raidoGroup"  v-model="item.selectContent" >
              <el-radio :id="itemChild.id" v-model="item.selectContent" v-for="itemChild in item.qoList" :key="itemChild.id" :label="itemChild.id">{{itemChild.quTitle}}&nbsp;&nbsp;&nbsp;&nbsp;({{itemChild.quOpScore}}分)</el-radio>
            </el-radio-group>
          </div>
          <div v-if="item.quAnswerType === '2'">
            <!--多选-->
              <el-checkbox-group v-model="item.selectMultipleContent">
                <el-checkbox  :label="itemChild.id" v-for="itemChild in item.qoList" :key="itemChild.id">{{itemChild.quTitle}}&nbsp;&nbsp;&nbsp;&nbsp;({{itemChild.quOpScore}}分)
                </el-checkbox>
              </el-checkbox-group>
          </div>
          <div v-if="item.quAnswerType === '3'">
            <!--备注输入框-->
            <el-input v-model="item.remark" :id="item.id" placeholder="请输入"></el-input>
          </div>
        </div>
        <div v-if="item.quDirType === '2'">
          <!--目录-->
        </div>
        <div v-if="item.quOpDescFlag === true" class="bottomInput">
          <el-input v-model="item.remark" :id="item.id"  :placeholder="item.quOpDesc"></el-input>
        </div>
      </div>
      </el-col>
    </el-row>
  </el-row>

  </div>
</template>

<script>
export default {
  name: 'questTmp',
  data () {
    return {
      state: ''
    }
  },
  props: ['questInfo', 'option'],
  methods: {
    subData () {

    }
  }
}
</script>

<style scoped>
  .question-list {
    padding: 30px 0;
    overflow: visible;
  }

  .checkbox-list label {
    display: block;
  }

  .question-options {
    padding: 5px 0;
    display:block;
    float:clear;
  }

  .option-item {
    margin: 5px 0;
  }

  .question-desc {
    padding: 5px 0;
  }

  .question-action {
    display: none;
    color: #a9afb2;
  }

  .question-item {
    padding: 20px 0;
    min-width: 300px;
  }

  .question-btns {
    margin-top: 20px;
  }

  .option-action {
    display: none;
    margin-left: 100px;
    padding: 0 10px;
    text-align: right;
    color: #a9afb2;
  }

  .option-action:hover {
    color: #018fe5;
  }

  .option-item:hover .option-action {
    display: inline-block;
    cursor: pointer;
  }

  .el-pagination{
    margin-top:20px;
    text-align: right;
  }
  .el-transfer{
    height: 300px;
  }
  .bg-purple-dark {
    font-size:30px;
  }
  .bg-purple /deep/ .el-textarea__inner{
    font-size:15px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 46px;
    text-align: center;
  }
  .quDesc /deep/ .el-textarea__inner{
    border: none;
  }
  .question-title {
    display:block;
    float:clear;
  }
  /deep/ .el-radio {
    width: 100%;
    margin-top: 20px;
  }
  /deep/ .el-checkbox {
    width: 100%;
    margin-top: 20px;
  }
  .bottomInput{
    margin-top: 20px;
  }

</style>
