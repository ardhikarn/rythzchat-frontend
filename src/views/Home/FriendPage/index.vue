<template>
  <div>
    <div class="overflow-auto">
      <b-tabs content-class="mt-4">
        <b-tab active>
          <template v-slot:title>
            <b-icon icon="people-fill" />
          </template>
          <b-card-text>
            <!-- <div v-if="getMyFriend.length > 0">
              <p>Friends list</p>
              <div v-for="friend in getMyFriend" :key="friend.id">
                <FriendItem :friend="friend" />
              </div>
            </div> -->
            <div class="text-center">
              <h5 class="text-dark mb-3">No friends yet</h5>
              <button
                class="btn btn-sm btn-success"
                @click="$router.push({ name: 'Users' })"
              >
                Find Friends <b-icon icon="search" />
              </button>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <b-icon icon="person-plus-fill" />
            <!-- <span v-if="getFriendRequest.length > 0">
              ({{ getFriendRequest.length }})
            </span> -->
          </template>
          <b-card-text>
            <!-- <div v-if="getFriendRequest.length > 0">
              <p>
                List of friend requests
                <b-spinner
                  v-if="getLoading"
                  class="ml-1"
                  type="border"
                  small
                ></b-spinner>
              </p>
              <div v-for="friend in getFriendRequest" :key="friend.id">
                <FriendItem
                  @acc-friend="handleAcc"
                  @reject-friend="handleReject"
                  :friend="friend"
                />
              </div>
            </div> -->
            <div class="text-center">
              <h5 class="text-dark mb-3">No friends request yet</h5>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <b-icon icon="clock-fill" />
            <!-- <span v-if="getFriendRequestPending.length > 0">
              ({{ getFriendRequestPending.length }})
            </span> -->
          </template>
          <b-card-text>
            <!-- <div v-if="getFriendRequestPending.length > 0">
              <p>List of pending friend requests</p>
              <div v-for="friend in getFriendRequestPending" :key="friend.id">
                <FriendItem :friend="friend" />
              </div>
            </div> -->
            <div class="text-center">
              <h5 class="text-dark mb-3">No pending request yet</h5>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <b-icon icon="person-x-fill" />
            <!-- <span v-if="getFriendRequestRejected.length > 0">
              ({{ getFriendRequestRejected.length }})
            </span> -->
          </template>
          <b-card-text>
            <!-- <div v-if="getFriendRequestRejected.length > 0">
              <p>List of friend requests rejected</p>
              <div v-for="friend in getFriendRequestRejected" :key="friend.id">
                <FriendItem
                  @delete-decline-friend="handleDeleteDeclineFriend"
                  :friend="friend"
                />
              </div>
            </div> -->
            <div class="text-center">
              <h5 class="text-dark mb-3">No rejected request yet</h5>
            </div>
          </b-card-text>
        </b-tab>
      </b-tabs>
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
