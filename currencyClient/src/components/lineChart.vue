<template>
<div ref="linechart" style="width: 90%; height: 300px;"></div>
</template>

<script>
import echarts from 'echarts'
import randomColor from 'randomcolor'

export default {

  data() {
    return {
      chart: '',
      option: {
        tooltip: {
          trigger: 'axis'
        },
        color: [],
        legend: {
          data: []
        },
        grid: {
          left: '0%',
          right: '4%',
          bottom: '15%',
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

  props: ['icrates'],

  mounted() {
    this.chart = echarts.init(this.$refs.linechart);
  },

  watch: {
    icrates: {
      handler: 'draw_icrates',
      deep: true
    }
  },

  methods: {
    draw_icrates() {
      this.option.color = [];
      this.option.legend.data = [];
      this.option.xAxis.data = [];
      this.option.series = [];

      var minValue = 0;
      var maxValue = 0;



      var type_name = '中间价';
      this.option.color.push(randomColor());
      this.option.legend.data.push(type_name);
      var serie = {
        name: type_name,
        type: 'line',
        lineStyle: {
          normal: {
            width: 2,
          }
        },
        data: []
      }
      var rates_length = this.icrates.rates.length;
      for (var j = 0; j < rates_length; j++) {
        var rate = this.icrates.rates[j];
        minValue = minValue < rate.centralparityrate ? minValue : rate.centralparityrate;
        maxValue = maxValue > rate.centralparityrate ? maxValue : rate.centralparityrate;
        serie.data.push(rate.centralparityrate);
        this.option.xAxis.data.push(rate.time);
      }
      this.option.series.push(serie);



      var type_name = '现汇买入';
      this.option.color.push(randomColor());
      this.option.legend.data.push(type_name);
      var serie = {
        name: type_name,
        type: 'line',
        lineStyle: {
          normal: {
            width: 2,
          }
        },
        data: []
      }
      for (var j = 0; j < rates_length; j++) {
        var rate = this.icrates.rates[j];
        minValue = minValue < rate.buy ? minValue : rate.buy;
        maxValue = maxValue > rate.buy ? maxValue : rate.buy;
        serie.data.push(rate.buy);
      }
      this.option.series.push(serie);



      var type_name = '现汇卖出';
      this.option.color.push(randomColor());
      this.option.legend.data.push(type_name);
      var serie = {
        name: type_name,
        type: 'line',
        lineStyle: {
          normal: {
            width: 2,
          }
        },
        data: []
      }
      for (var j = 0; j < rates_length; j++) {
        var rate = this.icrates.rates[j];
        minValue = minValue < rate.sell ? minValue : rate.sell;
        maxValue = maxValue > rate.sell ? maxValue : rate.sell;
        serie.data.push(rate.sell);
      }
      this.option.series.push(serie);



      var type_name = '现金买入';
      this.option.color.push(randomColor());
      this.option.legend.data.push(type_name);
      var serie = {
        name: type_name,
        type: 'line',
        lineStyle: {
          normal: {
            width: 2,
          }
        },
        data: []
      }
      for (var j = 0; j < rates_length; j++) {
        var rate = this.icrates.rates[j];
        minValue = minValue < rate.cashbuy ? minValue : rate.cashbuy;
        maxValue = maxValue > rate.cashbuy ? maxValue : rate.cashbuy;
        serie.data.push(rate.cashbuy);
      }
      this.option.series.push(serie);



      var type_name = '现金卖出';
      this.option.color.push(randomColor());
      this.option.legend.data.push(type_name);
      var serie = {
        name: type_name,
        type: 'line',
        lineStyle: {
          normal: {
            width: 2,
          }
        },
        data: []
      }
      for (var j = 0; j < rates_length; j++) {
        var rate = this.icrates.rates[j];
        minValue = minValue < rate.cashsell ? minValue : rate.cashsell;
        maxValue = maxValue > rate.cashsell ? maxValue : rate.cashsell;
        serie.data.push(rate.cashsell);
      }
      this.option.series.push(serie);



      this.option.yAxis[0].min = minValue;
      this.option.yAxis[0].max = maxValue;

      this.chart.setOption(this.option);
    }
  }
}
</script>
