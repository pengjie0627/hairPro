import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'
import store from '../store/index'
import SelectRole from '@/components/selectRole/SelectRole.vue'
import ShopAdd from '@/components/shop/ShopAdd.vue'
import ShopRelated from '@/components/shop/ShopRelated.vue'
import Home from '@/components/home/Home.vue'
import ShopList from '@/components/shop/ShopList.vue'
import ShopDtl from '@/components/shop/ShopDtl.vue'
import ShopReport from '@/components/shop/ShopReport.vue'
import EmployList from '@/components/employ/EmployList.vue'
import EmployAdd from '@/components/employ/EmployAdd.vue'
import EmployDtl from '@/components/employ/EmployDtl.vue'
import CustomList from '@/components/customer/CustomList.vue'
import CustomAdd from '@/components/customer/CustomAdd.vue'
import CustomDtl from '@/components/customer/CustomDtl.vue'
import SettingList from '@/components/setting/SettingList.vue'
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
      path: '/selectRole',
      name: 'selectRole',
      component: SelectRole
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/shopList',
          name: 'shopList',
          component: ShopList
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
        },
        {
          path: '/shopDtl',
          name: 'shopDtl',
          component: ShopDtl
        },
        {
          path: '/shopReport',
          name: 'shopReport',
          component: ShopReport
        },
        {
          path: '/employList',
          name: 'employList',
          component: EmployList
        },
        {
          path: '/employAdd',
          name: 'employAdd',
          component: EmployAdd
        },
        {
          path: '/employDtl',
          name: 'employDtl',
          component: EmployDtl
        },
        {
          path: '/settingList',
          name: 'settingList',
          component: SettingList
        },
        {
          path: '/customList',
          name: 'customList',
          component: CustomList
        },
        {
          path: '/customAdd',
          name: 'customAdd',
          component: CustomAdd
        },
        {
          path: '/customDtl',
          name: 'customDtl',
          component: CustomDtl
        },
        {
          path: '/customDtl',
          name: 'customDtl',
          component: CustomDtl
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // if (!store.state.user.user && to.name !== 'login' && to.name !== 'register' && to.name !== 'selectRole') {
  //   next('login')
  // } else {
  //   next()
  // }
  next()
})
export default router
