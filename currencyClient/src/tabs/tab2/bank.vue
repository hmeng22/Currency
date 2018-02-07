<template>
<v-ons-page>
  <v-ons-toolbar>
    <div class="center">{{this.$t("tabs.institution")}}</div>
  </v-ons-toolbar>

  <v-ons-list>
    <v-ons-list-item v-for='(i, index) in institutions' :key='index' @click="pushBankCurrency(i)" modifier="chevron longdivider" tappable>{{i.name}}</v-ons-list-item>
  </v-ons-list>
</v-ons-page>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import currencyCheck from './currencyCheck.vue'

export default {

  computed: {
    ...mapGetters([
      'institutions'
    ])
  },

  methods: {
    pushBankCurrency(i) {
      this.$store.dispatch('PAGE_PROPS', {
        tabindex: 1,
        key: 'institution',
        value: i
      }).then(() => {
        this.$store.commit('TAB_PUSHSTACK', {
          tabindex: 1,
          page: currencyCheck
        });
      });
    }
  }
}
</script>
