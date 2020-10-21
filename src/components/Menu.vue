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

    <div class="sticky-top bg-white pt-2 pb-2">
      <!-- SEARCH CHAT -->
      <div class="sidebar-search mb-4">
        <div class="input-group mb-3">
          <g-image url="icon/search.svg" width="20" class="search-icon" />
          <input
            type="text"
            class="form-control font-15 rounded-pill border-0 bg-light"
            placeholder="Search chat"
            v-model="search"
            @keyup="searchHandle"
          />
          <div class="input-group-append">
            <button
              class="btn no-focus"
              type="button"
              @click="$bvModal.show('friend-list')"
            >
              <g-image url="icon/plus.svg" />
            </button>
          </div>
        </div>
      </div>

      <!--LIST FRIEND  -->
      <div class="message-by d-flex overflow-auto py-2 align-items-center">
        <div v-for="(menu, i) in menus" :key="i">
          <router-link
            :to="{ name: menu.name }"
            :class="[currentRouteName === menu.name ? 'btn-lb' : '']"
            class="d-inline-block btn rounded-pill mr-2"
            >{{ menu.name }}</router-link
          >
        </div>
      </div>
    </div>

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
      isDelete: false,
      menus: [
        {
          name: 'Dashboard',
          status: false
        },
        {
          name: 'Private',
          status: false
        },
        {
          name: 'Group',
          status: false
        },
        {
          name: 'Friends',
          status: false
        },
        {
          name: 'Users',
          status: false
        }
      ]
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
      chat: 'getMessage',
      groupRooms: 'getGroupRooms'
    }),
    currentRouteName() {
      return this.$route.name
    }
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
        .then(value => {
          this.isDelete = value
          if (this.isDelete === true) {
            const payload = {
              user_id: this.user.user_id,
              friend_id: data.user_id
            }
            this.deleteFriend(payload).then(res => {
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
      this.setFriendProfile(data)
      this.$bvModal.hide('friend-list')
    },
    onChat(data) {
      this.setFriendProfile(data)
      const check = this.rooms.some(value => {
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
        this.createRoom(payload).then(res => {
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
      console.log(data)
      this.setSelectedRoom(data)
      const payload = {
        room_id: data.room_id,
        user_id: this.user.user_id
      }
      this.getMessageByRoomId(payload)
      this.setSelect(true)
      // this.socket.emit('joinRoom', data.room_id)
    },
    searchHandle() {
      console.log('ok')
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
