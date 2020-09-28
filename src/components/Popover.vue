<template>
  <b-popover placement="bottomleft" target="setting-popover" triggers="click">
    <b-row class="text-white" v-b-toggle.sidebar-profile>
      <b-col cols="1">
        <b-icon icon="pencil" font-scale="1.1"></b-icon>
      </b-col>
      <b-col cols="9"> settings </b-col>
    </b-row>
    <hr class="my-2" />
    <b-row class="text-white">
      <b-col cols="3">
        <b-icon icon="pencil" font-scale="1.1"></b-icon>
      </b-col>
      <b-col cols="9">Contacts</b-col>
    </b-row>
    <hr />

    <b-row class="text-white">
      <b-col cols="3">
        <b-icon icon="pencil" font-scale="1.1"></b-icon>
      </b-col>
      <b-col cols="9">Calls</b-col>
    </b-row>
    <hr />

    <b-row class="text-white">
      <b-col cols="3">
        <b-icon icon="pencil" font-scale="1.1"></b-icon>
      </b-col>
      <b-col cols="9">Save Messages</b-col>
    </b-row>
    <hr />

    <b-row class="text-white" @click="$bvModal.show('invite-friend')">
      <b-col cols="3">
        <b-icon icon="pencil" font-scale="1.1"></b-icon>
      </b-col>
      <b-col cols="9">Invite Friends</b-col>
    </b-row>
    <hr />

    <b-row class="text-white">
      <b-col cols="3">
        <b-icon icon="pencil" font-scale="1.1"></b-icon>
      </b-col>
      <b-col cols="9" @click="toLogout">Sign Out</b-col>
    </b-row>

    <!-- INVITE FRIEND -->
    <b-modal id="invite-friend" hide-footer centered>
      <template v-slot:modal-title> Invite Friend </template>
      <b-row>
        <b-col cols="12">
          <b-form-input
            type="search"
            v-model="search"
            placeholder="Type email to search"
            v-on:keyup.enter="onSearch"
          ></b-form-input>
        </b-col>
        <b-col cols="12" v-if="notFound">
          <p style="color: red; font-size: 14px" class="mt-2">
            Email not found<br />
            Make sure the right email, please !
          </p>
        </b-col>
      </b-row>
      <div v-if="found" class="mt-2">
        <b-row>
          <b-col cols="2" class="align-self-center text-center">
            <b-img fluid :src="url + '/' + searchData.user_image"></b-img>
          </b-col>
          <b-col cols="6" class="align-self-center">
            <p class="mb-0">{{ searchData.user_name }}</p>
            <small class="mb-0">{{ searchData.user_email }}</small>
          </b-col>
          <b-col cols="4" class="align-self-center">
            <b-button v-if="notInvited" class="" @click="onAdd()"
              >Add to friendlist</b-button
            >
            <b-button v-if="isInvited" class="btn-success" disabled>
              Friend Added
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </b-popover>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Popover',
  data() {
    return {
      search: '',
      notFound: false,
      found: false,
      isInvited: null,
      notInvited: null,
      url: process.env.VUE_APP_BASE_URL
    }
  },
  computed: {
    ...mapGetters({
      searchData: 'getSearch',
      friend: 'getFriendlist',
      user: 'getUser'
    })
  },
  methods: {
    ...mapActions(['logout', 'getUserByEmail', 'addFriend', 'getFriendById']),
    onSearch() {
      this.notFound = false
      this.found = false
      this.getUserByEmail(this.search).then((response) => {
        if (response.data.length === 0) {
          this.notFound = true
          this.found = false
        } else {
          this.found = true
          this.notFound = false
          const check = this.friend.some(
            (el) => el.user_id === this.searchData.user_id
          )
          if (this.user.user_id === this.searchData.user_id) {
            this.notInvited = false
            this.isInvited = false
          } else if (check) {
            this.isInvited = true
            this.notInvited = false
          } else if (!check) {
            this.notInvited = true
            this.isInvited = false
          }
        }
      })
    },
    onAdd() {
      const payload = {
        user_id: this.user.user_id,
        friend_id: this.searchData.user_id
      }
      this.addFriend(payload).then((response) => {
        const payloadContact = {
          userId: this.user.user_id,
          search: ''
        }
        this.getFriendById(payloadContact)
        this.makeToast('success', 'Success', response.message)
        this.isInvited = true
        this.notInvited = false
      })
    },
    makeToast(variant, title, msg) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      })
    },
    toLogout() {
      this.$bvModal
        .msgBoxConfirm('logout account?', {
          cancelVariant: 'danger',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
        .then((value) => {
          this.isLogout = value
          this.isLogout ? this.logout() : console.log(value)
        })
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
