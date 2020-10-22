<template>
  <div>
    <div class="chat-list">
      <!-- <div v-if="rooms.length > 0">
        <div v-for="(value, index) in rooms" :key="index">
          <ContactItem
            @toggle-notification="handleToggleNotif"
            @detail-message="handleDetailMessage"
            :room="room"
          />
        </div>
      </div> -->
      <div>
        <h5 class="text-danger text-center">Chat is Not Found !</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {},
  computed: {}
}
</script>

<style scoped></style>
