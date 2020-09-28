<template>
  <b-container fluid style="height: 100vh; overflow: auto">
    <b-row class="p-0">
      <b-col cols="3" class="message">
        <Menu />
      </b-col>
      <b-col cols="9" class="message room-chat" v-if="isSelected">
        <EmptyRoom />
      </b-col>
      <b-col cols="9" class="message room-chat" v-if="!isSelected">
        <ChatRoom />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import EmptyRoom from '@/components/EmptyRoom.vue'
import ChatRoom from '@/components/ChatRoom.vue'
import Menu from '@/components/Menu.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Home',
  components: {
    EmptyRoom,
    ChatRoom,
    Menu
  },
  data() {
    return {}
  },
  created() {
    this.setSelect(false)
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
        this.patchMaps(payload).then((response) => {
          console.log(response.message)
          this.getUserById(this.user.user_id)
        })
      })
      .catch((error) => {
        alert(error)
      })
  },
  computed: {
    ...mapGetters({ user: 'getUser', isSelected: 'getSelect' })
  },
  methods: {
    ...mapActions(['getUserById', 'patchMaps']),
    ...mapMutations(['setSelect'])
  }
}
</script>

<style src="@/assets/css/style.css"></style>
