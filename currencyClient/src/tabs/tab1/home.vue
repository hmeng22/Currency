<template>
<v-ons-page>
  <v-ons-toolbar>
    <div class="center">{{this.$t("tabs.subscribed")}}</div>
    <div class="right">
      <v-ons-toolbar-button>
        <v-ons-icon icon="ion-plus-round" @click="pushToBank"></v-ons-icon>
      </v-ons-toolbar-button>
    </div>
  </v-ons-toolbar>

  <v-ons-list>
    <v-ons-item v-for='(ic, index) in subscribedIC' :key="index">
      <price-tag :ic='ic'></price-tag>
    </v-ons-item>
  </v-ons-list>
</v-ons-page>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import priceTag from './priceTag.vue'
import bank from './bank.vue'

export default {
  name : 'tab1home',
  
  computed: {
    ...mapGetters([
      'subscribedIC'
    ])
  },

  methods: {
    pushToBank() {
      this.$store.commit('TAB_PUSHSTACK', {
        tabindex: 0,
        page: bank
      });
    }
  },

  components: {
    priceTag
  }

}
</script>
