<template>
  <b-container fluid>
    <b-row>
      <b-col lg="4" md="5" class="bg-white px-4 max-vh-100 overflow-auto">
        <Menu :class="[isSelected ? 'mobile' : '']" />

        <div class="mt-4 mb-5" :class="[isSelected ? 'mobile' : '']">
          <router-view @change-type="handleChangeType" />
        </div>
      </b-col>

      <EmptyRoom v-if="!isSelected" />
      <ChatRoom v-if="isSelected" />
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
    return {
      page: 1,
      messages: [],
      infiniteId: +new Date()
    }
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
    ...mapMutations(['setSelect']),
    handleChangeType() {
      this.page = 1
      this.messages = []
      this.infiniteId += 1
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
