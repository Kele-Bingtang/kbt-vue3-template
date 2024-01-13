import FontIcon from "./src/components/ts/iconfont";
import IconifyOnline from "./src/components/ts/iconifyOnline";
import IconifyOffline from "./src/components/ts/iconifyOffline";
import { useInstall } from "@template/utils";
import index from "./src/index.vue";

export const Icon = useInstall(index);

export default index;

export { FontIcon, IconifyOnline, IconifyOffline };
