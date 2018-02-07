<template>
<v-ons-page>
  <v-ons-toolbar>
    <div class="left">
      <v-ons-back-button>{{this.$t("tabs.currency")}}</v-ons-back-button>
    </div>
    <div class="center">{{this.currency.name}}</div>
  </v-ons-toolbar>

  <bar-chart :iscsrates='iscsrates'></bar-chart>
</v-ons-page>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import lineChart from '@/components/lineChart.vue'
import barChart from '@/components/barChart.vue'

export default {

  data() {
    return {
      iscsrates: []
    }
  },

  computed: {
    ...mapGetters([
      'pageStackProps'
    ]),

    currency() {
      return this.pageStackProps[2].currency;
    },

    institutions() {
      return this.pageStackProps[2].institutions;
    }
  },

  mounted() {
    // TODO : create chart using {currencyBanks}
    var iscs = []
    for (var i = 0; i < this.institutions.length; i++) {
      iscs.push({
        institution_swift: this.institutions[i],
        currency_code: this.currency.code
      })
    }

    this.axios.get('/v1/iscsrates', {
      params: {
        iscs: JSON.stringify(iscs)
      }
    }).then((res) => {
      var result = res.data;
      if (result.success) {
        this.iscsrates = result.iscsrates;
      }
    }).catch((err) => {
      this.$ons.notification.toast('Fetch data error.', {
        animation: 'fall',
        timeout: 3000,
        class: 'toastclass'
      });
    })
  },

  components: {
    lineChart,
    barChart
  }
}
</script>

<style lang="css">
</style>
