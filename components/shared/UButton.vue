<template>
  <button
    :type="type"
    :class="[
      'btn',
      'w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md',
      { 'opacity-50 cursor-not-allowed': loading || disabled }
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  loading: false,
  disabled: false
});
</script>

<style scoped>
.btn {
  transition: all 0.2s;
}

.btn:not(:disabled):hover {
  background-color: #4f46e5;
}
</style>
