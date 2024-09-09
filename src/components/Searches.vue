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

    const searcheStorage = localStorage.getItem("searches");
    let savedSearches: Search[] = [];
    if (searcheStorage) {
      savedSearches = JSON.parse(searcheStorage);
    }
    savedSearches.push(search);
    localStorage.setItem("searches", JSON.stringify(savedSearches));
  }
};

onMounted(() => {
  const searcheStorage = localStorage.getItem("searches");
  if (searcheStorage) {
    const savedSearches: Search[] = JSON.parse(searcheStorage);
    searches.value = [...searches.value, ...savedSearches];
  }
});
</script>

<template>
  <nav id="searches">
    <div>
      <h2>Recherches</h2>
      <button class="save-btn" @click="handleSaveSearch">Enregistrer</button>
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
  grid-area: searches;
}

div {
  flex-direction: column;
  display: flex;
  gap: 0.5rem;
}

button {
  all: unset;
  box-sizing: border-box;
  padding: 1rem 0.5rem;
  height: 1.125rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

button:focus-visible {
  box-shadow: 0 0 0 1px hsl(var(--ring));
}

.save-btn {
  background-color: hsl(var(--primary));
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.save-btn:hover {
  background-color: hsl(var(--primary), 0.8);
}

ul {
  list-style: none;
  flex-direction: column;
  display: flex;
  gap: 0.2rem;
}

.cat-btn {
  justify-content: start;
  font-size: 0.75rem;
  font-weight: 500;
}

.cat-btn:hover {
  background-color: hsl(var(--muted));
}
</style>
