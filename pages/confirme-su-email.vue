<template>
  <div class="confirme-su-email">
    <SecondaryTop/>
    <section class="band">
      <div class="container">
        <h1 class="intro__heading">Gracias por registrarse. Hemos enviado un correo de confirmación a su cuenta de email.</h1>
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
      title: 'Confirme su email'
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

<style lang="sass">@import 'sass/pages/confirme-su-email.sass'</style>