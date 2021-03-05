<template>
  <div :class="{ collapsed: isCollapsed }" class="sidebar-container">
    <!--HAMBURGER-->
    <div class="sidebar-container__header">
      <p v-if="!isCollapsed" class="cursor-default">
        Title
      </p>
      <div
        class="w-8 h-8 flex justify-center cursor-pointer text-2xl hover:bg-gray-700 rounded"
        @click="onMenuClick"
      >
        <i
          v-if="isCollapsed"
          class="el-icon-s-unfold"
          style="margin-bottom: auto; margin-top: auto"
        />
        <i
          v-if="!isCollapsed"
          class="el-icon-s-fold"
          style="margin-bottom: auto; margin-top: auto"
        />
      </div>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapsed"
        :unique-opened="false"
        :collapse-transition="false"
        :default-openeds="openedMenus"
        background-color="#343756"
        text-color="#f4f4f4"
        active-text-color="#718096"
        mode="vertical"
      >
        <!-- for loop in "filteredMenuSlider"	computed -->
        <template v-for="(item, parentIndex) in menuItems" :key="parentIndex">
          <!-- PARENT DASHBOARD -->
          <router-link
            v-if="!item.hasOwnProperty('children')"
            :to="item.route"
          >
            <el-menu-item index="9">
              <!-- slot="title" -->
              <span>{{ item.label }}</span>
            </el-menu-item>
          </router-link>
          <!-- PARENT WITH SUB MENU -->
          <el-submenu
            v-else
            :index="parentIndex.toString()"
            class="bg-gray-300"
          >
            <!-- PARENT NAME -->
            <template v-slot:title>
              <!--slot="title"-->
              <span>{{ item.label }}</span>
            </template>
            <!-- CHILDREN PARENT -->
            <router-link
              v-for="(child, childIndex) in item.children"
              :key="childIndex"
              :to="child.route"
              :class="{
                'router-link-exact-active router-link-active':
                  $route.path === child.route
              }"
            >
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItems from "@/lib/constants/sidebarItems";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "Sidebar",
  setup() {

    const route = useRoute();
    const openedMenus = ref([]);
    const menuItems = ref(SidebarItems);

    const isCollapsed = computed(() => {
      return false; // Add sidebar from store
    });

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
      this.$store.commit("auth/TOGGLE_SIDEBAR");
    };

    return {
      openedMenus,
      menuItems,
      isCollapsed,
      activeMenu,
      onMenuClick
    };
  }
};
</script>

<style lang="scss" scoped>

.sidebar-container {
  transition: width 0.28s;
  width: $sidebar-width;
  background-color: $sidebar-background-color;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  color: #909399;

  &.collapsed {
    .sidebar-container__header {
      @apply justify-center;
    }
  }

  &__header {
    height: $navbar-height;
    display: flex;
    align-items: center;
    padding: 0.75rem;
    justify-content: space-between;
    width: 100%;
  }

  .scrollbar-wrapper {
    overflow-x: hidden;
  }

  & ::v-deep .el-scrollbar__view {
    height: 100%;
  }

  & ::v-deep .el-scrollbar__bar.is-vertical {
    right: 0;
  }

  .is-horizontal {
    display: none;
  }

  & ::v-deep .el-scrollbar {
    height: 100%;
  }

  & ::v-deep .el-menu {
    border: none;
    height: 100%;
    width: 100%;

    .el-submenu {
      .el-menu-item {
        /*height: 37px;*/
        height: 30px;
        line-height: 30px;
      }
    }
  }
}

.icon-badge {
  position: absolute;
  top: 17px;
  left: 35px;
  width: 10px;
  height: 10px;
  background-color: #f56c6c;
  /*border: solid white 1px;*/
}

.item-badge {
  line-height: 0px;
  padding-right: 24px;
  background-color: #409eff;
}

.input-sidebar {
  margin: 0 -5px 0 -4px;
}
</style>
