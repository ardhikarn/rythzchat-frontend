<template>
  <b-sidebar id="info-friend" right shadow backdrop width="342px">
    <div class="text-center mb-4">
      <b-img
        style="width: 10rem"
        fluid
        class="rounded-pill"
        thumbnail
        :src="url + '/' + infoFriend.user_image"
      ></b-img>
      <h4 class="text-lowercase">{{ infoFriend.user_name.split(' ')[0] }}</h4>
    </div>
    <b-container class="side-profile">
      <b-row class="my-5">
        <b-col cols="2" class="align-self-center text-center px-0">
          <b-icon icon="person-fill" font-scale="1.5"></b-icon>
        </b-col>
        <b-col cols="10" class="text-left">
          <p class="my-0">Name</p>
          <p class="my-0 font-weight-bold text-uppercase">
            {{ infoFriend.user_name }}
          </p>
        </b-col>
        <b-col cols="12"><hr /></b-col>
        <b-col cols="2" class="align-self-center text-center px-0">
          <b-icon icon="exclamation-circle-fill" font-scale="1.5"></b-icon>
        </b-col>
        <b-col cols="10" class="text-left">
          <p class="my-0">About</p>
          <p class="my-0 font-weight-bold">{{ infoFriend.user_about }}</p>
        </b-col>
        <b-col cols="12"><hr /></b-col>
        <b-col cols="2" class="align-self-center text-center px-0">
          <b-icon icon="phone-fill" font-scale="1.5"></b-icon>
        </b-col>
        <b-col cols="10" class="text-left">
          <p class="my-0">Phone</p>
          <p class="my-0 font-weight-bold">{{ infoFriend.user_phone }}</p>
        </b-col>
        <b-col cols="12"><hr /></b-col>
        <b-col cols="2" class="align-self-center text-center px-0">
          <b-icon icon="envelope-fill" font-scale="1.5"></b-icon>
        </b-col>
        <b-col cols="10" class="text-left">
          <p class="my-0">Email</p>
          <p class="my-0 font-weight-bold">{{ infoFriend.user_email }}</p>
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

      <b-row>
        <b-col cols="2" class="align-self-center text-center px-0">
          <b-icon icon="envelope-fill" font-scale="1.5"></b-icon>
        </b-col>
        <b-col cols="10" @click="$bvModal.show('bv-location')">
          <p>Location</p>
        </b-col>
      </b-row>
    </b-container>

    <b-modal id="bv-location" hide-footer centered size="lg">
      <template v-slot:modal-title> Location </template>
      <GmapMap
        :center="{ lat: +infoFriend.user_lat, lng: +infoFriend.user_lng }"
        :zoom="17.5"
        map-type-id="roadmap"
        style="width: 100%; height: 500px"
      >
        <GmapMarker
          :position="{ lat: +infoFriend.user_lat, lng: +infoFriend.user_lng }"
          :clickable="true"
          :draggable="true"
          icon="https://img.icons8.com/color/48/000000/map-pin.png"
        />
      </GmapMap>
    </b-modal>
  </b-sidebar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'InfoFriend',
  data() {
    return {
      url: process.env.VUE_APP_BASE_URL
    }
  },
  created() {},
  computed: {
    ...mapGetters({ infoFriend: 'getFriendProfile' })
  },
  methods: {}
}
</script>

<style src="@/assets/css/style.css"></style>
