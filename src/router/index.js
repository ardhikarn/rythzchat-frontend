import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '@/views/auth/Register.vue'
import Login from '@/views/auth/Login.vue'
import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import NewPassword from '@/views/auth/NewPassword.vue'
import SuccessActivate from '@/views/auth/SuccessActivate.vue'
import ProfileUser from '@/views/ProfileUser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/forgot-password',
    name: 'ForgotPasforgotpassword',
    component: ForgotPassword
  },
  {
    path: '/new-password',
    name: 'NewPassword',
    component: NewPassword
  },
  {
    path: '/activation-account',
    name: 'SuccessActivate',
    component: SuccessActivate
  },
  {
    path: '/profile-user',
    name: 'ProfileUser',
    component: ProfileUser
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
