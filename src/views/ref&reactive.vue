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
let chartInstance2: any

const initChart = () => {
  if (!chartInstance2) {
    chartInstance2 = echarts.init(chartDom.value)
  }

  const option2 = {
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
      type: 'value'
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
        wireframe: {
          // show: false
        },
        equation: {
          x: {
            step: 0.05
          },
          y: {
            step: 0.05
          },
          z: function (x, y) {
            if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
              return '-'
            }
            return Math.sin(x * Math.PI) * Math.sin(y * Math.PI)
          }
        }
      }
    ]
  }
  //示例的图标
  chartInstance2.setOption(option2)
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
