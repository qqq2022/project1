<template>
  <div class="expandable-table-container">
    <iframe
      src="https://udify.app/chatbot/LIPmUvZZ0sxAbmsy"
      style="width: 100%; height: 100%; min-height: 700px"
      frameborder="0"
      allow="microphone"
    >
    </iframe>
  </div>
</template>
<script>
import { ref, reactive, computed, onMounted } from "vue";
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
