<template>
  <div class="style-demo">
    <ul>
      <li>
        <router-link to="/line-split" active-class="active">线条</router-link>
      </li>
      <li>
        <router-link to="/margin-split" active-class="active">间距</router-link>
      </li>
      <li>
        <router-link to="/custom-card" active-class="active"
          >卡片式</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less"></style>
