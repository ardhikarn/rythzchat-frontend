<template>
  <b-container fluid style="height: 100vh; overflow: auto">
    <b-row class="p-0">
      <b-col cols="3" class="message">
        <Menu />
      </b-col>
      <b-col cols="9" class="message room-chat" v-if="!isSelected">
        <EmptyRoom />
      </b-col>
      <b-col cols="9" class="message room-chat" v-if="isSelected">
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
  },
  computed: {
    ...mapGetters({ user: 'getUser', isSelected: 'getSelect' })
  },
  methods: {
    ...mapActions(['getUserById']),
    ...mapMutations(['setSelect'])
  }
}
</script>

<style src="@/assets/css/style.css"></style>
