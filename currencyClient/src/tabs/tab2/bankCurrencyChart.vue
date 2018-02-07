<template>
<v-ons-page>
  <v-ons-toolbar>
    <div class="left">
      <v-ons-back-button>{{this.$t("tabs.currency")}}</v-ons-back-button>
    </div>
    <div class="center">{{ic}}</div>
  </v-ons-toolbar>

  <line-chart :icrates='icrates'></line-chart>
</v-ons-page>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import lineChart from '@/components/lineChart.vue'

export default {

  data() {
    return {
      icrates: []
    }
  },

  computed: {
    ...mapGetters([
      'pageStackProps'
    ]),

    ic() {
      return this.institution.name + '-' + this.currency
    },

    institution() {
      return this.pageStackProps[1].institution;
    },

    currency() {
      return this.pageStackProps[1].currency;
    }
  },

  mounted() {
    this.axios.get('/v1/iscsrates', {
      params: {
        iscs: JSON.stringify([{
          institution_swift: this.institution.swift,
          currency_code: this.currency
        }])
      }
    }).then((res) => {
      var result = res.data;
      if (result.success) {
        this.icrates = result.iscsrates[0];
      }
    }).catch((err) => {
      this.$ons.notification.toast('Fetch data error.', {
        animation: 'fall',
        timeout: 3000,
        class: 'toastclass'
      });
    });
  },

  components: {
    lineChart
  }
}
</script>

<style lang="css">
</style>
