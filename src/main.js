import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faPen, faUndo, faTrash, faPlay, faPause, faStepForward, faList, faVolumeUp, faChartBar, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import './style/app.styl'

library.add(faCheck, faPen, faUndo, faTrash, faPlay, faPause, faStepForward, faList, faVolumeUp, faChartBar, faChevronLeft, faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueSweetalert2)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
