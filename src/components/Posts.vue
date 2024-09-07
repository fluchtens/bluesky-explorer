<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Post } from "../types/post.type";
import Loader from "./Loader.vue";

const posts = ref<Post[]>([]);
const loading = ref<boolean>(true);

const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch("https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=lang%3Afr+&limit=25&sort=top");
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
  const fetchedPosts = await fetchPosts();
  posts.value = fetchedPosts;
  loading.value = false;
});
</script>

<template>
  <main id="posts">
    <h2>Posts</h2>
    <Loader v-if="loading" class="loader" />
    <ul v-else="">
      <li class="post-card" v-for="(post, index) in posts" :key="index">
        <div class="header">
          <span class="author">{{ post.author.handle }}</span>
        </div>
        <span class="content">{{ post.record.text }}</span>
        <div class="footer">
          <button><span>Fav</span></button><span>{{ post.record.createdAt }}</span>
        </div>
      </li>
    </ul>
  </main>
</template>

<style scoped>
#posts {
  padding: 1rem;
  flex: 1;
}

ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

li {
  display: flex;
  flex-direction: column;
  background-color: color-mix(in oklab, #208bfe, #000 50%);
  padding: 0.5rem;
}

.header {
  font-size: 0.8rem;
  font-weight: 700;
}

.content {
  flex: 1;
  font-weight: 300;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
