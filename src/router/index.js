import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import Home from '@/views/Home'
import welcome from '@/views/welcome/welcome'

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
        }
      ]
    }
  ]
})
