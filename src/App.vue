<template>
  <div class="appBox" style="height: 100%">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

console.log("app.vue执行");
onMounted(() => {
  console.log("pp.vue挂载");
});
</script>

<style scoped></style>
