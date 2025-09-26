import * as echarts from "echarts";
import { useBusinessStore } from "@/stores/useBusinessStore";
import { nextTick } from 'vue';

const businessStore = useBusinessStore();

export const echartsPlugins = (tokens, idx, options, env, slf) => {
  // console.log("进入render里面", tokens);
  console.log("idx", idx);
  var m = tokens[idx].info.trim().match(/^echarts\s+(.*)$/);
  console.log("m", m);

  if (m && m[1]) {
    const optionJson = m[1].match(/\{[\s\S]*\}/)
    if (!optionJson) return;
    try {
      const options = JSON.parse(optionJson)
      console.log('----这里成功解析除了options----')
      debugger;
      console.log(options);
      const { id, option: eChartOption } = options;

      if (!eChartOption) return;
      if (!businessStore.echartMap.has(id)) {
        businessStore.echartMap.set(id, eChartOption);
        nextTick(() => {
          setTimeout(() => {
            console.log('倒计时结束');
            const dom = document.getElementById(`echarts-id-${id}`)
            console.log('dom', dom);
            debugger;
            let myChart = echarts.init(dom);
            myChart.setOption(eChartOption);
          }, 5000);
        })

      }

      return `<div id="echarts-id-${id}" style="width: 600px;height:400px;"></div>`;
    } catch (err) {
      // console.log('err')
    }


  }
};