import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'homepage',
    component:()=>import('../views/hongpage/homepage.vue'),
    redirect:"/frontpage",
    children:[
      {path:'frontpage',name:'frontpage',component:()=>import('../views/hongpage/firstPage.vue')},
      {path:'goods',name:'goods',component:()=>import('../views/hongpage/goods.vue')},
      {path:'about',name:'about',component:()=>import('../views/hongpage/about.vue')}
    ]
  },
  // {
  //   path:'/',
  //   redirect:"/page/frontpage"
  // }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
