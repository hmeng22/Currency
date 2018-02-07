<template>
<v-ons-page>
  <v-ons-toolbar>
    <div class="left">
      <v-ons-back-button>{{this.$t("tabs.institution")}}</v-ons-back-button>
    </div>
    <div class="center">{{this.$t("tabs.currency")}}</div>
    <div class="right">
      <v-ons-toolbar-button @click='subscribeCs'>
        {{this.$t("basic.done")}}
      </v-ons-toolbar-button>
    </div>
  </v-ons-toolbar>

  <v-ons-list>
    <v-ons-list-item v-for="(c, index) in institution.foreigncurrenycodes" :key="index" tappable>
      <label class="left">
        <v-ons-input type="checkbox" :input-id="'checkbox-' + index" :value="c" v-model="selectedCs"></v-ons-input>
      </label>
      <label class="center" :for="'checkbox-' + index">
        {{currencyName(c)}}
      </label>
    </v-ons-list-item>
  </v-ons-list>
</v-ons-page>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  data() {
    return {
      selectedCs: []
    }
  },

  computed: {
    ...mapGetters([
      'pageStackProps',
      'currencies',
      'subscribedIC'
    ]),

    institution() {
      return this.pageStackProps[0].institution;
    }
  },

  mounted() {
    this.subscribedIC.forEach((ic) => {
      if (ic.institution_swift == this.institution.swift) {
        this.selectedCs.push(ic.currency_code);
      }
    });
  },

  methods: {
    ...mapActions([
      'ADD_SUBSCRIBEDIC'
    ]),

    currencyName(c) {
      for (var i = 0; i < this.currencies.length; i++) {
        if (this.currencies[i].code == c) {
          return this.currencies[i].name
        }
      }
      return c;
    },

    subscribeCs() {
      var ics = [];
      var institution_swift = this.institution.swift;
      this.selectedCs.forEach((c) => {
        ics.push({
          date: Date.now(),
          institution_swift: institution_swift,
          currency_code: c
        })
      });

      // sync subscribedics
      this.$store.dispatch('ADD_SUBSCRIBEDIC', {
        institution_swift,
        ics
      });
    }
  }
}
</script>
