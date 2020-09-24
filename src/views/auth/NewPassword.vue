<template>
  <div class="background">
    <b-container class="py-5">
      <b-row class="justify-content-center">
        <b-col xl="5" cols="9" class="item py-4 px-5" style="height: 550px">
          <h4 class="bluetext text-center my-3">New Password</h4>

          <p class="my-4">Input your New Password</p>
          <!-- <b-alert show variant="danger" v-show="isError" class="my-2 text-center">{{ error() }}</b-alert> -->
          <b-form @submit.prevent="onSubmit">
            <div class="my-5">
              <p class="my-1 text-secondary">New Password</p>
              <input
                class="inputset"
                required
                type="email"
                v-model="form.user_email"
              />
            </div>
            <div class="my-5">
              <p class="my-1 text-secondary">Confirm New Password</p>
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
export default {
  name: 'NewPassword',
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
