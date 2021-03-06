<template>
  <div id="main">
    <router-view />
  </div>
</template>

<script>

export default {
  name: "App",
  title: "Application"
};
</script>

<style>
#main {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  @apply h-screen;
}
</style>
