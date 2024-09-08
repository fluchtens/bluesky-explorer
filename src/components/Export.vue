<script setup lang="ts">
import { Post } from "../types/post.type";

const props = defineProps<{
  favoritePosts: Post[];
}>();

const emit = defineEmits<{
  resetFavorites: [];
}>();

const handleReset = () => {
  emit("resetFavorites");
};

const handleExport = () => {
  alert(props.favoritePosts.map((post) => post.record.text).join("\n\n"));
};
</script>

<template>
  <div id="favs">
    <h2>Export</h2>
    <p v-if="!props.favoritePosts.length">Pas encore de favoris</p>
    <div v-else>
      <p>{{ props.favoritePosts.length }} favori(s)</p>
      <button @click="handleReset">Réinitialiser</button>
      <button @click="handleExport">Exporter</button>
    </div>
  </div>
</template>

<style scoped>
#favs {
  padding: 1rem;
}

button {
  background-color: #208bfe;
  border: none;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  padding: 0.2rem;
}
</style>
