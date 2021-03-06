import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginComponent from "../views/login.vue"
import RegisterComponent from "../views/register.vue"
import HomeComponent from "../views/home.vue"
import test from "../views/test.vue"

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
    path: "/register",
    name: "register",
    component: RegisterComponent
},
{
    path: "/home",
    name: "home",
    component: HomeComponent
},
{
    path: "/test",
    name: "test",
    component: test
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
