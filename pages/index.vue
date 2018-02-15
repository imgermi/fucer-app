<template>
  <div class="index">
    <SecondaryTop/>
    <section class="band">
      <div class="container">
        <h1 class="intro__heading">Consulte el <br> contenido de la <br> normativa registral</h1>
        <nuxt-link :to="{ name: 'registro' }" class="rounded__btn--full white">Regístrese aquí</nuxt-link>
        <p>¿Ya tiene una cuenta? <nuxt-link :to="{ name: 'login' }">Ingrese aquí</nuxt-link></p>
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
  data () {
    return {
      title: 'Index',
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
  },
}
</script>

<style lang="sass">@import 'sass/pages/index.sass'</style>