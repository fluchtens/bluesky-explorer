<script setup lang="ts">
import { onMounted, ref } from "vue";
import Export from "./components/Export.vue";
import Header from "./components/Header.vue";
import Posts from "./components/Posts.vue";
import Searches from "./components/Searches.vue";
import { fetchPosts } from "./services/bsky.api";
import { Post } from "./types/post.type";

const posts = ref<Post[]>([]);
const loading = ref<boolean>(true);
const search = ref<string>("");

onMounted(async () => {
  posts.value = await fetchPosts();
  loading.value = false;
});

const enableLoading = () => {
  loading.value = true;
};

const handleSearchUpdate = async (newSearch: string, inputUpdate: boolean = false) => {
  if (inputUpdate) {
    search.value = newSearch;
  }
  posts.value = await fetchPosts(newSearch);
  loading.value = false;
};
</script>

<template>
  <Header :search="search" @enableLoading="enableLoading" @onSearchChange="handleSearchUpdate" />
  <div class="container">
    <Searches @enableLoading="enableLoading" @onSearchChange="handleSearchUpdate" />
    <Suspense>
      <Posts :posts="posts" :loading="loading" />
    </Suspense>
    <Export />
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>
