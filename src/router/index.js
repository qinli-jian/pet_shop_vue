import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from "@/views/register/UserLogin";
import UserRegister from "@/views/register/UserRegister";


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'homepage',
    component:()=>import('../views/hongpage/homepage.vue'),
    redirect:"/frontpage",
    children:[
      {path:'frontpage',name:'frontpage',component:()=>import('../views/hongpage/first_page.vue')},
      {path:'goods',name:'goods',component:()=>import('../views/hongpage/goods.vue')},
      {path:'about',name:'about',component:()=>import('../views/hongpage/about.vue')},
      {path: 'productdetails',name:'productdetails',component:()=>import('../views/hongpage/product_details.vue')},
      {path: 'test',name:'test',component:()=>import('../views/hongpage/test.vue')}
    ]
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
