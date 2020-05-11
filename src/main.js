import Vue from 'vue'
import App from './App'
import router from './router'
import Toast from './components/toast/index'
Vue.use(Toast)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
