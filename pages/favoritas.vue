<template>
  <div class="favoritas">
    <Alerta/>
  	<Top :title="title" />
    <section class="band">
      <div class="container">
        <span class="small__heading">Aquí verás las normativas que marcaste como favoritas</span>
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
      title: 'Favoritas'
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