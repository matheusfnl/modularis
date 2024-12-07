<script setup>
  import { defineProps, defineEmits } from 'vue';

  import Button from 'primevue/button';

  const emit = defineEmits(['cancel', 'create']);
  const props = defineProps({
    request_pending: {
      type: Boolean,
      required: true,
    }
  });
</script>

<template>
  <div class="actions-container">
    <Button :disabled="request_pending" type="button" label="Cancelar" severity="secondary" @click="emit('cancel')"></Button>
    <Button :disabled="request_pending" type="button" label="Criar" @click="emit('create')"></Button>
  </div>
</template>

<style scoped>
  .actions-container {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
</style>