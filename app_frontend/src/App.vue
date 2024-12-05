<script setup>
  import { ref, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';

  import AppLogo from './assets/AppLogo.vue'

  import SideMenu from './components/side-menu/SideMenu.vue';
  import AppHeader from './components/AppHeader.vue';
  import AppLoading from './components/AppLoading.vue';

  import { useFlowStore } from './store';

  const auth_layout = ref(false);
  const route = useRoute();

  const store = useFlowStore();

  watchEffect(() => auth_layout.value = route.meta.auth || false);
</script>

<template>
  <template v-if="! auth_layout">
    <div class="app-container">
      <SideMenu />
      <div class="main-content-container">
        <AppHeader />
        <main class="main-containeer">
          <RouterView />
        </main>
      </div>

      <div class="loading-app-container" v-if="store.app_request_pending">
        <AppLogo />
        <AppLoading size="36" />
      </div>
    </div>
  </template>

  <template v-else>
    <RouterView />
  </template>
</template>

<style scoped>
  .app-container {
    position: relative;
    display: flex;
    height: 100vh;
  }

  .main-content-container {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .loading-app-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    flex-direction: column;
    gap: 36px;
  }

  .main-containeer { padding: 20px; }
</style>