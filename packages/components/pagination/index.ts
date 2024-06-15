import { useInstall } from "@template/utils";
import index, { pageSetting, type Paging } from "./src/index.vue";

export { pageSetting, type Paging };

export const Pagination = useInstall(index);

export default index;
