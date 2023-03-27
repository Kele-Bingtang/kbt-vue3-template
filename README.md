# kbt-vue3-template

基于 Vue3.2、TypeScript、Vite4、Pinia、Element-Plus 搭建的 Admin Template 模板。

这是纯净版，只有项目框架必要的信息。完整版请看 [kbt-vue3-admin](https://github.com/Kele-Bingtang/kbt-vue3-admin)。

no-i18n 不支持国际化，如果你需要国际化，则看本仓库的另一个分支：[no-i18n](https://github.com/Kele-Bingtang/kbt-vue3-template)。

克隆项目下来后，记得切换 GitLab 地址，修改为您真正的项目地址。

如果您暂时不确定您当前开发的项目地址，可以先把根目录下的 .git 文件删除，因为 .git 目录在 Windows 是隐藏的，所以您可以有两个步骤来删除它：

- 使用 Windows 10 资源管理器进入到项目根目录，右上角「查看」 -> 「隐藏的项目」打勾，即可看到隐藏的项目，即 .git，然后右键删除即可
- 使用 Windows 10 资源管理器进入到项目根目录，按住 `Shift`，然后鼠标在空白处右键，选择「在处处打开 Powershell 窗口」，执行命令 `rm -r -force .git` 即可删除
- 利用 Git Bash Here 窗口进入项目根目录，执行命令 `rm -rf .git` 即可删除

## 必须操作

Admin 项目用到的 key 暂时只有缓存功能，如个性化配置、布局配置。通过缓存的形式确保用户下次进来 Admin ，还能恢复原来的配置。但是因为 Admin 项目可能会作为很多的 Admin 开发模板，所以您需要确保您用到的任何 key 是唯一的。

您需注意的是：Admin 使用的缓存 key 是一个确定的值，通过该 key 读取缓存内容，这样导致读取到其他用到 Admin 项目的缓存内容。

所以您需要给您开发的项目一个独立的缓存 key，请前往 `src/config/settings.ts` 下，找到 `settingCacheKey` 、`layoutCacheKey`、`tabsNavCacheKey`，修改对应的值，最好以 Admin 名来确保唯一性。

如：Admin 使用的 key 默认前缀是 `kbt_`，如果您的项目叫做 MIT，则将 `kbt_` 改为 `mit_` 即可。

注意：tokenKey 不需要修改，因为 token 是所有 Admin 的访问凭证。如果您修改了 tokenKey，则无法利用该 token 访问其他项目。

## 效果预览

[kbt-vue3-admin](https://vue3-admin.youngkbt.cn/)

## 使用流程

Clone code：拉取代码

```sh
git clone https://github.com/Kele-Bingtang/kbt-vue3-admin
```

Project setup：安装依赖

```sh
yarn install
```

Compiles and hot-reloads for development：编译运行（开发环境使用）

```sh
yarn dev
# or
yarn server
```

Compiles and minifies for production：打包运行（测试环境使用）

```sh
yarn build:test
```

Compiles and minifies for production：打包运行（生产环境使用）

```sh
yarn build:pro
```

Lints and fixes files：检查和修复文件

```sh
yarn lint
```

Push code：提交代码到 git

前往 push.sh 文件修改要提交的远程仓库地址，然后在 Git Bash Here 执行命令：

```sh
sh push.sh "您的 commit 信息"
```

## 文件资源目录 📚

```text
Vue3-Admin-Ts
├─ .vscode                # VSCode 推荐配置
├─ public                 # 静态资源文件（该文件夹不会被打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ directives          # 全局指令文件
│  ├─ enums               # 项目常用枚举
│  ├─ hooks               # 常用 Hooks 封装
│  ├─ layouts             # 框架布局模块
│  ├─ routers             # 路由管理
│  ├─ stores              # pinia store
│  ├─ styles              # 全局样式文件
│  ├─ types               # 全局 ts 声明
│  ├─ utils               # 常用工具库
│  ├─ views               # 项目所有页面
│  ├─ App.vue             # 项目主组件
│  ├─ env.d.ts            # 指定 ts 识别 vue
│  └─ main.ts             # 项目入口文件
├─ .editorconfig          # 统一不同编辑器的编码风格
├─ .env                   # vite 常用配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.js           # Eslint 校验配置文件
├─ .gitignore             # 忽略 git 提交
├─ .prettierignore        # 忽略 Prettier 格式化
├─ .prettierrc.js         # Prettier 格式化配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ .stylelintrc.js        # stylelint 样式格式化配置
├─ CHANGELOG.md           # 项目更新日志
├─ commitlint.config.js   # git 提交规范配置
├─ index.html             # 入口 html
├─ LICENSE                # 开源协议文件
├─ lint-staged.config     # lint-staged 配置文件
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ postcss.config.js      # postcss 配置
├─ README.md              # README 介绍
├─ STANDARD.md            # 项目编码规范说明书
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 全局配置文件
```

## 内容说明

### 布局

Admin 的布局组件有顶栏、面包屑、侧边菜单栏、标签栏、内容区，位于 `src/layout` 下，分别位为 components 目录的 Header、Menu、TabsNav、MainContent 下。

内容区（MainContent）根据路由进行组件的跳转，可视化页面的组件在 `src/views` 下。

布局支持 4 种形式，所以使用了 `<compoment is=""></component>` 内置组件来动态切换，具体请看 `src/layout/index.vue` 内容。

标签栏支持两种形式，一种是保留了 Vue2 Admin 的经典版，另一种是使用了 Element Plus 提供的 `el-tabs` 组件。也采用了 components 内置组件来动态切换，具体请看 `layout/components/TabsNav` 内容。

关于 Vue3 Admin 为什么保留标签栏的 Vue2 Admin 经典版，我引用最近很火的一个梗：

> Vue3 Admin 我使用了新功能和新版标签栏，但是我保留了 Vue2 Admin 的部分旧功能和经典版标签栏，我觉得保留 Vue2 Admin 的这些东西，才让人知道你是基于 Vue 2 Admin 升级成 Vue3 Admin。
>
> 对！我是故意的 🤪😜

### 组件

常用的组件进行封装，位于 `src/components` 下。

### API

#### params/\_type

Admin 的 API 文件位于 `src/api` 下，采用 Axios 进行请求，该配置文件位于 `src/config/request.ts` 文件里。

Admin 对 axios 进行了一些处理，可以在 params 下添加了一个关键词 `_type`（仅支持 `post` 请求），该关键词目前接收 5 个参数：

- `form`：请求头为 `application/x-www-form-urlencoded`
- `file`：请求头为 `application/form-data`
- `json`：请求头为 `application/json`
- `info`：请求头为 `multipart/form-data`
- `multi`：代表发送的参数有数组，会自动处理成 `key=value&key=value 形式

如果你不填写 `_type`，则默认是 json。

可以看 `src/api` 下的例子。

#### header/loading（boolean）

如果发送请求时，需要显示全局 loading 加载，在 api 服务中通过指定: { headers: { loading: true } } 来控制显示 loading

```typescript
import http from "@/config/request";

export const api = () => {
  http.request({
    url: "/generic/api",
    // ...
    headers: {
      loading: true,
    },
  });
};
```

#### header/mapping（boolean）

当项目变得复杂时，那么获取资源的 `https://ip:port` 必然有很多个，可以在接口的 header 使用 mapping 来开启多个 baseURL 功能：

```typescript
import http from "@/config/request";

export const api = () => {
  http.request({
    url: "/generic/api",
    // ...
    headers: {
      mapping: true,
    },
  });
};
```

当开启 mapping 后，打开 `src/config/request.ts` 文件，然后在 mappingUrl 变量里添加一个键值对：

```typescript
const mappingUrl: { [key: string]: string } = {
  default: import.meta.env.VITE_API_URL,
  test: "https://youngkbt.cn",
};
```

default 是默认的 baseURL，**请不要删除或者更改**，当不开启 mapping 或者开启后无法匹配键值对，则走 default 对应的 URL。

当配置了一个键值对，如上面的 test，则在请求的时候，url 前缀携带 test，如（第五行）：

```typescript
import http from "@/config/request";

export const api = () => {
  http.request({
    url: "/test/generic/api",
    // ...
    headers: {
      mapping: true,
    },
  });
};
```

当触发该接口到后台时，`/test` 将会被替换成 `https://youngkbt.cn`，变成 `https://youngkbt.cn/generic/api`。

如果在 headers 开启了 mapping，但是 URL 没有在 mappingUrl 里配置，则依然走 default 的 URL。

在不使用该功能时，不建议打开 mapping，因为这将进行一轮 mapping 匹配扫描，耗费些许时间。

### 路由

#### 参数

路由的所有相关文件位于 `src/router` 下：

- 路由和组件的配置文件为 `routes-config.ts`
- 路由的核心配置、路由拦截文件为 `index.ts`
- 路由关闭前的回调文件为 `before-close.ts`

路由的配置有如下规则：

Admin 模板需要的可配置参数:

```typeScript
/**
 * path ==> 路由的地址，这是必须设置的，如果是个有效的 http 或者 https 链接，则点击该菜单跳转到新窗口
 * name ==> 路由的名字，这是必须设置的
 * redirect ==> 重定向到某个路由下，可选，function 使用方式请看官网：https://router.vuejs.org/zh/api/index.html#redirect
 * component ==> 视图文件路径
 * meta ==> 菜单信息
 * meta.roles ==> 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 * meta.title ==> 显示在侧边栏、面包屑和标签栏的文字，使用 '{{ 多语言字段 }}' 形式结合「多语言」使用，可以传入一个回调函数，参数是当前路由对象 to
 * meta.icon ==> 菜单图标，该页面在左侧菜单、面包屑显示的图标，无默认值，如果是数组形式（仅支持三个下标），则对应 [icon, width, height]
 * meta.notClickBread ==> 是否允许点击面包屑，如果为 true，则该路由无法在面包屑中被点击，默认为 false
 * meta.hideInBread ==> 是否隐藏面包屑，如果为 true，则该路由将不会出现在面包屑中，默认为 false
 * meta.hideInMenu ==> 是否隐藏菜单，如果为 true，则该路由不会显示在左侧菜单，默认为 false
 * meta.alwaysShowRoot ==> 是否总是渲染为菜单，如果为 false 且某一级路由下只有一个二级路由，则左侧菜单直接显示该二级路由，如果为 true，则总会让一级菜单作为下拉菜单，默认为 false，仅限父级路由使用
 * meta.isKeepAlive ==> 是否缓存，如果为 true，该路由在切换标签后不会缓存，如果需要缓存，则「必须」设置页面组件 name 属性（class 名）和路由配置的 name 一致，默认为 false
 * meta.isAffix ==> 是否固定在 tabs nav，如果为 true，则该路由按照路由表顺序依次标签固定在标签栏，默认为 false
 * meta.isFull ==> 是否全屏，不渲染 Layout 布局，只渲染当前路由组件
 * meta.activeMenu ==> Restful 路由搭配使用，当前路由为详情页时，需要高亮的菜单
 * meta.beforeCloseName ==> 关闭路由前的回调，如果设置该字段，则在关闭当前 tab 页时会去 @/router/before-close.js 里寻找该字段名「对应」的方法，作为关闭前的钩子函数，无默认值
 * meta.rank ==> 路由在左侧菜单的排序，rank 值越高越靠后，当 rank 不存在时，根据顺序自动创建，首页路由永远在第一位，当 rank 存在时，可以插入指定的菜单位置，默认不存在
 * meta.frameSrc ==> IFrame 链接，填写后该路由将打开 IFrame 指定的链接
 */
```

动态加载路由 `rolesRoutes` 的 **懒加载** 配置支持三种形式：

#### 字符串形式

```typescript
export const rolesRoutes: RouterConfigRaw[] = [
  {
    path: "/home",
    name: "Home",
    component: "/home/index",
    meta: {
      isAffix: true,
      title: "首页",
      icon: "HomeFilled",
    },
  },
];
```

#### Path 形式

```typescript
export const rolesRoutes: RouterConfigRaw[] = [
  {
    path: "/home/index",
    name: "Home",
    meta: {
      isAffix: true,
      title: "首页",
      icon: "HomeFilled",
    },
  },
];
```

前面两种只需要对应上组件所在的 views 下的目录即可，如 `@/views/home/index.vue`，在加载前自带加上 `@/views` 和 `.vue`。

#### 官方形式：

```typescript
export const rolesRoutes: RouterConfigRaw[] = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home/index.vue")
    meta: {
      isAffix: true,
      title: "首页",
      icon: "HomeFilled",
    },
  },
]
```

### 状态管理 Pinia

状态管理文件既有组件需要的数据、方法、也有用户信息、路由权限等的初始化方法，配合路由守卫进行初始化，位于 `src/store/modules` 下。

- `errorLog.ts`：错误日志 store
- `layout.ts`：布局信息 store
- `permission.ts`：路由权限 store
- `settings.ts`：项目客制化 store
- `user.ts`：用户信息 store

### 工具

Admin 常用的函数位于 `src/utils` 下，实现复用性，有数据深克隆、URL 参数值截取、展示 title 等功能函数。

Admin 继承了 Vue3 的核心思想：hooks 函数，位于 `sc/hooks` 下。

### 接口

组件用到的 TypeScript 类型在 `src/types` 下创建并引入使用。

全局类型有封装的路由、Meta 类型、axios 请求返回类型、TS 常用类型等。

### 样式

Admin 模板布局用到的可定制化样式位于 `src/styles` 下，如侧边栏主题、全局样式，您可以查看源码，根据自己的美观修改对应的样式。

### 图标

Admin 模板使用的图标是 Element UI 内置的和 SVG 格式，因为 Element UI 内置的图标较少，所以自行在网上找 SVG 图标，如 [阿里云矢量图标库](https://www.iconfont.cn/)。

图标放置于 `src/assets/icons` 下。

使用步骤：在 vue 组件里使用 svg-icon 标签，如 `<svg-icon name="bug" width="20px" height="20px" />`，其中 name 是 svg 的文件名，width 和 height 为图标的宽度和高度。

### 多环境

Admin 模板内置了多环境，分为本地环境、测试环境、开发环境，本地环境无需设置，

- 全局环境的文件：.env
- 本地环境的文件：.env.development
- 测试环境的文件：.env.test
- 正式环境的文件：.env.production

每个环境都有 `VITE_BASE_URL`，这是路由、静态文件的根路径。

### 事件总栈

Vue3 已经把事件总栈去掉了，所以原生 Vue3 我们无法使用事件总栈来给不同组件传递事件。

Admin 使用了 mittBus 实现事件总栈。

注册一个事件到事件总栈：

ThemeDrawer.vue

```typescript
import mittBus from "@/utils/mittBus";

mittBus.on("openThemeDrawer", (value: boolean) => (drawerVisible.value = value));
```

从事件总栈触发该事件：

User.vue

```typescript
import mittBus from "@/utils/mittBus";

const openSettingsDrawer = () => {
  mittBus.emit("openThemeDrawer", true);
};
```

### 错误日志

Admin 内置错误日志，当项目抛出 1 个 Error 的时候，Admin 会将其捕获，然后放到日志组件里，您可以在页面的右上角看到一个「虫子」的图标，点击后会跳转到日志页面，查看错误的信息。

「虫子」的图标只有在出现抛出至少 1 个 Error 的时候才会出现，默认是不出现的，如果你想直接访问，则访问项目根路径 + `/error-log` 即可。

关于其他内容请仔细阅读源码，或者后续慢慢往下补充。

### 页面刷新

#### 方法一

如果您想在执行完某些操作（增删改）之后刷新页面，Admin 已经通过 provide 往 views 目录下的组件注入一个函数，您只需要通过 inject 接收，然后调用即可。

相关代码：`layout/components/MainContent/index.vue`

```typescript
export type RefreshFunction = (value?: boolean) => boolean;

const refreshCurrentPage: RefreshFunction = (value?: boolean) => {
  // ...
};
provide("refresh", refreshCurrentPage);
```

使用的方式有两种：

> 传入参数

接收的是一个函数，如果您调用该函数时，可以传入参数，参数类型为 boolean 值

```typescript
import type { RefreshFunction } from "@/layout/components/MainContent/index.vue";

const refreshCurrentPage = inject("refresh") as RefreshFunction;
refreshCurrentPage(false);
nextTick(() => {
  refreshCurrentPage(true);
});
```

先传入 false，在 nextTick 生命周期再传入 true 来实现刷新

> 不传参数

您可以直接调用该函数，如果不传入参数，则函数内部自动实现刷新功能

```typescript
import type { RefreshFunction } from "@/layout/components/MainContent/index.vue";

const refreshCurrentPage = inject("refresh") as RefreshFunction;
refreshCurrentPage();
```

传入参数的方式适用于您想在刷新前做些事情，在您没有第二次传入 true 时，页面是不会刷新的。

#### 方法二

Template 内置重定向组件 `redirect.vue`，位于 `/src/layout/redirect.vue` 下，并且该组件已经在 constantRoutes 进行加载注入，所以你只需要了解如何使用该组件跳转即可。

方法非常简单，利用编程式路由跳转：

```typescript
const router = useRouter();

router.push("/redirect/home");
// or
router.replace("/redirect/home");
```

这样将会跳转到 `/home` 的路由，因此您要了解的是，`/redirect` 是必须的前缀，后面携带的地址就是路由对应的 path。

所以实现页面刷新，只需要在重定向到自己的 path。

```typescript
const router = useRouter();
const route = useRoute();

router.push("/redirect" + route.path);
// or
router.replace("/redirect" + route.path);
```

具体是 `route.path` 还是 `route.fullPath`，根据你的需求来实现，最终都会刷新当前页面。

### IFrame 嵌入

除了项目的组件，你可能需要打开外部的链接，那么就有 IFrame 嵌入功能。

你只需要在写路由的时候在 meta 传入 frameSrc 即可。

```typescript
{
  path: "vue2-template-iframe",
  name: "IFrameVue2Template",
  meta: {
  title: "Vue2 Template IFrame",
  icon: "HotWater",
    frameSrc: "http://172.16.49.41/vue2-template",
  },
}
```

此时点击左侧菜单的该菜单，则会打开这个嵌入的 frameSrc 网页。

### 新窗口打开

除了 IFrame 嵌入来打开外部链接，还可以打开新的窗口来跳转该链接。

您只需要在路由的配置中，给 path 填写带有 `http` 或者 `https` 的链接，就可以跳转。

```typescript
{
	path: "https://github.com/Kele-Bingtang/kbt-vue3-admin",
	name: "Github",
	meta: {
		title: "Github",
		icon: "svg-github",
	},
},
```

点击即可打开新窗口跳转。

## 配置流程

### 菜单、路由配置

一套简单的开发仅需两步：

- 开发您自己的 Vue 组件
- 在 `src/router/routes-config.ts` 里配置路由、角色等信息

Admin 根据路由、角色等信息自动生成菜单栏、面包屑、标签页。

用户的默认角色为空数组，实际的角色应该从后端获取。
