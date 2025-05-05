<template>
  <div class="form-group">
    <label :for="name" class="form-label">{{ label }}</label>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  label: string;
  name: string;
}

defineProps<Props>();
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
</style>
