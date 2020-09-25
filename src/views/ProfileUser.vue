<template>
  <div class="background">
    <b-container class="py-5">
      <b-row class="justify-content-center">
        <b-col xl="6" cols="9" class="item text-center py-4 px-5">
          <h3 class="bluetext my-3">My Profile</h3>
          <b-alert show variant="warning" v-if="user.user_phone === null || user.user_about === null" v-show="isShow">
            Complete your Profile please.
          </b-alert>
          <b-avatar size="12rem" class="mt-3">
            <img style="width: 7rem" class="mt-4" />
          </b-avatar>
          <input type="file" name="upload" id="" />

          <b-row class="my-3">
            <b-col cols="1" class="align-self-center text-center px-0">
              <b-icon icon="person-fill" font-scale="1.5"></b-icon>
            </b-col>
            <b-col cols="10" class="text-left">
              <p class="my-0">Name</p>
              <p class="my-0 font-weight-bold text-uppercase">
                {{ user.user_name }}
              </p>
            </b-col>
            <b-col cols="1" class="align-self-center text-center px-0">
              <b-icon icon="pencil" font-scale="1.3" @click="editName"></b-icon>
            </b-col>
            <b-col cols="12"><hr /></b-col>
            <b-col cols="1" class="align-self-center text-center px-0">
              <b-icon icon="exclamation-circle" font-scale="1.5"></b-icon>
            </b-col>
            <b-col cols="10" class="text-left">
              <p class="my-0">About</p>
              <small
                class="my-0 font-weight-bold"
                v-if="user.user_about === '' || user.user_about === null"
              >
                set your id
              </small>
              <p class="my-0 font-weight-bold" v-else>{{ user.user_about }}</p>
            </b-col>
            <b-col cols="1" class="align-self-center text-center px-0">
              <b-icon icon="pencil" font-scale="1.3"></b-icon>
            </b-col>
            <b-col cols="12"><hr /></b-col>
            <b-col cols="1" class="align-self-center text-center px-0">
              <b-icon icon="phone" font-scale="1.5"></b-icon>
            </b-col>
            <b-col cols="10" class="text-left">
              <p class="my-0">Phone</p>
              <small
                class="my-0 font-weight-bold"
                v-if="user.user_phone === '' || user.user_phone === null"
              >
                set your phone number
              </small>
              <p class="my-0 font-weight-bold" v-else>{{ user.user_phone }}</p>
            </b-col>
            <b-col cols="1" class="align-self-center text-center px-0">
              <b-icon icon="pencil" font-scale="1.3"></b-icon>
            </b-col>
          </b-row>

          <router-link to="/">
            <b-button
              @click="onUpdate"
              style="border: 1px solid #7e98df; background-color: #7e98df"
              class="my-4 px-5 rounded-pill"
            >
              Save
            </b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ProfileUser',
  data() {
    return {
      form: {},
      isShow: true
    }
  },
  created() {
    // this.getUserByid(this.user.user_id)
  },
  computed: {
    ...mapGetters({ user: 'getUser' })
  },
  methods: {
    ...mapActions([]),
    onUpdate() {
      console.log('clicked')
    },
    editName() {
      console.log(this.user)
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
