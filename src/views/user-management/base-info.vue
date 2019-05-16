<template>
  <div class="base-info">
    <el-form ref="form"  :rules="rules" :model="form" label-width="80px" label-position="top">
      <!-- 基本信息 -->
      <box-wrap>
        <template slot="boxHeaderTitle">
          基本信息
        </template>
        <template slot="boxBodyInner">
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请输入姓名" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="性别" prop="D_SEX">
                <el-radio-group v-model="form.D_SEX">
                  <el-radio v-for="item in D_SEX" :key="item.dictCode" :label="item.dictCode">
                    {{item.dictName}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="电话" prop="phone">
                <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="紧急联系人" prop="contact">
                <el-input v-model="form.contact" placeholder="请输入紧急联系人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="紧急联系方式" prop="contactInfo">
                <el-input v-model="form.contactInfo" placeholder="请输入紧急联系方式"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="学历" prop="education">
                <el-select v-model="form.education" placeholder="请选择学历">
                  <el-option v-for="item in education" :key="item.dictCode" :label="item.dictName"
                    :value="item.dictCode" :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="专业" prop="major">
                <el-select v-model="form.major" multiple placeholder="请选择专业">
                  <el-option v-for="item in major" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"
                    :disabled="item.diasbled">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="全日制" prop="fullTime">
                <el-select v-model="form.fullTime" placeholder="请选择">
                  <el-option v-for="item in fullTime" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="学位" prop="degree">
                <el-select v-model="form.degree" multiple placeholder="请选择学位">
                  <el-option v-for="item in degree" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"
                    :disabled="item.diasbled">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="客户全称" prop="customerFullName">
                <el-input v-model="form.customerFullName" placeholder="客户全称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </box-wrap>
      <!-- 我曾经是融鑫人 -->
      <box-wrap>
        <template slot="boxHeaderTitle">
          <el-checkbox v-model="form.rxChecked">我（曾经）是融鑫人</el-checkbox>
        </template>
        <template slot="boxBodyInner">
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="融鑫邮箱">
                <el-input v-model="form.rxEmail" placeholder="请输入融鑫邮箱" :disabled="!form.rxChecked">
                  <span slot="suffix" class="feed-email">@resoft.css.com.cn</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="身份证号码">
                <el-input v-model="form.idCard" placeholder="请输入身份证号码" :disabled="!form.rxChecked"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </box-wrap>
      <!-- 付款信息 -->
      <!-- <box-wrap>
        <template slot="boxHeaderTitle">
          付款信息
        </template>
        <template slot="boxBodyInner">
          <el-row type="flex" justify="space-between">
            <el-col :span="24">
              <el-form-item label="账户名称">
                <el-input v-model="form.account" placeholder="请输入账户名称">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="24">
              <el-form-item label="账户号">
                <el-input v-model="form.accountNum" placeholder="请输入账户号">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </box-wrap> -->
      <!-- /.付款信息 -->
      <div class="btns-group">
        <el-button type="primary" round @click.native.prevent="submit('form')">确定</el-button>
        <el-button class="gray-btn" round>取消</el-button>
      </div>
    </el-form>
  </div>

</template>
<script>
// 自定义box组件，用到了*具名插槽*
import BoxWrap from '@/components/box.vue'
import {isvalidPhone} from '../../../config/validate.js'
var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入电话号码'))
  } else if (!isvalidPhone(value)) {
    callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
}
export default {
  components: {
    BoxWrap
  },
  data () {
    return {
      // 后台获取字典表后，赋值
      education: [],
      major: [],
      D_SEX: [],
      degree: [],
      fullTime: [],

      // 需要提交的字段
      form: {
        name: '',
        D_SEX: '',
        customerFullName: '融鑫人',
        email: '',
        contact: '',
        contactInfo: '',
        education: '',
        major: [],
        degree: [],
        fullTime: '',
        rxChecked: false,
        rxEmail: '',
        idCard: '',
        account: '',
        accountNum: ''
      },
      rules: {
        name: [
          { required: true, aaaaAAmessage: '请输入姓名', trigger: 'blur' }
        ],
        D_SEX: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        phone: [
          {required: true, trigger: 'blur', validator: validPhone}
        ],
        email: [
          { type: 'email', required: true, message: '请输入正确的email', trigger: 'blur' }
        ],
        contact: [
          { type: 'array', required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactInfo: [
          { type: 'array', required: true, message: '请输入紧急联系人', trigger: 'blur' }
        ],
        education: [
          { required: true, message: '请选择教育', trigger: 'change' }
        ],
        major: [
          { required: true, message: '请输入专业', trigger: 'change' }
        ],
        fullTime: [
          { required: true, message: '请选择是否全日志', trigger: 'change' }
        ],
        degree: [
          { required: true, message: '请选择学位', trigger: 'change' }
        ],
        customerFullName: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        accountNum: [
          { required: true, message: '请填写客户姓名', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // 获取字典表，渲染下拉框
    var dictionaryObj = {
      dict_code: ['major', 'education', 'degree', 'fullTime', 'D_SEX']
    }
    this.$api.dictionary.getDictionaries(dictionaryObj).then(res => {
      let result = res.data
      let dictionary = {}
      result.data.forEach(item => {
        Object.assign(dictionary, item)
      })
      this.major = dictionary.major
      this.education = dictionary.education
      this.degree = dictionary.degree
      this.D_SEX = dictionary.D_SEX
    })
    // 获取基本信息
    this.$api.baseInfo.getuserbyloginname().then(res => {
      var result = res.data
      if (result.status === '1') {
        this.form = result.data || this.form
      } else {
        this.$message('基本信息获取失败')
      }
    })
  },
  methods: {
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // 遍历字段，追加到formData,提交到后台
      var formData = new FormData()
      Object.keys(this.form).forEach(key => {
        formData.append(key, this.form[key])
      })
      this.$api.baseInfo.registerUser(formData).then(res => {
        let result = res.data
        if (result.status === '1') {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '提交失败'
          })
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
  .btns-group {
    text-align: center;
  }

  .feed-email {
    color: #000;
    font-size: 14px;
    padding-right: 50px;
  }

  .base-info /deep/ .el-input__inner {
    border-radius: 0;
    border-top:none;
    border-left:none;
    border-right:none;
  }

  .gray-btn {
    color: #666;
    font-size: 14px;
    border: none;
    background-color: #eaeaea;
  }

  .base-info /deep/ .el-form--label-top .el-form-item__label {
    padding: 0;
  }

  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 15px;
  }

</style>
