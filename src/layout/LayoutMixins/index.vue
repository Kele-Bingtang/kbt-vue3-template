<template>
  <el-container :class="[prefixClass, isCollapse ? 'menu-collapse' : 'menu-expand']">
    <el-header class="flx-justify-between">
      <div :class="`${prefixClass}__logo layout__logo flx-center`" @click="router.push(HOME_URL)">
        <img src="@/assets/images/logo.png" alt="logo" v-if="settingsStore.showLayoutLogo" />
        <span>{{ settings.title }}</span>
      </div>
      <CollapseTrigger />
      <Menu
        :menu-list="parentMenu"
        :active-menu="activeMenu"
        mode="horizontal"
        :is-collapse="false"
        :wrap-style="{ overflow: 'hidden' }"
        :class="`${prefixClass}__menu`"
        :popper-class="`${prefixClass}__menu`"
      />
      <HeaderRight />
    </el-header>
    <el-container :class="`${prefixClass}__aside`">
      <el-aside v-if="childrenMenu?.length" :class="{ 'not-aside': !childrenMenu.length }">
        <Menu :menu-list="childrenMenu" :class="`${prefixClass}__menu`" :popper-class="`${prefixClass}__menu`" />
      </el-aside>
      <MainContent />
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="LayoutMixins">
import { computed, watch, ref, unref } from "vue";
import { ElContainer, ElAside, ElHeader } from "element-plus";
import { useSettingsStore, usePermissionStore } from "@/stores";
import MainContent from "@/layout/components/MainContent/index.vue";
import { useLayout, useRoutes } from "@/hooks";
import settings from "@/config/settings";
import CollapseTrigger from "@/layout/components/Header/components/CollapseTrigger.vue";
import Menu from "@/layout/components/Menu/index.vue";
import HeaderRight from "@/layout/components/Header/HeaderRight.vue";
import { HOME_URL } from "@/router/routesConfig";
import { useDesign } from "@/hooks";
import { useRoute, useRouter } from "vue-router";

const { getPrefixClass } = useDesign();
const prefixClass = getPrefixClass("mixins-layout");

const route = useRoute();
const router = useRouter();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();
const { getMenuListByRouter } = useLayout();
const { findParentRoutesByPath } = useRoutes();

// 子菜单
const activeMenu = ref("");
const childrenMenu = ref<RouterConfig[]>([]);
const isCollapse = computed(() => settingsStore.isCollapse);
const menuList = computed(() => {
  if (settings.moreRouteChildrenHideInMenuThenOnlyOne) {
    const menu = getMenuListByRouter(permissionStore.loadedRouteList);
    return getMenuListByRouter(menu);
  } else return getMenuListByRouter(permissionStore.loadedRouteList);
});

const parentMenu = computed(() => {
  const parentMenu: RouterConfig[] = [];
  menuList.value.forEach(menuItem => {
    const item = { ...menuItem };
    item.children ? (item.children = []) : "";
    parentMenu.push({ ...item });
  });
  return parentMenu;
});

watch(
  route,
  () => {
    // 当前菜单没有数据直接 return
    if (!unref(menuList).length) return;
    const item = unref(menuList).filter(
      item =>
        route.path === item.path ||
        `/${route.path.split("/")[1]}` === item.path ||
        route.path === item.redirect ||
        findParentRoutesByPath(route.path, permissionStore.loadedRouteList, "path")[0] === item.path ||
        findParentRoutesByPath(`/${route.path.split("/")[1]}`, permissionStore.loadedRouteList, "path")[0] === item.path
    );

    activeMenu.value = item[0]?.path || "";

    if (item[0] && item[0].children?.length) return (childrenMenu.value = item[0].children);
    childrenMenu.value = [];
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
@use "./index";
</style>

<style lang="scss">
@use "./menu";
</style>
