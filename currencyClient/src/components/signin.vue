<template>
<v-ons-modal :visible="issignin">
  <v-ons-row class="contentwrapper">
    <v-ons-row class="inputwrapper">
      <v-ons-row class="inputfield">
        <v-ons-input type="text" placeholder="Username" float v-model="username">
        </v-ons-input>
      </v-ons-row>
      <v-ons-row class="inputfield">
        <v-ons-input type="password" placeholder="Password" float v-model="password">
        </v-ons-input>
      </v-ons-row>
    </v-ons-row>

    <v-ons-row>
      <v-ons-col width="100">
        <v-ons-button class="actionbtn" @click="signin">{{this.$t("basic.signIn")}}</v-ons-button>
      </v-ons-col>
    </v-ons-row>
    <v-ons-row>
      <v-ons-col width="100">
        <v-ons-button class="actionbtn" @click="pushToSignUp">{{this.$t("basic.signUp")}}</v-ons-button>
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
      password: '',
      dialogVisible: false
    }
  },

  computed: {
    ...mapGetters([
      'issignin'
    ])
  },

  methods: {
    ...mapActions([
      'SAVE_TOKEN',
      'UPDATE_ISSIGNIN',
      'UPDATE_ISSIGNUP'
    ]),

    resetInputField() {
      this.username = '';
      this.password = '';
    },

    pushToSignUp() {
      this.$store.commit('UPDATE_ISSIGNIN', false);
      this.$store.commit('UPDATE_ISSIGNUP', true);
    },

    signin() {
      if (!this.username || !this.password) {
        this.resetInputField();
        this.$ons.notification.alert('Invalid Username or Password', {
          title: 'Fail to sign in'
        });
      } else {
        this.axios.post('/signin', {
          username: this.username,
          password: this.password
        }).then((response) => {
          this.resetInputField();
          var result = response.data;
          if (!result.success) {
            this.$ons.notification.alert(result.message, {
              title: 'Error'
            });
          } else {
            this.$store.dispatch('SAVE_TOKEN', result.token).then(()=> {
              this.$store.commit('UPDATE_ISSIGNIN', false);
              this.$store.commit('UPDATE_ISSIGNUP', false);
              this.$store.dispatch('LOAD_LOCALDATABASE', true)
            });
          }
        }).catch((err) => {
          this.$ons.notification.alert('Network Error', {
            title: 'Error'
          });
          this.password = '';
        });
      }
    }
  }
}
</script>
