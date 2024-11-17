<script setup>
  import { ref, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';

  import SideMenu from './components/side-menu/SideMenu.vue';
  import AppHeader from './components/AppHeader.vue';

  const auth_layout = ref(false);
  const route = useRoute();

  watchEffect(() => auth_layout.value = route.meta.auth || false);
</script>

<template>
  <template v-if="! auth_layout">
    <div class="app-container">
      <SideMenu />
      <div class="main-content-container">
        <AppHeader />
        <main>
          <RouterView />
        </main>
      </div>
    </div>
  </template>

  <template v-else>
    <RouterView />
  </template>
</template>

<style scoped>
  .app-container {
    display: flex;
    height: 100vh;
  }

  .main-content-container {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
</style>