<template>
  <CardAuth title="Register" needBack description="Let’s create your account!">
    <template #body>
      <form @submit.prevent="onSubmit">
        <div class="form-group-auth">
          <label>Name</label>
          <input
            type="text"
            v-model="form.user_name"
            name="name"
            class="form-control"
          />
        </div>
        <div class="form-group-auth">
          <label>Email</label>
          <input
            type="email"
            name="email"
            v-model="form.user_email"
            class="form-control"
          />
        </div>
        <div class="form-group-auth">
          <label>Password</label>
          <input
            type="password"
            name="password"
            v-model="form.user_password"
            class="form-control"
          />
        </div>
        <g-button
          type="submit"
          :isLoading="getLoading"
          class="btn-lb btn-block mt-4 p-auth rounded-pill"
          >Register</g-button
        >
        <div class="log-with my-4 border-bottom text-center position-relative">
          <span class="bg-white p-3 font-13">Register With</span>
        </div>
        <button
          type="button"
          class="btn btn-outline-lb btn-block p-auth rounded-pill d-flex align-items-center justify-content-center"
        >
          <g-image url="icon/google.svg" class="mr-2" />Google
        </button>
      </form>
    </template>
  </CardAuth>
  <!-- <div class="background">
    <b-container class="py-5">
      <b-row class="justify-content-center">
        <b-col xl="5" cols="9" class="item py-4 px-5" v-show="!isSuccess">
          <b-row>
            <b-col class="1 align-self-center">
              <routerLink class="toLogin" to="/login">&lt;</routerLink>
            </b-col>
            <b-col class="10">
              <h4 class="bluetext text-center my-3">Register</h4>
            </b-col>
            <b-col class="1"></b-col>
          </b-row>

          <p class="my-4" v-show="!isSuccess">Let's Create Your Account</p>
          <b-alert show variant="danger" v-show="isError" class="text-center">
            {{ error }}
          </b-alert>
          <b-form @submit.prevent="onSubmit" v-show="!isSuccess">
            <div class="my-5">
              <p class="my-1 text-secondary">Name</p>
              <input
                class="inputset"
                required
                type="text"
                v-model="form.user_name"
              />
            </div>
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
            <b-button type="submit" class="blue btn-block my-4 rounded-pill"
              >Register</b-button
            >
          </b-form>
          <div class="text-center">
            <small>Register With</small>
          </div>
          <b-button
            type="button"
            class="btn-block my-4 rounded-pill bg-white"
            style="border: 1px solid #7e98df; color: #7e98df"
            >Google</b-button
          >
        </b-col>
        <b-col xl="5" cols="9" class="item py-4 px-5" v-show="isSuccess">
          <b-row>
            <b-col cols="12">
              <h4 class="bluetext text-center my-3">Register Success !</h4>
              <b-alert show variant="success" v-show="isSuccess">
                Check Your Email for Activation Account.
              </b-alert>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div> -->
</template>

<script>
import CardAuth from '@/components/CardAuth'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  components: {
    CardAuth
  },
  data() {
    return {
      form: {
        user_name: '',
        user_email: '',
        user_password: ''
      }
    }
  },
  created() {},
  computed: {
    ...mapGetters(['getLoading'])
  },
  methods: {
    ...mapActions(['register', 'sendEmailActivation']),
    onSubmit() {
      this.register(this.form)
        .then(result => {
          const activation = {
            user_email: this.form.user_email
          }
          this.sendEmailActivation(activation)
            .then(result => {
              this.makeToast(
                'info',
                'Register Success',
                'Check Your Email for Activation Account'
              )
              setTimeout(() => {
                this.$router.push('/login')
              }, 2000)
            })
            .catch(error => {
              this.makeToast('danger', 'Error', error.data.message)
            })
        })
        .catch(error => {
          this.makeToast('danger', 'Error', error.data.message)
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
