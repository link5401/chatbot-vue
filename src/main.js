// import Vuetify from 'vuetify'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
// new Vue({
//   el: '#app',
//   Router,
//   vuetify,
//   template: '<router-view/>',

//   components: { App }
// }).$mount("#mounting");
