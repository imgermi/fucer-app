<template>
  <div class="bienvenido">
    <SecondaryTop/>
    <section>
      <div class="container">
        <h1>¡Bienvenido Pedro!</h1>
        <p>Su email ha sido confirmado. Ya puede comenzar a utilizar la aplicación.</p>
        <p><nuxt-link :to="{ name: 'inicio' }">Comenzar</nuxt-link></p>
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

