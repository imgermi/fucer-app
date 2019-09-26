<template>
  <div class="error">
    <SecondaryTop/>
    <section class="band">
      <div class="container">
        <h1 class="intro__heading">Error - 404</h1>
        <p>La página que está buscando no existe</p>
        <nuxt-link :to="{ name: 'inicio' }" class="rounded__btn--full white">Volver a Inicio</nuxt-link>
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
  props: ['error'],
  data () {
    return {
      title: 'Error - 404',
    }
  },
  created(){
    console.log(this.error)
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

<style lang="sass">@import 'sass/layouts/error.sass'</style>