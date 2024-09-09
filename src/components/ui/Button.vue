<script setup lang="ts">
const props = defineProps<{
  theme: "primary" | "ghost";
  click: () => void;
}>();
</script>

<template>
  <button :class="props.theme" @click="props.click">
    <slot />
  </button>
</template>

<style scoped>
button {
  all: unset;
  box-sizing: border-box;
  padding: 1rem 0.5rem;
  height: 1.125rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.375rem;
  background-color: transparent;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

button:focus-visible {
  box-shadow: 0 0 0 1px hsl(var(--ring));
}

.primary {
  background-color: hsl(var(--primary));
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.primary:hover {
  background-color: hsl(var(--primary), 0.8);
}

.ghost:hover {
  background-color: hsl(var(--muted));
}
</style>
