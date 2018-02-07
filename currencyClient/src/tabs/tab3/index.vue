<template id="tab3">
<v-ons-page>
  <v-ons-navigator :page-stack='pageStack[2]' :options="{animation: 'slide'}">
  </v-ons-navigator>
</v-ons-page>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import currency from './currency.vue'

export default {
  name: 'tab3',

  computed: {
    ...mapGetters([
      'pageStack'
    ])
  },

  beforeCreate() {
    this.$store.commit('TAB_PUSHSTACK', {
      tabindex: 2,
      page: currency
    });
  }
}
</script>
