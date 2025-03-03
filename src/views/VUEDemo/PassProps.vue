<template>
  <div class="demo-dropdown-wrap">
    <div ref="chartDom" style="width: 600px; height: 400px"></div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, watch, ref, onMounted } from 'vue'
import * as echarts from 'echarts' // 引入 echarts
import 'echarts-gl'

const chartDom = ref()

let chartInstance1: any

const initChart = () => {
  if (!chartInstance1) {
    chartInstance1 = echarts.init(chartDom.value)
  }
  // 配置图表选项
  const option1 = {
    tooltip: {},
    backgroundColor: '#fff',
    visualMap: {
      show: false,
      dimension: 2,
      min: -1,
      max: 1,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026'
        ]
      }
    },
    xAxis3D: {
      type: 'category'
    },
    yAxis3D: {
      type: 'value'
    },
    zAxis3D: {
      type: 'value'
    },
    grid3D: {
      viewControl: {
        // projection: 'orthographic'
      }
    },
    series: [
      {
        type: 'surface',
        name: '利率波动率曲面',
        //与data二选一即可
        // equation: {},
        data: [
          // ['1M', -5, 0.3516],
          // ['2M', -5, 0.3376],
          // ['3M', 0, 0.3326],
          // ['4M', 5, 0.3511]
          // ['5M', 5, 0.3511]
          //接口数据 11/14 LPR5Y_1Y_Swaption-相对执行价-1Y
          ['1M', -15, 0.3095],
          ['2M', -15, 0.6385],
          ['3M', -15, 0.4567],
          ['4M', -15, 0.4095],
          ['5M', -15, 0.3792],
          ['6M', -15, 0.3552],
          ['7M', -15, 0.3536],
          ['8M', -15, 0.3526],
          ['9M', -15, 0.3497],
          ['10M', -15, 0.3639],
          ['11M', -15, 0.3809],
          ['1Y', -15, 0.3948],

          ['1M', -10, 0.3386],
          ['2M', -10, 0.5297],
          ['3M', -10, 0.4489],
          ['4M', -10, 0.4127],
          ['5M', -10, 0.3906],
          ['6M', -10, 0.3716],
          ['7M', -10, 0.3723],
          ['8M', -10, 0.3731],
          ['9M', -10, 0.3714],
          ['10M', -10, 0.3784],
          ['11M', -10, 0.3891],
          ['1Y', -10, 0.3975],

          ['1M', -5, 0.3677],
          ['2M', -5, 0.4461],
          ['3M', -5, 0.4375],
          ['4M', -5, 0.4089],
          ['5M', -5, 0.3921],
          ['6M', -5, 0.3764],
          ['7M', -5, 0.3779],
          ['8M', -5, 0.3793],
          ['9M', -5, 0.378],
          ['10M', -5, 0.3854],
          ['11M', -5, 0.3996],
          ['1Y', -5, 0.4054],

          //下面的还没写
          ['1M', 0, 0.3918],
          ['2M', 0, 0.4466],
          ['3M', 0, 0.4364],
          ['4M', 0, 0.4034],
          ['5M', 0, 0.3833],
          ['6M', 0, 0.3658],
          ['7M', 0, 0.366],
          ['8M', 0, 0.3665],
          ['9M', 0, 0.3646],
          ['10M', 0, 0.3739],
          ['11M', 0, 0.3868],
          ['1Y', 0, 0.3971],

          ['1M', 5, 0],
          ['2M', 5, 0],
          ['3M', 5, 0],
          ['4M', 5, 0],
          ['5M', 5, 0],
          ['6M', 5, 0],
          ['7M', 5, 0],
          ['8M', 5, 0],
          ['9M', 5, 0],
          ['10M', 5, 0],
          ['11M', 5, 0],
          ['1Y', 5, 0],

          ['1M', 10, 0],
          ['2M', 10, 0],
          ['3M', 10, 0],
          ['4M', 10, 0],
          ['5M', 10, 0],
          ['6M', 10, 0],
          ['7M', 10, 0],
          ['8M', 10, 0],
          ['9M', 10, 0],
          ['10M', 10, 0],
          ['11M', 10, 0],
          ['1Y', 10, 0],

          ['1M', 15, 0],
          ['2M', 15, 0],
          ['3M', 15, 0],
          ['4M', 15, 0],
          ['5M', 15, 0],
          ['6M', 15, 0],
          ['7M', 15, 0],
          ['8M', 15, 0],
          ['9M', 15, 0],
          ['10M', 15, 0],
          ['11M', 15, 0],
          ['1Y', 15, 0]
        ]
      }
    ]
  }
  // 设置图表的选项
  chartInstance1.setOption(option1)
}

onMounted(() => {
  initChart()
})
</script>
<style lang="less" scoped>
.demo-dropdown-wrap :deep(.ant-dropdown-button) {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
