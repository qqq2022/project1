<template>
  <a-layout style="min-height: 100vh">
    <!-- 固定定位的侧边栏 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      :trigger="null"
      :width="200"
      :style="{
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0,
        zIndex: 100,
      }"
      class="custom-sider"
    >
      <div class="logo">LOGO</div>
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <user-outlined />
          <span>菜单项1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>菜单项2</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <!-- 主内容区域 -->
    <a-layout
      :style="{
        marginLeft: collapsed ? '0' : '200px',
        transition: 'margin 0.2s',
      }"
    >
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content style="margin: 24px 16px">
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          页面内容
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from "vue";
import {
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";

const selectedKeys = ref(["1"]);
const collapsed = ref(false);
</script>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  color: white;
  text-align: center;
  line-height: 32px;
  font-weight: bold;
}

.trigger {
  padding: 0 24px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

/* 侧边栏折叠时的动画效果 */
.custom-sider {
  transition: all 0.2s;
}

/* 为内容区域添加过渡效果 */
.ant-layout {
  transition: all 0.2s;
}
</style>
