<template>
  <CardAuth
    title="Activation Account"
    needBack
    description="Congratulation, Your Account is Active Now "
  >
    <template #body>
      <p class="my-4">
        You can login now,
        <router-link to="/login">
          <span style="color: #7e98df">Here</span>
        </router-link>
      </p>
    </template>
  </CardAuth>
  <!-- <div class="background">
    <b-container class="py-5">
      <b-row class="justify-content-center">
        <b-col xl="5" cols="9" class="item py-4 px-5" style="height: 550px">
          <h4 class="bluetext text-center my-3">
            Activation Account is Success
          </h4>

          <p class="my-4">
            You can login now,
            <router-link to="/login">
              <span style="color: #7e98df">Here</span>
            </router-link>
          </p>
        </b-col>
      </b-row>
    </b-container>
  </div> -->
</template>

<script>
import CardAuth from '@/components/CardAuth'
import { mapActions } from 'vuex'

export default {
  name: 'SuccessActivate',
  components: {
    CardAuth
  },
  created() {
    this.activationAccount(this.$route.query.keys)
  },
  methods: {
    ...mapActions(['activationAccount'])
  }
}
</script>

<style src="@/assets/css/style.css"></style>
