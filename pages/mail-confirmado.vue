<template>
  <div class="mail-confirmado">
    <SecondaryTop :nroPaso="nroPaso" :tituloPaso="tituloPaso"/>
    <section class="band">
      <div class="container">
        <h1>Pedro, su email fue confirmado</h1>
        <nuxt-link :to="{ name: 'medio-de-pago' }" class="rounded__btn--full blue">Siguiente</nuxt-link>
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
      title: 'Mail Confirmado',
      nroPaso: '2',
      tituloPaso: 'Cree su cuenta'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ],
    }
  }
}
</script>

<style lang="sass">@import 'sass/pages/bienvenido.sass'</style>