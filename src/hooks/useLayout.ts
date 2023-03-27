import { DeviceType } from "@/stores/index.d";
import { useLayoutStore } from "@/stores/layout";
import { usePermissionStore } from "@/stores/permission";
import { ElMessage } from "element-plus";
import settings from "@/config/settings";
import { useSettingsStore } from "@/stores/settings";
import { useUserStore } from "@/stores/user";
import { isFunction } from "@/utils/layout/validate";
import { useRoutes } from "./useRoutes";
export const useLayout = () => {
  const layoutStore = useLayoutStore();
  const settingsStore = useSettingsStore();
  const userStore = useUserStore();
  const { homeRoute, loadedRouteList } = usePermissionStore();
  /**
   * @description 是否为移动端
   * @returns boolean：true 是，false 不是
   */
  const isMobile = () => {
    const rect = document.body.getBoundingClientRect();
    return rect.width - 1 < 767; // 这里以 ipad Mini 的宽度为移动端的阈值
  };
  /**
   * @description 计算页面尺寸
   */
  const resizeHandler = () => {
    if (!document.hidden) {
      const result = isMobile();
      layoutStore.toggleDevice(result ? DeviceType.Mobile : DeviceType.Desktop);
      if (result) settingsStore.closeSideMenu();
    }
  };
  /**
   * @description 根据当前跳转的路由设置显示在浏览器标签的 title
   * @param route 当前路由
   */
  const setBrowserTitle = (route: RouteConfig) => {
    const { title } = settings;
    const pageTitle = getTitle(route);
    let resTitle = pageTitle ? `${title} - ${pageTitle}` : title; // 默认标题的模式
    const { titleMode } = settingsStore;
    // 展示标题的多种模式判断
    if (titleMode === "0") resTitle = pageTitle ? `${title} - ${pageTitle}` : title;
    else if (titleMode === "1") {
      const { username } = userStore.userInfo;
      if (username && pageTitle) resTitle = `${username} - ${pageTitle}`;
      else if (username) resTitle = `${title} - ${username}`;
      else if (!pageTitle) resTitle = title;
    } else if (titleMode === "2") resTitle = title;
    else if (titleMode === "3") resTitle = pageTitle + "";
    window.document.title = resTitle;
  };
  /**
   * @description 获取页面标题、侧边菜单、面包屑、tabsNav 展示的 title
   * @param route 当前路由
   * @param start 是否从头开始解析出 title，因为路由在编译阶段已经解析了一部分，所以涉及路由里的配置不需要从头开始解析，具体看 ./useRoutes.ts 的 processRouteMeta 函数
   * @returns 路由的 title
   */
  const getTitle = (route: RouteConfig | RouterConfig) => {
    // 虽然 handleFunctionTitle 函数内部会对 title 是否是函数进行判断，但是因为 title 是函数的场景相比较小，所以这里先判断，减少往下执行的性能消耗
    if (route.meta.title && !isFunction(route.meta.title)) return route.meta.title + "";
    const meta = { ...route.meta }; // 取消 meta 响应式
    const title = meta?.title || "";
    if (title && isFunction(title)) return title({ ...route } as RouteConfig);
    return title + "";
  };
  /**
   * @description 获取面包屑列表
   * @returns 面包屑列表
   */
  const getBreadcrumbs = (route: RouteConfig): RouteConfig[] => {
    // 首页不存在
    if (!homeRoute?.path || !homeRoute?.name) {
      ElMessage({
        message: "您的首页无法获取，请前往 router/routesConfig.ts，找到 HOME_NAME，修改为您首页路由的 name 值",
        type: "error",
        duration: 10000,
      });
      return [];
    }
    // 如果是首页，直接返回
    if (route.path === homeRoute?.path || route.name === homeRoute?.name) return [homeRoute] as RouteConfig[];
    // 当前路由的父级路由组成的数组
    let matched = useRoutes().findParentRoutesByPath(route.meta._fullPath, loadedRouteList) as RouteConfig[];
    matched.push(toRaw(route));
    // 首页加上其他页面
    matched = [homeRoute as RouteConfig, ...matched];
    // 过滤掉 hideInBread 的配置
    return matched.filter(item => (item.name || item.meta?.title) && !item.meta?.hideInBread);
  };
  /**
   * @description 通过路由表获取菜单列表
   * @param loadRolesRoutes 权限路由
   * @returns 菜单列表
   */
  const getMenuListByRouter = (loadRolesRoutes: RouterConfig[]) => {
    const menusList: RouterConfig[] = [];
    loadRolesRoutes.forEach(route => {
      // 如果配置了 hideInMenu: true，则跳过该路由
      if (route.meta?.hideInMenu) return;
      // 如果只有一个子路由且 alwaysShowRoot 为 false | undefined，则子路由成为一级菜单
      if (route.children?.length === 1 && !route.meta?.alwaysShowRoot) {
        menusList.push(getMenuListByRouter(route.children)[0]);
      } else {
        // 否则，生成子菜单列表
        const children = getMenuListByRouter(route.children || []);
        if (children.length) route.children = children;
        menusList.push(route);
      }
    });
    return menusList;
  };
  return {
    isMobile,
    resizeHandler,
    getBreadcrumbs,
    setBrowserTitle,
    getTitle,
    getMenuListByRouter,
  };
};
