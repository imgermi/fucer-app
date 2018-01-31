<template>
  <div class="inicio">
    <Alerta/>
  	<Top :title="title" />
    <section class="band">
      <div class="container">
        <h1>Normativa Registral</h1>
        <article class="normativa-module">
        	<h4><nuxt-link to="/normativa">Resolución MJ y DH Nº 238/2003 (Concursos)</nuxt-link></h4>
        	<p><nuxt-link to="/normativa">The entire starfleet couldn’t destroy the whole planet. Not for long…</nuxt-link></p>
        	<small><nuxt-link to="/normativa">2001</nuxt-link></small>
          <FavoriteStar/>
        </article>
      </div>
    </section>
    <Foot/>
  </div>
</template>

<script>
import Top from '~/components/Top.vue'
import Alerta from '~/components/Alerta.vue'
import Foot from '~/components/Foot.vue'
import FavoriteStar from '~/components/FavoriteStar.vue'

export default {
  components: {
    Top,
    Alerta,
    Foot,
    FavoriteStar
  },
  data () {
    return {
      title: 'Inicio',
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