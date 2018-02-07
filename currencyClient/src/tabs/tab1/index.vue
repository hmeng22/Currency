<template id="tab1">
<v-ons-page>
  <v-ons-navigator :page-stack='pageStack[0]' :options="{animation: 'slide'}">
  </v-ons-navigator>
</v-ons-page>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import home from './home.vue'

export default {
  name: 'tab1',

  computed: {
    ...mapGetters([
      'pageStack'
    ])
  },

  beforeCreate() {
    this.$store.commit('TAB_PUSHSTACK', {
      tabindex: 0,
      page: home
    });
  }
}
</script>
