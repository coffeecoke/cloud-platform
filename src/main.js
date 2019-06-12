import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios' // http 框架
// import '@/permission' // 路由劫持
import api from './api' // 导入api接口
import 'normalize.css/normalize.css' // css样式重置
import '@/styles/font-awesome.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/transition.scss'
import '@/styles/element-ui.scss'
import '@/styles/common.scss'
import 'babel-polyfill' // 解决ie下promise报错
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// 富文本编辑器
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

Vue.use(ElementUI, { size: 'small' })
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$api = api // 将api挂载到vue的原型上
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
