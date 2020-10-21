import axios from 'axios'

export default {
  state: {
    rooms: {},
    groupRooms: [],
    isSelected: false,
    selectedRoom: []
  },
  mutations: {
    setRoom(state, payload) {
      state.rooms = payload
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
          .get(`${process.env.VUE_APP_BASE_URL}/room/${payload}`)
          .then(response => {
            context.commit('setRoom', response.data.data)
            resolve(response.data)
          })
          .catch(error => {
            console.log(error)
            reject(error.response)
          })
      })
    },
    createRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/room/create`, payload)
          .then(response => resolve(response.data))
          .catch(error => {
            console.log(error)
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getRoom(state) {
      return state.rooms
    },
    getGroupRoom(state) {
      return state.groupRooms
    },
    getSelect(state) {
      return state.isSelected
    },
    getSelectedRoom(state) {
      console.log(state.selectedRoom)
      return state.selectedRoom
    }
  }
}
