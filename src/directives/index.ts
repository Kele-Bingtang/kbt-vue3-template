import type { App } from "vue";
import copy from "./modules/copy";
import draggable from "./modules/draggable";
import debounce from "./modules/debounce";
import throttle from "./modules/throttle";
import longPress from "./modules/longPress";
import waves from "./modules/waves";
import role from "./modules/permission/role";
import auth from "./modules/permission/auth";

const directivesList: any = {
  copy,
  draggable,
  debounce,
  throttle,
  longPress,
  waves,
  role,
  auth,
};

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach(key => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key]);
    });
  },
};

export default directives;
