<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Search } from "../types/search.type";
import Button from "./ui/Button.vue";
import SaveSearchDialog from "./ui/SaveSearchDialog.vue";

const dialog = ref<boolean>(false);
const searches = ref<Search[]>([
  { name: "Intelligence artificielle", query: "intelligence artificielle" },
  { name: "Véhicules électriques", query: "véhicules électriques" },
  { name: "Kylian Mbappé Real", query: "Kylian Mbappé Real Madrid" },
  { name: "Taxe carbone", query: "taxe carbone" },
  { name: "JO 2024", query: "jo 2024" },
  { name: "Réforme travail", query: "Réforme travail" },
]);
const props = defineProps<{ search: string }>();
const emit = defineEmits(["enableLoading", "onSearchChange"]);

const toggleDialog = () => {
  dialog.value = !dialog.value;
};

const saveSearch = (name: string, query: string) => {
  dialog.value = false;

  const search: Search = { name: name, query: query };
  searches.value.push(search);

  const searcheStorage = localStorage.getItem("searches");
  let savedSearches: Search[] = [];
  if (searcheStorage) {
    savedSearches = JSON.parse(searcheStorage);
  }
  savedSearches.push(search);
  localStorage.setItem("searches", JSON.stringify(savedSearches));
};

const handleSearch = (search: Search) => {
  emit("enableLoading");
  emit("onSearchChange", search.query);
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
      <Button theme="primary" :click="toggleDialog">Enregistrer</Button>
      <ul>
        <li v-for="(search, index) in searches" :key="index">
          <Button class="cat-btn" theme="ghost" :click="() => handleSearch(search)">{{ search.name }}</Button>
        </li>
      </ul>
    </div>
    <SaveSearchDialog v-if="dialog" :search="props.search" @toggleDialog="toggleDialog" @saveSearch="saveSearch" />
  </nav>
</template>

<style scoped>
#searches {
  padding: 1rem;
  grid-area: searches;
}

div {
  flex-direction: column;
  display: flex;
  gap: 0.5rem;
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
}
</style>
