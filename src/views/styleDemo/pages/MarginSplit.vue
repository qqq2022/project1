<template>
  <div class="margin-split">
    <div class="margin-split-nav">
      <ul class="nav-list">
        <li class="nav-logo">
          <AppstoreOutlined />
        </li>

        <li class="nav-item nav-item-active">
          <PieChartOutlined />
        </li>
        <li class="nav-item">
          <DesktopOutlined />
        </li>
        <li class="nav-item">
          <InboxOutlined />
        </li>
        <li class="nav-item">
          <MailOutlined />
        </li>
        <li class="nav-item">
          <AppstoreOutlined />
        </li>
      </ul>
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
          <div class="form-item">
            <a-select></a-select>
          <a-select></a-select>
          </div>

          <div class="form-btn">
            <a-button type="primary">查询</a-button>
          </div>
         
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
  border: 'none',
  // stripe: true,
  // height: 300,
  // align: null,
  // columnConfig: {
  //   resizable: true
  // },
  rowConfig: {
        isCurrent: true,
        isHover: true
  },
  columns: [
    { type: 'checkbox', field: "name", title: "name" },
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
  background-color: #f3f3f3;

  &-nav {
    height: 100%;
    width: 40px;
    margin-right: 8px;
    background-color: #fff;

    .nav-list {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      list-style-type: none;
      text-align: center;

      .nav-logo {
        height: 40px;
        line-height: 40px;
        // border-bottom: 2px solid #f8f9fd;
        color: #4381ea;

        span {
          width: 24px;
          height: 24px;
          padding: 4px 0;
          font-size: 20px;
        }
      }
      
      .nav-item {
        // background-color: pink;
        width: 100%;
        margin: 20px 0;
        color: #b7b0b0bc;

        span {
          width: 24px;
          height: 24px;
          padding: 4px 0;
          font-size: 20px;
        }

      }

      .nav-item-active {
        border-left: 2px solid #4381ea
      }
    }
  }

  &-content {
    flex: 1;
    // background-color: #f8f9fc;

    .content-header {
      width: 100%;
      height: 48px;
      line-height: 48px;
      margin-bottom: 8px;
      background-color: #fff;
    }

    .content-main {
      height: calc(100% - 56px);
      background-color: #f8f9fd;
      padding-left: 40px;
      padding-top: 40px;

      .content-tabs {
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
            background-color: #e7edfa;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;

          }

          .tab-active {
            background-color: #fff;
          }
        }
      }

    .form-area {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 24px 0;
      padding-left: 36px;
      padding-right: 8px;
      background-color: #fff;

      :deep(.ant-select) {
        width: 200px;
        margin-right: 16px;

        .ant-select-selector {
          border-radius: 0;
        }
      }

      .form-btn {
        :deep(.ant-btn) {
          border-radius: 0;
          background-color: #4381ea
        }
      }
    }

    :deep(.vxe-grid) {
      height: 100%;

      .vxe-table {
        .vxe-table--header {
          .vxe-header--row {
            background-color: #edeef3 !important;
          }
        }

        .vxe-body--column {
            border-bottom: 1px solid #efefef;
        }
      }




    }
    }


  }
}
</style>
