<template>
  <div class="card">
    <a-select style="width: 120px" @change="handleChange" placeholder="选择语言">
      <a-select-option value="en">英语</a-select-option>
      <a-select-option value="pt">葡萄牙语</a-select-option>
    </a-select>
    <br />
    显示区域: {{ t('hello') }}
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import 'gridstack/dist/gridstack.css'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const handleChange = (value: string) => {
  locale.value = value
}

onMounted(() => {
  const res = t('hello')
  console.log(res)
})
</script>
<style lang="less" scoped>
.card {
  .father {
    width: 100px;
    height: 100px;
    background-color: red;
  }
}
</style>
