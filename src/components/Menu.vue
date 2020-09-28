<template>
  <div>
    <b-row class="justify-content-center">
      <b-col cols="10">
        <h4>Rythz-Chat</h4>
      </b-col>
      <b-col cols="2" class="align-self-center">
        <b-img
          :src="require('@/assets/img/menu.png')"
          fluid
          style="width: 25px"
          right
          id="setting-popover"
        ></b-img>
        <Popover />
        <SideProfile />
      </b-col>
    </b-row>
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
            class="border-0"
          />
        </div>
      </b-col>
      <b-col
        cols="2"
        class="align-self-center"
        @click="$bvModal.show('friend-list')"
      >
        <b-icon icon="plus" font-scale="1.5"></b-icon>
      </b-col>

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
        <div v-if="friendlist.length === 0" class="mt-2">
          <small>Oops, looks like you don't have any contact yet.</small>
        </div>
        <b-row
          v-else
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
            v-b-toggle.sidebar-info
            style="cursor: pointer"
          >
            {{ item.user_name }}
          </b-col>
          <b-col cols="3" class="align-self-center">
            <b-button class="float-left">
              <b-icon icon="chat-text" font-scale="1.1"></b-icon>
            </b-button>
            <b-button class="float-right" @click="onDelete(item)">
              <b-icon icon="trash" font-scale="1.1"></b-icon>
            </b-button>
          </b-col>
        </b-row>
      </b-modal>
      <b-col cols="12" class="mt-2">
        <b-tabs
          style="font-size: 20px"
          no-nav-style
          content-class="mt-2"
          active-nav-item-class="font-weight-bold text-dark"
        >
          <b-tab title="All" class="px-3" active>
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
                <b-badge pill variant="info">2</b-badge>
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
  </div>
</template>

<script>
import Popover from '@/components/Popover.vue'
import SideProfile from '@/components/SideProfile.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Menu',
  components: {
    Popover,
    SideProfile
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
    this.$getLocation()
      .then((coordinates) => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
        const payload = {
          id: this.user.user_id,
          form: this.coordinate
        }
        this.patchMaps(payload).then((res) => {
          console.log(res.message)
          this.getUserById(this.user.user_id)
        })
      })
      .catch((error) => {
        alert(error)
      })
    const payload = {
      user_id: this.user.user_id,
      search: ''
    }
    this.getFriendById(payload)
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      friendlist: 'getFriendlist',
      rooms: 'getRoom'
    })
  },
  methods: {
    ...mapActions([
      'getUserById',
      'patchMaps',
      'getFriendById',
      'deleteFriend',
      'createRoom',
      'getRoomByUserId'
    ]),
    ...mapMutations(['setFriendProfile']),
    onSearch() {
      const payload = {
        user_id: this.user.user_id,
        search: this.search
      }
      this.getFriendById(payload)
    },
    onDelete(data) {
      this.$bvModal
        .msgBoxConfirm(
          `Are you sure you want to remove ${data.user_name} from your contact ?`,
          {
            cancelVariant: 'info',
            okVariant: 'danger',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
            centered: true
          }
        )
        .then((value) => {
          this.isDelete = value
          if (this.isDelete === true) {
            const payload = {
              user_id: this.user.user_id,
              friend_id: data.user_id
            }
            console.log(payload)
            this.deleteFriend(payload).then((res) => {
              const payloadFriend = {
                user_id: this.user.user_id,
                search: this.search
              }
              this.getFriendById(payloadFriend)
              this.makeToast('success', 'Success', res.message)
            })
          }
        })
    },
    onFriend(data) {
      this.setFriendProfile(data)
      this.$bvModal.hide('friend-list')
    },
    onChat(data) {
      const check = this.rooms.some((el) => {
        return el.user_id === data.user_id
      })
      if (check) {
        this.makeToast('info', 'Info', 'Room is already exists')
      } else {
        const payload = {
          user_id: this.user.user_id,
          friend_id: data.user_id
        }
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
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
