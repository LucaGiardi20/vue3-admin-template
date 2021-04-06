<template>
  <section class="app-content">
    <div class="border rounded- rounded m-auto bg-white flex w-full flex-1 p-4">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
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
  @apply pl-8 pb-8 pr-8 flex flex-col h-screen w-full relative;
  padding-top: calc(#{$navbar-height} + 2rem);
  background-color: $background-color;

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