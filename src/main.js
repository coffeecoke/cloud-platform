import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// import '@/permission'
import api from './api' // 导入api接口
import 'normalize.css/normalize.css' // css样式重置
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/transition.scss'
import '@/styles/element-ui.scss'
import '@/styles/common.scss'
import 'babel-polyfill' // 解决ie下promise报错
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
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
