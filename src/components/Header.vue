<script setup lang="ts">
function debounce(cb: (value: string) => void, delay: number): (value: string) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (value: string): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      cb(value);
    }, delay);
  };
}

const props = defineProps<{
  search: string;
}>();

const emit = defineEmits<{
  enableLoading: [];
  onSearchChange: [newSearch: string];
}>();

const debouncedSearch = debounce((value: string) => {
  emit("onSearchChange", value);
}, 500);

const handleSearch = (event: Event) => {
  emit("enableLoading");
  const target = event.target as HTMLInputElement;
  debouncedSearch(target.value);
};

const resetSearch = () => {
  emit("onSearchChange", "");
};
</script>

<template>
  <header>
    <h1 @click="resetSearch">Bluesky Explorer</h1>
    <input type="text" placeholder="Search" :value="props.search" @input="handleSearch" />
  </header>
</template>

<style scoped>
header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  cursor: pointer;
}

input {
  all: unset;
  padding: 4px 12px;
  max-width: 400px;
  width: 100%;
  height: 30px;
  border-radius: 0.375rem;
  border: 1px solid var(--border);
  background-color: transparent;
  font-size: 0.875rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: color 0.2s;
}

input::placeholder {
  color: var(--muted);
}

input:focus-visible {
  outline: none;
  box-shadow: 0 0 0 1px var(--ring);
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
}
</style>
