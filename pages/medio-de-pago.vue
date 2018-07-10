<template>
  <div class="medio-de-pago">
    <SecondaryTop :nroPaso="nroPaso" :tituloPaso="tituloPaso"/>
    <section class="band">
      <div class="container">
        <p>Para acceder a sus 15 días gratis, tendrá que suscribirse al plan seleccionado.</p>
        <p>No se preocupe. Cancele antes del 31/7/18 y <strong>no se le cobrará ningún cargo.</strong></p>
        <nuxt-link :to="{ name: 'tarjeta-de-credito' }" class="rounded__btn--full blue">Tarjeta de crédito</nuxt-link>
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
      title: 'Paso 3 - Medio de Pago',
      nroPaso: '3',
      tituloPaso: 'Seleccione su medio de pago'
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

<style lang="sass">@import 'sass/pages/medio-de-pago.sass'</style>