import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import './assets/css/global.css'
Vue.config.productionTip = false
import axios from "axios";
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = axios

// axios.defaults.baseURL = "http://qq.tools.dc-eve.com"
axios.defaults.headers["Content-Type"] = "application/json";
// axios.defaults.headers["Authorization"]="Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJhbGwiXSwidXNlclNxdWFkcyI6W3sic3F1YWRJZCI6IjEiLCJzcXVhZE5hbWUiOm51bGwsImF1dGhvcml0eSI6IjEifSx7InNxdWFkSWQiOiIyIiwic3F1YWROYW1lIjpudWxsLCJhdXRob3JpdHkiOiIyIn0seyJzcXVhZElkIjoiMjMiLCJzcXVhZE5hbWUiOm51bGwsImF1dGhvcml0eSI6IjIzIn0seyJzcXVhZElkIjoiMjQiLCJzcXVhZE5hbWUiOm51bGwsImF1dGhvcml0eSI6IjI0In0seyJzcXVhZElkIjoiMjciLCJzcXVhZE5hbWUiOm51bGwsImF1dGhvcml0eSI6IjI3In1dLCJleHAiOjE2OTc2NTI1MjcsImNoYXJhY3RlcklkIjoyMTE0ODI1NzIwLCJqdGkiOiIzZTBhYTg3OC05ZTk0LTQxYzgtOGJiZi02ODIzMTljNjRmZTIiLCJjbGllbnRfaWQiOiJzZWF0LmRjLWV2ZSIsInVzZXJuYW1lIjoiZGVhciBtdW11c2FuIn0.SO4KV75o0qWflPjjgWUZjO68Bu78CaS3Cjnq1VJC3_G362godweD5aiQTBbsSK9lezwZp_p7rXSN_mt_EAs_WkYs4PlTLXpPCuzbP8CBGU1rFSOmEJ2WNvyGd7UOJfSiig2gZg9CY0bBnEUnvu6qzvp5_R7R1ojyW5h28-iyA99Lj9cs3OU4n4n47Up1L4nCiAY624llJPG7rHA9Cbqq8ADyuE6jAdgPKF6uMqHUcDVXP6ArImMatKFHrzvfMZU9KQQMLeUQOz2MAU1PWDUq25K8coWqHV7MbTBQgdx564vPfvIbXFFnrYLYcPnadVzDxDdRJrmkfcpaMosmw-sBIQ"




new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
