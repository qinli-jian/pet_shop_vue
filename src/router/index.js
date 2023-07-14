import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import my from '../views/my/home'
import securitySetting from "@/views/my/SecuritySetting";
import PersonalData from "@/views/my/PersonalData";
import ShippingAddress from "@/views/my/ShippingAddress";
import order from "@/views/order/order";
import UserLogin from "@/views/register/UserLogin";
import UserRegister from "@/views/register/UserRegister";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/order',
        name: 'order',
        component: order
    },
    {
        path: '/account-management',
        name: 'my',
        component: my,
        children: [
            {
                path: '/account-management/security-setting',
                name: 'security-setting',
                component: securitySetting
            },
            {
                path: '/account-management/personal-data',
                name: 'personal-data',
                component: PersonalData
            },
            {
                path: '/account-management/shipping-address',
                name: 'shipping-address',
                component: ShippingAddress
            }

        ]
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  {
    path: '/',
    name: '主页',
    redirect: ('/register')
  },
  {
    path: '/UserLogin',
    name: '登陆',
    component: UserLogin
  },
  {
    path: '/register',
    name:'注册',
    component: UserRegister
  }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
