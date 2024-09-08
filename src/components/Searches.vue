<script setup lang="ts">
import { ref } from "vue";

type Search = {
  name: string;
  query: string;
};

const searches = ref<Search[]>([
  { name: "Intelligence artificielle", query: "intelligence artificielle" },
  { name: "Véhicules électriques", query: "véhicules électriques" },
  { name: "Kylian Mbappé", query: "Kylian Mbappé Real Madrid" },
  { name: "Taxe carbone", query: "taxe carbone" },
  { name: "JO 2024", query: "jo 2024" },
  { name: "Réforme travail", query: "Réforme travail" },
]);

const emit = defineEmits<{
  enableLoading: [];
  onSearchChange: [newSearch: string];
}>();

const handleSearch = (search: Search) => {
  emit("enableLoading");
  emit("onSearchChange", search.query);
};
</script>

<template>
  <nav id="searches">
    <div>
      <h2>Recherches</h2>
      <button class="save-btn">+ Enregistrer la recherche</button>
      <ul>
        <li v-for="(search, index) in searches" :key="index">
          <button class="cat-btn" @click="() => handleSearch(search)">{{ search.name }}</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
nav {
  padding: 1rem;
}

div {
  flex-direction: column;
  display: flex;
  gap: 0.5rem;
}

.save-btn {
  padding: 0.2rem;
  border: none;
  border-radius: 6px;
  background: #208bfe;
  color: #fff;
  cursor: pointer;
}

ul {
  list-style: none;
  flex-direction: column;
  display: flex;
  gap: 0.4rem;
}

.cat-btn {
  padding: 0.2rem;
  border: none;
  border-radius: 6px;
  background: none;
  color: #fff;
  cursor: pointer;
}
</style>
