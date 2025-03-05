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
      <div class="content-header">
        Title
      </div>
      <div class="content-main">
        <div class="content-tabs">
          <ul class="tab-list">
            <li class="tab-item tab-active">tab1</li>
            <li class="tab-item">tab2</li>
            <li class="tab-item">tab3</li>
            <li class="tab-item">tab4</li>
            <li class="tab-item">tab5</li>
          </ul>
        </div>
        <div class="form-area">
          <a-select></a-select>
          <a-select></a-select>
        </div>
        <div class="grid-area">
          <vxe-grid v-bind="gridOptions"> </vxe-grid>
        </div>
      </div>
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
  background-color: #efefef;

  &-nav {
    height: 100%;
    margin-right: 8px;

    .ant-menu {
      height: 100%;
      background-color: #fff;
      
      .ant-menu-item {
        span {
          width: 24px;
          height: 24px;
          color: #b7b0b0bc;
          svg{
            width: 24px;
            height: 24px;
          }

        }
        
      }

      .ant-menu-submenu{
        span {
          width: 24px;
          height: 24px;
          color: #b7b0b0bc;

          svg{
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }

  &-content {
    flex: 1;
    background-color: #f8f9fc;

    .content-header {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
    }

    .content-tabs {
      padding-top: 30px;
      background-color: sky-blue;
      .tab-list{
        display: flex;
        padding: 0;
        margin: 0;
        list-style-type: none;
        // background-color: pink;

        .tab-item{
          height: 40px;
          margin-right: 4px;
          padding: 0 36px;
          line-height: 40px;
          background-color: #e6eefc;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;

        }

        .tab-active {
          background-color: #fff;
        }
      }
    }

    .form-area {
      width: 100%;
      padding: 24px 0;
      padding-left: 36px;
      background-color: #fff;

      .ant-select {
        width: 160px;
        margin-right: 16px;

        .ant-select-selector {
          border-radius: 0;
        }
      }
    }

    .vxe-grid {
      height: 100%;
    }
  }
}
</style>
