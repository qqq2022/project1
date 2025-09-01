<template>
  <div class="container">
    <div 
      v-for="(item, index) in items" 
      :key="index"
      class="number-box"
      :class="{
        'increase-highlight': item.highlight === 'increase',
        'decrease-highlight': item.highlight === 'decrease'
      }"
      :style="{
        '--restore-bg': item.bgColor || '#ffffff',
        '--restore-text': item.textColor || '#000000',
        '--restore-border': item.borderColor || '#cccccc'
      }"
      @animationend="resetHighlight(index)"
    >
      {{ item.value }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface NumberItem {
  value: number;
  highlight: 'increase' | 'decrease' | null;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

export default defineComponent({
  name: 'HighlightNumbers',
  setup() {
    // 初始数据
    const items = ref<NumberItem[]>([
      { 
        value: 10, 
        highlight: null,
        bgColor: '#f5f5f5',  // 自定义恢复背景色
        textColor: '#333',   // 自定义恢复文字色
        borderColor: '#ddd'  // 自定义恢复边框色
      },
      { 
        value: 20, 
        highlight: null,
        bgColor: '#f0f8ff',  // 另一个自定义背景色
        textColor: '#222',
        borderColor: '#eee'
      }
    ]);

    // 模拟API调用
    const fetchNewData = async () => {
      // 这里应该是实际的API调用
      // 模拟返回新数据
      const newValues = [
        { value: 15, bgColor: '#f5f5f5', textColor: '#333', borderColor: '#ddd' }, // 第一个数字增加
        { value: 18, bgColor: '#f0f8ff', textColor: '#222', borderColor: '#eee' }  // 第二个数字减少
      ];
      
      // 更新数据并设置高亮状态
      items.value = items.value.map((item, index) => {
        const newItem = newValues[index];
        let highlight: 'increase' | 'decrease' | null = null;
        
        if (newItem.value > item.value) {
          highlight = 'increase';
        } else if (newItem.value < item.value) {
          highlight = 'decrease';
        }
        
        return {
          ...newItem,
          highlight
        };
      });
    };

    // 重置高亮状态
    const resetHighlight = (index: number) => {
      items.value[index].highlight = null;
    };

    // 定时获取新数据（模拟）
    setInterval(fetchNewData, 3000);

    return {
      items,
      resetHighlight
    };
  }
});
</script>

<style scoped>
.container {
  display: flex;
  gap: 20px;
}

.number-box {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: var(--restore-text, black);
  background-color: var(--restore-bg, white);
  border: 2px solid var(--restore-border, #ccc);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.increase-highlight {
  --highlight-bg: rgba(144, 238, 144, 1);
  --highlight-text: darkgreen;
  --highlight-border: darkgreen;
  
  animation: fade 2s forwards;
}

.decrease-highlight {
  --highlight-bg: rgba(255, 182, 193, 1);
  --highlight-text: darkred;
  --highlight-border: darkred;
  
  animation: fade 2s forwards;
}

@keyframes fade {
  0% {
    color: var(--highlight-text);
    background-color: var(--highlight-bg);
    border-color: var(--highlight-border);
  }
  100% {
    color: var(--restore-text, black);
    background-color: var(--restore-bg, white);
    border-color: var(--restore-border, #ccc);
  }
}
</style>