<template>
  <button @click="handleClick">按钮</button>
</template>
<script lang="ts" setup>
const emits = defineEmits(['start'])
const handleClick = () => {
  emits('start', '11111')
}
</script>
