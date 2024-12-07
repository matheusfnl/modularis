<script setup>
  import { ref } from 'vue';
  import Dialog from 'primevue/dialog';

  import { useModuleLoader } from '../composables/useModuleLoader';

  import SectionHeader from '../components/SectionHeader.vue';
  import CreateTeamModal from '../components/teams/CreateTeamModal.vue';

  import Button from 'primevue/button';

  const create_modal_visible = ref(false);
  const {
    fetch_request_pending,
    create_request_pending,
    createModuleItem,
  } = useModuleLoader();
</script>

<template>
  <SectionHeader title="Times">
    <template #actions>
      <Button label="Criar time" size="small" icon="pi pi-plus"  iconPos="right" @click="create_modal_visible = true" />
      <!-- <Button icon="pi pi-ellipsis-h" size="small" variant="outlined" class="borderless" /> -->
    </template>
  </SectionHeader>

  <Dialog v-model:visible="create_modal_visible" modal header="Criar time" :style="{ width: '28rem' }">
    <CreateTeamModal
      :request_pending="create_request_pending"
      @cancel="create_modal_visible = false"
    />
  </Dialog>
</template>