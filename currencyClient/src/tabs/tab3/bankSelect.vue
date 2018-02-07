<template>
<v-ons-page>
  <v-ons-toolbar>
    <div class="left">
      <v-ons-back-button>{{this.$t("tabs.currency")}}</v-ons-back-button>
    </div>
    <div class="center">{{this.$t("tabs.institution")}}</div>
    <div class="right">
      <v-ons-toolbar-button v-if='selectedIs.length' @click='compareCs'>
        {{this.$t("tabs.chart")}}
      </v-ons-toolbar-button>
    </div>
  </v-ons-toolbar>

  <v-ons-list>
    <v-ons-list-item v-for="(b, index) in currency.institutionSWIFT" :key="index" tappable>
      <label class="left">
        <v-ons-checkbox :input-id="'checkbox-' + index" :value="b" v-model="selectedIs"></v-ons-checkbox>
      </label>
      <label class="center" :for="'checkbox-' + index">
        {{institutionName(b)}}
      </label>
    </v-ons-list-item>
  </v-ons-list>
</v-ons-page>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import currencyBankChart from './currencyBankChart.vue'

export default {
  data() {
    return {
      selectedIs: []
    }
  },

  computed: {
    ...mapGetters([
      'pageStackProps',
      'institutions'
    ]),

    currency() {
      return this.pageStackProps[2].currency;
    }
  },

  methods: {
    institutionName(b) {
      for (var i = 0; i < this.institutions.length; i++) {
        if (this.institutions[i].swift == b) {
          return this.institutions[i].name
        }
      }
      return c;
    },

    compareCs() {
      this.$store.dispatch('PAGE_PROPS', {
        tabindex: 2,
        key: 'institutions',
        value: this.selectedIs
      }).then(() => {
        this.$store.commit('TAB_PUSHSTACK', {
          tabindex: 2,
          page: currencyBankChart
        });
      });
    }
  }
}
</script>

<style lang="css">
</style>
