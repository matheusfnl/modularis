<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    selected: {
      type: Boolean,
      default: false,
    },

    option: {
      type: Object,
      required: true,
    },
  });

  const getIconClass = computed(() => props.option.fill ? 'fill' : 'stroke');
  const getSelectedClass = computed(() => props.selected ? 'selected' : '');
</script>

<template>
  <div class="menu-option" :class="getSelectedClass">
    <div class="indicator-container">
      <div class="indicator" :class="getIndicatorClass" />
    </div>

    <div class="menu-content-container">
      <component class="option-icon" :class="getIconClass" :is="props.option.icon" />
      <span>{{ props.option.text }}</span>
    </div>
  </div>
</template>

<style scoped>
  .menu-option {
    display: flex;
    height: 60px;
    align-items: center;
    cursor: pointer;
    color: var(--text-contrast-4);
  }

  .menu-option:hover { background-color: #1c1e1f; }
  .indicator-container { width: 32px; }
  .indicator {
    height: 32px;
    width: 4px;
    background-color: transparent;
  }

  .menu-content-container {
    display: flex;
    gap: 12px;
    align-items: center;
    font-weight: 500;
  }

  .option-icon { width: 24px; }

  .menu-option:not(.selected):hover .menu-content-container { color: var(--text-contrast-7) }
  .menu-option:not(.selected):hover .menu-content-container .option-icon.fill * { fill: var(--text-contrast-7) }
  .menu-option:not(.selected):hover .menu-content-container .option-icon.stroke * { stroke: var(--text-contrast-7) }

  .selected .menu-content-container { color: var(--text-contrast-9) }
  .selected .menu-content-container .option-icon.fill * { fill: var(--text-contrast-9) }
  .selected .menu-content-container .option-icon.stroke * { stroke: var(--text-contrast-9) }
  .selected .indicator { background-color: var(--text-contrast-9); }

  .option-icon.fill * { fill: var(--text-contrast-4) }
  .option-icon.stroke * { stroke: var(--text-contrast-4) }
</style>