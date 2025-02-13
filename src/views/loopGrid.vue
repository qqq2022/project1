<template>
  <div class="loop-grid">
    <!-- v-for循环的形式写表格 -->
    <div class="grid-stack">
      <div
        v-for="(w, indexs) in items"
        class="grid-stack-item"
        :gs-x="w.x"
        :gs-y="w.y"
        :gs-w="w.w"
        :gs-h="w.h"
        :gs-id="w.id"
        :id="w.id"
        :key="w.id"
      >
        <div class="grid-stack-item-content">
          <div class="card-header">title</div>
          <button @click="remove(w)">remove</button>
          <!-- <DragTabs></DragTabs> -->
          <!-- <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card" @edit="onEdit">
            <a-tab-pane
              v-for="pane in w.panes"
              :key="pane.key"
              :tab="pane.title"
              :closable="pane.closable"
              class="child"
            >
              {{ pane.content }}
            </a-tab-pane>
          </a-tabs> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.css'
import Sortable from 'sortablejs'
import DragTabs from './components/DragTabs.vue'

const list1 = [
  { title: '卡片1', key: '1', closable: true, content: '11111' },
  { title: '卡片2', key: '2', closable: true, content: '11111' }
]
const list2 = [
  { title: '卡片3', key: '1', closable: true, content: '11111' },
  { title: '卡片4', key: '2', closable: true, content: '11111' }
]
const activeKey = ref('1')

const onEdit = () => {}

//sortablejs
const handleEnd = (evt: any) => {
  console.log('拖拽结束')
  const { from, to, oldIndex, newIndex } = evt
  const fromList = from.__vueParentComponent.proxy.list1
  const toList = to.__vueParentComponent.proxy.list2

  // if (from === to) return // No change if moving within the same list

  // const movedItem = fromList.splice(oldIndex, 1)[0]
  // toList.splice(newIndex, 0, movedItem)
}

//卡片配置
let grid: any = null
let items = ref([
  { x: 0, y: 0, w: 4, h: 2, panes: list1 },
  { x: 9, y: 0, w: 4, h: 2, panes: list2 }
])

function remove(widget) {
  var index = items.value.findIndex((w) => w.id == widget.id)
  items.value.splice(index, 1)
  const selector = `#${widget.id}`
  grid.removeWidget(selector, false)
  // updateInfo()
}

onMounted(() => {
  grid = GridStack.init({
    // DO NOT user grid.value = GridStack.init(), see above
    float: false,
    cellHeight: '70px',
    minRow: 1,
    handle: '.card-header'
  })

  grid.on('dragstop', function (event, element) {
    const node = element.gridstackNode
    // info.value = `you just dragged node #${node.id} to ${node.x},${node.y} – good job!`
  })

  // grid.on('change', onChange)
  // gridFloat.value = grid.float();
  // const dom = document.getElementsByClassName('ant-tabs-nav-list')
  // console.log('dom', dom)
  // new Sortable(dom[0], {
  //   animation: 150,
  //   draggable: '.ant-tabs-tab',
  //   group: {
  //     // 是否开启跨表拖拽
  //     pull: true,
  //     put: true
  //   },
  //   onEnd: handleEnd
  // })
  // new Sortable(dom[1], {
  //   animation: 150,
  //   draggable: '.ant-tabs-tab',
  //   group: {
  //     // 是否开启跨表拖拽
  //     pull: true,
  //     put: true
  //   },
  //   onEnd: handleEnd
  // })
})
</script>

<style scoped lang="less">
.grid-stack-item {
  background-color: pink;
}
</style>
