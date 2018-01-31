<template>
  <div class="normativa">
    <Alerta/>
    <header class="goBack__header">
      <div class="container">
        <nuxt-link to="/inicio"><img src="~/assets/img/arrow-left.svg" alt="Volver" class="arrow-left"></nuxt-link>
        <FavoriteStar/>
      </div>
    </header>
    <section class="top">
      <div class="container">
        <h1>Resolución MJ y DH Nº 238/2003 (Concursos)</h1>
        <small>2003</small>
      </div>
    </section>
    <section class="band cuerpo">
      <div class="container">
        <h6>Introducción</h6>
        <span>Por Javier Cornejo</span>
        <p>The entire starfleet couldn’t destroy the whole planet. It’d take a thousand ships with more fire power than I’ve… There’s another ship coming in. Maybe they know what happened. It’s an Imperial fighter. It followed us! No. It’s a short range fighter. There aren’t any bases around here. Where did it come from? It sure is leaving in a big hurry. If they identify us, we’re in big trouble. Not if I can help it. Chewie…jam it’s transmissions. It’d be as well to let it go. It’s too far out of range. Not for long…</p>
        <p>The entire starfleet couldn’t destroy the whole planet. It’d take a thousand ships with more fire power than I’ve… There’s another ship coming in. Maybe they know what happened. It’s an Imperial fighter. It followed us! No. It’s a short range fighter. There aren’t any bases around here. Where did it come from? It sure is leaving in a big hurry. If they identify us, we’re in big trouble. Not if I can help it. Chewie…jam it’s transmissions. It’d be as well to let it go. It’s too far out of range. Not for long…</p>
        <button><nuxt-link to="" class="rounded__btn--full">Leer normativa</nuxt-link></button>
      </div>
    </section>
    <Foot/>
  </div>
</template>

<script>
import Alerta from '~/components/Alerta.vue'
import FavoriteStar from '~/components/FavoriteStar.vue'
import Foot from '~/components/Foot.vue'

export default {
  components: {
    Alerta,
    FavoriteStar,
    Foot
  },
  data () {
    return {
      title: 'Normativa'
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