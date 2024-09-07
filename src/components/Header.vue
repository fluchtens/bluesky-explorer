<script setup lang="ts">
const emit = defineEmits<{
  onSearchChange: [newSearch: string];
}>();

const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("onSearchChange", target.value);
};
</script>

<template>
  <header>
    <h1>Bluesky Explorer</h1>
    <div>
      🔎
      <input type="text" @input="handleSearch" />
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
