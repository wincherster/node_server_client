import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
      children:[
        {
          path: '/',
          name: 'data',
          component: () => import(/* webpackChunkName: "about" */ './views/Index.vue'),
        },
        {
          path: '/data',
          name: 'data',
          component: () => import(/* webpackChunkName: "about" */ './views/DataBoard.vue'),
        },
        {
          path: '/table',
          name: 'data',
          component: () => import(/* webpackChunkName: "about" */ './views/Table.vue'),
        },
        {
          path: '/other',
          name: 'data',
          component: () => import(/* webpackChunkName: "about" */ './views/Other.vue'),
        }
      ]
    }
  ]
})
