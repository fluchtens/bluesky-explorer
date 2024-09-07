<script setup lang="ts">
import { Post } from "../types/post.type";
import Loader from "./Loader.vue";

const props = defineProps<{
  posts: Post[];
  loading: boolean;
}>();
</script>

<template>
  <main id="posts">
    <h2>Posts</h2>
    <Loader v-if="loading" class="loader" />
    <ul v-else="">
      <li class="post-card" v-for="(post, index) in props.posts" :key="index">
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
