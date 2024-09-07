<script setup lang="ts">
import Export from "./components/Export.vue";
import Header from "./components/Header.vue";
import Posts from "./components/Posts.vue";
import Searches from "./components/Searches.vue";
</script>

<template>
  <Header />
  <div class="container">
    <Searches />
    <Suspense>
      <Posts />
    </Suspense>
    <Export />
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>
