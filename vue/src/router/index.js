import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'
import store from '../store/index'
import Home from '@/components/home/Home.vue'
import ShopAdd from '@/components/shop/ShopAdd.vue'
import ShopRelated from '@/components/shop/ShopRelated.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/shopAdd',
      name: 'shopAdd',
      component: ShopAdd
    },
    {
      path: '/relatedShop',
      name: 'relatedShop',
      component: ShopRelated
    }
  ]
})
router.beforeEach((to, from, next) => {
  // if (!store.state.user.user && to.name !== 'login' && to.name !== 'register' && to.name !== 'home') {
  //   next('login')
  // } else {
  //   next()
  // }
  next()
})
export default router
