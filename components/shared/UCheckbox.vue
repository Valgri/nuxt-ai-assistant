<template>
  <div class="form-checkbox">
    <input
      type="checkbox"
      :checked="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      :name="name"
      :id="name"
      class="checkbox-input"
      v-bind="$attrs"
    />
    <label :for="name" class="checkbox-label">
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  name: string;
  label: string;
}

defineProps<Props>();
defineEmits<{
  'update:modelValue': [value: boolean]
}>();
</script>

<style scoped>
.form-checkbox {
  display: flex;
  align-items: center;
}
.checkbox-input {
  margin-right: 0.5rem;
}
.checkbox-label {
  font-size: 0.875rem;
  color: #4a4a4a;
}
</style>
