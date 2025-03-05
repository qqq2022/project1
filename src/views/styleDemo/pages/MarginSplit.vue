<template>
  <div class="margin-split">
    <div class="margin-split-nav">
      <a-menu
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="state.collapsed"
      >
        <a-menu-item key="1">
          <template #icon>
            <PieChartOutlined />
          </template>
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <template #icon>
            <DesktopOutlined />
          </template>
          <span>Option 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <template #icon>
            <InboxOutlined />
          </template>
          <span>Option 3</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #icon>
            <MailOutlined />
          </template>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #icon>
            <AppstoreOutlined />
          </template>
        </a-sub-menu>
      </a-menu>
    </div>
    <div class="margin-split-content">
      <vxe-grid v-bind="gridOptions"> </vxe-grid>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, watch } from "vue";
import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";

const state = reactive({
  collapsed: true,
  selectedKeys: ["1"],
  openKeys: ["sub1"],
  preOpenKeys: ["sub1"],
});

watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  }
);

const gridOptions = reactive<VxeGridProps<RowVO>>({
  // border: true,
  // height: 300,
  // align: null,
  // columnConfig: {
  //   resizable: true
  // },
  columns: [
    { field: "name", title: "name" },
    { field: "sex", title: "sex" },
    { field: "address", title: "Address" },
  ],
  data: [
    {
      id: 10001,
      name: "Test1",
      nickname: "T1",
      role: "Develop",
      sex: "Man",
      age: 28,
      address: "Shenzhen",
    },
    {
      id: 10002,
      name: "Test2",
      nickname: "T2",
      role: "Test",
      sex: "Women",
      age: 22,
      address: "Guangzhou",
    },
    {
      id: 10003,
      name: "Test3",
      nickname: "T3",
      role: "PM",
      sex: "Man",
      age: 32,
      address: "Shanghai",
    },
    {
      id: 10004,
      name: "Test4",
      nickname: "T4",
      role: "Designer",
      sex: "Women",
      age: 23,
      address: "Shenzhen",
    },
    {
      id: 10005,
      name: "Test5",
      nickname: "T5",
      role: "Develop",
      sex: "Women",
      age: 30,
      address: "Shanghai",
    },
    {
      id: 10006,
      name: "Test6",
      nickname: "T6",
      role: "Designer",
      sex: "Women",
      age: 21,
      address: "Shenzhen",
    },
    {
      id: 10007,
      name: "Test7",
      nickname: "T7",
      role: "Test",
      sex: "Man",
      age: 29,
      address: "Shenzhen",
    },
    {
      id: 10008,
      name: "Test8",
      nickname: "T8",
      role: "Develop",
      sex: "Man",
      age: 35,
      address: "Shenzhen",
    },
  ],
});
</script>

<style scoped lang="less">
.margin-split {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: yellow;

  &-nav {
    height: 100%;

    .ant-menu {
      height: 100%;
    }
  }

  &-content {
    flex: 1;

    .vxe-grid {
      height: 100%;
    }
  }
}
</style>
