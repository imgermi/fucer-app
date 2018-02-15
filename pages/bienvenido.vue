<template>
  <div class="bienvenido">
    <SecondaryTop/>
    <section class="band">
      <div class="container">
        <h1>¡Bienvenido Pedro!</h1>
        <p>Su email ha sido confirmado. Ya puede comenzar a utilizar la aplicación.</p>
        <nuxt-link :to="{ name: 'inicio' }" class="rounded__btn--full white">Comenzar</nuxt-link>
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
      title: 'Bienvenido'
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