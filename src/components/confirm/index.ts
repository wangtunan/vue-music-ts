// import Vue from 'vue'
// import ConfirmConstructor from './index.vue'
// import { Confirm } from '@/types/index'
// let instance: ConfirmConstructor
// const defaultOptions = {
//   message: '',
//   cancelButtonText: '取消',
//   confirmButtonText: '确定',
//   showCancelButton: true,
//   showConfirmButton: true
// }
// const Confirm = (options: Confirm) => {
//   if (typeof options === 'string') {
//     options = {
//       message: options as string
//     }
//   }
//   options = Object.assign({}, defaultOptions, options)
//   for (const key in options) {
//     instance[key] = options[key]
//   }
//   instance = new ConfirmConstructor()
//   instance.$mount()
//   document.body.appendChild(instance.$el)
//   Vue.nextTick(() => {
//     instance.visible = true
//   })
// }

// export default Confirm
