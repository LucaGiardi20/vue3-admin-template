<template>
  <!--Main-->
  <div id="master" :class="sidebarClasses">
    <!--Sidebar-->
    <Sidebar />
    <!--Main Container-->
    <div class="main-container">
      <!--Header-->
      <Navbar />
      <!--App-->
      <AppContent />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/layout/Sidebar";
import AppContent from "@/components/layout/AppContent";
import Navbar from "@/components/layout/Navbar";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "master",
  components: { Navbar, AppContent, Sidebar },
  setup() {

    const store = useStore();

    const sidebarClasses = computed(() => {
      return {
        "sidebar-collapsed": !store.state.sidebarOpened
      };
    });

    return {
      sidebarClasses
    };
  }
};
</script>

<style lang="scss" scoped>
#master {
  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: $sidebar-width;
    position: relative;
  }

  &.sidebar-collapsed {

    .sidebar-container {
      width: $sidebar-width-collapsed;

      &__header {
        justify-content: center;
      }
    }

    .main-container {
      margin-left: $sidebar-width-collapsed;

      .navbar {
        width: calc(100% - #{$sidebar-width-collapsed});
      }
    }
  }
}
</style>