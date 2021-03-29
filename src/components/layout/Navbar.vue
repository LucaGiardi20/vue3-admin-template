<template>
  <div class="navbar">
    <div class="navbar-breadcrumb">
      <Breadcrumb />
    </div>
    <div class="navbar-inner">
      <div class="navbar-inner__content">
        <el-dropdown
          class="avatar-container ml-2"
          trigger="hover"
          @command="onMenuClick"
        >
          <el-avatar>
            L
          </el-avatar>
          <!--Dropdown Options-->
          <template #dropdown>
            <el-dropdown-menu
              class="user-dropdown"
            >
              <router-link to="/profile">
                <el-dropdown-item>
                  Profile
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item command="change-password">
                Change password
              </el-dropdown-item>
              <el-dropdown-item
                divided
              >
                <span style="display:block;">Log Out</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/layout/Breadcrumb";

export default {
  name: "Navbar",
  components: {
    Breadcrumb
  },
  setup() {

    const onMenuClick = (command) => {
      console.log(command);
    };

    return {
      onMenuClick
    };
  }
};
</script>

<style lang="scss" scoped>

.navbar {
  height: $navbar-height;
  width: calc(100% - #{$sidebar-width});
  @apply overflow-hidden bg-white z-10 flex justify-end fixed top-0 right-0 shadow;
  transition: width 0.28s;

  &-breadcrumb {
    @apply m-auto absolute content-center flex items-center h-full;
    left: 1rem;
  }

  &-inner {
    @apply flex flex-row relative content-end bg-white border-l;
    padding-left: 1rem;
    padding-right: 1rem;

    &__content {
      @apply flex flex-row w-full content-end items-center bg-white;
    }
  }
}
</style>
