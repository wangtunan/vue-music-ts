import Vue from 'vue'
import ConfirmConstructor from './index.vue'
import { Confirm } from '@/types/index'
let instance: any
const defaultOptions = {
  message: '',
  cancelButtonText: '取消',
  confirmButtonText: '确定',
  showCancelButton: true,
  showConfirmButton: true
}
const Confirm = (options: Confirm) => {
  return new Promise((resolve, reject) => {
    if (typeof options === 'string') {
      options = {
        message: options as string
      }
    }
    instance = new ConfirmConstructor({
      el: document.createElement('div')
    })
    options = Object.assign({}, defaultOptions, options, {
      isProto: true,
      resolve,
      reject
    })
    for (const key in options) {
      instance[key] = options[key]
    }
    instance.$mount()
    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
      instance.visible = true
    })
  })
}

export default Confirm
