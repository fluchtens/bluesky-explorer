<script setup lang="ts">
import { onMounted, ref } from "vue";
import Header from "./components/layouts/Header.vue";
import Favorites from "./components/sections/Favorites.vue";
import Posts from "./components/sections/Posts.vue";
import Searches from "./components/sections/Searches.vue";
import { fetchPosts } from "./services/bsky.api";
import { Post } from "./types/post.type";

const search = ref<string>("");
const posts = ref<Post[]>([]);
const cursor = ref<string>("");
const allPageLoaded = ref<boolean>(false);
const favorites = ref<Post[]>([]);
const loading = ref<boolean>(true);

onMounted(async () => {
  const params = new URLSearchParams(window.location.search);
  search.value = params.get("search") || "";

  const fetchedPosts = await fetchPosts(search.value);
  if (fetchedPosts) {
    posts.value = fetchedPosts.posts;
    cursor.value = fetchedPosts.cursor;
    if (!fetchedPosts.cursor) {
      allPageLoaded.value = true;
    }
  }
  loading.value = false;

  const storage = localStorage.getItem("favorites");
  if (storage) {
    favorites.value = JSON.parse(storage);
  }
});

const loadNextPostsPage = async () => {
  if (allPageLoaded.value) {
    return;
  }

  const fetchedPosts = await fetchPosts(search.value, cursor.value);
  if (fetchedPosts) {
    posts.value = [...posts.value, ...fetchedPosts.posts];
    cursor.value = fetchedPosts.cursor;
    if (!fetchedPosts.cursor) {
      allPageLoaded.value = true;
    }
  }
};

const updateSearch = async (newSearch: string) => {
  loading.value = true;

  const params = new URLSearchParams(window.location.search);
  params.set("search", newSearch);
  window.history.pushState({}, "", `${window.location.pathname}?${params}`);

  search.value = newSearch;
  posts.value = [];
  cursor.value = "";
  allPageLoaded.value = false;

  const fetchedPosts = await fetchPosts(newSearch);
  if (fetchedPosts) {
    posts.value = fetchedPosts.posts;
    cursor.value = fetchedPosts.cursor;
    if (!fetchedPosts.cursor) {
      allPageLoaded.value = true;
    }
  }
  loading.value = false;
};

const toggleFavorite = (post: Post) => {
  const postIndex = favorites.value.findIndex((p) => p.cid === post.cid);
  const storage = localStorage.getItem("favorites");
  let savedPosts: Post[] = [];

  if (postIndex !== -1) {
    favorites.value.splice(postIndex, 1);
    if (storage) {
      savedPosts = JSON.parse(storage);
      const savedPostIndex = savedPosts.findIndex((p) => p.cid === post.cid);
      if (savedPostIndex !== -1) {
        savedPosts.splice(savedPostIndex, 1);
        localStorage.setItem("favorites", JSON.stringify(savedPosts));
      }
    }
  } else {
    favorites.value.push(post);
    if (storage) {
      savedPosts = JSON.parse(storage);
    }
    savedPosts.push(post);
    localStorage.setItem("favorites", JSON.stringify(savedPosts));
  }
};

const resetFavorites = () => {
  favorites.value = [];
  localStorage.removeItem("favorites");
};
</script>

<template>
  <Header :search="search" @updateSearch="updateSearch" />
  <div class="container">
    <Searches :search="search" @updateSearch="updateSearch" />
    <Posts :posts="posts" :favorites="favorites" :loading="loading" @toggleFavorite="toggleFavorite" @loadNextPostsPage="loadNextPostsPage" />
    <Favorites :favorites="favorites" @resetFavorites="resetFavorites" />
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 180px 1fr 180px;
  grid-template-areas: "searches posts favorites";
}

@media (max-width: 640px) {
  .container {
    grid-template-columns: 1fr;
    grid-template-areas: "searches" "favorites" "posts";
  }
}
</style>
