<template>
  <div>姓名：{{ props.msg.name }}</div>
  <div>年龄： {{ props.msg.age }}</div>
  <button @click="handleChange">改变</button>
  <br />
  <div>成绩: {{ props.ipt }}</div>
  <input type="text" v-model="props.ipt" @change="iptChange" />
</template>

<script lang="ts" setup>
type T = {
  name: string
  age: number
}

const props = defineProps<{
  msg: T
  ipt: string | number
}>()

const emits = defineEmits(['change', 'iptChange'])

const newMsg = { name: '李四', age: 100 }
const handleChange = () => {
  emits('change', newMsg)
}

const iptChange = (e: any) => {
  console.log(typeof e.target.value)
  console.log('输入的值', e.target.value)
  emits('iptChange', e.target.value)
}
</script>
