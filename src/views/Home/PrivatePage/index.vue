<template>
  <div>
    <div class="chat-list">
      <div v-if="rooms.length > 0">
        <div
          v-for="(value, index) in rooms"
          :key="index"
          @click="onSelect(value)"
        >
          <div class="contact-item">
            <div class="contact-image">
              <b-avatar
                :src="url + '/' + value.user_image"
                class="no-image"
              ></b-avatar>
            </div>

            <div class="name-description cursor-pointer">
              <h5 class="mb-0 font-17">
                {{ value.user_name }}
              </h5>
              <p class="mb-0 font-13 text-muted">
                This is message...
              </p>
            </div>

            <div class="clock-check text-right ml-auto">
              <p class="mb-0 font-14 clock">
                17:17
              </p>
              <span class="cursor-pointer text-muted">
                <b-icon icon="bell-fill"></b-icon>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h5 class="text-dark mb-5 text-center">There are no private rooms</h5>
        <g-image
          url="illustration/noprivate.svg"
          class="img-fluid px-1"
          alt="private"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      url: process.env.VUE_APP_BASE_URL,
      search: '',
      isDelete: false
    }
  },
  components: {},
  mounted() {},
  computed: {
    ...mapGetters({ rooms: 'getRoom', user: 'getUser' })
  },
  methods: {
    ...mapActions(['getMessageByRoomId']),
    ...mapMutations(['setSelect', 'setSelectedRoom']),
    onSelect(data) {
      console.log(data)
      this.setSelectedRoom(data)
      const payload = {
        room_id: data.room_id,
        user_id: this.user.user_id
      }
      this.getMessageByRoomId(payload)
      this.setSelect(true)
      // this.socket.emit('joinRoom', data.room_id)
    }
  }
}
</script>

<style scoped></style>
