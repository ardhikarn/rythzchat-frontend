import axios from 'axios'

export default {
  state: {
    message: {}
  },
  mutations: {
    setMessage(state, payload) {
      state.message = payload
    }
  },
  actions: {
    getMessageByRoomId(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_BASE_URL}/message?room_id=${payload.room_id}&user_id=${payload.user_id}`
          )
          .then(response => {
            context.commit('setMessage', response.data.data)
            resolve(response.data)
          })
          .catch(error => reject(error.response))
      })
    },
    sendMessage(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/message/send`, payload)
          .then(response => resolve(response.data))
          .catch(error => reject(error.response))
      })
    }
  },
  getters: {
    getMessage(state) {
      return state.message
    }
  }
}
