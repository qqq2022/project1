<template>
  <div class="drag-tabs" ref="DragTabs" id="DragTabs">
    <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card">
      <a-tab-pane key="1" tab="Tab 1">1111111</a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2">222222</a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts" setup name="DragTabs">
import { ref, onMounted } from 'vue'
import Sortable from 'sortablejs'

const DragTabs = ref()
const activeKey = ref('1')
const handleEnd = () => {
  console.log('handleEnd')
}
onMounted(() => {
  const dom = DragTabs.value.querySelector('.ant-tabs-nav-list')
  // const dom = document.getElementById('DragTabs')
  console.log('dom', dom)
  new Sortable(dom, {
    animation: 300,
    // handle: '.handle', //拖某个地方才可以移动
    draggable: '.ant-tabs-tab', //可以被拖拽的区域
    group: {
      // 是否开启跨表拖拽
      pull: true,
      put: true
    },
    onEnd: handleEnd
  })
})
</script>
<style>
.ant-tabs-nav-list {
  width: 100%;
}
.handle {
  cursor: move;
  diplay: flex;
  align-content: center;
}
</style>
