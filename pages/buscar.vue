<template>
  <div class="buscar">
    <Alerta/>
  	<Top />
    <section class="band">
      <div class="container">
        <p class="center search-alert">Busque por <br> nombre, palabra <br> o año</p>
        <p class="center search-alert">No se <br> encontraron <br> resultados</p>
        <article class="normativa-module">
          <h4><nuxt-link to="/normativa">Resolución MJ y DH Nº 238/2003 (Concursos)</nuxt-link></h4>
          <p><nuxt-link to="/normativa">The entire starfleet couldn’t destroy the whole planet. Not for long…</nuxt-link></p>
          <small><nuxt-link to="/normativa">2001</nuxt-link></small>
          <FavoriteStar/>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import Top from '~/components/Top.vue'
import Alerta from '~/components/Alerta.vue'
import FavoriteStar from '~/components/FavoriteStar.vue'

export default {
  components: {
    Top,
    Alerta,
    FavoriteStar
  },
  data () {
    return {
      title: 'Buscar'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  }
}
</script>