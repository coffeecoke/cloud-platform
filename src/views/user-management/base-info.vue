<template>
  <section class="baseInfo">
    <h4 class="base-text">基本信息</h4>
      <el-row :gutter="100">
          <el-col :span="10" :offset="1">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="名称">
                <el-input class="ipt" placeholder="请输入名称" v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input class="ipt" placeholder="请输入电话" v-model="formLabelAlign.phone"></el-input>
              </el-form-item>
              <el-form-item label="紧急联系人">
                <el-input class="ipt" placeholder="请输入紧急联系人" v-model="formLabelAlign.people"></el-input>
              </el-form-item>
              <el-form-item label="学历">
                <el-select class="ipt" v-model="ruleForm.region" placeholder="请选择学历">
                  <el-option label="本科" value="shanghai"></el-option>
                  <el-option label="专科" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="全日制">
                <el-select class="ipt" v-model="ruleForm.region" placeholder="请选择学历">
                  <el-option label="是" value="shanghai"></el-option>
                  <el-option label="否" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="10" :offset="1">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                  <el-form-item label="性别">
                    <el-radio-group v-model="form.resource">
                      <el-radio label="男"></el-radio>
                      <el-radio label="女"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="邮件">
                    <el-input  class="ipt" placeholder="请输入邮件" v-model="formLabelAlign.email"></el-input>
                  </el-form-item>
                  <el-form-item label="紧急联系方式">
                    <el-input class="ipt" placeholder="请输入紧急联系方式" v-model="formLabelAlign.mode"></el-input>
                  </el-form-item>
                  <el-form-item label="学位">
                    <el-select class="ipt" v-model="ruleForm.region" placeholder="请选择学历">
                      <el-option label="本科" value="shanghai"></el-option>
                      <el-option label="专科" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="专业">
                    <el-select class="ipt" v-model="ruleForm.major" placeholder="请选择专业">
                      <el-option label="是" value="shi"></el-option>
                      <el-option label="否" value="fou"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
          </el-col>
      </el-row>
    <h4 class="base-text"><el-checkbox v-model="checked">我(曾经)是融鑫人</el-checkbox></h4>
    <el-row :gutter="100">
        <el-col :span="10" :offset="1">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="融鑫邮箱">
              <el-input class="ipt" placeholder="请输入名称" v-model="formLabelAlign.rxEmail"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="身份证号码">
              <el-input class="ipt" placeholder="请输入身份证号码" v-model="formLabelAlign.id"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
    </el-row>
    <h4 class="base-text">付款信息</h4>
    <el-row :gutter="100">
        <el-col :span="20" :offset="1">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="账户名称">
              <el-input class="ipt" placeholder="请输入名称" v-model="formLabelAlign.account"></el-input>
            </el-form-item>
            <el-form-item label="账号">
              <el-input class="ipt" placeholder="请输入账号" v-model="formLabelAlign.zh1"></el-input>
            </el-form-item>
            <el-form-item label="账号">
              <el-input class="ipt" placeholder="请输入名称" v-model="formLabelAlign.zh2"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="8">
        <el-button type="primary" round>确定</el-button>
        <el-button type="info" round>取消</el-button>
      </el-col>
    </el-row>
  </section>
</template>
<script>
export default {
  data () {
    return {
      labelPosition: 'top',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      form: {
        resource: ''
      },
      ruleForm: {
        region: '',
        major: ''
      }
    }
  }
}
</script>
<style lang="scss">
.base-text{
  border-left:solid 4px #1973ee;
  padding-left: 10px;
  border-radius: 2px;
}
.el-form-item{
  margin-bottom:12px;
}
.el-form-item__label{
  padding:0!important;
}
.el-form-item__content{
  line-height:30px;
  .ipt{
    width:100%;
    height:30px;
     .el-input__inner {
        border: none;
        height:30px;
        line-height: 30px;
        border-bottom: 1px solid #ccc;
        border-radius: 0px;
        padding:0;
    }
  }
}
</style>
