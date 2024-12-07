<script setup>
  import { computed, defineProps, defineEmits, ref } from 'vue';

  import Button from 'primevue/button';
  import TieredMenu from 'primevue/tieredmenu';

  // Actions

  const emit = defineEmits(['edit', 'delete']);
  const actionsMenu = ref(null);
  const openActions = (event) => {
    actionsMenu.value.toggle(event);
  };

  const actions = computed(() => [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => emit('edit', props.team),
    },
    {
      label: 'Deletar',
      icon: 'pi pi-trash',
      command: () => emit('delete', props.team),
    },
  ]);

  const props = defineProps({
    team: {
      type: Object,
      required: true,
    },
  });
</script>

<template>
  <div>
    <div class="team-container">
      <div class="header">
        <span class="name">{{ props.team.name }}</span>

        <div class="actions-container">
          <Button @click="openActions" icon="pi pi-ellipsis-h" size="small" variant="outlined" class="borderless" />
          <TieredMenu :model="actions" ref="actionsMenu" id="overlay_menu" popup />
        </div>
      </div>

      <div class="data-container">
        <div class="data">
          <span>{{ props.team.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .team-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .name {
    font-size: 18px;
    font-weight: 700;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }


  .borderless,
  .borderless:hover,
  .borderless:focus { border: none !important }

  .data-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .data {
    display: flex;
    gap: 5px;
  }
</style>