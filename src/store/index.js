import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: require('../assets/js/test.json'),
    bind:true,
    form:'',
    admin:false,
    token:'',
    //DC联盟各公司信息详情存放的公司ID
    corpId:'',
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
