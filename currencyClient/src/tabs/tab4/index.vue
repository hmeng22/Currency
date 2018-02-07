<template id="tab4">
<v-ons-page>
  <v-ons-navigator :page-stack='pageStack[3]' :options="{animation: 'slide'}">
  </v-ons-navigator>
</v-ons-page>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import setting from './setting.vue'

export default {
  name: 'tab4',

  computed: {
    ...mapGetters([
      'pageStack'
    ])
  },

  beforeCreate() {
    this.$store.commit('TAB_PUSHSTACK', {
      tabindex: 3,
      page: setting
    });
  }
}
</script>
