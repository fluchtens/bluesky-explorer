<script setup lang="ts">
import * as XLSX from "xlsx";
import { Post } from "../types/post.type";
import Button from "./ui/Button.vue";
// import { Button } from "./ui/Button.vue";

const props = defineProps<{
  favorites: Post[];
}>();

const emit = defineEmits<{
  resetFavorites: [];
}>();

const handleReset = () => {
  emit("resetFavorites");
};

const handleExport = () => {
  const exportData = props.favorites.map((post: Post) => ({
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
  <div id="favorites">
    <h2>Export</h2>
    <p v-if="!props.favorites.length">Pas encore de favoris</p>
    <div v-else>
      <p>{{ props.favorites.length }} favori(s)</p>
      <div class="buttons">
        <Button theme="primary" :click="handleReset">Réinitialiser</Button>
        <Button theme="ghost" :click="handleExport">Exporter</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#favorites {
  padding: 1rem;
  grid-area: favorites;
}

.buttons {
  margin-top: 0.5rem;
  flex-direction: column;
  display: flex;
  gap: 0.25rem;
}
</style>
