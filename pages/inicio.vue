<template>
  <div class="inicio">
    <Alerta/>
  	<Top :title="title" />
    <section class="band">
      <div class="container">
        <h1>Normativa Registral</h1>
        <nuxt-link to="/normativa" class="normativa-module">
        	<h4>Resolución MJ y DH Nº 238/2003 (Concursos)</h4>
        	<p>The entire starfleet couldn’t destroy the whole planet. Not for long…</p>
        	<small>2001</small>
          <img src="~/assets/img/star.svg" class="star-icon">
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import Top from '~/components/Top.vue'
import Alerta from '~/components/Alerta.vue'

export default {
  components: {
    Top,
    Alerta
  },
  data () {
    return {
      title: 'Inicio'
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