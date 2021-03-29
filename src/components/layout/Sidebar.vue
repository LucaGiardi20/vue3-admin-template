<template>
  <div :class="{ collapsed: !isSidebarOpened }" class="sidebar-container">
    <!--HAMBURGER-->
    <div class="sidebar-container__header">
      <p v-if="isSidebarOpened" class="cursor-default">
        Title
      </p>
      <div
        class="w-8 h-8 flex justify-center cursor-pointer text-2xl hover:bg-gray-700 rounded"
        @click="onMenuClick"
      >
        <i
          v-if="!isSidebarOpened"
          class="el-icon-s-unfold"
          style="margin-bottom: auto; margin-top: auto"
        />
        <i
          v-if="isSidebarOpened"
          class="el-icon-s-fold"
          style="margin-bottom: auto; margin-top: auto"
        />
      </div>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="el-menu-vertical-demo"
        mode="vertical"
        :default-openeds="openedMenus"
        :collapse="!isSidebarOpened"
      >
        <template v-for="(item, parentIndex) in menuItems" :key="parentIndex">
          <!-- PARENT -->

          <el-menu-item
            @click="onMenuItemClick(item.route)"
            v-if="!item.hasOwnProperty('children')"
            :index="parentIndex.toString()"
          >
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </el-menu-item>
          <!-- PARENT WITH SUB MENU -->
          <el-submenu
            v-else
            :index="parentIndex.toString()"
            class="bg-gray-300"
          >
            <!-- PARENT NAME -->
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.label }}</span>
            </template>
            <!-- CHILDREN PARENT -->
            <el-menu-item-group
              v-for="(child, childIndex) in item.children"
              :key="childIndex"
            >
              <el-menu-item
                @click="onMenuItemClick(child.route)"
                :index="childIndex.toString()"
              >
                <span>{{ child.label }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItems from "@/lib/constants/sidebarItems";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Sidebar",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const openedMenus = ref([]);
    const menuItems = ref(SidebarItems);

    const isSidebarOpened = computed(() => store.state.sidebarOpened);

    const activeMenu = computed(() => {
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });

    /**
     * @desc On login press
     */
    const onMenuClick = () => {
      store.commit("app/toggleSidebar");
    };

    /**
     * @desc On menu item click
     */
    const onMenuItemClick = routePath => {
      router.push({
        path: routePath
      });
    };

    return {
      openedMenus,
      menuItems,
      isSidebarOpened,
      activeMenu,
      onMenuClick,
      onMenuItemClick
    };
  }
};
</script>

<style lang="scss" scoped>
.sidebar-container {
  transition: width 0.28s;
  width: $sidebar-width;
  background-color: $sidebar-background-color;
  @apply h-full fixed top-0 bottom-0 left-0 overflow-hidden z-50 shadow;
  z-index: 1001;

  &.collapsed {
    .sidebar-container__header {
      @apply justify-center;
    }
  }

  &__header {
    height: $navbar-height;
    @apply flex items-center justify-between p-3 w-full;
  }

  .scrollbar-wrapper {
    @apply overflow-hidden;
  }

  & ::v-deep(.el-scrollbar__view) {
    @apply h-full;
  }

  & ::v-deep(.el-scrollbar__bar.is-vertical) {
    @apply right-0;
  }

  .is-horizontal {
    @apply hidden;
  }

  & ::v-deep(.el-scrollbar) {
    @apply h-full;
  }
}
</style>
