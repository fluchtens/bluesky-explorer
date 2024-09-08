<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Search } from "../types/search.type";

const props = defineProps<{
  search: string;
}>();

const searches = ref<Search[]>([
  { name: "Intelligence artificielle", query: "intelligence artificielle" },
  { name: "Véhicules électriques", query: "véhicules électriques" },
  { name: "Kylian Mbappé Real", query: "Kylian Mbappé Real Madrid" },
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

const handleSaveSearch = () => {
  const name = prompt("Nom de la recherche");
  if (name) {
    const search: Search = { name: name, query: props.search };
    searches.value.push(search);

    const existingSearches = localStorage.getItem("searches");
    let newSearchesArray: Search[] = [];
    if (existingSearches) {
      newSearchesArray = JSON.parse(existingSearches);
    }
    newSearchesArray.push(search);
    localStorage.setItem("searches", JSON.stringify(newSearchesArray));
  }
};

onMounted(() => {
  const searchesStorage = localStorage.getItem("searches");
  if (searchesStorage) {
    const savedSearches: Search[] = JSON.parse(searchesStorage);
    searches.value = [...searches.value, ...savedSearches];
  }
});
</script>

<template>
  <nav id="searches">
    <div>
      <h2>Recherches</h2>
      <button class="save-btn" @click="handleSaveSearch">+ Enregistrer la recherche</button>
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
