<script setup>
  const props = defineProps({
    size: {
      type: [Number, String],
      default: '24',
    }
  });
</script>

<template>
  <svg :width="props.size" :height="props.size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.4286 10.2857H14.5714C14.0981 10.2857 13.7143 10.6695 13.7143 11.1428V21.4286C13.7143 21.9019 14.0981 22.2857 14.5714 22.2857H21.4286C21.902 22.2857 22.2857 21.9019 22.2857 21.4286V11.1428C22.2857 10.6695 21.902 10.2857 21.4286 10.2857Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21.4286 1H14.5714C14.0981 1 13.7143 1.38376 13.7143 1.85714V5.30286C13.7143 5.77624 14.0981 6.16 14.5714 6.16H21.4286C21.902 6.16 22.2857 5.77624 22.2857 5.30286V1.85714C22.2857 1.38376 21.902 1 21.4286 1Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.71429 1H2.85714C2.38376 1 2 1.38376 2 1.85714V12.1429C2 12.6162 2.38376 13 2.85714 13H9.71429C10.1877 13 10.5714 12.6162 10.5714 12.1429V1.85714C10.5714 1.38376 10.1877 1 9.71429 1Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.71429 17.1257H2.85714C2.38376 17.1257 2 17.5095 2 17.9828V21.4286C2 21.9019 2.38376 22.2857 2.85714 22.2857H9.71429C10.1877 22.2857 10.5714 21.9019 10.5714 21.4286V17.9828C10.5714 17.5095 10.1877 17.1257 9.71429 17.1257Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>