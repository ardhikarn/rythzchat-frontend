<template>
  <div class="background">
    <b-container class="py-5">
      <b-row class="justify-content-center">
        <b-col xl="5" cols="9" class="item py-4 px-5">
          <h4 class="bluetext text-center my-3">Login</h4>
          <p class="my-4">Hi, Welcome Back !</p>
          <b-alert show variant="danger" v-show="isError" class="text-center">{{
            error
          }}</b-alert>
          <b-form @submit.prevent="onSubmit">
            <div class="my-5">
              <p class="my-1 text-secondary">Email</p>
              <input
                class="inputset"
                required
                type="email"
                v-model="form.user_email"
              />
            </div>
            <div class>
              <p class="my-1 text-secondary">Password</p>
              <input
                class="inputset mb-4"
                required
                type="password"
                v-model="form.user_password"
              />
            </div>
            <div class="text-right">
              <routerLink class="my-4 text-right" to="/forgot-password"
                >Forgot password ?</routerLink
              >
            </div>
            <b-button type="submit" class="blue btn-block my-4 rounded-pill"
              >Login</b-button
            >
          </b-form>
          <div class="text-center">
            <small>Login With</small>
          </div>
          <b-button
            type="button"
            class="btn-block my-4 rounded-pill bg-white"
            style="border: 1px solid #7e98df; color: #7e98df"
            >Google</b-button
          >
          <div class="text-center">
            <small>
              Don't have an account ?
              <router-link to="/register">Sign Up</router-link>
            </small>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      },
      isError: false,
      error: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      this.login(this.form)
        .then((result) => {
          // console.log(result)
          this.makeToast('success', 'Success', 'Login Success')
          setTimeout(() => {
            this.$router.push('/profile-user')
          }, 1500)
        })
        .catch((error) => {
          // console.log(error)
          this.isError = true
          this.error = error.data.message
        })
    },
    makeToast(variant, title, message) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true
      })
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
