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
              <el-form-item label="活动名称">
                <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item v-model="form.sex" label="性别">
                <el-radio-group v-model="form.sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
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
                <el-select v-model="form.education.value" placeholder="请选择学历">
                  <el-option v-for="item in form.education.options" :key="item.label" :label="item.label"
                    :value="item.label" :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="专业">
                <el-select v-model="form.profession.value" multiple placeholder="请选择专业">
                  <el-option v-for="item in form.profession.options" :key="item.label" :label="item.label"
                    :value="item.label" :disabled="item.diasbled">
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
          <el-row  type="flex" justify="space-between">
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
        <el-button type="primary" round @click="submit('form')">确定</el-button>
        <el-button class="gray-btn" round>取消</el-button>
      </div>
    </el-form>
  </div>

</template>
<script>
// 自定义box组件，用到了*具名插槽*
import BoxWrap from '@/components/box.vue'
import { getuserbylognname } from '@/api/base-info'
export default {
  components: {
    BoxWrap
  },
  data () {
    return {
      form: {
        name: '',
        sex: '男',
        email: '',
        contact: '',
        contactInfo: '',
        education: {
          value: '',
          options: [{
            label: '博士生'
          },
          {
            label: '研究生'
          },
          {
            label: '本科'
          },
          {
            label: '专科'
          }
          ]
        },
        profession: {
          value: '计算机科学',
          options: [{
            label: '计算机科学'
          },
          {
            label: '金融'
          },
          {
            label: '数学'
          }
          ]
        },
        rxChecked: false,
        rxEmail: '',
        idCard: '',
        account: '',
        accountNum: '7438947837483728947324'

      }
    }
  },
  created () {
    getuserbylognname().then(function (res) {
      this.form = res
    })
  },
  methods: {
    submit (formName) {
      // var formData = new formData()
    }
  }
}

</script>
<style lang="scss" scoped>
.btns-group {
  text-align: center;
}
.feed-email {
  color:#000;
  font-size:14px;
  padding-right:50px;
}
.gray-btn {
  color:#666;
  font-size:14px;
  border:none;
  background-color:#eaeaea;
}
</style>
