<template>
<!-- 微信扫码后的中转页面 -->
  <div class="login-wrapper" v-if="isShowRegister">
    <div class="login-content clearfix">
      <div class="wx-logo"></div>
      <div class="welcome-img"></div>
      <div class="sys-maggen-box show">
        <div class="in-certification" v-if='isShowInCert'>
          <div class="in-certification_success">
            <div class="notice-icon"><i class="el-icon-success"></i></div>
             <p>审核中，请等待审核结束~</p>
             <p>联系电话：18410880234</p>
          </div>
          <div class="back-wxCodePage" @click="toWxcodePage"><i class="el-icon-back" ></i> 返回扫码页 </div>
        </div>
        <div class="in-certification" v-if='isShowError'>
          <div class="in-certification_fail">
            <div class="notice-icon"><i class="el-icon-error"></i></div>
             <p>审核失败</p>
             <p>联系电话：18410880234</p>
          </div>
          <div class="back-wxCodePage" @click="toWxcodePage"><i class="el-icon-back" ></i> 返回扫码页 </div>
        </div>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" v-if="isShowForm" label-position="left" label-width="0px"
          class="demo-ruleForm login-container">
          <div class="identity-proving-text"><img :src="formTitleImg" alt=""></div>
          <el-form-item prop="userOrgNm">
            <el-input type="text" v-model="ruleForm2.userOrgNm" auto-complete="off" placeholder="请输入您的机构名称"></el-input>
          </el-form-item>
          <el-form-item prop="userName">
            <el-input type="text" v-model="ruleForm2.userName" auto-complete="off" placeholder="请输入您的姓名"></el-input>
          </el-form-item>
          <el-form-item prop="userPhone">
            <el-input type="text" v-model="ruleForm2.userPhone" auto-complete="off" placeholder="请输入您的手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="userEmail">
            <el-input type="text" v-model="ruleForm2.userEmail" auto-complete="off" placeholder="请输入您的邮箱"></el-input>
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="copy-right">Copyright © 2018 北京中软融鑫计算机系统工程有限公司 版权所有 </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      logining: false,
      isShowRegister: false, // 是否显示主页面内容
      isShowForm: false, // 是否显示表单
      isShowInCert: false, // 是否显示审核中
      isShowError: false, // 是否显示审核失败
      formTitleImg: require('@/assets/imgs/identity-proving.png'),
      ruleForm2: {
        userOrgNm: '',
        userName: '',
        userPhone: '',
        userEmail: ''
      },
      rules2: {
        userOrgNm: [
          { required: true, message: '请输入您的机构名称', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入您的姓名', trigger: 'blur' }
        ],
        userPhone: [
          { required: true, message: '请输入您的手机号码', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        userEmail: [
          { required: true, message: '请输入您的邮箱地址', trigger: 'blur' },
          { pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '请输入正确的邮箱地址', trigger: 'blur' }

        ]

      }
    }
  },
  activated () {},
  mounted () {
    let wxCode = window.location.hash.split('&')[0].split('=')[1] // 从地址中截取到微信code
    localStorage.setItem('wxCode', wxCode)
    this.$api.userInfo.submitWxCode({wxCode: wxCode}).then(res => { // 把code传给后台获取token
      let result = res.data
      let { status, code } = result
      let { unionID } = result.data
      localStorage.setItem('unionID', unionID)
      // 新用户转到认证
      if (status === '1' && code === '1205') {
        this.isShowRegister = true // 显示认证页面div
        this.isShowForm = true // 显示表单
        this.isShowInCert = false
        // 认证中
      } else if (status === '1' && code === '1206') {
        this.isShowRegister = true
        this.isShowForm = false
        this.isShowInCert = true // 显示提示正在审核中
        this.isShowError = false

        // 老用户扫码直接登录成功
      } else if (status === '1' && code === '200') {
        this.isShowRegister = false // 用户已存在，扫码成功后直接跳转到首页，不需要显示注册页div
        let { token, userName } = result
        let { loginName } = result.data
        localStorage.setItem('token', token)
        localStorage.setItem('userName', userName)
        localStorage.setItem('loginName', loginName)
        this.$router.push({ path: '/' })
      }
    })
  },
  methods: {
    handleSubmit2 () {
      this.$refs.ruleForm2.validate((valid) => {
        let unionID = localStorage.getItem('unionID')
        if (valid) {
          this.logining = true
          var userInfo = {
            unionID: unionID,
            userOrgNm: this.ruleForm2.userOrgNm,
            userName: this.ruleForm2.userName,
            userPhone: this.ruleForm2.userPhone,
            userEmail: this.ruleForm2.userEmail
          }
          this.$api.userInfo.saveWechatInfo(userInfo).then(res => {
            let result = res.data
            console.log('提交注册信息~')
            console.log(result)
            this.logining = false
            let { status } = result
            if (status === '1') {
              this.$message({
                message: '提交成功,请等待审核~',
                type: 'success'
              })
              this.$router.push({
                path: '/wxCodePage'
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '缺少unionID'
          })
          return false
        }
      })
    },
    toWxcodePage () {
      this.$router.push({
        path: '/wxCodePage'
      })
    }
  }
}
</script>
<style scope src="../../styles/wx-login.scss">
</style>

<style scoped lang="scss">

  /* css */
  .el-form {
    padding: 0 20px;
  }
  .identity-proving-text {
    text-align: center;
    padding:20px 0;
  }
  .el-button {
    display: block;
    height: 40px;
    width: 100%;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: none;
    outline: none;
    background: #3e6ef6;
    background: -moz-linear-gradient(left, #3e6ef6 0%, #20bffe 100%);
    background: -webkit-linear-gradient(left, #3e6ef6 0%,#20bffe 100%);
    background: linear-gradient(to right, #3e6ef6 0%,#20bffe 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3e6ef6', endColorstr='#20bffe',GradientType=0 );
    font-size: 18px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  .in-certification {
    color:#999;
    font-size:20px;
    padding:20px;
    .in-certification_success {
      .notice-icon {
         color:#67c23a;
        font-size:120px;;
        text-align: center
      }
      p {
        text-align: center;
        color:#666;
      }
    }
    .in-certification_fail {
      .notice-icon {
         color:#f56c6c;
        font-size:120px;;
        text-align: center
      }
      p {
        text-align: center;
        color:#666;
      }
    }
  }
  .back-wxCodePage {
    color:#409eff;
    font-size:14px;
    text-align: right;
    padding-right:20px;
    cursor: pointer;
  }
</style>
