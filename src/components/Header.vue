<script setup lang="ts">
const props = defineProps<{ search: string }>();
const emit = defineEmits(["enableLoading", "updateSearch"]);

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
const debouncedSearch = debounce((value: string) => {
  emit("updateSearch", value);
}, 500);

const handleSearch = (event: Event) => {
  emit("enableLoading");
  const target = event.target as HTMLInputElement;
  debouncedSearch(target.value);
};

const resetSearch = () => emit("updateSearch", "");
</script>

<template>
  <header>
    <h1 @click="resetSearch">Bluesky Explorer</h1>
    <input name="search" type="text" placeholder="Search" :value="props.search" @input="handleSearch" />
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
  max-width: 400px;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
}
</style>
