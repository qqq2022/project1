<template>
  <div class="line-split">
    下面展示markdown渲染的内容
    <a-button @click="startRender">开始渲染</a-button>

    <MarkdownRender
      ref="refReaderMarkdownPreview"
      v-model:reader="outputTextReader"
      :model="businessStore.currentModelItem?.modelName"
      :transform-stream-fn="
        businessStore.currentModelItem?.transformStreamValue
      "
      @failed="onFailedReader"
      @completed="onCompletedReader"
    ></MarkdownRender>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MarkdownRender from "../../markdownRender/index.vue";
import { useBusinessStore } from "@/stores/useBusinessStore";

const businessStore = useBusinessStore();

const outputTextReader = ref<ReadableStreamDefaultReader | null>();

const refReaderMarkdownPreview = ref();

const onFailedReader = () => {
  console.log("onFailedReader");
  // outputTextReader.value = null
  // stylizingLoading.value = false
  // if (refReaderMarkdownPreview.value) {
  //   refReaderMarkdownPreview.value.initializeEnd()
  // }
  // window.$ModalMessage.error('转换失败，请重试')
  // setTimeout(() => {
  //   if (refInputTextString.value) {
  //     refInputTextString.value.focus()
  //   }
  // })
  // triggerModelTermination()
};

const onCompletedReader = () => {
  console.log("onCompletedReader");
  // stylizingLoading.value = false
  // setTimeout(() => {
  //   if (refInputTextString.value) {
  //     refInputTextString.value.focus()
  //   }
  // })
  // triggerModelTermination()
};

const startRender = async () => {
  refReaderMarkdownPreview.value.resetStatus();
  refReaderMarkdownPreview.value.initializeStart();

  // stylizingLoading.value = true
  // const textContent = inputTextString.value
  // inputTextString.value = ''

  const { error, reader } = await businessStore.createAssistantWriterStylized({
    text: "你好",
  });

  if (error) {
    onFailedReader();
    return;
  }

  if (reader) {
    debugger;
    outputTextReader.value = reader;
  }
};
</script>

<style lang="less" scoped>
.line-split {
  font-size: 16px;
}
</style>
