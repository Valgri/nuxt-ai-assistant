<template>
  <input
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    v-bind="$attrs"
    class="form-input"
  />
</template>

<script setup lang="ts">
interface Props {
  type?: string;
  modelValue: string;
}

defineProps<Props>();
defineEmits<{
  'update:modelValue': [value: string]
}>();
</script>

<style scoped>
.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.2s;
}

.form-input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 1px #4f46e5;
}
</style>
