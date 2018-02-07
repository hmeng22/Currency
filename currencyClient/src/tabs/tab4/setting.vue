<template>
<v-ons-page>
  <v-ons-toolbar>
    <div class="center">{{this.$t("tabs.me")}}</div>
  </v-ons-toolbar>

  <v-ons-list>
    <v-ons-list-item class="top" modifier="chevron longdivider" tappable @click='pushSetting("user")'>{{userconf ? userconf.username : ''}}</v-ons-list-item>
  </v-ons-list>

  <v-ons-row class="gap40"></v-ons-row>
  <v-ons-list>
    <v-ons-list-item modifier="chevron longdivider" tappable @click='pushSetting("feedback")'>{{this.$t("tabs.feedback")}}</v-ons-list-item>
    <v-ons-list-item modifier="chevron longdivider" tappable @click='pushSetting("aboutus")'>{{this.$t("tabs.aboutus")}}</v-ons-list-item>
    <v-ons-list-item modifier="longdivider">
      <div class="left">
        {{this.$t("tabs.currentVersion")}}
      </div>
      <div class="right">
        {{version}}
      </div>
    </v-ons-list-item>
  </v-ons-list>

</v-ons-page>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import user from './user.vue'
import feedback from './feedback.vue'
import aboutus from './aboutus.vue'

export default {
  computed: {
    ...mapGetters([
      'userconf',
      'version'
    ])
  },

  methods: {
    pushSetting(s) {
      var page;
      switch (s) {
        case "user":
          page = user;
          break;
        case "feedback":
          page = feedback;
          break;
        case "aboutus":
          page = aboutus;
          break;
      };
      this.$store.commit('TAB_PUSHSTACK', {
        tabindex: 3,
        page: page
      });
    }
  }
}
</script>

<style scoped>
.top {
  height: 90px;
  margin: 10px 0px;
}
</style>
