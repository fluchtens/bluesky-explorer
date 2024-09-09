<script setup lang="ts">
import * as XLSX from "xlsx";
import { Post } from "../types/post.type";

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
  <div id="favs">
    <h2>Export</h2>
    <p v-if="!props.favorites.length">Pas encore de favoris</p>
    <div v-else>
      <p>{{ props.favorites.length }} favori(s)</p>
      <div class="buttons">
        <button class="reset-btn" @click="handleReset">Réinitialiser</button>
        <button class="export-btn" @click="handleExport">Exporter</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#favs {
  padding: 1rem;
}

.buttons {
  margin-top: 0.5rem;
  flex-direction: column;
  display: flex;
  gap: 0.2rem;
}

.buttons .reset-btn:hover {
  background-color: #a1a1aa;
}

.buttons .export-btn {
  background-color: var(--primary);
}

button {
  all: unset;
  padding: 0.5rem 1rem;
  height: 1.125rem;
  display: flex;
  align-items: center;
  border-radius: 0.375rem;
  background-color: transparent;
  color: var(--foreground);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}

button:hover {
  background-color: rgba(var(--primary), 0.9);
}

button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
}

button:disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
