<template>
  <!--Main-->
  <div id="app">
    <!--Sidebar-->
    <Sidebar />
    <!--Main Container-->
    <div class="main-container">
      <!--Header-->
      <!-- <Navbar /> -->
      <!--App-->
      <AppContent />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/layout/Sidebar";
import AppContent from "@/components/layout/AppContent";

export default {
  name: "master",
  components: { AppContent, Sidebar }
};
</script>

<style scoped>

</style>