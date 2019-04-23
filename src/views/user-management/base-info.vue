<template>
  <div class="base-info">
    <el-form ref="form" :model="form" label-width="80px" label-position="top">
      <!-- 基本信息 -->
      <box-wrap>
        <template slot="boxHeaderTitle">
          基本信息
        </template>
        <template slot="boxBodyInner">
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="姓名">
                <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="性别">
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
              <el-form-item label="电话">
                <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="邮箱">
                <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="紧急联系人">
                <el-input v-model="form.contact" placeholder="请输入紧急联系人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="紧急联系方式">
                <el-input v-model="form.contactInfo" placeholder="请输入紧急联系方式"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="学历">
                <el-select v-model="form.education" placeholder="请选择学历">
                  <el-option v-for="item in education" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="专业">
                <el-select v-model="form.major" multiple placeholder="请选择专业">
                  <el-option v-for="item in major" :key="item.dictCode" :label="item.dictName"
                    :value="item.dictCode" :disabled="item.diasbled">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="全日制">
                <el-select v-model="form.fullTime" placeholder="请选择">
                  <el-option v-for="item in fullTime" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"
                    :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="学位">
                <el-select v-model="form.degree" multiple placeholder="请选择学位">
                  <el-option v-for="item in degree" :key="item.dictCode" :label="item.dictName"
                    :value="item.dictCode" :disabled="item.diasbled">
                  </el-option>
                </el-select>
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
      <box-wrap>
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
      </box-wrap>
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
export default {
  components: {
    BoxWrap
  },
  data () {
    return {
      education: [],
      major: [],
      D_SEX: [],
      degree: [
        {
          dictCode: 1,
          dictName: '硕士'
        },
        {
          dictCode: 0,
          dictName: 'MBA'
        }
      ],
      fullTime: [
        {
          dictCode: '1',
          dictName: '全日制'
        },
        {
          dictCode: '2',
          dictName: '非全日制'
        }
      ],
      form: {
        name: '',
        D_SEX: '',
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
      }
    }
  },
  mounted () {
    // 获取字典
    var obj = {
      dict_code: [ 'major', 'education', 'degree', 'fullTime', 'D_SEX' ]
    }
    this.$api.dictionary.getDictionaries(obj).then(res => {
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
      var formData = new FormData()
      Object.keys(this.form).forEach(key => {
        formData.append(key, this.form[key])
      })
      this.$api.baseInfo.registerUser(formData).then(res => {
        let result = res.data
        if (result.status === '1') {
          this.$message('提交成功')
        } else {
          this.$message('提交失败')
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

  .gray-btn {
    color: #666;
    font-size: 14px;
    border: none;
    background-color: #eaeaea;
  }

  .base-info /deep/ .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom:6px;
  }
</style>
