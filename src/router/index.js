import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from "@/views/register/UserLogin";
import UserRegister from "@/views/register/UserRegister";


Vue.use(VueRouter)

const routes = [
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
