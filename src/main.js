import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'normalize.css/normalize.css' // css样式重置
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/transition.scss'
import '@/styles/element-ui.scss'
import '@/styles/common.scss'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
