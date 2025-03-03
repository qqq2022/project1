<template>
  <div class="grid-stack"></div>
</template>

<script setup lang="ts">
import 'gridstack/dist/gridstack.min.css'
import { GridStack } from 'gridstack'
import { onMounted, ref } from 'vue'
import './demo.css'

let count = ref(0)
let info = ref('')
let grid = null
const items = [
  { x: 2, y: 1, w: 4, h: 4, content: '<div id="chartContainer" style="height: 370px; width: 100%;"></div>' },
  { x: 2, y: 4, w: 3 },
  { x: 4, y: 2 },
  { x: 3, y: 1, h: 2 },
  { x: 0, y: 6, w: 2, h: 2 }
]
onMounted(() => {
  console.log('onMounted')
  grid = GridStack.init({
    float: true,
    cellHeight: '70px',
    minRow: 1
  })

  grid.on('dragstop', function (event, element) {
    console.log('dragstop')
    const node = element.gridstackNode
    // info.value = `you just dragged node #${node.id} to ${node.x},${node.y} – good job!`
  })

  grid.load(items)
})
</script>
