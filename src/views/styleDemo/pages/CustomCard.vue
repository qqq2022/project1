<template>
  <div class="custom-card">
    <div class="margin-split-nav">
      <ul class="nav-list">
        <li class="nav-item nav-item-active"></li>
        <li class="nav-item"></li>
        <li class="nav-item"></li>
        <li class="nav-item"></li>
        <li class="nav-item"></li>
      </ul>
    </div>
    <div class="margin-split-content">
      <div class="content-header"></div>
      <div class="content-main">
        <div class="content-tabs">
          <ul class="tab-list">
            <li class="tab-item tab-active"></li>
            <li class="tab-item"></li>
            <li class="tab-item"></li>
            <li class="tab-item"></li>
            <li class="tab-item" style="margin-right: 0"></li>
          </ul>
        </div>
        <!-- <div class="form-area"> -->
        <!-- <div class="form-item">
            <a-select></a-select>
          <a-select></a-select>
          </div>

          <div class="form-btn">
            <a-button type="primary">查询</a-button>
          </div> -->

        <!-- </div> -->
        <div class="grid-area">
          <!-- <vxe-grid v-bind="gridOptions"> </vxe-grid> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";
</script>

<style scoped lang="less">
.custom-card {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 24px;
  background-color: #efefef;

  .margin-split-nav {
    width: 100px;
    background-color: #fff;
    margin-right: 24px;
    border-radius: 8px;
  }

  .margin-split-content {
    flex: 1;

    .content-header {
      display: flex;
      height: 40px;
      justify-content: space-between;
      background-color: #fff;
      border-radius: 8px;
    }

    .content-main {
      height: calc(100% - 40px);
      margin-top: 8px;

      .tab-list {
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin-bottom: 8px;

        .tab-item {
          width: 20%;
          height: 150px;
          margin-right: 8px;
          border-radius: 16px;
          background-color: #fff;
        }
      }

      .grid-area {
        height: calc(100% - 166px);
        background-color: #fff;
        border-radius: 16px;
      }
    }
  }
}
</style>
