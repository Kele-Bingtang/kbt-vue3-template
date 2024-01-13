import type { App } from "vue";
import copy from "./copy";
import draggable from "./draggable";
import debounce from "./debounce";
import throttle from "./throttle";
import longPress from "./longPress";
import waves from "./waves";

const directivesList: any = {
  copy,
  draggable,
  debounce,
  throttle,
  longPress,
  waves,
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
