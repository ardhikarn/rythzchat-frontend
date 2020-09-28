<template>
  <b-sidebar id="sidebar-profile" shadow backdrop width="342px">
    <div class="text-center mb-4">
      <b-img
        style="width: 10rem"
        fluid
        class="rounded-pill"
        thumbnail
        :src="url + '/' + user.user_image"
      ></b-img>
      <h4 class="text-lowercase">{{ user.user_name.split(' ')[0] }}</h4>
    </div>
    <b-container class="side-profile">
      <b-row class="my-5">
        <b-col cols="2" class="align-self-center text-center px-0">
          <b-icon icon="person-fill" font-scale="1.5"></b-icon>
        </b-col>
        <b-col cols="10" class="text-left">
          <p class="my-0">Name</p>
          <p class="my-0 font-weight-bold text-uppercase">
            {{ user.user_name }}
          </p>
        </b-col>
        <b-col cols="12"><hr /></b-col>
        <b-col cols="2" class="align-self-center text-center px-0">
          <b-icon icon="exclamation-circle-fill" font-scale="1.5"></b-icon>
        </b-col>
        <b-col cols="10" class="text-left">
          <p class="my-0">About</p>
          <p class="my-0 font-weight-bold">{{ user.user_about }}</p>
        </b-col>
        <b-col cols="12"><hr /></b-col>
        <b-col cols="2" class="align-self-center text-center px-0">
          <b-icon icon="phone-fill" font-scale="1.5"></b-icon>
        </b-col>
        <b-col cols="10" class="text-left">
          <p class="my-0">Phone</p>
          <p class="my-0 font-weight-bold">{{ user.user_phone }}</p>
        </b-col>
        <b-col cols="12"><hr /></b-col>
        <b-col cols="2" class="align-self-center text-center px-0">
          <b-icon icon="envelope-fill" font-scale="1.5"></b-icon>
        </b-col>
        <b-col cols="10" class="text-left">
          <p class="my-0">Email</p>
          <p class="my-0 font-weight-bold">{{ user.user_email }}</p>
        </b-col>
        <b-col cols="12"><hr /></b-col>
        <b-col cols="2" class="align-self-center text-center px-0">
          <b-icon icon="envelope-fill" font-scale="1.5"></b-icon>
        </b-col>
        <b-col cols="10" class="text-left">
          <p class="my-0">Location</p>
        </b-col>
        <b-col cols="12"><hr /></b-col>
      </b-row>
      <div class="mb-2 text-center">
        <routerLink to="/profile-user">
          <b-button size="sm">
            <b-icon icon="gear-fill" aria-hidden="true"></b-icon>
            Edit Profile
          </b-button>
        </routerLink>
      </div>

      <b-row class="side-settings">
        <b-col cols="2" class="align-self-center text-center px-0">
          <b-icon icon="envelope-fill" font-scale="1.5"></b-icon>
        </b-col>
        <b-col cols="10" @click="$bvModal.show('bv-location')">
          <p>Location</p>
        </b-col>
        <b-col cols="2">
          <b-img fluid :src="require('../assets/img/plus.png')" />
        </b-col>
        <b-col cols="10">
          <p>Logout</p>
        </b-col>
      </b-row>
    </b-container>

    <b-modal id="bv-location" hide-footer centered size="lg">
      <template v-slot:modal-title> Location </template>
      <GmapMap
        :center="{ lat: +user.user_lat, lng: +user.user_lng }"
        :zoom="17.5"
        map-type-id="roadmap"
        style="width: 100%; height: 500px"
      >
        <GmapMarker
          :position="{ lat: +user.user_lat, lng: +user.user_lng }"
          :clickable="true"
          :draggable="true"
          icon="https://img.icons8.com/color/48/000000/map-pin.png"
        />
      </GmapMap>
    </b-modal>
  </b-sidebar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SideProfile',
  data() {
    return {
      url: process.env.VUE_APP_BASE_URL
    }
  },
  created() {},
  computed: {
    ...mapGetters({ user: 'getUser' })
  },
  methods: {
    ...mapActions(['getUserById'])
  }
}
</script>

<style src="@/assets/css/style.css"></style>
