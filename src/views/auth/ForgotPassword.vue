<template>
  <div class="background">
    <b-container class="py-5">
      <b-row class="justify-content-center">
        <b-col xl="5" cols="9" class="item py-4 px-5" style="height: 550px">
          <b-row>
            <b-col cols="1" class="align-self-center">
              <routerLink class="toLogin" to="/login">&lt;</routerLink>
            </b-col>
            <b-col cols="10">
              <h4 class="bluetext text-center my-3">Forgot Password</h4>
            </b-col>
            <b-col cols="1"></b-col>
          </b-row>

          <p class="my-4" v-show="!isSuccess">
            You'll get messages soon on your e-mail
          </p>
          <b-alert
            show
            variant="danger"
            v-show="isError"
            class="my-2 text-center"
            >{{ error }}</b-alert
          >
          <b-alert show variant="success" v-show="isSuccess"
            >Please check email for Reset Password</b-alert
          >
          <b-form @submit.prevent="onSubmit" v-show="!isSuccess">
            <div class="my-5">
              <p class="my-1 text-secondary">Email</p>
              <input
                class="inputset"
                required
                type="email"
                v-model="form.user_email"
              />
            </div>
            <b-button type="submit" class="blue btn-block my-4 rounded-pill"
              >Send</b-button
            >
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ForgotPassword',
  data() {
    return {
      form: {
        user_email: ''
      },
      isError: false,
      isSuccess: false,
      error: ''
    }
  },
  methods: {
    ...mapActions(['sendEmailPassword']),
    onSubmit() {
      this.sendEmailPassword(this.form)
        .then((result) => {
          this.isError = false
          this.isSuccess = true
        })
        .catch((error) => {
          this.isError = true
          this.error = error.data.message
        })
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
