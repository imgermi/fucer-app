<template>
  <div class="bienvenido">
    <SecondaryTop/>
    <section class="band">
      <div class="container">
        <h1>Contenido no disponible</h1>
        <p>Lo sentimos, este contenido ahora está disponible solo para los usuarios premium.</p>
        <nuxt-link :to="{ name: 'modificar-plan' }" class="rounded__btn--full white">Actualizar plan</nuxt-link>
        <br>
        <nuxt-link :to="{ name: 'inicio' }" class="rounded__btn--full white">Volver al inicio</nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import SecondaryTop from '~/components/SecondaryTop.vue'

export default {
  components: {
    SecondaryTop
  },
  data() {
    return {
      title: 'Contenido no disponible'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ],
      bodyAttrs: {
          class: 'bg__gradient'
      }
    }
  }
}
</script>

<style lang="sass">@import 'sass/pages/bienvenido.sass'</style>