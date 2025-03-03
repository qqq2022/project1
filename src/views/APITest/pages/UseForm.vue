<template>
  <button @click="handleShowInput">显示Input框</button>
  <a-input v-if="showInput" ref="inputRef"></a-input>
</template>
<script setup>
import { ref, onMounted, nextTick } from 'vue'
const showInput = ref(false)
const inputRef = ref(null)
onMounted(() => {
  // 这里可以添加一些初始化逻辑，但对于自动聚焦，不需要在这里处理
})
const handleShowInput = async () => {
  showInput.value = !showInput.value
  await nextTick()
  console.log(inputRef.value)
  if (inputRef.value) {
    inputRef.value.focus()
  }
}
</script>
<style scoped>
/* 这里可以添加组件相关的样式 */
</style>
