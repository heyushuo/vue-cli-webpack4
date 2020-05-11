
import Announce from './announce.vue'

export default {
  install(Vue) {
    const announce = Vue.extend(Announce)
    const vm = new announce().$mount()
    document.body.appendChild(vm.$el)
  }
}