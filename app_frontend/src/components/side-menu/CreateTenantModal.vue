<script setup>
  import { ref, defineEmits } from 'vue';

  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';

  const name = ref('');
  const emit = defineEmits(['close', 'create']);
</script>

<template>
  <div class="input-container">
    <label for="username" class="input-label">Nome</label>
    <InputText v-model="name" id="username" class="input-custom" autocomplete="off" />
  </div>

  <div class="actions-container">
    <Button type="button" label="Cancel" severity="secondary" @click="emit('cancel')"></Button>
    <Button type="button" label="Save" @click="emit('create', { name })"></Button>
  </div>
</template>

<style scoped>
  .description {
    color: var(--text-6);
    margin-bottom: 1rem;
  }

  .input-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .actions-container {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .input-label { width: 40px; }
  .input-custom { flex: 1; }
</style>