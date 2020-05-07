import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Root from '../views/Root.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Root',
    component: Root
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
