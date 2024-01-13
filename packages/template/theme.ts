import { useCssVar } from "@vueuse/core";

const el = document.documentElement;
const primaryColor = useCssVar("--el-color-primary", el);
const successColor = useCssVar("--el-color-success", el);
const warningColor = useCssVar("--el-color-warning", el);
const dangerColor = useCssVar("--el-color-danger", el);

primaryColor.value = "#395AE3";
successColor.value = "#0BB449";
warningColor.value = "#FA9014";
dangerColor.value = "#EF4A38";
