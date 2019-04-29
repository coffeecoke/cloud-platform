// 程序入口文件，@是webpack配置简洁路径
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios' // http 框架
import '@/permission' // 路由劫持
import api from './api' // 导入api接口
import 'normalize.css/normalize.css' // css样式重置
import '@/styles/font-awesome.css' // 奥森字体
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/transition.scss' // 路由切换效果
import '@/styles/element-ui.scss'
import '@/styles/common.scss'
import 'babel-polyfill' // 解决ie下promise不兼容报错
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
Vue.use(ElementUI, { size: 'small' })
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$api = api // 将api挂载到vue的原型上，方便调用，不用每个页面import

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
