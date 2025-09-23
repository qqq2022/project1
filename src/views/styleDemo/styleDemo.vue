<template>
  <div class="colored-header-table">
    <!-- 列控制面板 -->
    <div class="control-panel">
      <h3>表格列控制</h3>
      <div class="control-buttons">
        <button @click="toggleAllReports" class="control-btn">
          {{ showAllReports ? "隐藏" : "显示" }}所有报告列
        </button>
        <button
          @click="highlightReports = !highlightReports"
          class="control-btn"
        >
          {{ highlightReports ? "取消" : "" }}高亮报告列
        </button>
      </div>
    </div>

    <!-- 表格 -->
    <vxe-grid ref="gridRef" v-bind="gridOptions" class="custom-table">
      <template #toolbar_buttons>
        <a-button @click="exportData">导出数据</a-button>
      </template>
    </vxe-grid>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";

const gridRef = ref();
const highlightReports = ref(true);
const showAllReports = ref(true);

// 生成示例列 - 包含普通列和报告列
const generateColumns = () => {
  const columns = [];

  // 普通信息列
  for (let i = 1; i <= 10; i++) {
    columns.push({
      field: `info_${i}`,
      title: `信息列 ${i}`,
      width: 120,
    });
  }

  // 报告列（以 report_ 开头）
  for (let i = 1; i <= 8; i++) {
    columns.push({
      field: `report_${i}`,
      title: `报告列 ${i}`,
      width: 140,
      isReport: true,
    });
  }

  // 更多普通列
  for (let i = 11; i <= 20; i++) {
    columns.push({
      field: `info_${i}`,
      title: `信息列 ${i}`,
      width: 120,
    });
  }

  return columns;
};

// 生成示例数据
const generateData = () => {
  const data = [];
  for (let i = 1; i <= 30; i++) {
    const item = { id: i };
    const allColumns = generateColumns();
    allColumns.forEach((column) => {
      if (column.field.startsWith("report_")) {
        item[column.field] = `报告值${i}-${Math.random().toFixed(2)}`;
      } else {
        item[column.field] = `值${i}`;
      }
    });
    data.push(item);
  }
  return data;
};

const allColumns = ref(generateColumns());
const tableData = ref(generateData());

// 过滤显示的列
const visibleColumns = computed(() => {
  return allColumns.value.filter((column) => {
    if (column.field.startsWith("report_")) {
      return showAllReports.value;
    }
    return true;
  });
});

// 更新表格列配置
const updateGridColumns = () => {
  gridOptions.columns = [
    { type: "seq", width: 60, fixed: "left" },
    ...visibleColumns.value.map((col) => ({
      field: col.field,
      title: col.title,
      width: col.width,
      showOverflow: true,
      // 为报告列添加自定义标题样式
      headerClassName:
        col.field.startsWith("report_") && highlightReports.value
          ? "report-header"
          : "",
    })),
    {
      type: "operate",
      width: 100,
      fixed: "right",
      title: "操作",
      headerClassName: "operation-header",
    },
  ];
};

// 表格配置
const gridOptions = reactive({
  border: true,
  resizable: true,
  showOverflow: true,
  height: 500,
  toolbar: {
    slots: {
      buttons: "toolbar_buttons",
    },
  },
  columns: [],
});

// 切换所有报告列的显示状态
const toggleAllReports = () => {
  showAllReports.value = !showAllReports.value;
  updateGridColumns();
};

// 导出数据
const exportData = () => {
  const $grid = gridRef.value;
  $grid.exportData({
    filename: "表格数据",
    sheetName: "Sheet1",
    type: "xlsx",
  });
};

// 监听高亮状态变化
watch(highlightReports, updateGridColumns);
watch(showAllReports, updateGridColumns);

// 初始化
onMounted(() => {
  updateGridColumns();
});
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
