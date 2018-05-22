// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/store.js'

import './styles/index.scss'
 
Vue.use(ElementUI)
Vue.config.productionTip = false

// 注册一个全局守卫，所用是在路由跳转前对路由进行判断，防止未登录的用户跳转到其他页面去
router.beforeEach((to,from,next)=>{
  let token = localStorage.getItem('mytoken');
  // 有token 随你跳
  if(token){
    next();
  } else {
    // 没有token，只能跳到login
    if(to.path !== '/login'){
      next({path:'/login'})
    } else {
      next();
    }
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
