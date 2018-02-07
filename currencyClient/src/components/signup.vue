<template>
<v-ons-modal :visible="issignup">
  <v-ons-row class="contentwrapper">
    <v-ons-row class="inputwrapper">
      <v-ons-row class="inputfield">
        <v-ons-input type="text" placeholder="Username" float v-model="username">
        </v-ons-input>
      </v-ons-row>
      <v-ons-row class="inputfield">
        <v-ons-input type="email" placeholder="Email" float v-model="email">
        </v-ons-input>
      </v-ons-row>
      <v-ons-row class="inputfield">
        <v-ons-input type="password" placeholder="Password" float v-model="password">
        </v-ons-input>
      </v-ons-row>
    </v-ons-row>

    <v-ons-row>
      <v-ons-col width="100">
        <v-ons-button class="actionbtn" @click="signup">{{this.$t("basic.createAccount")}}</v-ons-button>
      </v-ons-col>
    </v-ons-row>
    <v-ons-row>
      <v-ons-col width="100">
        <v-ons-button class="actionbtn" @click="popToSignIn">{{this.$t("basic.cancel")}}</v-ons-button>
      </v-ons-col>
    </v-ons-row>
  </v-ons-row>
</v-ons-modal>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },

  computed: {
    ...mapGetters([
      'issignup'
    ])
  },

  methods: {
    ...mapActions([
      'UPDATE_ISSIGNIN',
      'UPDATE_ISSIGNUP'
    ]),

    resetInputField() {
      this.username = '';
      this.email = '';
      this.password = '';
    },

    popToSignIn() {
      this.$store.commit('UPDATE_ISSIGNIN', true);
      this.$store.commit('UPDATE_ISSIGNUP', false);
    },

    signup() {
      if (!this.username || !this.email || !this.password) {
        this.resetInputField();
        this.$ons.notification.alert('Invalid Username, Email or Password', {
          title: 'Fail to sign in'
        });
      } else {
        this.axios.post('/signup', {
          username: this.username,
          email: this.email,
          password: this.password
        }).then((response) => {
          this.resetInputField();
          var result = response.data;
          if (!result.success) {
            this.$ons.notification.alert(result.message, {
              title: result.error.name
            });
          } else {
            this.$ons.notification.alert(result.message, {
              title: 'Success'
            });
            this.$store.commit('UPDATE_ISSIGNIN', true);
            this.$store.commit('UPDATE_ISSIGNUP', false);
          }
        }).catch((err) => {
          this.$ons.notification.alert('Sign up service error.', {
            title: 'Error'
          });
        });
      }
    }
  }
}
</script>
