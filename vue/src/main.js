// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueSocketio from 'vue-socket.io'
import vuex from 'vuex'
import store from './store'
import CustomFilter from 'filter/filter.js'
import CommonDirective from 'directive/directive.js'
CustomFilter.init()
CommonDirective.init()
Vue.use(vuex);

Vue.use(VueSocketio, 'http://localhost:3006');
Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
