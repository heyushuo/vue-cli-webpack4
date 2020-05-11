
import Toast from './toast.vue'

export default {
  install(Vue, defaultOpts = {}) {
    const toast = Vue.extend(Toast)
    const vm = new toast().$mount()
    document.body.appendChild(vm.$el)
    Vue.prototype.$toast = function (msg, type) {
      //let thisOpts = {}
      //Object.assign(thisOpts, defaultOpts, opts)
      vm.show(msg, type)
      return vm
    }
  }
}