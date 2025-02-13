<template>
  <div class="antd">
    <div class="outter">
      <a-progress type="dashboard" :percent="75" />
      <div class="inner">
        <a-progress type="dashboard" :percent="75" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style>
.antd {
  width: 500px;
  height: 500px;
  background-color: #efefef;
}

.outter {
  width: 300px;
  height: 300px;
  background-color: pink;
  padding-top: 10px;
  padding-left: 10px;
}

.inner {
  width: 280px;
  height: 280px;
  background-color: yellow;
}
</style>
