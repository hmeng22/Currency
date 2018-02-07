<template>
<div ref="barchart" style="width: 95%; height: 90%;"></div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import echarts from 'echarts'

export default {

  data() {
    return {
      chart: '',
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: []
        },
        grid: {
          left: '0%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['现金买入', '现金卖出', '现汇买入', '现汇卖出', '中间价']
        },
        series: []
      }
    }
  },

  computed: {
    ...mapGetters([
      'institutions'
    ]),
  },

  props: ['iscsrates'],

  mounted() {
    this.chart = echarts.init(this.$refs.barchart);
  },

  watch: {
    iscsrates: {
      handler: 'draw_icrates',
      deep: true
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

    draw_icrates() {
      this.option.legend.data = [];
      this.option.series = [];

      var iscsrates_length = this.iscsrates.length;
      for (var i = 0; i < iscsrates_length; i++) {
        var icrates = this.iscsrates[i];
        if (icrates.rates[0]) {
          var name = this.institutionName(icrates.institution);
          this.option.legend.data.push(name);
          var serie = {
            name: name,
            type: 'bar',
            stack: name,
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [icrates.rates[0].cashbuy, icrates.rates[0].cashsell, icrates.rates[0].buy, icrates.rates[0].sell, icrates.rates[0].centralparityrate]
          }
          this.option.series.push(serie);
        }
      }

      this.chart.setOption(this.option);
    }
  }
}
</script>
