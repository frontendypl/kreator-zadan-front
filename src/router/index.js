import Vue from 'vue'
import VueRouter from 'vue-router'

import EnterView from "@/views/EnterView";
import NameView from "@/views/NameView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'StartCodeView',
    component: EnterView,
  },
  {
    path: '/:listId',
    name: 'StartCodeView',
    component: NameView,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
