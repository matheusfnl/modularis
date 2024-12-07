<script setup>
  import { computed, onMounted, ref } from 'vue';
  import Button from 'primevue/button';

  import SectionHeader from '../components/SectionHeader.vue';
  import AppCard from '../components/AppCard.vue'
  import DashboardWorkCard from '../components/dashboard/DashboardWorkCard.vue'

  import {
    useUserStore,
    useModuleStore,
    useTenantStore,
  } from '../store';

  // User

  const userStore = useUserStore();
  const tenantStore = useTenantStore();

  const getIntroduction = computed(() => `Olá, ${userStore.user?.name}!`);

  // Modules

  const moduleStore = useModuleStore();
  const request_pending = ref(true);

  onMounted(() => {
    request_pending.value = true;
    request_pending.value = false;
  });
</script>

<template>
  <SectionHeader :title="getIntroduction" description="Aqui está um resumo da sua conta" />

  <div class="dashboard-container">
    <AppCard>
      <DashboardWorkCard />
    </AppCard>

    <AppCard>
      <DashboardWorkCard />
    </AppCard>

    <AppCard>
      <DashboardWorkCard />
    </AppCard>

    <AppCard>
      <DashboardWorkCard />
    </AppCard>

    <AppCard>
      <DashboardWorkCard />
    </AppCard>
  </div>
</template>

<style scoped>
  .borderless,
  .borderless:hover,
  .borderless:focus { border: none !important }

  .dashboard-container {
    padding: 8px 40px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 10px;
  }
</style>