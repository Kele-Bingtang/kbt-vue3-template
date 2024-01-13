import { INSTALLER_SYMBOL } from "@kbt-ui/constants";

import type { App, Plugin } from "vue";

export const installComponents = (components: Plugin[] = []) => {
  const install = (app: App) => {
    if (app[INSTALLER_SYMBOL]) return;

    app[INSTALLER_SYMBOL] = true;
    components.forEach(c => app.use(c));
  };

  return {
    install,
  };
};
