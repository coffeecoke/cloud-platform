<template>
  <div>
    <div class="name-box" v-show="isShowAllField">
      <div class="mask">
        <div class="mask-right">
          <div class="mask-right-icon" @click="AddBoxHide">
            <i class="fa el-icon-arrow-right"></i>
          </div>
          <div class="mask-right-content">
            <div class="title-box">
              <h4><i class="fa fa-file-text"></i><span>字段信息</span></h4>
              <el-button class="button" @click="submitForm('ruleForm')"><i class="fa fa-save"></i><span>保存</span>
              </el-button>
            </div>
            <div class="content-box" :style='{height:contentBoxHeight}'>
              <div class="form-box">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="字段名称:" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="类型:" prop="type">
                    <el-input v-model="ruleForm.type"></el-input>
                  </el-form-item>
                  <el-form-item label="长度:" prop="length">
                    <el-input v-model="ruleForm.length"></el-input>
                  </el-form-item>
                  <el-form-item label="主键:" prop="majorKey">
                    <el-select v-model="ruleForm.majorKey" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="是否可空:" prop="null">
                    <el-select v-model="ruleForm.null" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="中文名称:" prop="Cname">
                    <el-input v-model="ruleForm.Cname"></el-input>
                  </el-form-item>
                  <el-form-item label="字段说明:" prop="explain">
                    <el-input type="textarea" v-model="ruleForm.explain"></el-input>
                  </el-form-item>
                  <el-form-item label="是否有码值:" prop="code">
                    <el-select v-model="ruleForm.code" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="使用模块:" prop="templ">
                    <el-input type="textarea" v-model="ruleForm.templ"></el-input>
                  </el-form-item>
                  <el-form-item label="使用位置:" prop="position">
                    <el-input type="textarea" v-model="ruleForm.position"></el-input>
                  </el-form-item>
                  <el-form-item label="访谈纪要:" prop="summary">
                    <el-input v-model="ruleForm.summary" @focus="handleFocus('summary','summaryRichText','访谈纪要')">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="业务逻辑:" prop="logic">
                    <el-input v-model="ruleForm.logic" @focus="handleFocus('logic','logicRichText','业务逻辑')">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="备注:" prop="remarks">
                    <el-input v-model="ruleForm.remarks" @focus="handleFocus('remarks','remarksRichText','备注')">
                    </el-input>
                  </el-form-item>

                </el-form>
              </div>
              <div class="table-box">
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column prop="date" label="系统" sortable width="180">
                  </el-table-column>
                  <el-table-column prop="name" label="表" sortable width="180">
                  </el-table-column>
                  <el-table-column prop="address" sortable label="字段">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="800px">
      <div class="editor-container">
        <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE>
        <!-- <UE :defaultMsg=defaultMsg :config=config :id=ue2 ref="ue2"></UE> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
import UE from '@/components/ue/ue'
import $ from 'jquery'
export default {
  props: ['isShowAllField'],
  components: {
    UE
  },
  data () {
    return {
      // tableHeight: '',
      ruleForm: {
        name: '',
        type: '',
        length: '',
        majorKey: '',
        null: '',
        Cname: '',
        explain: '',
        code: '',
        templ: '',
        position: '',
        summary: '',
        summaryRichText: '',
        logic: '',
        logicRichText: '',
        remarks: '',
        remarksRichText: ''
      },
      rules: {
        type: [{
          required: true,
          message: '请选择活动区域',
          trigger: 'blur'
        }],
        majorKey: [{
          required: true,
          message: '请选择活动区域',
          trigger: 'change'
        }],
        null: [{
          required: true,
          message: '请选择活动区域',
          trigger: 'change'
        }],
        Cname: [{
          required: true,
          message: '请选择活动区域',
          trigger: 'blur'
        }]
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市'
      }],
      defaultMsg: '',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      ue1: 'ue1', // 不同编辑器必须不同的id
      dialogVisible: false,
      dialogTitle: '',
      target: '',
      richTarget: ''
    }
  },
  methods: {
    AddBoxHide (index, tag) {
      this.$emit('AddBoxHide', index, tag)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
    },
    // 富文本编辑器
    getUEContent () {
      let content = this.$refs.ue.getUEContent() // 调用子组件方法
      this.$notify({
        title: '获取成功，可在控制台查看！',
        message: content,
        type: 'success'
      })
      this.ruleForm[this.richTarget] = content
    },
    getUEContentTxt () {
      let content = this.$refs.ue.getUEContentTxt() // 调用子组件方法
      this.$notify({
        title: '获取成功，可在控制台查看！',
        message: content,
        type: 'success'
      })
      // 富文本编辑后设置input内容
      this.ruleForm[this.target] = content
    },
    handleFocus (target, richTarget, dialogTitle) {
      this.dialogVisible = true
      this.dialogTitle = dialogTitle
      this.target = target // 需要回显的input
      this.richTarget = richTarget // 需要储存的富文本目标变量
      this.$nextTick(() => { // 为什么要用nextTick
        this.$refs.ue.setContent(this.ruleForm[this.richTarget]) // 设置保存的富文本
      })
    },
    handleSubmit () {
      this.dialogVisible = false
      this.getUEContentTxt()
      this.getUEContent()
    }
  },
  computed: {
    // this.tableHeight = $('body').height() - $('.title-box').height() + 'px'
    // console.log($('.title-box').height())
    // window.onresize = () => {
    //   this.tableHeight = $('body').height() - $('.title-box').height() + 'px'
    //   console.log($('.title-box').height())
    // }

    contentBoxHeight () {
      let contentBoxHeight
      if (this.isShowAllField) {
        this.$nextTick(() => {
          console.log($('.title-box')[0].offsetHeight)
          contentBoxHeight = $('body').height() - $('.title-box').height() + 'px'
        })
      }
      return contentBoxHeight
    }
  }
}

</script>
<style scoped lang="scss">
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;

    .mask-right {
      width: 500px;
      height: 100%;
      background: #fff;
      float: right;

      .mask-right-icon {
        float: left;
        width: 30px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        i {
          color: #3080ee;
          font-weight: bolder;
        }

        &:hover {
          background: #ddd;
        }
      }
    }

    .mask-right-content {
      padding: 0 10px;
      margin-left: 30px;

      .title-box {
        overflow: hidden;
        border-bottom: solid 1px #ccc;
        height:62px;
        h4 {
          float: left;

          span {
            padding-left: 10px;
          }
        }

        .button {
          float: right;
          margin-top: 15px;

          span {
            padding-left: 2px;
          }
        }
      }

      .content-box {
        overflow-y: scroll;
        margin-bottom:20px;
        .text-box {
          font-size: 12px;
          padding: 5px 0;
        }
      }
    }
  }

  .form-box {
    padding: 8px 20px;

    .el-form {
      .el-form-item {
        height: 22px;
      }

    }
  }

  .el-form /deep/ .el-textarea__inner {
    height: 30px;
  }

</style>
