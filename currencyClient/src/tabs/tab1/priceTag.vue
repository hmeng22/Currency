<template>
<div class="pt">
  <v-ons-row class="pt-top">
    <v-ons-col width="70%" class="pt-institution" @click='clickInstitution'><b>{{institution.name}}</b></v-ons-col>
    <v-ons-col width="30%" class="pt-currency" @click='clickCurrency'>{{currency.name}}</v-ons-col>
  </v-ons-row>
  <v-ons-row class="pt-center" @click='toggleChart'>
    <v-ons-row>
      <v-ons-col width="50%" class="pt-info pt-centralprice">
        {{this.$t("priceTag.centralParityRate")}}: {{latestRate.centralparityrate}}
      </v-ons-col>
      <v-ons-col width="50%" class="pt-info pt-datetime">{{latestRate.datetime}}</v-ons-col>
    </v-ons-row>
    <v-ons-row>
      <v-ons-col width="50%" class="pt-info pt-currencybuy">
        {{this.$t("priceTag.buy")}}: {{latestRate.buy}}
      </v-ons-col>
      <v-ons-col width="50%" class="pt-info pt-cashbuy">
        {{this.$t("priceTag.cashBuy")}}: {{latestRate.cashbuy}}
      </v-ons-col>
    </v-ons-row>
    <v-ons-row>
      <v-ons-col width="50%" class="pt-info pt-currencysell">
        {{this.$t("priceTag.sell")}}: {{latestRate.sell}}
      </v-ons-col>
      <v-ons-col width="50%" class="pt-info pt-cashsell">
        {{this.$t("priceTag.cashSell")}}: {{latestRate.cashsell}}
      </v-ons-col>
    </v-ons-row>
  </v-ons-row>
  <v-ons-row v-show="isChartVisiable" class="pt-bottom">
    <div ref="pricechart" style="width: 300px; height: 300px;"></div>
  </v-ons-row>
</div>
</template>

<script>
import echarts from 'echarts'

import currencyCheck from '../tab2/currencyCheck.vue'
import bankSelect from '../tab3/bankSelect.vue'

export default {
  data() {
    return {
      institution: '',
      currency: '',
      rates: [],
      latestRate: {},
      isChartVisiable: false,
      chart: '',
      option: {
        tooltip: {
          trigger: 'axis'
        },
        color: ['#ed9eb1', "#a5f7ef", "#29c68a", "#072668", "#b7bcf7"],
        legend: {
          data: ['中间价', '现汇买入', '现汇卖出', '现金买入', '现金卖出']
        },
        grid: {
          left: '0%',
          right: '4%',
          top: '15%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: [{
          type: 'value',
          axisLabel: {
            formatter: '{value} '
          },
          min: 0,
          max: 0
        }],
        dataZoom: [{
          type: 'inside',
          start: 50,
          end: 100
        }, {
          show: true,
          type: 'slider',
          y: '90%',
          start: 50,
          end: 100
        }],
        series: []
      }
    }
  },

  props: ['ic'],

  mounted() {
    this.axios.get('/v1/subscribedic', {
      params: {
        ic: JSON.stringify({
          institution_swift: this.ic.institution_swift,
          currency_code: this.ic.currency_code
        })
      }
    }).then((res) => {
      var result = res.data;
      if (result.success) {
        var icrates = result.icrates;
        this.institution = icrates.institution;
        this.currency = icrates.currency;
        this.rates = icrates.rates;
        if (this.rates.length > 1) {
          this.latestRate = this.rates[0];
        }
      }
    }).catch((err) => {
      this.$ons.notification.toast('Fetch data error.', {
        animation: 'fall',
        timeout: 3000,
        class: 'toastclass'
      });
    });
  },

  methods: {
    clickInstitution() {
      // pushBankCurrency
      this.$store.commit('UPDATE_ACTIVEPAGEINDEX', 1);
      this.$store.dispatch('PAGE_PROPS', {
        tabindex: 1,
        key: 'institution',
        value: this.institution
      }).then(() => {
        this.$store.commit('TAB_PUSHSTACK', {
          tabindex: 1,
          page: currencyCheck
        });
      });

      this.$ons.notification.toast(this.institution.name, {
        timeout: 500,
        force: true
      });
    },

    clickCurrency() {
      // pushCurrencyBank
      this.$store.commit('UPDATE_ACTIVEPAGEINDEX', 2);
      this.$store.dispatch('PAGE_PROPS', {
        tabindex: 2,
        key: 'currency',
        value: this.currency
      }).then(() => {
        this.$store.commit('TAB_PUSHSTACK', {
          tabindex: 2,
          page: bankSelect
        });
      });

      this.$ons.notification.toast(this.currency.name, {
        timeout: 500,
        force: true
      });
    },

    toggleChart() {
      this.isChartVisiable = !this.isChartVisiable;
      this.chart = echarts.init(this.$refs.pricechart);

      this.option.xAxis.data = [];
      this.option.series = [];
      var minValue = 0;
      var maxValue = 0;

      var serieCentral = {
        name: '中间价',
        type: 'line',
        lineStyle: {
          normal: {
            width: 2,
          }
        },
        data: []
      }
      var serieBuy = {
        name: '现汇买入',
        type: 'line',
        lineStyle: {
          normal: {
            width: 2,
          }
        },
        data: []
      }
      var serieSell = {
        name: '现汇卖出',
        type: 'line',
        lineStyle: {
          normal: {
            width: 2,
          }
        },
        data: []
      }
      var serieCashBuy = {
        name: '现金买入',
        type: 'line',
        lineStyle: {
          normal: {
            width: 2,
          }
        },
        data: []
      }
      var serieCashSell = {
        name: '现金卖出',
        type: 'line',
        lineStyle: {
          normal: {
            width: 2,
          }
        },
        data: []
      }
      var rates_length = this.rates.length;
      for (var i = 0; i < rates_length; i++) {
        var rate = this.rates[i];
        serieCentral.data.push(rate.centralparityrate);
        serieBuy.data.push(rate.buy);
        serieSell.data.push(rate.sell);
        serieCashBuy.data.push(rate.cashbuy);
        serieCashSell.data.push(rate.cashsell);
        this.option.xAxis.data.push(rate.time);

        minValue = minValue < rate.centralparityrate ? minValue : rate.centralparityrate;
        maxValue = maxValue > rate.centralparityrate ? maxValue : rate.centralparityrate;
        minValue = minValue < rate.buy ? minValue : rate.buy;
        maxValue = maxValue > rate.buy ? maxValue : rate.buy;
        minValue = minValue < rate.sell ? minValue : rate.sell;
        maxValue = maxValue > rate.sell ? maxValue : rate.sell;
        minValue = minValue < rate.cashbuy ? minValue : rate.cashbuy;
        maxValue = maxValue > rate.cashbuy ? maxValue : rate.cashbuy;
        minValue = minValue < rate.cashsell ? minValue : rate.cashsell;
        maxValue = maxValue > rate.cashsell ? maxValue : rate.cashsell;
      }
      this.option.series.push(serieCentral);
      this.option.series.push(serieBuy);
      this.option.series.push(serieSell);
      this.option.series.push(serieCashBuy);
      this.option.series.push(serieCashSell);

      this.option.yAxis[0].min = minValue;
      this.option.yAxis[0].max = maxValue;

      this.chart.setOption(this.option);
    }
  }
}
</script>

<style scoped>
.pt {
  background-color: #aaeaea;
  margin: 5px;
  padding: 5px;
}

.pt-top {
  height: 40px;
  background-color: green;
}

.pt-institution {
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  text-align: left;
  padding-left: 4px;
  font-size: 20px;
  line-height: 40px;
}

.pt-currency {
  text-align: center;
  font-size: 20px;
  line-height: 40px;
}

.pt-center {
  height: 80px;
  margin: 0px auto;
  padding: 5px;
  font-size: 15px;
  line-height: 30px;
  text-align: left;
}

.pt-info {
  font-family: monospace;
  font-size: 12px;
  line-height: 24px;
}

.pt-bottom {
  height: 300px;
  width: 100%;
  margin-top: 10px
}
</style>
