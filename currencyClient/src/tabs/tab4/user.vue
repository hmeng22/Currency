<template>
<v-ons-page>
  <v-ons-toolbar>
    <div class="left">
      <v-ons-back-button>{{this.$t("tabs.setting")}}</v-ons-back-button>
    </div>
    <div class="center">{{this.$t("tabs.user")}}</div>
  </v-ons-toolbar>

  <v-ons-card>
    <h4>{{userconf}}</h4>
  </v-ons-card>

  <v-ons-row>
    <v-ons-col width="100">
      <v-ons-button class="signoutbtn" @click="signout">{{this.$t("basic.signOut")}}</v-ons-button>
    </v-ons-col>
  </v-ons-row>

</v-ons-page>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'userconf'
    ])
  },

  methods: {
    ...mapActions([
      'SIGNOUT'
    ]),

    signout() {
      this.axios.post('/signout').then((response) => {
        var result = response.data;
        if (!result.success) {
          this.$ons.notification.alert(result.message, {
            title: 'Error'
          });
        } else {
          this.$store.dispatch('SIGNOUT').then(() => {
            this.$ons.notification.alert(result.message, {
              title: 'Success'
            });
          });
        }
      }).catch((err) => {
        this.$ons.notification.alert(err, {
          title: 'Error'
        });
      });
    }
  }

}
</script>

<style scoped>
.signoutbtn {
  background-color: transparent;
  border: 1px solid rgba(24, 103, 194, .81);
  color: rgba(24, 103, 194, .81);
  width: 100%;
  margin: 40px auto;
  text-align: center;
}
</style>
