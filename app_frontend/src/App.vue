<script setup>
  import { ref } from 'vue';
  import SideMenu from './components/lateral-menu/SideMenu.vue';
  import AppHeader from './components/AppHeader.vue';

  const auth_layout = ref(false);
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
</template>

<style scoped>
  .app-container {
    display: flex;
    height: 100vh;
  }

  .main-content-container {
    display: flex;
    flex-direction: column;
  }
</style>