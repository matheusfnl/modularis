<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    border: {
      type: Boolean,
      default: true,
    },

    work: {
      type: Object,
      required: true,
    }
  });

  const getStatusClass = computed(() => {
    return {
      'text-success': props.work.status === 'Concluído',
      'text-danger': props.work.status === 'Atrasado',
    }
  });
</script>

<template>
  <div class="item-container" :class="{ 'border-bottom' : props.border }">
    <div class="work-content-container">
      <p class="workf-title">{{ props.work.title }}</p>
      <p class="work-description">{{ props.work.date }}</p>
    </div>

    <p class="status-text" :class="getStatusClass">{{ props.work.status }}</p>
  </div>
</template>

<style scoped>
  .item-container {
    padding: 12px;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
  }

  .border-bottom { border-bottom: 1px solid var(--text-2); }
  .work-content-container p { margin: 0px; }
  .workf-title {
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    margin-bottom: 4px;
  }

  .work-description {
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: var(--text-5);
  }

  .status-text {
    margin: 0px;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;

  }

  .text-success { color: var(--success-color-2); }
  .text-danger { color: var(--danger-color-2); }
</style>