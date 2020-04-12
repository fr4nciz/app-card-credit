import Vue from 'vue'
import App from './App';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueTheMask from 'vue-the-mask'

import './assets/scss/custom.scss'



// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(BootstrapVueIcons)

Vue.use(VueTheMask)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
