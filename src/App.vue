<script setup lang="ts">
import { onMounted, ref } from "vue";
import Export from "./components/Export.vue";
import Header from "./components/Header.vue";
import Posts from "./components/Posts.vue";
import Searches from "./components/Searches.vue";
import { fetchPosts } from "./services/bsky.api";
import { Post } from "./types/post.type";

const search = ref<string>("");
const posts = ref<Post[]>([]);
const favoritePosts = ref<Post[]>([]);
const loading = ref<boolean>(true);

onMounted(async () => {
  posts.value = await fetchPosts();
  loading.value = false;
});

const enableLoading = () => {
  loading.value = true;
};

const handleSearchUpdate = async (newSearch: string) => {
  search.value = newSearch;
  posts.value = await fetchPosts(newSearch);
  loading.value = false;
};

const handleFavoritePost = (post: Post) => {
  const postIndex = favoritePosts.value.findIndex((p) => p.cid === post.cid);
  if (postIndex !== -1) {
    favoritePosts.value.splice(postIndex, 1);
  } else {
    favoritePosts.value.push(post);
  }
};
</script>

<template>
  <Header :search="search" @enableLoading="enableLoading" @onSearchChange="handleSearchUpdate" />
  <div class="container">
    <Searches :search="search" @enableLoading="enableLoading" @onSearchChange="handleSearchUpdate" />
    <Suspense>
      <Posts :posts="posts" :loading="loading" @onFavoritePostChange="handleFavoritePost" />
    </Suspense>
    <Export :favorite-posts="favoritePosts" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>
