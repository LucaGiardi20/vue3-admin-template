<template>
  <section class="app-content">
    <div class="border rounded- rounded m-auto bg-base flex w-full flex-1">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: "AppContent"
};
</script>

<style lang="scss" scoped>

.app-content {
  /*50 = navbar  */
  min-height: 100vh; //calc(100vh - #{$navbar-height});
  margin-top: $navbar-height;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: $background-color;
  @apply p-8;
  @apply flex flex-col;
}

.fade-enter-active, .fade-leave-active {
  transition: all .2s ease-in-out;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  transform: translate(0, 30px);
  opacity: 0;
}
</style>