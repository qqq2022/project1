<template>
  <div class="api-test">
    <nav class="nav">
      <router-link to="/" active-class="active">echarts</router-link>
      <router-link to="/antd" active-class="active">antd</router-link>
      <router-link to="/grid" active-class="active">grid</router-link>
      <router-link to="/factory" active-class="active">gridstack</router-link>
      <router-link to="/card" active-class="active">empty</router-link>
      <router-link to="/about" active-class="active">empty2</router-link>
    </nav>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.nav {
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 20px;
  background-color: #f3f4f6;
}

.nav a {
  display: inline-block;
  padding: 5px;
  margin-right: 20px;
  color: #000;
}

.nav .active {
  border-bottom: 2px solid #40a9ff;
}
</style>
