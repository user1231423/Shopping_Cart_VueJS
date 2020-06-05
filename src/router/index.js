import Vue from 'vue'
import firebase from "firebase";
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Root from '../views/Root.vue'
import Dashboard from '../views/Dashboard.vue'
import PhotoOwner from '../views/PhotoOwner.vue'
import NotFound from '../views/NotFound.vue'


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
  },
  {
    path: '/Dashboard',
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  },
  {
    path: 'Photo/Owner/:username',
    name: "Photo_OwnerDesc",
    component: PhotoOwner
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next(from);
  } else if (!requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
})

export default router
