<script setup lang="ts">
import { Post } from "../types/post.type";

const props = defineProps<{
  favoritePosts: Post[];
}>();
</script>

<template>
  <div id="favs">
    <h2>Export</h2>
    <p v-if="!props.favoritePosts.length">Pas encore de favoris</p>
    <p v-else>{{ props.favoritePosts.length }} favori(s)</p>
  </div>
</template>

<style scoped>
#favs {
  padding: 1rem;
}
</style>
