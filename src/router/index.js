import Vue from 'vue'
import VueRouter from 'vue-router'

import EnterView from "@/views/EnterView";
import EnterNameView from "@/views/EnterNameView";
import ExerciseView from "@/views/ExerciseView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'StartCodeView',
    component: EnterView,
  },
  {
    path: '/:shortCode',
    name: 'EnterNameView',
    component: EnterNameView,
  },
  {
    path: '/:shortCode/:playerName/exercise',
    name: 'ExerciseView',
    component: ExerciseView
  }
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

router.beforeEach((to,from, next)=>{
  /** next jest argumentem opcjonalnym, wystarczy użyć return https://router.vuejs.org/guide/advanced/navigation-guards.html#optional-third-argument-next */
  next()
})

// router.afterEach((to,from, next)=>{
//
// })

export default router
