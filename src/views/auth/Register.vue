<template>
  <div class="background">
    <b-container class="py-5">
      <b-row class="justify-content-center">
        <b-col xl="5" cols="9" class="item py-4 px-5">
          <b-row>
            <b-col class="1 align-self-center">
              <routerLink class="toLogin" to="/login">&lt;</routerLink>
            </b-col>
            <b-col class="10">
              <h4 class="bluetext text-center my-3">Register</h4>
            </b-col>
            <b-col class="1"></b-col>
          </b-row>

          <p class="my-4">Let's Create Your Account</p>
          <!-- <b-alert show variant="danger" v-show="isError" class="my-2 text-center">{{ error() }}</b-alert> -->
          <b-form @submit.prevent="onSubmit">
            <div class="my-5">
              <p class="my-1 text-secondary">Name</p>
              <input class="inputset" required type="text" v-model="form.user_name" />
            </div>
            <div class="my-5">
              <p class="my-1 text-secondary">Email</p>
              <input class="inputset" required type="email" v-model="form.user_email" />
            </div>
            <div class>
              <p class="my-1 text-secondary">Password</p>
              <input class="inputset mb-4" required type="password" v-model="form.user_password" />
            </div>
            <b-button type="submit" class="blue btn-block my-4 rounded-pill">Register</b-button>
            <div class="text-center">
              <small>Register With</small>
            </div>
            <b-button
              type="button"
              class="btn-block my-4 rounded-pill bg-white bluetext"
              style=" border: 1px solid #7e98df;"
            >Google</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      },
      isError: false
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
