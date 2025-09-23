<template>
  <template v-if="$slots.default">
    <slot
      name="default"
      v-bind="{
        copyText,
        copied,
      }"
    ></slot>
  </template>
  <div
    v-else
    class="size-20"
    :class="[
      copied
        ? `cursor-initial i-ic:baseline-check ${autoColor && 'c-primary'}`
        : 'cursor-pointer i-ci:copy',
    ]"
    v-bind="{
      onClick: !noCopy ? copyText : () => {},
    }"
  ></div>
</template>

<script lang="ts" setup>
import { useClipText } from "../hooks/useClipText";

const { copy, copied, copyDuration } = useClipText();

interface Props {
  text: string;
  autoColor?: boolean;
  noCopy?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  text: "",
  autoColor: true,
  noCopy: false,
});

const copyText = async () => {
  if (copied.value) return;

  await copy(props.text);
  window.$ModalMessage.destroyAll();
  window.$ModalMessage.success("已复制", {
    duration: copyDuration,
  });
};

defineExpose({
  copyText,
});
</script>

<style lang="scss" scoped></style>
