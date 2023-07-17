import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import profile from '../views/profile/home'
import securitySetting from "@/views/profile/SecuritySetting";
import PersonalData from "@/views/profile/PersonalData";
import ShippingAddress from "@/views/profile/ShippingAddress";
import order from "@/views/order/order";
import UserLogin from "@/views/register/UserLogin";
import UserRegister from "@/views/register/UserRegister";
import UserForget from "@/views/register/UserForget";
import ShoppingCart from "@/views/ShoppingCart/ShoppingCart"
import home from "@/views/ShoppingCart/home";
import OrderDetails from "@/views/OrderDetails/OrderDetails";
import ApplyAfterSales from "@/views/ApplyAfterSales/ApplyAfterSales";


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: '主页',
  //   redirect: ('/ApplyAfterSales')
  // },
  {
    path:'/ShoppingCart',
    name:'购物车',
    component: ShoppingCart
  },
  {
    path: '/login',
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
    path:'/OrderDetails:order_id',
    name:'订单详情页',
    component: OrderDetails
  },
  {
    path:'/ApplyAfterSales',
    name:'申请售后',
    component: ApplyAfterSales
  },
    // {
    //     path: '/',
    //     name: 'home',
    //     component: HomeView
    // },
    {
        path: '/order',
        name: 'order',
        component: order
    },
    // {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // },
    {
        path: '/',
        name: 'homepage',
        component: () => import('../views/hongpage/homepage.vue'),
        redirect: "/frontpage",
        children: [{
                path: 'frontpage',
                name: 'frontpage',
                component: () => import('../views/hongpage/first_page.vue')
            },
            {
                path: 'goods',
                name: 'goods',
                component: () => import('../views/hongpage/goods.vue')
            },
            {
                path: 'about',
                name: 'about',
                component: () => import('../views/hongpage/about.vue')
            },
            {
                path: 'productdetails',
                name: 'productdetails',
                component: () => import('../views/hongpage/product_details.vue')
            },
            {
                path: 'test',
                name: 'test',
                component: () => import('../views/hongpage/test.vue')
            },
            {
                path: '/account-management',
                name: 'profile',
                component: profile,
                // redirect: "/security_setting",

                children: [{
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
        ]
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router;
