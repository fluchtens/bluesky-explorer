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
</script>

<template>
  <header>
    <h1>Bluesky Explorer</h1>
    <div>
      🔎
      <input type="text" :value="props.search" @input="handleSearch" />
    </div>
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
  font-weight: 700;
}

input {
  width: 40vw;
  min-width: 300px;
}
</style>
