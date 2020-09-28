import axios from 'axios'

export default {
  state: {
    room: {},
    isSelected: false,
    selectedRoom: {}
  },
  mutations: {
    setRoom(state, payload) {
      state.room = payload
    },
    setSelect(state, payload) {
      state.isSelected = payload
    },
    setSelectedRoom(state, payload) {
      state.selectedRoom = payload
    }
  },
  actions: {
    getRoomByUserId(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/room/id/${payload}`)
          .then(response => {
            context.commit('setRoom', response.data.data)
            resolve(response.data)
          })
          .catch(error => reject(error.response))
      })
    },
    createRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/room/create`, payload)
          .then(response => resolve(response.data))
          .catch(error => reject(error.response))
      })
    }
  },
  getters: {
    getRoom(state) {
      return state.room
    },
    getSelect(state) {
      return state.isSelected
    },
    getSelectedRoom(state) {
      return state.selectedRoom
    }
  }
}
