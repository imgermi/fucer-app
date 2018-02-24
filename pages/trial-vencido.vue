<template>
  <div class="bienvenido">
    <SecondaryTop/>
    <section class="band">
      <div class="container">
        <h1>Versión de trial terminada</h1>
        <p>Su trial ha terminado. Actualice su plan para seguir disfrutando de nuestro servicio.</p>
        <nuxt-link :to="{ name: 'modificar-plan' }" class="rounded__btn--full white">Actualizar plan</nuxt-link>
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
      title: 'Versión de trial terminada'
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