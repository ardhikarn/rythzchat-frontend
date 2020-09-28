<template>
  <b-container fluid>
    <b-row class="p-4 bg-white">
      <b-col cols="1" class="align-self-center text-center">
        <b-img fluid thumbnail class="rounded-circle" :src="room.pict"></b-img>
      </b-col>
      <b-col cols="10" class="align-self-center">
        <p class="mb-0">{{ room.name }}</p>
        <small class="mb-0">{{ room.status }}</small>
      </b-col>
      <b-col cols="1" class="align-self-center text-center">
        <b-icon icon="paperclip" font-scale="1.5"></b-icon>
      </b-col>
    </b-row>

    <b-container fluid id="chat-c">
      <b-row v-for="(value, index) in chat" :key="index">
        <b-col cols="5" :class="value.class" v-if="value.class === 'sender'">
          {{ value.msg }}
        </b-col>
        <b-col cols="7" v-if="value.class === 'sender'"></b-col>
        <b-col cols="7" v-if="value.class === 'receiver'"></b-col>
        <b-col cols="5" v-if="value.class === 'receiver'" class="text-right">
          <div :class="value.class">{{ value.msg }}</div>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="input-c">
      <b-row>
        <b-col cols="11">
          <b-form-input placeholder="Type your message..."></b-form-input>
        </b-col>
        <b-col cols="1">
          <b-button>
            <b-img fluid :src="require('../assets/img/plus.png')" />
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
export default {
  name: 'ChatRoom',
  data() {
    return {
      room: {
        pict: require('../assets/img/opinion3.jpg'),
        name: 'Mother ❤',
        status: 'Online'
      },
      chat: [
        {
          msg:
            'Hi, son, how are you doing? Today, my father and I went to buy a car, bought a cool car.',
          class: 'sender'
        },
        {
          msg: 'Oh! Cool Send me photo',
          class: 'receiver'
        },
        {
          msg: 'Ok😉',
          class: 'sender'
        },
        {
          msg: 'Will we arrive tomorrow?',
          class: 'sender'
        },
        {
          msg: 'Oh! Cool Send me photo',
          class: 'receiver'
        },
        {
          msg: 'Thankyou',
          class: 'sender'
        }
      ]
    }
  },
  methods: {
    scrollToEnd() {
      const container = this.$el.querySelector('#chat-c')
      container.scrollTop = container.scrollHeight
    }
  },
  mounted() {
    this.scrollToEnd()
  }
}
</script>

<style src="@/assets/css/style.css"></style>
