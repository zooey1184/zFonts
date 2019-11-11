import Vue from 'vue'
import App from './App.vue'
import Mask from '@/components/mask/src/mark.vue'
import Toast from '@/components/Toast/src/index.vue'
import plugin from '@/components/mixins/plugin'
import Load from '@/components/Load/src/index.vue'

const mask = plugin(Mask, {
  initOptions: {
    styleContent: {
      top: '35%'
    }
  },
  name: 'mask',
  showName: 'showToast',
  fullClassName: 'mark--full'
})
const loading = plugin(Load, {
  name: 'load',
  showName: 'showLoading',
  fullClassName: 'load',
  typeString: 'title',
  initOption: {}
})
const toast = plugin(Toast, {
  initOptions: {
    position: 'top',
    type: 'none',
    bg: '#414141',
    color: 'rgba(250,100,100,1)',
    isOrigin: false,
    styleContent: {}
  },
  name: 'toast',
  showName: 'showToast',
  fullClassName: 'toast_pane',
  typeStrng: 'msg'
})

Vue.use(mask)
Vue.use(toast)
Vue.use(loading)

Vue.config.productionTip = false

new Vue({
  render (h) {
    return h(App)
  }
}).$mount('#app')
