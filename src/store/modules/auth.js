import axios from 'axios'

export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
    }
  },
  actions: {
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
    }
  },
  getters: {
    isLogin(state) {
      return state.token !== null // true
    }
  }
}
