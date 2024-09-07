<template>
  <main id="posts">
    <h2>Posts</h2>
    <ul>
      <li class="post-card">
        <div class="header"><span class="author">poptime.space</span></div>
        <span class="content"
          >3️⃣ NOVO ATALHOS e CORREÇÃO DE BUGS - Ao apertar a tecla N (desktop) abrir página de criar novo post. - Erro ao rolar packs iniciais
          (corrigido)</span
        >
        <div class="footer">
          <button><span>Fav</span></button><span>il y a 12 heures</span>
        </div>
      </li>
      <li class="post-card">
        <div class="header"><span class="author">seriesbrasil.com.br</span></div>
        <span class="content"
          >1 - Trending Topics (Computador) Que saudade, né? O assuntos do momento moveu gerações no Twitter/X e ele está disponível no Bluesky.
          Usuários da plataforma no computador podem instalar a extensão BetterBluesky clicando aqui e usufruir&nbsp;do&nbsp;recurso.</span
        >
        <div class="footer">
          <button><span>Fav</span></button><span>il y a 2 jours</span>
        </div>
      </li>
      <li class="post-card">
        <div class="header"><span class="author">novinhofr21.bsky.social</span></div>
        <span class="content">Quem vem engolir ela toda?</span>
        <div class="footer">
          <button><span>Fav</span></button><span>il y a un jour</span>
        </div>
      </li>
      <li class="post-card">
        <div class="header"><span class="author">seriesbrasil.com.br</span></div>
        <span class="content"
          >1.1 - Trending Topics (Celular) Os usuários mobile também têm vez na funcionalidade. O Graysky, disponível na Apple Store e Play Store,
          dispõe da ferramenta de assuntos do momento com um único problema: TAGs de spam não são&nbsp;controladas.</span
        >
        <div class="footer">
          <button><span>Fav</span></button><span>il y a 2 jours</span>
        </div>
      </li>
    </ul>
  </main>
</template>

<style scoped>
#posts {
  padding: 1rem;
}

ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 0.5rem;
}

li {
  display: flex;
  flex-direction: column;
  background-color: color-mix(in oklab, #208bfe, #000 50%);
  padding: 0.5rem;
}

.content {
  font-weight: 300;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
