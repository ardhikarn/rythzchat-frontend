import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store/index'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation'
import { ValidationProvider, extend, configure } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import './assets/css/style.css'
import './GComponents.js'
import InfiniteLoading from 'vue-infinite-loading'

Vue.use(InfiniteLoading)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAivTDdKuPoJ18KqYo5NZ1OY8cIUqgv90Y',
    libraries: 'places'
  }
})
Vue.use(VueGeolocation)

// VEE-VALIDATE
extend('required', {
  ...required,
  message: 'This field is required'
})
extend('email', {
  ...email,
  message: 'This field must be a valid email'
})
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})
Vue.component('ValidationProvider', ValidationProvider)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
