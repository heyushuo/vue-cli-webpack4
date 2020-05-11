import Vue from 'vue'
import App from './App'
import router from './router'
import Toast from './components/toast/index'
import Announce from './components/announce/index'
Vue.use(Toast)
Vue.use(Announce)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
