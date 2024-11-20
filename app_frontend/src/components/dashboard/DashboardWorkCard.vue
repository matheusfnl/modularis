<script setup>
  import { ref } from 'vue';
  import Button from 'primevue/button';

  import DashboardWorkItem from './DashboardWorkItem.vue';

  const works = ref([
    { title: 'Arrumar o carro', date: '21 Novembro 2024 às 19:45', status: 'Atrasado' },
    { title: 'Lavar a moto', date: 'Mar 14, 2023 at 08:10', status: 'Concluído' }
  ])
</script>

<template>
  <div class="work-header">
    <p class="header-title">Trabalho</p>
    <Button label="Ver todos" variant="link" class="grey-link" size="small" />
  </div>

  <div class="items-container">
    <DashboardWorkItem
      v-for="(work, index) in works"
      :key="index"
      :work="work"
      :border="index !== works.length - 1"
    />
  </div>
</template>

<style scoped>
  .work-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 4px;
  }

  .header-title {
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    margin: 0px;
  }

  .grey-link {
    color: var(--text-5);
    padding: 0px;
  }

  .items-container {
    display: flex;
    flex-direction: column;
  }
</style>