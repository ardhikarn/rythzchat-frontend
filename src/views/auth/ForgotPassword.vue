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

          <p class="my-4">You'll get messages soon on your e-mail</p>
          <!-- <b-alert show variant="danger" v-show="isError" class="my-2 text-center">{{ error() }}</b-alert> -->
          <b-form @submit.prevent="onSubmit">
            <div class="my-5">
              <p class="my-1 text-secondary">Email</p>
              <input class="inputset" required type="email" v-model="form.user_email" />
            </div>
            <b-button type="submit" class="blue btn-block my-4 rounded-pill">Send</b-button>
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
