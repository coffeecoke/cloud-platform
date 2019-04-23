<template>
  <div class="login-wrapper">
    <div class="login-content clearfix">
      <div class="logo"></div>
      <div class="welcome-img"></div>
      <div class="sys-maggen-box" id="wechat_container">
      </div>
    </div>
    <div class="copy-right">Copyright © 2018 北京中软融鑫计算机系统工程有限公司 版权所有 </div>
  </div>
</template>
<script>
import '@/styles/wx-login.scss'
export default {
  data () {
    return {
      imgSrc: '',
      uuid: null
    }
  },
  activated () {},
  mounted () {
    class WxLogin {
      constructor (a) {
        let c = 'default'
        a.self_redirect === !0 ? c = 'true' : a.self_redirect === !1 && (c = 'false')
        let d = document.createElement('iframe')
        let e = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + a.appid + '&scope=' + a.scope +
            '&redirect_uri=' + a.redirect_uri + '&state=' + a.state + '&login_type=jssdk&self_redirect=' + c
        e += a.style ? '&style=' + a.style : ''
        e += a.href ? '&href=' + a.href : ''
        d.src = e
        d.frameBorder = '0'
        d.allowTransparency = 'true'
        d.scrolling = 'no'
        d.width = '300px'
        d.height = '400px'
        let f = document.getElementById(a.id)
        f.innerHTML = ''
        f.appendChild(d)
        return this
      }
    }

    const wxlogin = new WxLogin({
      self_redirect: false,
      redirect_uri: 'http://cloud.chinaresoft.com/test/%23/register',
      id: 'wechat_container',
      appid: 'wx369cd05ac05c6c1f',
      scope: 'snsapi_login',
      state: '',
      style: 'black'
      // href:  "http://cloud.chinaresoft.com/static/deliver/login/css/wechatstyle.css"
      // href: 'https://qywx.chinaresoft.com/wechatstyle.css'
    })
    console.log(wxlogin)

    // 项目外部化后台生成代码（未使用）
    // this.$api.userInfo.loadQRCode().then(res => {
    //   let result = res.data
    //   console.log(result)
    //   if (result.status === '200' && result.model !== undefined) {
    //     this.uuid = result.model.uuid
    //     this.src = 'data:image/png;base64,' + result.model.imgb
    //     // this.reChkScan()
    //   } else {
    //     this.$message('生成二维码错误')
    //   }
    // })
  },
  methods () {}

}

</script>
<style scoped lang="scss">

</style>
