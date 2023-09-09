import Vue from 'vue'
import Chu from '../views/Chu.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/chu',
    // name: 'ChuQing',
    component: () => import(/* webpackChunkName: "about" */ '../views/Chu.vue')
  },
  {
    path: '/yue',
    // name: 'yuebao',
    component: () => import('../views/Yuebao.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
