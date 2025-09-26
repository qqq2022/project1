<template>
  <div class="colored-header-table">
    <div class="markdown-body" v-html="renderedAnswer" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import MarkdownIt from "markdown-it";
import markdownItContainer from "markdown-it-container";

const renderedAnswer = ref();
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

md.use(markdownItContainer, "echarts", {
  validate: function (params) {
    return params.trim().match(/^echarts\s+(.*)$/);
  },
  render: function (tokens, idx) {
    console.log("进入render里面", tokens);
    console.log("idx", idx);
    var m = tokens[idx].info.trim().match(/^echarts\s+(.*)$/);
    console.log("m", m);
    if (m && m[1]) {
      console.log(JSON.parse(m[1]));
    }
    if (tokens[idx].nesting === 1) {
      // 开启标签
      return "<details><summary>" + md.utils.escapeHtml(m[1]) + "</summary>\n";
    } else {
      // 结束标签
      return "</details>\n";
    }
  },
});

renderedAnswer.value = md.render(
  `::: echarts {"id":"3e1cb1c4-bc4c-4340-825a-5bd7eabc2a94","option":{"title":{"text":"ECharts 入门示例"},"tooltip":{},"xAxis":{"data":["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]},"yAxis":{},"series":[{"name":"销量","type":"bar","data":[5,20,36,10,10,20]}]}}\n:::\n`
);
console.log();
</script>

<style scoped>
.colored-header-table {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.control-panel {
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.control-panel h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
}

.control-buttons {
  display: flex;
  gap: 12px;
}

.control-btn {
  padding: 10px 20px;
  border: 1px solid #409eff;
  border-radius: 6px;
  background: white;
  color: #409eff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: #409eff;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(64, 158, 255, 0.3);
}

.custom-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

:deep(.vxe-table--render-wrapper) {
  border-radius: 8px;
}
</style>

<style>
/* 全局样式 */
@import "vxe-table/lib/style.css";

/* 报告列标题样式 */
:deep(.report-header) {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24) !important;
  color: white !important;
  font-weight: bold !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
}

:deep(.report-header .vxe-cell--title) {
  color: white !important;
}

:deep(.report-header:hover) {
  background: linear-gradient(135deg, #ff5252, #d63031) !important;
}

/* 操作列标题样式 */
:deep(.operation-header) {
  background: linear-gradient(135deg, #74b9ff, #0984e3) !important;
  color: white !important;
  font-weight: bold !important;
}

/* 表格整体样式调整 */
:deep(.vxe-header--column) {
  transition: background-color 0.3s ease;
}

:deep(.vxe-table--header) {
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}

:deep(.vxe-table--body) {
  border-radius: 0 0 8px 8px;
}

/* 鼠标悬停效果 */
:deep(.vxe-header--column:not(.report-header):not(.operation-header):hover) {
  background: #f0f7ff !important;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .control-buttons {
    flex-direction: column;
  }

  .control-btn {
    width: 100%;
  }
}
</style>
