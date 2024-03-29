<template>
  <el-dropdown trigger="click" class="user-dropdown">
    <div class="avatar-wrapper">
      <template v-if="prop.showAvatar">
        <el-image :src="user.avatar" class="user-avatar" alt="头像">
          <template #error>
            <el-image :src="defaultAvatar" alt="头像" />
          </template>
        </el-image>
        <span class="username">{{ user.username }}</span>
      </template>

      <el-icon><ArrowDownBold /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="openSettingsDrawer" :icon="Setting" v-if="showSettings">
          <span>
            {{ settingsLabel }}
          </span>
        </el-dropdown-item>
        <el-dropdown-item divided @click="logout" :icon="Back">
          <span>
            {{ logOutLabel }}
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="User">
import { useSettingsStore } from "@/stores/settings";
import { useUserStore } from "@/stores/user";
import { useI18n } from "vue-i18n";
import defaultAvatar from "@/assets/images/default.png";
import { ArrowDownBold, Setting, Back } from "@element-plus/icons-vue";
import mittBus from "@/utils/layout/mittBus";
import { ElMessage, ElMessageBox } from "element-plus";
import { LOGIN_URL } from "@/router/routesConfig";

const prop = withDefaults(defineProps<{ showAvatar?: boolean }>(), {
  showAvatar: true,
});

const { t } = useI18n();
const userStore = useUserStore();
const settingsStore = useSettingsStore();
const route = useRoute();
const router = useRouter();

const user = computed(() => userStore.userInfo);
const showSettings = computed(() => settingsStore.showSettings);

const settingsLabel = computed(() => {
  const settings = t("_headerBar.settings");
  return settings === "_headerBar.settings" ? "我的设置" : settings;
});
const logOutLabel = computed(() => {
  const logOut = t("_headerBar.logOut");
  return logOut === "_headerBar.logOut" ? "退出登录" : logOut;
});

const openSettingsDrawer = () => {
  mittBus.emit("openThemeDrawer");
};

const logout = async () => {
  ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    // 调用退出登录接口
    await userStore.logout();
    // 重定向到登陆页
    router.push(`${LOGIN_URL}?redirect=${route.path}`);
    ElMessage.success("退出登录成功！");
  });
};
</script>

<style lang="scss" scoped>
.avatar-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;

  .user-avatar {
    width: 35px;
    height: 35px;
    cursor: pointer;
    border-radius: 50%;
  }

  .username {
    display: inline-block;
    margin: 0 7px 0 9px;
    font-size: 14px;
    line-height: 0px;
    cursor: pointer;
    user-select: none;
  }

  .el-icon-caret-bottom {
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
