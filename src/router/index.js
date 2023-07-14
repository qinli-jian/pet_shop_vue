import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from "@/views/register/UserLogin";
import UserRegister from "@/views/register/UserRegister";
import UserForget from "@/views/register/UserForget";
import ShoppingCart from "@/views/ShoppingCart/ShoppingCart"
import home from "@/views/ShoppingCart/home";
import OrderDetails from "@/views/OrderDetails/OrderDetails";
import ApplyAfterSales from "@/views/ApplyAfterSales/ApplyAfterSales";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '主页',
    redirect: ('/ApplyAfterSales')
  },
  {
    path:'/ShoppingCart',
    name:'购物车',
    component: ShoppingCart
  },
  {
    path: '/UserLogin',
    name: '登陆',
    component: UserLogin
  },
  {
    path: '/UserRegister',
    name:'注册',
    component: UserRegister
  },
  {
    path:'/UserForget',
    name: '忘记密码',
    component: UserForget
  },
  {
    path:'/home',
    name:'jjj',
    component: home
  },
  {
    path:'/OrderDetails',
    name:'订单详情页',
    component: OrderDetails
  },
  {
    path:'/ApplyAfterSales',
    name:'申请售后',
    component: ApplyAfterSales
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
