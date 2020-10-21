<template>
  <div>
    <div class="chat-list">
      <!-- <div v-if="getAllUser.length > 0">
        <div v-for="user in getAllUser" :key="user.id">
          <UserItem @add-friend="handleAddFriend" :user="user" />
        </div>
      </div> -->
      <div class="text-center">
        <button
          class="btn btn-sm btn-success mb-4"
          @click="$bvModal.show('invite-friend')"
        >
          Find Users Rythz-Chat <b-icon icon="search" />
        </button>

        <h5 class="text-dark mb-5 text-center">There are no more users</h5>
        <div class="image-fluid">
          <ImageNoUser />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageNoUser from '@/components/atoms/ImageNoUser'
export default {
  components: {
    ImageNoUser
  },
  methods: {},
  computed: {}
}
</script>

<style scoped></style>
