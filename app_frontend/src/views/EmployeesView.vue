<script setup>
  import { useModuleLoader } from '../composables/useModuleLoader';

  import SectionHeader from '../components/SectionHeader.vue';

  import Button from 'primevue/button';

  const {
    getModule,
    fetch_request_pending,
    createModuleItem,
  } = useModuleLoader();
</script>

<template>
  <SectionHeader title="Funcionários">
    <template #actions>
      <Button label="Criar funcionário" size="small" icon="pi pi-plus"  iconPos="right" />
      <!-- <Button icon="pi pi-ellipsis-h" size="small" variant="outlined" class="borderless" /> -->
    </template>
  </SectionHeader>
</template>