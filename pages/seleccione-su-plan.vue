<template>
  <div class="seleccione-su-plan">
    <SecondaryTop :nroPaso="nroPaso" :tituloPaso="tituloPaso"/>
    <section class="band">
      <div class="container">
        <div class="plan__titulo"><span>Premium</span></div>
        <span
          v-if="precioPlan"
          class="plan__precio"
        >
          ${{ precioPlan }} mensuales
        </span>
        <small class="plan__recordatorio">Antes de abonar, usted contará con 15 días gratuitos para probar la app</small>
        <ul class="plan__specs">
          <li>Acceso ilimitado a Normativas</li>
          <li>Recopilación de material</li>
          <li>Resúmenes introductorios y explicativos sobre material</li>
        </ul>

        <div class="msj-error" v-if="error">
          {{ error }}
        </div>

        <nuxt-link :to="{ name: 'registro' }" class="rounded__btn--full green">Siguiente</nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import SecondaryTop from '~/components/SecondaryTop.vue'

export default {
  layout: 'signup',
  components: {
    SecondaryTop
  },
  auth: false,
  middleware: 'guest',
  data() {
    return {
      error: false,
      title: 'Paso 1 - Seleccione su plan',
      nroPaso: '1',
      tituloPaso: 'Seleccione su plan',
      precioPlan: false
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: '' }
      ],
    }
  },
  async created () {
    await this.obtenerConfigs()
  },
  methods: {
    ...mapActions([
      'setPaginaCargando'
    ]),
    async obtenerConfigs() {
      this.setPaginaCargando(true)
      try {
        let data = await this.$axios.$get('configuraciones')
        this.precioPlan = data.precio_regular
        this.error = false
      } catch(e) {
        this.error
      }
      this.setPaginaCargando(false)
    }
  }
}
</script>

<style lang="sass">@import 'sass/pages/seleccione-su-plan.sass'</style>