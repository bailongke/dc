import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/pap',
    //  redirect: '/dcqq',
    // name: 'Home',
  },
  {
    path: '/home',
    // name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children:[
      {
        path: '/pap',
        // name: 'ChuQing',
        component: () => import(/* webpackChunkName: "about" */ '../views/Pap.vue')
      },
      {
        path: '/dcqq',
        component: () => import(/* webpackChunkName: "about" */ '../views/Qqun.vue')
      }
    ]
  },
]
const originalPush = VueRouter.prototype.push
    //修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }
    //解决vue路由重复导航错误
    //获取原型对象上的push函数


const router = new VueRouter({
  routes
})

export default router
