<script setup>
  import { defineProps, defineEmits } from 'vue';

  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';
  import Select from 'primevue/select';

  const emit = defineEmits(['cancel', 'create']);
  const props = defineProps({
    request_pending: {
      type: Boolean,
      required: true,
    }
  });
</script>

<template>
  <div class="modal-container">
    <div class="input-container">
      <label for="name">Nome *</label>
      <InputText size="small" id="name" />
    </div>

    <div class="input-container">
      <label for="description">Descrição *</label>
      <InputText size="small" id="description" />
    </div>

    <div class="input-container">
      <label for="leader">Líder *</label>
      <Select size="small" :options="[]" optionLabel="leader" />
    </div>
  </div>

  <div class="actions-container">
    <Button :disabled="request_pending" type="button" label="Cancelar" severity="secondary" @click="emit('cancel')"></Button>
    <Button :disabled="request_pending" type="button" label="Criar" @click="emit('create')"></Button>
  </div>
</template>

<style scoped>
  .modal-container {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .input-container {
    gap: .5rem;
    display: flex;
    flex-direction: column;
  }

  .actions-container {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .input-label { width: 40px; }
  .input-custom { flex: 1; }
</style>