import components from "./components";
import { installComponents } from "./installer";

export * from "@template/components";
export * from "@template/constants";
export * from "@template/directives";
export * from "@template/hooks";
export * from "@template/request";
export * from "@template/utils";

const installer = installComponents([...components]);

export const install = installer.install;
export default installer;
