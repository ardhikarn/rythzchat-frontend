<template>
  <CardAuth title="Login" description="Hi, Welcome back!">
    <template #body>
      <form @submit.prevent="onSubmit">
        <div class="form-group-auth">
          <ValidationProvider name="email" rules="required|email">
            <div slot-scope="{ errors, classes }">
              <label>Email</label>
              <small class="d-block text-danger">{{ errors[0] }}</small>
              <input
                type="email"
                v-model="form.user_email"
                name="email"
                class="form-control"
                :class="classes"
              />
            </div>
          </ValidationProvider>
        </div>
        <div class="form-group-auth">
          <ValidationProvider name="email" rules="required">
            <div slot-scope="{ errors, classes }">
              <label>Password</label>
              <small class="d-block text-danger">{{ errors[0] }}</small>

              <input
                type="password"
                v-model="form.user_password"
                name="password"
                class="form-control"
                :class="classes"
              />
            </div>
          </ValidationProvider>
        </div>
        <router-link
          :to="{ name: 'ForgotPassword' }"
          class="float-right font-14 my-2 text-decoration-none"
          >Forgot Password ?</router-link
        >
        <div class="clearfix"></div>
        <g-button
          type="submit"
          :isLoading="getLoading"
          class="btn btn-lb btn-block mt-3 p-auth rounded-pill"
          >Login</g-button
        >
        <div class="log-with my-4 border-bottom text-center position-relative">
          <span class="bg-white p-3 font-13">Login With</span>
        </div>
        <button
          type="button"
          class="btn btn-outline-lb btn-block p-auth rounded-pill d-flex align-items-center justify-content-center"
        >
          <g-image url="icon/google.svg" class="mr-2" />Google
        </button>
        <p class="text-center mt-4 mb-0 font-14">
          Don’t have an account?
          <router-link :to="{ name: 'Register' }">Sign Up</router-link>
        </p>
      </form>
    </template>
    <!-- <div class="background">
        <b-container class="py-5">
          <b-row class="justify-content-center">
            <b-col xl="5" cols="9" class="item py-4 px-5">
              <h4 class="bluetext text-center my-3">Login</h4>
              <p class="my-4">Hi, Welcome Back !</p>
              <b-alert
                show
                variant="danger"
                v-show="isError"
                class="text-center"
                >{{ error }}</b-alert
              >
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
      </div> -->
  </CardAuth>
</template>

<script>
import CardAuth from '@/components/CardAuth'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
    CardAuth
  },
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getLoading'])
  },
  methods: {
    ...mapActions(['login', 'patchActivity']),
    onSubmit() {
      this.login(this.form)
        .then((result) => {
          this.makeToast('success', 'Success', result.message)
          setTimeout(() => {
            if (
              result.data.user_about === null ||
              result.data.user_about === '' ||
              result.data.user_phone === null ||
              result.data.user_phone === ''
            ) {
              this.$router.push('/profile-user')
            } else {
              const patchActive = {
                id: result.data.user_id,
                form: {
                  user_activity: 1,
                  user_updated_at: new Date()
                }
              }
              this.patchActivity(patchActive)
              this.$router.push('/home')
            }
          }, 1500)
        })
        .catch((error) => {
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
