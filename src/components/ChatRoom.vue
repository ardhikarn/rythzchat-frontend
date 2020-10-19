<template>
  <b-container fluid class="">
    <b-row class="p-4 bg-white">
      <b-col
        cols="1"
        class="align-self-center text-center"
        v-b-toggle.info-friend
      >
        <b-img
          fluid
          thumbnail
          class="rounded-circle"
          :src="url + '/' + room.user_image"
        ></b-img>
      </b-col>
      <b-col cols="10" class="align-self-center" v-b-toggle.info-friend>
        <p class="mb-0">
          <strong>{{ room.user_name }}</strong>
        </p>
        <small class="mb-0">Online</small>
      </b-col>
      <b-col cols="1" class="align-self-center text-center">
        <b-icon icon="paperclip" font-scale="1.5"></b-icon>
      </b-col>
    </b-row>

    <b-container fluid id="chat-c">
      <b-row v-for="(item, index) in chat" :key="index">
        <b-col cols="5" :class="item.class" v-if="item.class === 'sender'">
          {{ item.message }}
        </b-col>
        <b-col cols="7" v-if="item.class === 'sender'"></b-col>
        <b-col cols="7" v-if="item.class === 'receiver'"></b-col>
        <b-col cols="5" v-if="item.class === 'receiver'" class="text-right">
          <div :class="item.class">{{ item.message }}</div>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="input-c">
      <b-row>
        <b-col cols="11">
          <b-form-input
            placeholder="Type your message..."
            v-on:keyup.enter="onSend"
            v-model="message"
          ></b-form-input>
        </b-col>
        <b-col cols="1">
          <b-button @click="onSend">
            <b-icon icon="arrow-right-short" font-scale="1.5"></b-icon>
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import io from 'socket.io-client'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ChatRoom',
  data() {
    return {
      // room: {
      //   pict: require('../assets/img/opinion3.jpg'),
      //   name: 'Mother ❤',
      //   status: 'Online'
      // },
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
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
