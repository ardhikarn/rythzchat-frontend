<template>
  <b-container fluid style="height: 100vh; overflow: auto">
    <b-row class="p-0">
      <b-col cols="3" style="width: 100%" class="px-4 py-2 message">
        <b-row class="justify-content-center">
          <b-col cols="6">
            <h3>Telegram</h3>
          </b-col>
          <b-col cols="4"></b-col>
          <b-col cols="2" class="align-self-center">
            <b-img
              :src="require('@/assets/img/menu.png')"
              fluid
              style="width: 25px"
              right
              id="setting-popover"
            ></b-img>
            <b-popover
              placement="bottomleft"
              target="setting-popover"
              triggers="click"
            >
              <b-row class="text-white">
                <b-col cols="3">
                  <b-icon icon="pencil" font-scale="1.1"></b-icon>
                </b-col>
                <b-col cols="9">
                  <routerLink to="/profile-user"> Setting </routerLink>
                </b-col>
              </b-row>
              <hr />
              <b-row class="text-white">
                <b-col cols="3">
                  <b-icon icon="pencil" font-scale="1.1"></b-icon>
                </b-col>
                <b-col cols="9">Contacts</b-col>
              </b-row>
              <hr />

              <b-row class="text-white">
                <b-col cols="3">
                  <b-icon icon="pencil" font-scale="1.1"></b-icon>
                </b-col>
                <b-col cols="9">Calls</b-col>
              </b-row>
              <hr />

              <b-row class="text-white">
                <b-col cols="3">
                  <b-icon icon="pencil" font-scale="1.1"></b-icon>
                </b-col>
                <b-col cols="9">Save Messages</b-col>
              </b-row>
              <hr />

              <b-row class="text-white">
                <b-col cols="3">
                  <b-icon icon="pencil" font-scale="1.1"></b-icon>
                </b-col>
                <b-col cols="9">Invite Friends</b-col>
              </b-row>
              <hr />

              <b-row class="text-white">
                <b-col cols="3">
                  <b-icon icon="pencil" font-scale="1.1"></b-icon>
                </b-col>
                <b-col cols="9" @click="toLogout">Sign Out</b-col>
              </b-row>
            </b-popover>
          </b-col>
        </b-row>
        <div class="text-center">
          <b-img
            :src="require('@/assets/img/opinion3.jpg')"
            fluid
            class="my-3 img-border"
            style="width: 100px"
          ></b-img>
          <h5 class="mb-0 text-uppercase">
            <strong>{{ user.user_name }}</strong>
          </h5>
          <p class="text-lowercase">@{{ user.user_name }}</p>
        </div>
        <b-row class="mt-4">
          <b-col cols="10" class="pr-0">
            <div class="input-field bg-light rounded-pill px-2 py-1">
              <b-icon
                icon="search"
                font-scale="0.9"
                class="align-self-center mx-auto"
              ></b-icon>
              <input
                required
                type="text"
                placeholder="Type your message..."
                class="border-0"
              />
            </div>
          </b-col>
          <b-col cols="2" class="align-self-center">
            <b-img
              :src="require('@/assets/img/plus.png')"
              fluid
              style="width: 28px"
            ></b-img>
          </b-col>
          <b-col cols="12" class="mt-2">
            <b-tabs
              style="font-size: 20px"
              no-nav-style
              content-class="mt-2"
              active-nav-item-class="font-weight-bold text-dark"
            >
              <b-tab title="All" class="px-3" active>
                <b-row class="mb-3">
                  <b-col cols="3" class="px-0">
                    <b-img
                      :src="require('@/assets/img/opinion3.jpg')"
                      fluid
                      class="img-border"
                    ></b-img>
                  </b-col>
                  <b-col cols="7">
                    <p class="mb-0 font-weight-bold">Ardhika</p>
                    <small>this is message</small>
                  </b-col>
                  <b-col cols="2" class="px-0 text-center">
                    <small>17:17</small>
                    <b-badge pill variant="info">2</b-badge>
                  </b-col>
                </b-row>
              </b-tab>

              <b-tab title="Important" class="px-3">
                <b-row class="mb-3">
                  <b-col cols="3" class="px-0">
                    <b-img
                      :src="require('@/assets/img/opinion3.jpg')"
                      fluid
                      class="img-border"
                    ></b-img>
                  </b-col>
                  <b-col cols="7">
                    <p class="mb-0 font-weight-bold">Ardhika</p>
                    <small>this is message</small>
                  </b-col>
                  <b-col cols="2" class="px-0 text-center">
                    <small>17:17</small>
                    <b-badge pill variant="info">2</b-badge>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab title="Unread" class="px-3">
                <b-row class="mb-3">
                  <b-col cols="3" class="px-0">
                    <b-img
                      :src="require('@/assets/img/opinion3.jpg')"
                      fluid
                      class="img-border"
                    ></b-img>
                  </b-col>
                  <b-col cols="7">
                    <p class="mb-0 font-weight-bold">Ardhika</p>
                    <small>this is message</small>
                  </b-col>
                  <b-col cols="2" class="px-0 text-center">
                    <small>17:17</small>
                    <b-badge pill variant="info">2</b-badge>
                  </b-col>
                </b-row>
              </b-tab>
            </b-tabs>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="9" class="bg-dark p-4 message">
        <div class="text-center non-message">
          <p>Please select a chat to start messaging</p>
        </div>
        <!-- <div class="">inchat</div> -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {}
  },
  components: {},
  computed: {
    ...mapGetters({ user: 'getUser' })
  },
  methods: {
    ...mapActions(['logout']),
    toLogout() {
      this.$bvModal
        .msgBoxConfirm('logout account?', {
          cancelVariant: 'danger',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
        .then((value) => {
          this.isLogout = value
          this.isLogout ? this.logout() : console.log(value)
        })
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
