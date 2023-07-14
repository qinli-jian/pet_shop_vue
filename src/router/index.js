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

Vue.use(VueRouter)

const routes = [
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
    {
        path: '/register',
        name: '注册',
        component: UserRegister
    },
    {
        path: '/login',
        name: '登录',
        component: UserLogin
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router;