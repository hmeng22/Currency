<template id="tab2">
<v-ons-page>
  <v-ons-navigator :page-stack='pageStack[1]' :options="{animation: 'slide'}">
  </v-ons-navigator>
</v-ons-page>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import bank from './bank.vue'

export default {
  name: 'tab2',

  computed: {
    ...mapGetters([
      'pageStack'
    ])
  },

  beforeCreate() {
    this.$store.commit('TAB_PUSHSTACK', {
      tabindex: 1,
      page: bank
    });
  }
}
</script>
