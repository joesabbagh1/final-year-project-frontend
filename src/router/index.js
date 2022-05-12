import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginComponent from "../views/login.vue"
import HomeComponent from "../views/home.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: "login"
    }
},
{
    path: "/login",
    name: "login",
    component: LoginComponent
},
{
    path: "/home",
    name: "home",
    component: HomeComponent
},
  
{ 
    path: '*', 
    redirect: '/' 
}

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
