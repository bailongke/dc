import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import './assets/css/global.css'
Vue.config.productionTip = false
import axios from "axios";
Vue.use(ElementUI);
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
