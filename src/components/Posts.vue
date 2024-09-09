<script setup lang="ts">
import dayjs from "dayjs";
import locale from "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import { Post } from "../types/post.type";
import Loader from "./Loader.vue";

dayjs.extend(relativeTime);
dayjs.locale(locale);

const props = defineProps<{
  posts: Post[];
  favorites: Post[];
  loading: boolean;
}>();

const emit = defineEmits<{
  onFavoritePostChange: [post: Post];
}>();

const handleFavorite = (post: Post) => {
  emit("onFavoritePostChange", post);
};

const getRelativeDate = (date: string) => {
  return dayjs().to(dayjs(date));
};

const isFavorite = (post: Post) => {
  return props.favorites.some((p) => p.cid === post.cid);
};
</script>

<template>
  <main id="posts">
    <Loader v-if="loading" class="loader" />
    <div v-else>
      <p v-if="!posts.length">Pas de posts correspondant à la recherche</p>
      <ul v-else>
        <li v-for="(post, index) in props.posts" :key="index">
          <div class="header">
            <img :src="post.author.avatar" alt="avatar" />
            <a :href="`https://bsky.app/profile/${post.author.handle}`" target="_blank">{{ post.author.handle }}</a>
          </div>
          <p class="content">{{ post.record.text }}</p>
          <div class="footer">
            <button @click="() => handleFavorite(post)">
              <img :src="!isFavorite(post) ? '/fav.png' : '/unfav.png'" alt="Like" />
            </button>
            <span>{{ getRelativeDate(post.record.createdAt) }}</span>
          </div>
        </li>
      </ul>
    </div>
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
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
}

li {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  background-color: hsl(var(--primary), 0.1);
  gap: 0.5rem;
}

.header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header img {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  aspect-ratio: 1 / 1;
}

.header a {
  all: unset;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 700;
  cursor: pointer;
}

.header a:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.content {
  flex: 1;
  font-weight: 300;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer button {
  all: unset;
  box-sizing: border-box;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.375rem;
  cursor: pointer;
}

.footer button:hover {
  opacity: 0.8;
}

.footer button img {
  width: 1.2rem;
  height: 1.2rem;
}

.footer span {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 300;
  color: hsl(var(--muted));
}

@media (max-width: 1024px) {
  ul {
    grid-template-columns: 1fr;
  }
}
</style>
