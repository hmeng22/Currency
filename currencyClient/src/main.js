// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex'
import FastClick from 'fastclick'

Vue.config.productionTip = false

FastClick.attach(document.body)

import 'onsenui'
import VueOnsen from 'vue-onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

import './assets/app.css'

import VueI18n from 'vue-i18n'

Vue.use(VueAxios, axios)
Vue.use(VueOnsen)
Vue.use(VueI18n)

import messages from './i18n'
const i18n = new VueI18n({locale: 'zh-CN', fallbackLocale: 'zh-CN', messages})

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {
    App
  }
})
