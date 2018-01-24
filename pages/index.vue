<template>
  <div class="index">
    <SecondaryTop/>
    <section class="band">
      <div class="container">
        <h1 class="intro__heading">Consulte el <br> contenido de la <br> normativa registral</h1>
        <nuxt-link to="/registro" class="rounded__btn--full">Regístrese</nuxt-link>
        <p>¿Ya tiene una cuenta? <nuxt-link to="/login">Ingrese aquí</nuxt-link></p>
      </div>
    </section>
  </div>
</template>

<script>
import SecondaryTop from '~/components/SecondaryTop.vue'

export default {
  components: {
    SecondaryTop
  }
}
</script>

