<template>
<v-ons-page>
  <v-ons-toolbar>
    <div class="left">
      <v-ons-back-button>{{this.$t("tabs.institution")}}</v-ons-back-button>
    </div>
    <div class="center">{{this.$t("tabs.currency")}}</div>
  </v-ons-toolbar>

  <v-ons-list>
    <v-ons-list-item v-for="(c, index) in institution.foreigncurrenycodes" :key="index" @click="pushCurrencyChart(c)" modifier="chevron longdivider" tappable>{{currencyName(c)}}</v-ons-list-item>
  </v-ons-list>
</v-ons-page>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import bankCurrencyChart from './bankCurrencyChart.vue'

export default {

  computed: {
    ...mapGetters([
      'pageStackProps',
      'currencies'
    ]),

    institution() {
      return this.pageStackProps[1].institution;
    }
  },

  methods: {
    currencyName(c) {
      for (var i = 0; i< this.currencies.length; i++) {
        if (this.currencies[i].code == c) {
          return this.currencies[i].name
        }
      }
      return c;
    },

    pushCurrencyChart(c) {
      this.$ons.notification.toast('' + c, {
        timeout: 500,
        force: true
      });

      this.$store.dispatch('PAGE_PROPS', {
        tabindex: 1,
        key: 'currency',
        value: c
      }).then(() => {
        this.$store.commit('TAB_PUSHSTACK', {
          tabindex: 1,
          page: bankCurrencyChart
        });
      });
    }
  }
}
</script>
