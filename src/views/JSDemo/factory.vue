<template>
  <div class="answer-area">
    <div v-if="renderedAnswer" class="markdown-body" v-html="renderedAnswer" />
    <div v-else class="placeholder">
      <template v-if="loading">
        <div class="thinking">
          <span>思考中</span>
          <span class="thinking-spinner"></span>
        </div>
      </template>
      <template v-else> 你好！很高兴见到你。有什么我可以帮忙的吗？ </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, nextTick, onUnmounted } from "vue";
import MarkdownIt from "markdown-it";
import markdownItTable from "markdown-it-multimd-table";
import markdownItAnchor from "markdown-it-multimd-table";
import markdownItToc from "markdown-it-multimd-table";
import markdownItEmoji from "markdown-it-multimd-table";
import markdownItFootnote from "markdown-it-multimd-table";
import markdownItTaskLists from "markdown-it-multimd-table";
import * as echarts from "echarts";
import Chart from "chart.js/auto";
// import Chart from "chart-js";

const renderedAnswer = ref();
const loading = ref(false);

const md = new MarkdownIt({
  html: true, // 启用HTML标签
  breaks: true, // 转换换行符为<br>
  linkify: true, // 自动转换URL为链接
  typographer: true, // 启用语言中性的替换
});

// md.use(function (md) {// 重写fence渲染规则
//   md.renderer.rules.fence = function (tokens, idx, options, env, slf) {
//     // 渲染逻辑
//   }
// })

// 测试数据
// echarts 测试数据
const answer = ref(`
# Hello\n## Hi\n> hello world
\`\`\`echarts
    {
        "title": {
            "text": "第一个 ECharts 实例"
        },
        "tooltip": {},
        "legend": {
            "data":["小红", "小明", "小黑"]
        },
        "xAxis": {
            "data": ["语文","数学","英语"]
        },
        "yAxis": {},
        "series": [
        {
            "name": "小红",
            "type": "bar",
            "data": [45, 15, 32]
        },
        {
            "name": "小明",
            "type": "bar",
            "data": [44, 14, 33]
        },
        {
            "name": "小黑",
            "type": "bar",
            "data": [38, 10, 35]
        }
        ]
    }
`);

const eChartOption = ref({}); // 存储 ECharts 配置
md.use(function (md) {
  md.renderer.rules.fence = function (tokens, idx, options, env, slf) {
    console.log("tokens", tokens);
    // 此处判断是否为 echarts 代码块
    if (tokens[idx].info === "echarts") {
      eChartOption.value = JSON.parse(tokens[idx].content); 
      
      return `<div id="echarts-id" style="width: 600px;height:400px;"></div>`;
    } else if (tokens[idx].info === "chartjs") {
      // 此处判断是否为 chartjs 代码块
      eChartOption.value = JSON.parse(tokens[idx].content);
      return `<canvas id="chartjs-id"></canvas>`;
    } else if (tokens[idx].info === "mermaidChart") {
      // 此处判断是否为 mermaidChart 代码块
      const code = tokens[idx].content.trim();
      eChartOption.value = code;
      return `<div id="mermaid-id" class="mermaid">${code}</div>`;
    } else {
      // 其他代码块
      return `<pre><code class='languge-${tokens[idx].info}'>${tokens[idx].content}</code></pre>`;
    }
  };
});

// chartjs 测试数据
const answer2 = ref(`
# Hello\n## Hi\n> hello world
\`\`\`chartjs
{
  "type": "line",
  "data": {
    "labels": ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
    "datasets": [
      {
        "label": "我的第一个数据集",
        "data": [65, 59, 80, 81, 56, 55, 40],
        "fill": false,
        "borderColor": "rgb(75, 192, 192)",
        "tension": 0.1
      }
    ]
  }
}
`)


// 在组件挂载时加载设置
onMounted(function () {
  nextTick(() => {
    // 渲染ECharts
    if (document.getElementById("echarts-id")) {
      const chartDom = document.getElementById("echarts-id");
      const myChart = echarts.init(chartDom);
      myChart.setOption(eChartOption.value);
    }
    // 渲染Chart.js
    if (document.getElementById("chartjs-id")) {
      const ctx = document.getElementById("chartjs-id");
      console.log("chartjs-id", ctx);
      new Chart(ctx, eChartOption.value);
    }
    // 渲染Mermaid
    // if (document.getElementById("mermaid-id")) {
    //   mermaid.initialize({ startOnLoad: true });
    //   // 通过 id 获取元素并渲染图表
    //   const mermaidChart = document.getElementById("mermaid-id");
    //   if (mermaidChart) {
    //     mermaid.init(undefined, mermaidChart);
    //   }
    // }
  });
  // loadSettingsFromStorage();
  renderedAnswer.value = md.render(answer2.value); // 渲染语句
});
</script>

<style scoped>
.expandable-table-container {
  padding: 20px;
  background: #f5f7fa;
}

.column-controls {
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.control-buttons {
  margin-bottom: 20px;
}

.control-btn {
  margin-right: 10px;
  padding: 8px 16px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
}

.control-btn:hover {
  background: #409eff;
  color: white;
  border-color: #409eff;
}

.column-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.column-group {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.column-group h4 {
  margin: 0 0 10px 0;
  color: #409eff;
}

.group-controls {
  margin-bottom: 10px;
}

.group-btn {
  margin-right: 8px;
  padding: 4px 8px;
  font-size: 12px;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  background: white;
  cursor: pointer;
}

.group-btn:hover {
  background: #409eff;
  color: white;
}

.column-checkboxes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  font-size: 13px;
  cursor: pointer;
}

.checkbox-item input {
  margin-right: 6px;
}

.expandable-grid {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

:deep(.vxe-table--render-wrapper) {
  border-radius: 8px;
}
</style>

<style>
@import "vxe-table/lib/style.css";
</style>
