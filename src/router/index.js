import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import NewPassword from '@/views/auth/NewPassword.vue'
import SuccessActivate from '@/views/auth/SuccessActivate.vue'
import ProfileUser from '@/views/ProfileUser.vue'

import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresVisitor: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPasforgotpassword',
    component: ForgotPassword,
    meta: { requiresVisitor: true }
  },
  {
    path: '/new-password',
    name: 'NewPassword',
    component: NewPassword,
    meta: { requiresVisitor: true }
  },
  {
    path: '/activation-account',
    name: 'SuccessActivate',
    component: SuccessActivate,
    meta: { requiresVisitor: true }
  },
  {
    path: '/profile-user',
    name: 'ProfileUser',
    component: ProfileUser,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLogin) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({
        path: '/profile-user'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
