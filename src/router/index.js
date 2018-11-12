import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({  //路由页面，所有的路由全部都是自己配置的，包括mode，重定向，异步加载路由等。
  mode: 'history',   //#是自己通过webpack配置的，是src/components
  routes: [
    {
      path: '/',
      name: 'mainPage',
      redirect: '/employeeList',
      component: () => import('@/views/mainPage'),
      children: [
        {
          path: '/employeeList',
          name: 'employeeList',
          component: () => import('#/employeeList')
        }
      ]
    },
    {
      path: '/newemployee',
      name: 'newemployee',
      component: () => import('@/views/newemployee')
    },
    {
      path:'/editemployee',
      name:'editemployee',
      component: () => import('@/views/editemployee')
    },
    {
      path:'/test',
      name:'test',
      component: () => import('@/views/test')
    },
  {
    path:'/login',
    name:'login',
    component: () => import('@/views/login')
  }]
})
