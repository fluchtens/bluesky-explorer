<script setup lang="ts">
import { onMounted } from "vue";
import Button from "./Button.vue";

const name = defineModel("name");
const query = defineModel("query");
const props = defineProps<{ search: string }>();
const emit = defineEmits(["saveSearch", "toggleDialog"]);

const toggleDialog = () => emit("toggleDialog");

const saveSearch = (e: Event) => {
  e.preventDefault();
  if (name.value && query.value) {
    emit("saveSearch", name.value, query.value);
  }
};

onMounted(() => {
  query.value = props.search;
});
</script>

<template>
  <div class="background">
    <form class="modal" @submit="saveSearch">
      <span class="title">Enregistrer la recherche</span>
      <div class="content">
        <div class="input">
          <label for="name">Nom</label>
          <input type="text" id="name" placeholder="Nom" v-model="name" required />
        </div>
        <div class="input">
          <label for="query">Recherche</label>
          <input type="text" id="query" placeholder="Recherche" v-model="query" required />
        </div>
      </div>
      <div class="footer">
        <Button type="button" theme="ghost" :click="toggleDialog">Annuler</Button>
        <Button type="submit" theme="primary">Enregistrer</Button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal {
  z-index: 50;
  padding: 1.5rem;
  max-width: 32rem;
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 1rem;
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  background-color: hsl(var(--background));
}

.title {
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 600;
}

.content {
  flex-direction: column;
  display: flex;
  gap: 0.5rem;
}

.content .input {
  flex-direction: column;
  display: flex;
  gap: 0.3rem;
}

.content .input label {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
}

.content .input input {
  box-sizing: border-box;
  padding: 1.125rem 0.75rem;
}

.footer {
  margin-top: 0.5rem;
  margin-left: auto;
  display: flex;
  gap: 0.3rem;
}

.footer button {
  padding: 1.125rem 0.75rem;
}
</style>
