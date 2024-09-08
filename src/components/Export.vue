<script setup lang="ts">
import * as XLSX from "xlsx";
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
  const exportData = props.favoritePosts.map((post: Post) => ({
    cid: post.cid,
    uri: post.uri,
    author: post.author.handle,
    createdAt: post.record.createdAt,
    text: post.record.text,
    likeCount: post.likeCount,
    quoteCount: post.quoteCount,
    replyCount: post.replyCount,
    repostCount: post.repostCount,
  }));
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Exported posts");
  XLSX.writeFile(workbook, "bluesky-export.xlsx");
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
