<script setup>
  import Button from 'primevue/button';

  import SectionHeader from '../components/SectionHeader.vue';
  import AppCard from '../components/AppCard.vue'
  import DashboardWorkCard from '../components/dashboard/DashboardWorkCard.vue'
</script>

<template>
  <SectionHeader title="Olá, Matheus!" description="Aqui está um resumo da sua conta">
    <template #actions>
      <Button label="Criar trabalho" size="small" icon="pi pi-plus"  iconPos="right" />
      <Button icon="pi pi-ellipsis-h" size="small" variant="outlined" class="borderless" />
    </template>
  </SectionHeader>

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