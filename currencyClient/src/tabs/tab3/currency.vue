<template>
<v-ons-page>
  <v-ons-toolbar>
    <div class="center">{{this.$t("tabs.currency")}}</div>
  </v-ons-toolbar>

  <v-ons-list>
    <v-ons-list-item v-for='(c, index) in currencies' :key='index' @click="pushCurrencyBank(c)" modifier="chevron longdivider" tappable>{{c.name}}</v-ons-list-item>
  </v-ons-list>
</v-ons-page>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import bankSelect from './bankSelect.vue'

export default {

  computed: {
    ...mapGetters([
      'currencies'
    ])
  },

  methods: {
    pushCurrencyBank(c) {
      this.$store.dispatch('PAGE_PROPS', {
        tabindex: 2,
        key: 'currency',
        value: c
      }).then(() => {
        this.$store.commit('TAB_PUSHSTACK', {
          tabindex: 2,
          page: bankSelect
        });
      });
    }
  }
}
</script>
