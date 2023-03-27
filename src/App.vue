<template>
  <el-config-provider :button="config" :size="layoutSize">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </el-config-provider>
</template>

<script setup lang="ts" name="App">
import { useLayoutStore } from "./stores/layout";
import { useTheme } from "./hooks/useTheme";

const layoutStore = useLayoutStore();

// 初始化主题配置
const { initTheme } = useTheme();
initTheme();

// 配置 element 按钮文字中间是否有空格
const config = reactive({
  autoInsertSpace: false,
});

// 配置全局组件大小
const layoutSize = computed(() => layoutStore.layoutSize);
</script>

<style lang="scss"></style>
