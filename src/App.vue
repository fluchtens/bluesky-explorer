<script setup lang="ts">
import { onMounted, ref } from "vue";
import Export from "./components/Export.vue";
import Header from "./components/Header.vue";
import Posts from "./components/Posts.vue";
import Searches from "./components/Searches.vue";
import { Post } from "./types/post.type";

const posts = ref<Post[]>([]);
const loading = ref<boolean>(true);

const fetchPosts = async (search?: string): Promise<Post[]> => {
  try {
    let query = "lang:fr";
    if (search) {
      query += ` "${search}"`;
    }

    const response = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=${query}&limit=25&sort=top`);
    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

onMounted(async () => {
  posts.value = await fetchPosts();
  loading.value = false;
});

const enableLoading = () => {
  loading.value = true;
};

const handleSearchUpdate = async (newSearch: string) => {
  posts.value = await fetchPosts(newSearch);
  loading.value = false;
};
</script>

<template>
  <Header @enableLoading="enableLoading" @onSearchChange="handleSearchUpdate" />
  <div class="container">
    <Searches />
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
