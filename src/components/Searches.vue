<template>
  <nav id="searches">
    <div>
      <h2>Recherches</h2>
      <button class="save-btn">+ Enregistrer la recherche</button>
      <ul>
        <li><button class="cat-btn">JO 2024 : Escrime</button></li>
        <li><button class="cat-btn">Cinéma : Monte Cristo</button></li>
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
