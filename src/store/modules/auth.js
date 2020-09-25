import axios from 'axios'
import router from '../../router/index'

export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
    },
    delUser(state, payload) {
      state.user = {}
      state.token = null
    }
  },
  actions: {
    getUserById(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://127.0.0.1:3000/user/${payload}`)
          .then(response => resolve(response.data))
          .catch(error => reject(error.response))
      })
    },
    register(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/user/register', payload)
          .then(response => resolve(response.data))
          .catch(error => reject(error.response))
      })
    },
    sendEmailActivation(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/user/send-email-activation', payload)
          .then(response => resolve(response.data))
          .catch(error => reject(error.response))
      })
    },
    activationAccount(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `http://127.0.0.1:3000/user/activation-account?keys=${payload}`
          )
          .then(response => resolve(response.data))
          .catch(error => reject(error.response))
      })
    },
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/user/login', payload)
          .then(response => {
            // console.log(response.data)
            context.commit('setUser', response.data.data)
            localStorage.setItem('token', response.data.data.token)
            resolve(response.data)
          })
          .catch(error => reject(error.response))
      })
    },
    sendEmailPassword(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/user/forgot-password', payload)
          .then(response => resolve(response.data))
          .catch(error => reject(error.response))
      })
    },
    changePassword(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `http://127.0.0.1:3000/user/change-password?keys=${payload.keys}`,
            payload.form
          )
          .then(response => resolve(response.data))
          .catch(error => reject(error.response))
      })
    },
    logout(context) {
      localStorage.removeItem('token')
      sessionStorage.clear()
      context.commit('delUser')
      router.push('/login')
    },
    interceptorRequest(context) {
      axios.interceptors.request.use(
        function(config) {
          config.headers.Authorization = `Bearer ${context.state.token}`
          return config
        },
        function(error) {
          return Promise.reject(error)
        }
      )
    },
    interceptorResponse(context) {
      axios.interceptors.response.use(
        function(response) {
          return response
        },
        function(error) {
          if (error.response.status === 403) {
            if (
              error.response.data.message === 'invalid token' ||
              error.response.data.message === 'invalid signature'
            ) {
              localStorage.removeItem('token')
              context.commit('delUser')
              router.push('/')
              alert(error.response.data.message)
            } else if (error.response.data.message === 'jwt expired') {
              localStorage.removeItem('token')
              context.commit('delUser')
              router.push('/')
              alert(error.response.data.message)
            }
          }
          return Promise.reject(error)
        }
      )
    }
  },
  getters: {
    isLogin(state) {
      return state.token !== null // true
    },
    getUser(state) {
      return state.user
    }
  }
}
