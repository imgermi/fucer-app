<template>
  <div class="seleccione-su-plan">
    <SecondaryTop :nroPaso="nroPaso" :tituloPaso="tituloPaso"/>
    <section class="band">
      <div class="container">
        <div class="plan__titulo"><span>Básico</span></div>
        <small class="plan__precio">$200 mensuales</small>
        <ul class="plan__specs">
          <li>Acceso ilimitado a Normativas</li>
          <li>Recopilación de material</li>
          <li>Resúmenes introductorios y explicativos sobre material</li>
        </ul>
        <nuxt-link :to="{ name: 'registro' }" class="rounded__btn--full blue">Siguiente</nuxt-link>
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
  auth: false,
  data() {
    return {
      title: 'Paso 1 - Seleccione su plan',
      nroPaso: '1',
      tituloPaso: 'Seleccione su plan'
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

<style lang="sass">@import 'sass/pages/seleccione-su-plan.sass'</style>