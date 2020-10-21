<template>
  <b-col lg="8" md="7" class=" bg-light p-0 right-chat max-vh-100 min-vh-100">
    <!-- HEADER ROOMCHAT -->
    <div class="card border-0 rounded-0">
      <div class="card-body d-flex justify-content-between align-items-center">
        <div class="d-flex">
          <button type="button" @click="clearChat" class="btn">
            <g-image class="back-icon" url="icon/back.svg" />
          </button>
          <b-avatar
            :src="url + '/' + room.user_image"
            class="no-image mr-2"
          ></b-avatar>
          <div class="d-flex flex-column justify-content-around">
            <p class="mb-0">
              <strong>{{ room.user_name }}</strong>
            </p>
            <small class="mb-0">Online</small>
          </div>
        </div>
        <button class="btn" v-b-toggle.sidebar-right>
          <g-image url="icon/profile_menu.svg" class="img-fluid" />
        </button>
      </div>
    </div>

    <!-- CHATROOM -->
    <div id="chat-c">
      <b-container fluid v-for="(item, index) in chat" :key="index">
        <b-row v-if="item.class === 'sender'" align-h="start">
          <div class="sender">{{ item.message }}</div>
        </b-row>
        <b-row v-if="item.class === 'receiver'" align-h="end">
          <div class="receiver">{{ item.message }}</div>
        </b-row>
      </b-container>
    </div>

    <!-- SEND CHAT -->
    <div class="card border-0 rounded-0 chat-input-card">
      <div class="card-body position-relative">
        <input
          v-on:keyup.enter="onSend"
          v-model="message"
          type="text"
          placeholder="Type your message..."
          class="form-control input-chat font-14"
        />
        <div @click="onSend">
          <g-image
            url="icon/send.svg"
            class="icon-send position-absolute cursor-pointer"
          />
        </div>
      </div>
    </div>
  </b-col>
</template>

<script>
import io from 'socket.io-client'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ChatRoom',
  data() {
    return {
      url: process.env.VUE_APP_BASE_URL,
      message: null,
      socket: io(process.env.VUE_APP_BASE_URL)
    }
  },
  mounted() {
    if (this.room) {
      this.socket.emit('joinRoom', this.room.room_id)
    }
    this.scrollToEnd()
    this.socket.on('chatMsg', data => {
      this.chat.push(data)
    })
  },
  computed: {
    ...mapGetters({
      room: 'getSelectedRoom',
      chat: 'getMessage',
      user: 'getUser'
    })
  },
  methods: {
    ...mapActions(['getMessageByRoomId', 'sendMessage']),
    ...mapMutations(['setSelect']),
    scrollToEnd() {
      const container = this.$el.querySelector('#chat-c')
      container.scrollTop = container.scrollHeight
    },
    onSend() {
      const payload = {
        room_id: this.room.room_id,
        user_id: this.user.user_id,
        message: this.message
      }
      this.sendMessage(payload)
      const payloadRoom = {
        room_id: this.room.room_id,
        user_id: this.user.user_id
      }
      this.getMessageByRoomId(payloadRoom)
      this.scrollToEnd()
      const addData = {
        message: this.message,
        class: 'sender',
        room: this.room.room_id
      }
      this.socket.emit('roomChat', addData)
      this.message = ''
    },
    clearChat() {
      this.setSelect(false)
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
