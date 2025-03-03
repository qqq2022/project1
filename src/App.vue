<template>
  <div class="appBox">


    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import BigNumber from 'bignumber.js'
const num1 = new BigNumber('123.30')
console.log(num1)

type M = {
  //定义泛型
  name: string
  age: number
}
let form = reactive<M>({
  //接收泛型
  name: '小满',
  age: 18
})
</script>

<style scoped>

</style>
