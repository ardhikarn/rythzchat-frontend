<template>
  <div>
    <div class="py-4 title-menu">
      <h4 class="align-self-center mb-0">Rythz-Chat</h4>
      <b-img
        :src="require('@/assets/img/menu.png')"
        fluid
        style="width: 25px"
        id="setting-popover"
        class="align-self-center"
      ></b-img>
      <Popover />
      <SideProfile />
      <InfoFriend />
    </div>

    <b-row class="mt-4">
      <b-col cols="10" class="pr-0">
        <div class="input-field bg-light rounded-pill px-2 py-1">
          <b-icon
            icon="search"
            font-scale="0.9"
            class="align-self-center mx-auto"
          ></b-icon>
          <input
            required
            type="text"
            placeholder="Type your message..."
            class="border-0 py-2"
          />
        </div>
      </b-col>
      <b-col
        cols="2"
        class="align-self-center text-center px-0 plus"
        @click="$bvModal.show('friend-list')"
      >
        <b-icon icon="plus" font-scale="3"></b-icon>
      </b-col>

      <b-col cols="12" class="mt-2">
        <b-tabs
          style="font-size: 20px"
          no-nav-style
          content-class="mt-2"
          active-nav-item-class="font-weight-bold text-dark"
        >
          <b-tab title="All" class="px-3" active>
            <b-row
              class="mb-3"
              v-for="(value, index) in rooms"
              :key="index"
              @click="onSelect(value)"
            >
              <b-col cols="3" class="px-0 text-center align-self-center">
                <b-img
                  :src="url + '/' + value.user_image"
                  fluid
                  class="img-border"
                ></b-img>
              </b-col>
              <b-col cols="7">
                <p class="mb-0 font-weight-bold">{{ value.user_name }}</p>
                <small :class="value.class" v-if="value.isSender"
                  >Me: {{ value.recent }}</small
                >
                <small :class="value.class" v-else>this is message...</small>
              </b-col>
              <b-col cols="2" class="px-0 text-center">
                <small>17:17</small>
                <!-- <b-badge v-if="value.unread > 0" pill variant="info">{{
                  value.unread
                }}</b-badge> -->
                <b-badge pill variant="info">2</b-badge>
                <b-icon
                  icon="chat-text"
                  font-scale="1.1"
                  v-if="value.class === 'sent and read'"
                ></b-icon>
                <b-icon
                  icon="chat-text"
                  font-scale="1.1"
                  v-if="value.class === 'sent'"
                ></b-icon>
              </b-col>
            </b-row>
          </b-tab>

          <b-tab title="Important" class="px-3">
            <b-row class="mb-3">
              <b-col cols="3" class="px-0">
                <b-img
                  :src="require('@/assets/img/opinion3.jpg')"
                  fluid
                  class="img-border"
                  sizes="10rem"
                ></b-img>
              </b-col>
              <b-col cols="7">
                <p class="mb-0 font-weight-bold">Ardhika</p>
                <small>this is message</small>
              </b-col>
              <b-col cols="2" class="px-0 text-center">
                <small>17:17</small>
                <b-badge pill variant="info">8-2</b-badge>
              </b-col>
            </b-row>
          </b-tab>

          <b-tab title="Unread" class="px-3">
            <b-row class="mb-3">
              <b-col cols="3" class="px-0">
                <b-img
                  :src="require('@/assets/img/opinion3.jpg')"
                  fluid
                  class="img-border"
                ></b-img>
              </b-col>
              <b-col cols="7">
                <p class="mb-0 font-weight-bold">Ardhika</p>
                <small>this is message</small>
              </b-col>
              <b-col cols="2" class="px-0 text-center">
                <small>17:17</small>
                <b-badge pill variant="info">2</b-badge>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>

    <!-- SEARCH FRIEND -->
    <b-modal id="friend-list" hide-footer centered>
      <template v-slot:modal-title> Friend List</template>
      <b-row>
        <b-col cols="12">
          <b-form-input
            type="search"
            v-model="search"
            placeholder="Search Friend Name"
            v-on:keyup.enter="onSearch"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row v-if="friendlist.length === 0" class="mt-2">
        <b-col cols="12">
          <small>Friend not Found</small>
        </b-col>
      </b-row>
      <b-row
        v-else-if="friendlist.length > 0"
        v-for="(item, index) in friendlist"
        :key="index"
        class="mt-2"
      >
        <b-col cols="3" align-self="center">
          <b-img fluid center :src="url + '/' + item.user_image"></b-img>
        </b-col>
        <b-col
          cols="6"
          align-self="center"
          @click="onFriend(item)"
          v-b-toggle.info-friend
          style="cursor: pointer"
        >
          {{ item.user_name }}
        </b-col>
        <b-col cols="3" class="align-self-center">
          <b-button class="float-left" @click="onChat(item)">
            <b-icon icon="chat-text" font-scale="1.1"></b-icon>
          </b-button>
          <b-button class="float-right" @click="onDelete(item)">
            <b-icon icon="trash" font-scale="1.1"></b-icon>
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import Popover from '@/components/Popover.vue'
import SideProfile from '@/components/SideProfile.vue'
import InfoFriend from '@/components/InfoFriend.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Menu',
  components: {
    Popover,
    SideProfile,
    InfoFriend
  },
  data() {
    return {
      url: process.env.VUE_APP_BASE_URL,
      search: '',
      isDelete: false
    }
  },
  created() {
    this.getUserById(this.user.user_id)
    const payloadFriend = {
      user_id: this.user.user_id,
      search: this.search
    }
    this.getFriendById(payloadFriend)
    this.getRoomByUserId(this.user.user_id)
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      friendlist: 'getFriendlist',
      rooms: 'getRoom',
      chat: 'getMessage'
    })
  },
  methods: {
    ...mapActions([
      'getUserById',
      'getFriendById',
      'deleteFriend',
      'createRoom',
      'getRoomByUserId',
      'getMessageByRoomId'
    ]),
    ...mapMutations(['setFriendProfile', 'setSelect', 'setSelectedRoom']),
    onSearch() {
      const payload = {
        user_id: this.user.user_id,
        search: this.search
      }
      this.getFriendById(payload)
    },
    onDelete(data) {
      this.$bvModal
        .msgBoxConfirm(`Delete ${data.user_name} from friendlist ?`, {
          cancelVariant: 'info',
          okVariant: 'danger',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
        .then((value) => {
          this.isDelete = value
          if (this.isDelete === true) {
            const payload = {
              user_id: this.user.user_id,
              friend_id: data.user_id
            }
            this.deleteFriend(payload).then((res) => {
              const payloadFriend = {
                user_id: this.user.user_id,
                search: this.search
              }
              console.log(payloadFriend)
              this.getFriendById(payloadFriend)
              this.makeToast('success', 'Success', res.message)
            })
          }
        })
    },
    onFriend(data) {
      console.log(data)
      this.setFriendProfile(data)
      this.$bvModal.hide('friend-list')
    },
    onChat(data) {
      const check = this.rooms.some((value) => {
        return value.user_id === data.user_id
      })
      if (check) {
        this.makeToast('info', 'Info', 'Room is already exists')
      } else {
        const payload = {
          user_id: this.user.user_id,
          friend_id: data.user_id
        }
        console.log(payload)
        this.createRoom(payload).then((res) => {
          this.makeToast('success', 'Success', res.message)
          this.getRoomByUserId(this.user.user_id)
          this.$bvModal.hide('friend-list')
        })
      }
    },
    makeToast(variant, title, msg) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      })
    },
    onSelect(data) {
      this.setSelectedRoom(data)
      const payload = {
        room_id: data.room_id,
        user_id: this.user.user_id
      }
      console.log(payload)
      this.getMessageByRoomId(payload)
      this.setSelect(true)
      // this.socket.emit('joinRoom', data.room_id)
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
