<template>
  <div>
    <div class="chat-list">
      <!-- <div v-if="getGroupRoom.length > 0">
        <div v-for="room in getGroupRoom" :key="room.id">
          <ContactItem @detail-message="handleDetailMessage" :room="room" />
        </div>
      </div> -->
      <div>
        <h5 class="text-dark mb-5 text-center">There are no group</h5>
        <g-image
          url="illustration/nogroup.svg"
          class="img-fluid px-1"
          alt="private"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {},
  mounted() {},
  computed: {}
}
</script>

<style scoped></style>
