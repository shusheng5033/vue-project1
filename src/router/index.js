import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import Home from '@/views/Home'
import welcome from '@/views/welcome/welcome'
import User from '@/views/user/User'
import Jurisdiction from '@/views/jurisdiction/Jurisdiction'
import Roles from '@/views/jurisdiction/Roles'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component:login
    },
    {
      path: '/',
      name: 'Home',
      component:Home,
      redirect: {path:'welcome'},
      children:[
        {
          path:'/welcome',
          name:'welcome',
          component:welcome
        },
        {
          path:'/users',
          name:'User',
          component:User
        },
        {
          path:'/rights',
          name:'Jurisdiction',
          component:Jurisdiction
        },
        {
          path:'/roles',
          name:'Roles',
          component:Roles
        },
      ]
    }
  ]
})
