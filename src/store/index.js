import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: require('../assets/js/test.json'),
    bind:true,
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
